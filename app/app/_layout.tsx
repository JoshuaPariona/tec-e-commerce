import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import Feather from "@expo/vector-icons/Feather";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { AnimatedWave } from "@/components/AnimatedWave";

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.light.background,
            borderBottomWidth: 0,
          },
          headerTitle: () => <HeaderTitle />,
          headerTitleAlign: "center",
          headerRight: () => <HeaderButtons />,
          headerTintColor: Colors.light.icon,
          drawerActiveTintColor: Colors.light.tint,
          drawerInactiveTintColor: Colors.light.secondaryTint,
          drawerStyle: {
            backgroundColor: Colors.light.background,
          },
        }}
      />
    </GestureHandlerRootView>
  );
}

const HeaderTitle = () => (
  <View style={styles.headerTitle}>
    <Image
      style={styles.headerImage}
      source={require("@/assets/images/logo.png")}
      resizeMode="contain"
    ></Image>
    <ThemedText type="title" color={Colors.light.tint}>
      Tec-e-Ecomm
    </ThemedText>
  </View>
);

const HeaderButtons = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();

  const handleGoCart = () => {
    router.push("/app/cart");
  };

  return (
    <View style={styles.headerButtons}>
      <TouchableOpacity style={styles.button}>
        <Feather name="search" size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoCart}>
        <AnimatedWave on={cartItems.length}>
          <Feather name="shopping-cart" size={24} />
        </AnimatedWave>
        <View style={styles.cartCounter}>
          <Text style={{fontSize: 12}}>{cartItems.length}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  menuIcon: {
    marginLeft: 15,
  },
  headerButtons: {
    flexDirection: "row",
    marginRight: 15,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 48,
  },
  headerImage: {
    height: 20,
  },
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  cartCounter: {
    position: "absolute",
    left: "100%",
    top: 16,
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.light.text,
    alignItems: "center",
    justifyContent: "center",
  },
});
