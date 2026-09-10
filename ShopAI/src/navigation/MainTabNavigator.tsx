import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStackNavigator from "@navigation/HomeStackNavigator";
import CartScreen from "@screens/CartScreen";
import { COLORS } from "@constants/theme";

const Tab = createBottomTabNavigator();

interface Props {
    onLogout?: () => void;
    // Số lượng hiện trên chấm đỏ (badge) của Tab Giỏ hàng.
    // Sprint 5 (chưa có Zustand) chỉ nhận giá trị tĩnh qua Props từ App.tsx.
    // Sau Chương 6, giá trị này sẽ đọc trực tiếp từ useCartStore().totalQuantity() ngay
    // BÊN TRONG component này — xoá hẳn tầng Prop Drilling cartBadgeCount này.
    cartBadgeCount?: number;
}

const MainTabNavigator = ({ onLogout, cartBadgeCount = 0 }: Props) => {
    const renderHomeStack = React.useCallback(
        () => <HomeStackNavigator onLogout={onLogout} />,
        [onLogout],
    );

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
            }}
        >
            {/* Tab 1: Trang chủ */}
            <Tab.Screen
                name="HomeTab"
                component={renderHomeStack}
                options={{
                    title: "Trang chủ",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home-variant-outline" color={color} size={size} />
                    ),
                }}
            />

            {/* Tab 2: Giỏ hàng */}
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    title: "Giỏ hàng",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cart-outline" color={color} size={size} />
                    ),
                    tabBarBadge: cartBadgeCount > 0 ? cartBadgeCount : undefined,
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;