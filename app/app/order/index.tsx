import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useGetOrderByUserIdQuery } from "@/store/api/OrderApiSlice";
import { useSelector } from "react-redux";
import BlankScreen from "@/components/BlankScreen";

const OrderCard = (order) => {
  return (
    <View style={styles.productCard}>
      <Image source={{uri: order.products["0"].image}} style={styles.cardImage}/>
      <View>
        <ThemedText type="defaultSemiBold">Orden: {order.id}</ThemedText>
        <ThemedText>{order.status}</ThemedText>
      </View>
    </View>
  );
};

export default function Orders() {
  const router = useRouter();
  const user = useSelector(state => state.authUser.authUser)
  const { data: orders, isLoading } = useGetOrderByUserIdQuery(user.uid);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/app");
    }
  };

  if (isLoading) {
    return <BlankScreen></BlankScreen>
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleGoBack}>
        <ThemedText color={Colors.light.mutedText}>Volver</ThemedText>
      </TouchableOpacity>
      <ThemedText type="title">Mis compras</ThemedText>
      <View style={{gap: 20}}>
        {
        orders.map(order => OrderCard(order)) 
        }
      </View>
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
    width: "20%",
    height: "100%",
  },
  productCard: {
    flexDirection:"row",
    padding: 16,
    gap: 5,
    width: "100%",
    shadowColor: "#000",
    borderRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
});
