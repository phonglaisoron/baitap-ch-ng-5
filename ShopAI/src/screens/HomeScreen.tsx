import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FlashList } from "@shopify/flash-list";
import ProductCard from "@components/ProductCard";
import ShopButton from "@components/ShopButton";
import { MOCK_PRODUCTS } from "@data/mockProducts";
import { COLORS, SIZES } from "@constants/theme";
import type { HomeStackParamList } from "@navigation/HomeStackNavigator";

type HomeNavProp = NativeStackNavigationProp<HomeStackParamList, "Home">;

interface HomeScreenProps {
    onLogout?: () => void;
}

const HomeScreen = ({ onLogout }: HomeScreenProps) => {
    const navigation = useNavigation<HomeNavProp>();
    // Nếu đã có pull-to-refresh (Ch4): giữ `const [products, setProducts] = useState(MOCK_PRODUCTS)`
    // và `refreshing`/`onRefresh` — FlashList dùng data={products} + refreshing/onRefresh.

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Pressable
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                            style={styles.menuBtn}
                            hitSlop={12}
                        >
                            <Icon name="menu" size={26} color={COLORS.text} />
                        </Pressable>
                        <Text style={styles.headerTitle}>Khám phá</Text>
                    </View>
                    {onLogout && (
                        <ShopButton
                            title="Thoát"
                            onPress={onLogout}
                            style={styles.logoutBtn}
                        />
                    )}
                </View>
                <FlashList
                    data={MOCK_PRODUCTS}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        // Chỉ gửi productId (ID) qua navigate, không gửi nguyên object sản phẩm
                        <Pressable
                            onPress={() =>
                                navigation.navigate("ProductDetail", { productId: item.id })
                            }
                        >
                            <ProductCard product={item} />
                        </Pressable>
                    )}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: 15,
        backgroundColor: COLORS.surface,
        flexDirection: "row", // Chuyển Flexbox sang ngang
        justifyContent: "space-between", // Đẩy title và nút thoát ra xa
        alignItems: "center", // Căn giữa theo trục phụ
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    menuBtn: {
        padding: 4,
        marginRight: 4,
    },
    headerTitle: {
        fontSize: SIZES.h2,
        fontWeight: "bold",
        color: COLORS.text,
    },
    logoutBtn: {
        width: 80,
        height: 32,
        backgroundColor: COLORS.textLight,
    },
    listContent: {
        padding: SIZES.padding / 2,
    },
});

export default HomeScreen;