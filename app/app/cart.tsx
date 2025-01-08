import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import ButtonPrimary from "@/components/ButtonPrimary";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/store/cartSlice";

const ProductCard = (product) => {
  const dispatch = useDispatch();

  const handleDeleteProduct = () => {
    dispatch(removeItem(product.id))
  }

  return (
    <View style={styles.productCard}>
      <Image style={styles.productImageCard} source={{uri: product.image}}/>
      <View style={{width: "50%"}}>
        <ThemedText type="defaultSemiBold">{product.name}</ThemedText>
        <ThemedText>S/. {product.price}</ThemedText>
      </View>
        <ThemedText>{product.quantity}</ThemedText>
      <TouchableOpacity
        onPress={handleDeleteProduct}
      >
        <Feather name="trash" size={24} color={Colors.light.mutedText} />
      </TouchableOpacity>
    </View>
  );
};

export default function Cart() {
  const router = useRouter();
  const cartItems = useSelector(state => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0 // Valor inicial de la suma
  );

  const discount = 0;

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/app");
    }
  };

  const handleGoOrder = () => {
    if (cartItems.length > 0)
      router.push("/app/checkout");
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleGoBack}>
        <ThemedText color={Colors.light.mutedText}>Volver</ThemedText>
      </TouchableOpacity>
      <ThemedText type="title">Bolsa de compras</ThemedText>
      <View>
        {cartItems.map(item => ProductCard(item))}
      </View>
      <View style={{ height: 1, backgroundColor: Colors.light.text }}></View>
      <ThemedText type="title">Resumen</ThemedText>
      <View  style={styles.review}>
        <View style={styles.row}>
          <ThemedText>Subtotal:</ThemedText>
          <ThemedText>S/. {totalAmount}</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Descuentos:</ThemedText>
          <ThemedText>S/. {discount}</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Total:</ThemedText>
          <ThemedText>S/. {totalAmount + discount}</ThemedText>
        </View>
      </View>
      <ButtonPrimary title={"Continuar"} onPress={handleGoOrder}></ButtonPrimary>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 24,
    gap: 20,
  },
  cardImage: {
    width: "100%",
    height: "40%",
  },
  productCard: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    width: "100%",
    shadowColor: "#000",
    borderRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  productImageCard: {
    height: 80,
    width: 80
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  review: {
    width: "50%"
  }
});
