import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import ButtonPrimary from "@/components/ButtonPrimary";
import { useRouter } from "expo-router";
import { useGetProductsQuery } from "@/store/api/ProductApiSlice";
import { useGetStoresQuery } from "@/store/api/StoreApiSlice";
import BlankScreen from "@/components/BlankScreen";

const renderProductItem = (item, stores, onPress) => {
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.productCard}
      color={Colors.light.background}
      onPress={() => onPress(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <ThemedText color={Colors.light.mutedText}>{item.brand}</ThemedText>
      <ThemedText type="defaultSemiBold" color={Colors.light.text}>
        {item.name}
      </ThemedText>
      <ThemedText color={Colors.light.text}>
        Por {stores.find((store) => store.id === item.storeId)?.name}
      </ThemedText>
      <ThemedText color={Colors.light.text}>S/. {item.price}</ThemedText>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const { data: products, isLoading } = useGetProductsQuery(null);
  const { data: stores, isLoading:  isLoadingStores } = useGetStoresQuery(null);

  const onPressProduct = (id) => {
    router.push({
      pathname: "/app/product/[id]",
      params: { id },
    });
  };

  if (isLoading) {
    return <BlankScreen />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.light.background,
      }}
      headerImage={
        <ThemedView style={styles.newsCard} color={Colors.light.secondaryTint}>
          <View style={styles.cardContent}>
            <ThemedText type="subtitle"> NEW PRODUCT </ThemedText>
            <ThemedText type="title" color={Colors.light.background}>
              WH-CH510
            </ThemedText>
            <ThemedText color={Colors.light.background}>
              Los audífonos Sony WH-1000XM4 son líderes en noise cancelling en
              la industria.
            </ThemedText>
            <ButtonPrimary
              style={styles.moreButton}
              title={"Ver mas"}
            ></ButtonPrimary>
          </View>
          <Image
            source={require("@/assets/images/new-product.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </ThemedView>
      }
    >
      <ThemedText type="title">Nuestros Productos</ThemedText>
      <FlatList
        style={{ overflow: "visible" }}
        scrollEnabled={false}
        data={products}
        renderItem={({ item }) => renderProductItem(item,stores, onPressProduct)}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ height: 20 }} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  newsCard: {
    flexDirection: "row",
    height: "100%",
    marginTop: 24,
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    width: "60%",
    gap: 12,
    justifyContent: "center",
    flexDirection: "column",
  },
  cardImage: {
    width: "40%",
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
  },
  moreButton: {
    backgroundColor: Colors.light.text,
  },
  columnWrapper: {
    gap: 20,
    overflow: "visible",
    justifyContent: "center",
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
});
