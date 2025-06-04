import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface DayPeriodSelectorProps {
  periods: string[];
  selectedPeriod: string;
  onSelectPeriod: (period: string) => void;
}

export default function DayPeriodSelector({ 
  periods, 
  selectedPeriod, 
  onSelectPeriod 
}: DayPeriodSelectorProps) {
  return (
    <View>
      <View className="flex flex-row items-center gap-2 mb-4">
        <View className="bg-gray-100 p-2 rounded-lg">
          <Feather name="sun" color="#70787A" size={20} />
        </View>
        <Text className="font-medium">Período do dia</Text>
      </View>

      <View className="flex flex-row flex-wrap gap-2 mb-6">
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            className={`px-4 py-4 w-44 rounded-lg border ${
              selectedPeriod === period ? "border-black" : "border-gray-300"
            }`}
            onPress={() => onSelectPeriod(period)}
          >
            <Text>{period}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
