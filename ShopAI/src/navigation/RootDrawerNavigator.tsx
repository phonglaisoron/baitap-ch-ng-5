import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MainTabNavigator from "@navigation/MainTabNavigator";
import ProfileScreen from "@screens/ProfileScreen";
import { COLORS } from "@constants/theme";

export type RootDrawerParamList = {
    ShopAI: undefined;
    Profile: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

interface Props {
    onLogout?: () => void;
    cartBadgeCount?: number;
}

const RootDrawerNavigator = ({ onLogout, cartBadgeCount }: Props) => {
    const renderMainTab = React.useCallback(
        () => <MainTabNavigator onLogout={onLogout} cartBadgeCount={cartBadgeCount} />,
        [onLogout, cartBadgeCount],
    );

    const renderProfile = React.useCallback(
        () => <ProfileScreen onLogout={onLogout} />,
        [onLogout],
    );

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: COLORS.primary,
                drawerInactiveTintColor: COLORS.text,
            }}
        >
            <Drawer.Screen
                name="ShopAI"
                component={renderMainTab}
                options={{
                    title: "ShopAI",
                    drawerIcon: ({ color, size }) => (
                        <Icon name="storefront-outline" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={renderProfile}
                options={{
                    title: "Hồ sơ của tôi",
                    headerShown: true,
                    headerTitle: "Hồ sơ",
                    drawerIcon: ({ color, size }) => (
                        <Icon name="account-outline" color={color} size={size} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default RootDrawerNavigator;
