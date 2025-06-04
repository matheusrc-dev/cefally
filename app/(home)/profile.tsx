import useAuth from "@/firebase/hooks/useAuth";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function profile() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <View className="flex-1 px-4 py-6 bg-white">
      <Text className="text-3xl font-bold mb-4 text-center">Perfil</Text>

      <TouchableOpacity
        className="w-full rounded-md py-4 items-center bg-slate-300 text-center"
        onPress={handleLogout}
      >
        <Text className="text-base font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
