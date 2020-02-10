import React from 'react';
import { Image } from 'react-native';

import {
   createSwitchNavigator,
   createStackNavigator,
   createAppContainer,
   createBottomTabNavigator,
   createDrawerNavigator,
} from 'react-navigation';

import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import PasswordReset from '~/Screens/PasswordReset';
import Signup from '~/Screens/Signup';

import MyFeed from '~/Screens/MyFeed';
import Feeds from '~/Screens/Feeds';
import FeedListOnly from '~/Screens/FeedListOnly';
import Upload from '~/Screens/Upload';
import Notification from '~/Screens/Notification';
import Profile from '~/Screens/Profile';
import Drawer from '~/Screens/Drawer';

const LoginNavigator = createStackNavigator({
    Login,
    Signup,
    PasswordReset,
});

const MyFeedTab = createStackNavigator({
    MyFeed,
});

const FeedsTab = createStackNavigator({
    Feeds,
    FeedListOnly,
});


const UploadTab = createStackNavigator({
    Upload,
});

const ProfileTab = createStackNavigator({
    Profile,
});

const MainTabs = createBottomTabNavigator({ // 메인 내비게이션
    MyFeed: {
        screen: MyFeedTab,
        navigationOptions: {
            tabBarIcon: ({ focused }: { focused: boolean }) => (    // 탭의 선택 여부에 따라 다른이미지 출력
                <Image
                    source={
                        focused
                            ? require('~/Assets/Images/Tabs/ic_home.png')
                            : require('~/Assets/Images/Tabs/ic_home_outline.png')
                    }
                />
            ),
            tabBarOptions: {
                showLabel: false,   // 탭의 라벨 제거
            },
        },
    },
    Feeds: {
        screen: FeedsTab,
        navigationOptions: {
            tabBarIcon: ({ focused }: { focused: boolean }) => (
                <Image 
                    source={
                        focused 
                            ? require('~/Assets/Images/Tabs/ic_add.png')
                            : require('~/Assets/Images/Tabs/ic_add_outline.png')
                    }
                />
            ),
            tabBarOptions: {
                showLabel: false,   // 탭의 라벨 제거
            },
        },
    },
    Upload: {
        screen: UploadTab,
        navigationOptions: {
            tabBarIcon: ({ focused }: { focused: boolean }) => (
                <Image 
                    source={
                        focused 
                            ? require('~/Assets/Images/Tabs/ic_add.png')
                            : require('~/Assets/Images/Tabs/ic_add_outline.png')
                    }
                />
            ),
            tabBarOptions: {
                showLabel: false,   // 탭의 라벨 제거
            },
        },
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            tabBarIcon: ({ focused }: { focused: boolean }) => (
                <Image 
                    source={
                        focused 
                            ? require('~/Assets/Images/Tabs/ic_favorite.png')
                            : require('~/Assets/Images/Tabs/ic_favorite_outline.png')
                    }
                />
            ),
            tabBarOptions: {
                showLabel: false,   // 탭의 라벨 제거
            },
        },
    },
    Profile: {
        screen: ProfileTab,
        navigationOptions: {
            tabBarIcon: ({ focused }: { focused: boolean }) => (
                <Image 
                    source={
                        focused
                            ? require('~/Assets/Images/Tabs/ic_profile.png')
                            : require('~/Assets/Images/Tabs/ic_profile_outline.png')
                    }
                />
            ),
            tabBarOptions: {
                showLabel: false,
            },
        },
    },
});

/*
const MainNavigator = createDrawerNavigator(    // 드로어 내비게이션
    {
        MainTabs,
    },
    {
        drawerPosition: 'right',    // 드로어 방향
        drawerType: 'slide',        // 화면 위가 아닌 화면 전체를 이동시키면서 표시
        contentComponent: Drawer,   // react-navigation 이 자동으로 드로어내비게이션 생성
    }
);
*/
const MainNavigator = createDrawerNavigator(    // 드로어 내비게이션
    {
        MainTabs,
        MyFeedTab,
        FeedsTab,
    },
    {
        drawerPosition: 'right',    // 드로어 방향
        drawerType: 'slide',        // 화면 위가 아닌 화면 전체를 이동시키면서 표시
    }
);

const AppNavigator = createSwitchNavigator(
    {
        CheckLogin,
        LoginNavigator,
        MainNavigator,
    },
    {
        initialRouteName: 'CheckLogin'
    }
);

export default createAppContainer(AppNavigator);    // 앱에서 내비게이션 사용 코드







