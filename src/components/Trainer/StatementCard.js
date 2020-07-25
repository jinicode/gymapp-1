/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Dash from 'react-native-dash';

import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import {screenWidth} from "../../utils/screenDimensions";
import {hitSlop20} from "../../constants/styles";

const statement = (props) => {

  const contentItem = (title, content, alignRight=false) => (
    <View>
      <Text style={[styles.subtitle,alignRight? {textAlign:'right'}:null]}>{title}</Text>
      <Text style={styles.title}>{content}</Text>
    </View>
  )
  const separator = () => (
    <Dash
      dashColor={appTheme.greyC}
      dashThickness={1} dashLength={5} dashGap={3}
      style={{height: 1, marginVertical: spacing.medium_sm}}/>
  )
  const roundEdgeSeparator = ()=>(
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <View style={{height:30,width:30,borderRadius:20,backgroundColor:appTheme.darkBackground,marginLeft:-43}}/>
      <View style={{width:'100%'}}>
        {separator()}
      </View>
      <View style={{height:30,width:30,borderRadius:20,backgroundColor:appTheme.darkBackground,marginRight:-43}}/>
    </View>
  )
  return (
    <View style={styles.container}>
      <View style={[styles.row, {marginBottom:spacing.medium}]}>
        {contentItem(strings.PACKAGE, 'Diet Plan')}
        {contentItem(strings.SESSIONS, '(10/10)', true)}
      </View>
      <View style={[styles.row, {marginBottom:spacing.medium}]}>
        <Text style={styles.brightTitle}>12-02-2020</Text>
        <Text style={styles.title}>—</Text>
        <Text style={styles.brightTitle}>30-02-2020</Text>
      </View>
      {roundEdgeSeparator()}
      <View style={[styles.row, {marginVertical: spacing.medium}]}>
        <Text style={[styles.brightTitle, {color: appTheme.altBrightContent}]}>{strings.COUPON_APPLIED}</Text>
        <Text style={[styles.brightTitle, {color: appTheme.textPrimary}]}>GRG131DX</Text>
      </View>
      {roundEdgeSeparator()}
      <View style={[styles.row, {marginVertical:spacing.small}]}>
        {contentItem(strings.USER_NAME, 'Shivan Magarde')}
        {contentItem(strings.CITY, 'Bhopal', true)}
      </View>
      {separator()}
      <Text style={[styles.subtitle, {textAlign:'center', marginVertical:spacing.small}]}>{strings.TRANSACTION_DETAILS}</Text>
      <View style={styles.row}>
        <Text style={styles.subtitleBold}>{strings.TRANSACTION_STATUS}</Text>
        <Text style={[styles.subtitleBold, {color:appTheme.altBrightContent}]}>Paid</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitleBold}>{strings.PACKAGE_PRICE}</Text>
        <Text style={styles.subtitleBold}>10000 INR</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitleBold}>{strings.DISCOUNT}</Text>
        <Text style={[styles.subtitleBold, {color:appTheme.brightContent}]}>20%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitleBold}>{strings.FINAL_AMOUNT}</Text>
        <Text style={[styles.subtitleBold, {color:appTheme.brightContent}]}>8000 INR</Text>
      </View>
      {separator()}
      <TouchableOpacity hitSlop={hitSlop20}>
        <Text style={[styles.subtitleBold, {color:appTheme.brightContent}]}>{strings.CLAIM_AMOUNT_TEXT}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.background,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 20,
    elevation: 7
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subtitle: {
    color: appTheme.greyC,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothic,
    marginBottom:spacing.small_sm
  },
  subtitleBold: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom:spacing.small_sm
  },
  title: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothicBold
  },
  brightTitle: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothicBold
  },
  separator: {
    borderStyle: 'dashed',
    borderBottomWidth: 0,
    borderWidth: 1,
    borderColor: appTheme.greyC,
    borderRadius: 1,
  }

});

export default React.memo(statement);