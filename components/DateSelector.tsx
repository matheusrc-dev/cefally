import { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { DateTime } from "luxon";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface DateSelectorProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export default function DateSelector({ date, onDateChange }: DateSelectorProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View>
      <Text className="font-medium mb-3">Data</Text>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="bg-gray-100 rounded-lg p-3 mb-6"
      >
        <Text className="text-gray-500">
          {DateTime.fromJSDate(date).toFormat("dd/LL/yyyy")}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
} 