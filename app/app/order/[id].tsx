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
import { useLocalSearchParams, useRouter } from "expo-router";

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

export default function Order() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/app");
    }
  };

  const handleGoOrder = () => {
    router.push("/app/order");
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleGoBack}>
        <ThemedText color={Colors.light.mutedText}>Volver</ThemedText>
      </TouchableOpacity>
      <ThemedText type="title">Bolsa de compras</ThemedText>
      <View></View>
      <View style={{ height: 1, backgroundColor: Colors.light.text }}></View>
      <ThemedText type="title">Resumen</ThemedText>
      <View>
        <View>
          <ThemedText>Subtotal</ThemedText>
        </View>
        <View>
          <ThemedText>Descuentos</ThemedText>
        </View>
        <View>
          <ThemedText>Total</ThemedText>
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
    gap: 5,
    width: "48%",
    shadowColor: "#000",
    borderRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  counterContainer: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
