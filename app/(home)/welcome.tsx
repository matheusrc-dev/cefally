import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import useAuth from "@/firebase/hooks/useAuth";

export default function welcome() {
  const { user } = useAuth();

  function handleNewEpisode() {
    router.push("/home");
  }

  return (
    <View className="flex-1 items-center justify-center px-8 bg-white">
      <Text className="text-9xl py-4 mb-6">👋</Text>

      <Text className="text-3xl font-bold mb-4">Olá, {user?.displayName}!</Text>

      <Text className="text-center text-base mb-6">
        Parabéns! você já sabe como é importante manter um registro das crises e estamos aqui para te ajudar.
      </Text>

      <Text className="text-center font-semibold mb-4">
        Clique abaixo para registrar um episódio 👇
      </Text>

      <TouchableOpacity
        onPress={handleNewEpisode}
        className="w-full bg-cyan-800 rounded-md py-3 items-center"
      >
        <Text className="text-base font-semibold text-white">
          Registrar novo episódio
        </Text>
      </TouchableOpacity>
    </View>
  );
}
