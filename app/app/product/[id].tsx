import {
  Image,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import ButtonPrimary from "@/components/ButtonPrimary";
import { useLocalSearchParams } from "expo-router";
import Counter from "@/components/counter";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "@/store/api/ProductApiSlice";
import { useLazyGetStoreByIdQuery } from "@/store/api/StoreApiSlice";
import BlankScreen from "@/components/BlankScreen";

export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const { id } = params;
  
  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const [getStoreTrigger, { data: store, isLoading: isLoadingStore } ] = useLazyGetStoreByIdQuery();

  useEffect(() => {
    if (product) {
      getStoreTrigger(product.storeId); 
    }
  }, [product, getStoreTrigger]);

  if (isLoading || isLoadingStore ) {
    return <BlankScreen/>;
  }

  const handleAddCart = () => {
    dispatch(addItem({...product, quantity: quantity }))
  }

  const onCounterChange = (count) => {
    setQuantity(count);
  }

  return (
    <ThemedView style={{ height: "100%", width: "100%" }}>
      <Image
        source={{
          uri: product?.image,
        }}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <ThemedView style={styles.content} color={Colors.light.secondaryTint}>
        <ThemedText color={Colors.light.background}>
          {product?.brand}
        </ThemedText>
        <ThemedText type="title" color={Colors.light.background}>
          {product?.name}
        </ThemedText>
        <ThemedText>Por {store?.name}</ThemedText>
        <ThemedText type="defaultSemiBold">{product?.description}</ThemedText>
        <View style={styles.counterContainer}>
          <ThemedText type="defaultSemiBold">S/. {product?.price}</ThemedText>
          <Counter onChange={onCounterChange}/>
        </View>
        <ButtonPrimary
          style={styles.cartButton}
          title={"Agregar al carrito"}
          onPress={handleAddCart}
        ></ButtonPrimary>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
    padding: 24,
    gap: 20,
    justifyContent: "center",
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
  cartButton: {
    backgroundColor: Colors.light.text,
  },
  counterContainer: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    justifyContent: "space-between"
  }
});
