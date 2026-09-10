import React, { useState } from "react";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@contexts/ThemeContext";
import LoginScreen from "@screens/LoginScreen";
import RegisterScreen from "@screens/RegisterScreen";
import MainTabNavigator from "@navigation/MainTabNavigator";
import RootDrawerNavigator from "@navigation/RootDrawerNavigator";

// Chỉ còn 1 Stack cho luồng Auth — luồng Main giờ do MainTabNavigator (Bottom Tab) đảm nhiệm
const AuthStack = createNativeStackNavigator();

// Cấu hình Deep Linking tối giản: shopai://product/123 -> tự navigate vào ProductDetail
// (Phần khai báo URL Scheme Native đầy đủ cho iOS/Android sẽ hoàn thiện ở giai đoạn xuất bản App)
const linking: LinkingOptions<any> = {
  prefixes: ["shopai://"],
  config: {
    screens: {
      HomeTab: {
        screens: {
          ProductDetail: "product/:productId",
        },
      },
    },
  },
};

function App(): React.JSX.Element {
  // State quản lý Token: Để mặc định "mock_token_123" để vào thẳng màn hình chính (không cần gõ đăng nhập)
  // Khi bấm nút "Thoát" (Logout), token về null để quay lại màn hình Login.
  const [userToken, setUserToken] = useState<string | null>("mock_token_123");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* ThemeProvider giữ nguyên từ Sprint 3 (Chương 3) — lồng bên trong SafeAreaProvider,
            bên ngoài NavigationContainer, để mọi màn hình (Auth lẫn Main) đều dùng được useTheme() */}
        <ThemeProvider>
        {/* Bọc toàn bộ app bằng NavigationContainer, gắn thêm prop linking */}
        <NavigationContainer linking={linking}>
          {userToken == null ? (
            // LUỒNG 1: CHƯA ĐĂNG NHẬP — AuthStack: Login + Register (không Back lén vào Tab)
            <AuthStack.Navigator screenOptions={{ headerShown: false }}>
              <AuthStack.Screen name="Login">
                {({ navigation }) => (
                  <LoginScreen
                    onLogin={(token) => setUserToken(token)}
                    onGoRegister={() => navigation.navigate("Register")}
                  />
                )}
              </AuthStack.Screen>
              <AuthStack.Screen name="Register">
                {({ navigation }) => (
                  <RegisterScreen
                    onRegistered={(token) => setUserToken(token)}
                    onGoLogin={() => navigation.navigate("Login")}
                  />
                )}
              </AuthStack.Screen>
            </AuthStack.Navigator>
          ) : (
            // LUỒNG 2: ĐÃ ĐĂNG NHẬP — Drawer Navigator (Menu vuốt / bấm 3 gạch chứa ShopAI Tab + Hồ sơ)
            <RootDrawerNavigator
              onLogout={() => setUserToken(null)}
              cartBadgeCount={2}
            />
          )}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
  );
}

export default App;