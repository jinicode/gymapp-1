import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import PackageEdit from "../../screens/App/PackageEdit";
import PackageList from "../../screens/App/PackageList";
import {appTheme} from "../../constants/colors";
import fonts from "../../constants/fonts";
import openDrawerButton from "../openDrawerButton";

const myPackages = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.Packages}
        component={PackageList}
        options={{
          title: 'My Packages',
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
      <Stack.Screen
        name={RouteNames.PackageEdit}
        component={PackageEdit}
        options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}
      />
    </Stack.Navigator>
  )
}

export default myPackages;