/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, LayoutAnimation, TouchableOpacity, ActivityIndicator} from 'react-native'
import {connect} from "react-redux";
import cuid from 'cuid';
import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import colors, {appTheme, darkPallet} from "../../../constants/colors";
import strings from "../../../constants/strings";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";

import {WEEK_DAYS} from "../../../constants/appConstants";
import Slot from "../../../components/Slot";
import {dateToString, findMissingDays, groupBy} from "../../../utils/utils";
import BarButton from "../../../components/BarButton";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {showSuccess} from "../../../utils/notification";
import {screenHeight} from "../../../utils/screenDimensions";

class SlotList extends Component {

  state = {
    slots: [],
    submitPending: false,
    changed: false,
    settingInitialSlots: true
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.refreshSlots();
    this.unsubscribeFocus = navigation.addListener('focus', e => {
      if (this.state.slots.length === 0)
        this.refreshSlots();
    });
  }

  submitSlots = async () => {
    const {createSlots, updateUserData} = this.props;
    this.setState({submitPending: true});
    let result = await createSlots(this.state.slots);
    this.refreshSlots();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({changed: false, submitPending: false});
    if (result)
      showSuccess(strings.CHANGES_SAVED);
    updateUserData();
    //TODO: Error handling
  }

  refreshSlots = () => {
    const {slots} = this.props;
    if (slots && slots.length > 0) {
      // const filteredSlots = slots.filter(slot=>slot.subscriptionId===null);
      const localSlots = this.mapSlotsToLocal(slots);
      this.setState({slots: localSlots, settingInitialSlots: false});
    } else this.setState({settingInitialSlots: false})
  }

  mapSlotsToLocal = (slots) => {
    const localSlots = [];
    const slotsByTime = groupBy(slots, 'time');
    Object.keys(slotsByTime).map(time => {
      let slotsAtT = slotsByTime[time];
      const slotObj = slotsAtT[0];
      let days = [];
      slotsAtT.map(slotAtT => days.push(slotAtT.dayOfWeek));
      slotObj.days = days;
      localSlots.push(slotObj);
    })
    return localSlots;
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
  }

  setChangedDirty = () => {
    if (this.state.changed === false) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({changed: true});
    }
  }

  updateSlot = (slotId, updatedSlot) => {
    let slots = this.state.slots.map(slot => slot._id === slotId ? updatedSlot : slot);
    this.setState({slots});
    this.setChangedDirty();
  }
  getSlot = (slotId) => {
    const filteredSlots = this.state.slots.filter(slot => slot._id === slotId);
    if (filteredSlots.length === 0)
      return null;
    return {...filteredSlots[0]};
  }
  handleTimeChange = (slotId, time) => {
    const slot = this.getSlot(slotId);
    slot.time = dateToString(time);
    this.updateSlot(slotId, slot);
    this.setChangedDirty();
  }
  handleDurationChange = (slotId, duration) => {
    const slot = this.getSlot(slotId);
    slot.duration = duration;
    this.updateSlot(slotId, slot);
    this.setChangedDirty();
  }
  handleDaysChange = (slotId, days) => {
    const slot = this.getSlot(slotId);
    slot.days = days;
    this.updateSlot(slotId, slot);
    this.setChangedDirty();
  }
  deleteSlot = (slotId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const filteredSlots = this.state.slots.filter(slot => slot._id !== slotId);
    this.setState({slots: filteredSlots});
    this.props.createSlots(filteredSlots);
    this.setChangedDirty();
  }
  createSlot = () => {
    const slot = {
      _id: cuid(),
      duration: 60,
      time: '1000',
      days: [WEEK_DAYS.MON, WEEK_DAYS.TUE, WEEK_DAYS.WED]
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const slots = [...this.state.slots];
    slots.push(slot);
    this.setState({slots});
    this.setChangedDirty();
  }

  renderSlots = () => {
    return this.state.slots.map((slot, index) => (
      <View key={slot._id} style={styles.slotContainer}>
        <Slot
          days={slot.days}
          duration={slot.duration}
          index={index + 1}
          time={slot.time}
          onTimeChange={(time) => this.handleTimeChange(slot._id, time)}
          onDurationChange={duration => this.handleDurationChange(slot._id, duration)}
          onDaysChange={days => this.handleDaysChange(slot._id, days)}
          onDelete={() => this.deleteSlot(slot._id)}
        />
      </View>
    ))
  }
  fab = () => {
    if (!this.state.changed) return null;
    return (
      <TouchableOpacity style={[styles.fab, styles.fabPosition]} onPress={this.submitSlots}>
        {
          this.state.submitPending && (
            <ActivityIndicator size={28} color={'white'}/>
          )
        }
        {
          !this.state.submitPending && (
            <FontAwesome
              name={'check'}
              color={'white'}
              size={22}
            />
          )
        }
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <LinearGradient
        colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
        style={styles.container}>
        {
          this.state.settingInitialSlots &&
          <ActivityIndicator style={{position: 'absolute'}} color={appTheme.brightContent} size={50}/>
        }
        {
          !this.state.settingInitialSlots && (
            <KeyboardAwareScrollView style={{flex: 1}}>
              <StatusBar backgroundColor={appTheme.lightBackground}/>
              <View style={styles.listContainer}>
                <this.renderSlots/>
              </View>
              <View style={styles.addButtonContainer}>
                <BarButton onPress={this.createSlot}/>
              </View>
            </KeyboardAwareScrollView>
          )
        }
        <this.fab/>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    justifyContent: 'center',
    marginTop: spacing.medium_lg,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    flex: 1,
  },
  slotContainer: {
    marginBottom: spacing.medium_lg
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    marginBottom: spacing.medium_sm,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  addButtonContainer: {
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium_sm,
    alignItems: 'center',
  },
  fab: {
    height: spacing.space_50,
    width: spacing.space_50,
    borderRadius: spacing.thumbnailMini / 2,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.acceptGreen,
  },
  fabPosition: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

const mapStateToProps = (state) => ({
  slots: state.trainer.slots
});

const mapDispatchToProps = (dispatch) => ({
  createSlots: (slotArray) => dispatch(actionCreators.createSlots(slotArray)),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlotList);