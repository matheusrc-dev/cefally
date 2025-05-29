import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";

export default function register() {
  const router = useRouter();
  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");

  function handleSignUp() {
    // TODO: validar senhas e chamar createUserWithEmailAndPassword
    console.log({ name, email, password, confirm });
  }

  return (
    <View className="flex-1 justify-center px-8 bg-white">
      <Text className="text-3xl font-bold mb-10 text-center">
        Crie sua conta
      </Text>

      <TextInput
        placeholder="Nome completo"
        className="w-full rounded-md p-4 mb-4 text-base bg-slate-100"
        value={name}
        onChangeText={setName}
      />

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

      <TextInput
        placeholder="Confirmar senha"
        secureTextEntry
        className="w-full rounded-md p-4 mb-6 text-base bg-slate-100"
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity
        className="w-full rounded-md py-4 items-center mb-6 bg-cyan-800"
        onPress={handleSignUp}
      >
        <Text className="text-base font-semibold text-white">Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="w-full rounded-md py-4 items-center bg-slate-300"
        onPress={() => router.back()}
      >
        <Text className="text-base font-semibold">
          Já possui uma conta? Faça login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
