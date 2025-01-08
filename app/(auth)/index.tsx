import { StyleSheet, Image, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import Input from "@/components/Input";
import ButtonPrimary from "@/components/ButtonPrimary";
import { Link, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authUserSlice";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      dispatch(setUser({uid: "121", firstName: "Joshua"}));
      router.push("/app");
    } catch (err) {
      setIsLoading(false);
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} />
      <ThemedText type="title" color={Colors.light.tint}>
        Tec-e-Ecommerce
      </ThemedText>
      <ThemedText type="subtitle">Iniciar sesión</ThemedText>

      <Input
        value={email}
        onChangeText={(value) => handleChange("email", value)}
        style={styles.input}
        label={"Email"}
        placeholder={"joshipariona24@gmail.com"}
      />

      <Input
        value={password}
        onChangeText={(value) => handleChange("password", value)}
        style={styles.input}
        label={"Contraseña"}
        placeholder={"***************"}
        secureTextEntry
      />

      {error && <ThemedText color={Colors.light.text}>{error}</ThemedText>}

      <ButtonPrimary
        style={styles.submit}
        title={"Iniciar sesión"}
        onPress={onSubmit}
        disabled={isLoading}
      />

      {isLoading && <ThemedText>Cargando...</ThemedText>}

      <ThemedView style={styles.footer}>
        <ThemedText color={Colors.light.mutedText}>
          ¿No tienes una cuenta?
        </ThemedText>
        <Link href={"/register"}>
          <ThemedText>Registrate</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  footer: {
    flexDirection: "row",
    gap: 20,
  },
  input: {
    width: "80%",
  },
  submit: {
    width: "80%",
  },
});
