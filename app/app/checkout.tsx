import {
  Image,
  Modal,
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
import Input from "@/components/Input";
import { useState } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import { usePostNewOrderMutation } from "@/store/api/OrderApiSlice";

const ProductCard = (product) => {
  return (
    <View>
      <Image />
      <View>
        <ThemedText type="defaultSemiBold"></ThemedText>
        <ThemedText></ThemedText>
      </View>
      <Feather name="trash" size={24} color={Colors.light.mutedText} />
    </View>
  );
};

export default function Checkout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [createOrder, { data, isLoading, isSuccess, isError, error }] = usePostNewOrderMutation();
  const router = useRouter();
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.authUser.authUser);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0 // Valor inicial de la suma
  );

  const discount = 0;

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.push("/app/cart");
    } else {
      router.push("/app");
    }
  };


  const handleSubmit = async () => {
    await createOrder({
      customerId: user.uid,
      products: cartItems,
      status: "pending"
    })
    setModalVisible(true);
    dispatch(clearCart())
  };

  const handleGoOrders = () => {
    setModalVisible(false);
    router.push({
      pathname: "/app/order",
      params: { id: 2 },
    });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleGoBack}>
        <ThemedText color={Colors.light.mutedText}>Volver</ThemedText>
      </TouchableOpacity>
      <ThemedText type="title">Orden de compra</ThemedText>
      <View>
        <ThemedText type="defaultSemiBold" color={Colors.light.tint}>
          Detalles de facturación
        </ThemedText>
        <Input label={"Nombres"}></Input>
        <Input label={"Apellidos"}></Input>
        <Input label={"Email"}></Input>
        <Input label={"Número de telefono"}></Input>
      </View>
      <View>
        <ThemedText type="defaultSemiBold" color={Colors.light.tint}>
          Datos de envío
        </ThemedText>
        <Input label={"Dirección"}></Input>
        <Input label={"Departamento"}></Input>
        <Input label={"Distrito"}></Input>
      </View>
      <View>
        <ThemedText type="defaultSemiBold" color={Colors.light.tint}>
          Detalles del pago
        </ThemedText>
        <Input label={"Número de tarjeta"}></Input>
        <Input label={"Fecha de caducidad"}></Input>
        <Input label={"CVV"}></Input>
      </View>
      <ThemedText type="title">Resumen</ThemedText>
      <View style={styles.review}>
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
      <ButtonPrimary title={"Continuar"} onPress={handleSubmit} />
      <Modal
        animationType="slide" // Tipo de animación ("slide", "fade", "none")
        transparent={true} // Si el fondo debe ser transparente
        visible={modalVisible} // Controla si el modal está visible o no
        onRequestClose={() => setModalVisible(false)} // Android: cierra al presionar atrás
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Octicons name="verified" size={100} color={Colors.light.tint} />
            <ThemedText type="title">
              ¡Felicitaciones compra finalizada!
            </ThemedText>
            <ButtonPrimary title="Ver mis compras" onPress={handleGoOrders} />
          </View>
        </View>
      </Modal>
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
  productCard: {
    padding: 16,
    gap: 5,
    width: "48%",
    shadowColor: "#000",
    borderRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    gap: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  review: {
    width: "50%"
  }
});
