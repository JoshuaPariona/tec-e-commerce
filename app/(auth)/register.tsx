import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Input from "@/components/Input";
import ButtonPrimary from "@/components/ButtonPrimary";
import DropdownPicker from "@/components/Dropdown";
import { usePostNewUserMutation } from "@/store/api/AuthApiSlice";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const [createUser, { isLoading, isSuccess, error }] =
    usePostNewUserMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  const handleSubmit = async () => {
    try {
      if (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.password &&
        formData.role
      ) {
        await createUser(formData);
      }
    } catch (err) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Registrarse</ThemedText>

      <Input
        value={formData.firstName}
        onChangeText={(value) => handleChange("firstName", value)}
        style={styles.input}
        label={"Nombres"}
      />

      <Input
        value={formData.lastName}
        onChangeText={(value) => handleChange("lastName", value)}
        style={styles.input}
        label={"Apellidos"}
      />

      <Input
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        style={styles.input}
        label={"Email"}
        placeholder={"ejemplo@gmail.com"}
      />

      <Input
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
        style={styles.input}
        label={"Contraseña"}
        placeholder={"***************"}
        secureTextEntry
      />

      <DropdownPicker
        value={formData.role}
        onChange={(item) => handleChange("role", item)}
        style={styles.input}
        items={[
          { label: "Usuario", value: "user" },
          { label: "Administrador", value: "admin" },
        ]}
      />

      <ButtonPrimary
        style={styles.submit}
        title={"Registrarse"}
        onPress={handleSubmit}
        disabled={isLoading}
      />

      {isLoading && <ThemedText>Cargando...</ThemedText>}
      {isSuccess && <ThemedText>¡Registro exitoso!</ThemedText>}
      {error && <ThemedText>Error: {error.toString()}</ThemedText>}
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
