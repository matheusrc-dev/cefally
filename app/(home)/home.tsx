import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useAuth from "@/firebase/hooks/useAuth";
import { useRouter } from "expo-router";

export default function home() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const firstName = user?.displayName?.split(" ")[0] || "tudo bem?";

  const handleLogout = () => {
    logout().then(() => {
      router.push("/");
    }).catch((error) => {
      console.error("Logout failed:", error);
    });
  };

  return (
    <View className="flex-1 px-4 py-6 bg-white">
      <Text className="text-3xl font-bold mb-4">Olá, {firstName}!</Text>

      <TouchableOpacity
        className="w-full rounded-md py-4 items-center mb-6 bg-cyan-800"
        onPress={() => router.push("/(home)/newEpisode")}
      >
        <Text className="font-semibold text-white">Registrar novo episódio</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="w-full rounded-md py-4 items-center bg-slate-300 text-center"
        onPress={handleLogout}
      >
        <Text className="text-base font-semibold">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
