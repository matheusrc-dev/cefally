import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import useAuth from "@/firebase/hooks/useAuth";
import Loading from "@/components/Loading";

export default function Login() {
  const { user, login, loading } = useAuth();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/(home)/home");
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log("User logged in:", user);
      router.replace("/(home)/home");
    } catch (error: any) {
      Alert.alert("Login error:", error.toString());
    }
  };

  if (loading) return <Loading />;

  return (
    <View className="flex-1 justify-center px-8 bg-white">
      <Text className="text-3xl font-bold mb-10 text-center">Bem vindo!</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full rounded-md p-4 mb-4 text-base bg-slate-100"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        className="w-full rounded-md p-4 mb-4 text-base bg-slate-100"
        value={password}
        onChangeText={setPassword}
      />

      {/* <TouchableOpacity className="mb-6">
        <Text className="text-sm underline">Esqueci minha senha</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        className="w-full rounded-md py-4 items-center mb-6 bg-cyan-800"
        onPress={handleLogin}
      >
        <Text className="font-semibold text-white">Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="w-full rounded-md py-4 items-center bg-slate-300 text-center"
        onPress={() => router.push("/register")}
      >
        <Text className="text-base font-semibold">
          Não possui conta? Clique aqui
        </Text>
      </TouchableOpacity>
    </View>
  );
}
