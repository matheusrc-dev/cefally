import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // TODO: integrar Firebase auth().signInWithEmailAndPassword(email, password)
    console.log({ email, password });
  }

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

      <Link href="/register" asChild>
        <TouchableOpacity className="w-full rounded-md py-4 items-center bg-slate-300">
          <Text className="text-base font-semibold">
            Não possui conta? Clique aqui
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
