import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface SelectionButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function SelectionButton({ label, isSelected, onPress }: SelectionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-lg ${
        isSelected ? "bg-gray-300" : "bg-gray-100"
      }`}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
