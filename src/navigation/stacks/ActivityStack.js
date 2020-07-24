import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import {appTheme} from "../../constants/colors";
import openDrawerButton from "../openDrawerButton";
import Activity from "../../screens/App/Activity";
import fonts from "../../constants/fonts";
import Profile from "../../screens/App/Profile";
import AccountStatement from "../../screens/App/Trainer/AccountStatement";

const activity = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.Activity}
        component={AccountStatement}
        options={{
          title: 'Activity',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          },
          headerLeft: openDrawerButton
        }}
      />
      <Stack.Screen name={RouteNames.Profile} component={Profile}
                    options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}/>
    </Stack.Navigator>
  )
}



export default activity;