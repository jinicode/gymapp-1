/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'

import {spacing} from "../constants/dimension";
import {appTheme} from "../constants/colors";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";

import ClientCard from "./ClientCard";
import {defaultDP} from "../constants/appConstants";


const subscriptionList = (props) => {

  const RenderClients = () => {
    return props.subscriptions.map((subscription, index) => {
      const user = subscription.subscribedBy;
      const {name, city,_id} = user;
      const {totalSessions, heldSessions} = subscription;
      const sessions = `${heldSessions}/${totalSessions}`;
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={()=>props.onProfilePress(_id)} key={index} style={styles.appointmentContainer}>
          <ClientCard callCallback={()=>props.callCallback(_id)} displayName={name} location={city} imageUrl={defaultDP} sessions={sessions}/>
        </TouchableOpacity>
      )
    })
  }

  return (
    <RenderClients/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.darkBackground,

  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    marginBottom: spacing.medium_sm,
    backgroundColor: appTheme.background,
    alignItems: 'center'
  },
  listContainer: {
    marginLeft: spacing.medium_lg,
    marginRight: spacing.medium_lg,
    flex: 1
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  addButtonContainer: {
    paddingTop: spacing.medium_sm,
    paddingBottom: spacing.medium_sm,
    backgroundColor: appTheme.background,
    alignItems: 'center'
  }
});

export default subscriptionList;