import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';


import CoreApp from '../stacks/coreAppStack';
import {appTheme} from "../../constants/colors";
import PackageStack from '../stacks/PackageStack';
import CustomDrawerContent from "./drawerContent";
import ProfileEdit from "../../screens/App/ProfileEdit";
import {userTypes} from "../../constants/appConstants";

const Drawer = createDrawerNavigator();
const MyTheme = {
  colors: {
    primary: appTheme.darkBackground,
  },
};
const rootDrawer = (props) => {
  const {navigationRef, userType, userData} = props;
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <Drawer.Navigator initialRouteName="Home"
                        drawerType={'slide'}
                        drawerContent={(drawerProps) => <CustomDrawerContent {...drawerProps}
                                                                             userType={userType}
                                                                             userData={userData}/>}
                        drawerStyle={{
                          width: 240
                        }}
      >
        <Drawer.Screen name="Home" component={CoreApp}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default rootDrawer;

