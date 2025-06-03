import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import useAuth from "@/firebase/hooks/useAuth";

export default function home() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (error: any) {
      alert("Erro ao sair: " + error.message);
    }
  };
  return (
    <View>
      <Text>home</Text>
      <TouchableOpacity
        className="rounded-md py-4 items-center mb-6 bg-cyan-800"
        onPress={handleLogout}
      >
        <Text className="font-semibold text-white">Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
