import { useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import type { Episode } from "@/types/Episode";
import useCollection from "@/firebase/hooks/useCollection";
import useAuth from "@/firebase/hooks/useAuth";
import SelectionButton from "@/components/SelectionButton";
import DayPeriodSelector from "@/components/DayPeriodSelector";
import DateSelector from "@/components/DateSelector";
import { X } from "lucide-react-native";

const periods = ["Madrugada", "Manhã", "Tarde", "Noite"];
const painLocations = [
  "Lado esquerdo",
  "Lado direito",
  "Topo da cabeça",
  "Atrás da cabeça",
  "Cabeça Inteira",
];
const symptomsOptions = [
  "Náusea",
  "Sensibilidade à luz",
  "Sensibilidade ao som",
  "Tontura",
];
const triggersOptions = [
  "Desidratação",
  "Falta de sono",
  "Estresse",
  "Álcool",
  "Alimentação",
  "Mudança climática",
];

export default function newEpisode() {
  const { user } = useAuth();
  const router = useRouter();
  const { create, refreshData } = useCollection<Episode>("episodes");

  const [date, setDate] = useState(new Date());
  const [dayPeriod, setDayPeriod] = useState<string>("Manhã");
  const [intensity, setIntensity] = useState<number>(4);
  const [painLocation, setPainLocation] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [medication, setMedication] = useState<string>("");
  const [medicationOutcome, setMedicationOutcome] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const toggleSelection = (
    value: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleRegister = async () => {
    const newEpisode: Episode = {
      userId: user?.uid ?? "anonymous",
      timestamp: date.getTime(),
      dayPeriod,
      intensity,
      painLocation,
      symptoms,
      triggers,
      medication,
      medicationOutcome,
      notes,
    };

    try {
      await create(newEpisode);
      refreshData();
      Alert.alert("Sucesso", "Episódio registrado com sucesso!");
      router.back();
    } catch (error: any) {
      Alert.alert("Erro", error.toString());
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white px-5 pt-6"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="flex flex-row items-center justify-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-auto"
          >
            <X size={16} color="#141414" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold mr-auto">
            Novo episódio
          </Text>
        </View>

        <DateSelector
          date={date}
          onDateChange={setDate}
        />

        <DayPeriodSelector
          periods={periods}
          selectedPeriod={dayPeriod}
          onSelectPeriod={setDayPeriod}
        />

        <Text className="font-medium">
          Intensidade da dor: {intensity}
        </Text>
        <Slider
          value={intensity}
          onValueChange={setIntensity}
          minimumValue={0}
          maximumValue={10}
          step={1}
          minimumTrackTintColor="#141414"
          maximumTrackTintColor="#E0E3E2"
          thumbTintColor="#141414"
        />

        <Text className="font-medium my-4">Local da dor</Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {painLocations.map((location) => (
            <SelectionButton
              key={location}
              label={location}
              isSelected={painLocation.includes(location)}
              onPress={() => toggleSelection(location, painLocation, setPainLocation)}
            />
          ))}
        </View>

        <Text className="font-medium mb-4">Sintomas</Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {symptomsOptions.map((symptom) => (
            <SelectionButton
              key={symptom}
              label={symptom}
              isSelected={symptoms.includes(symptom)}
              onPress={() => toggleSelection(symptom, symptoms, setSymptoms)}
            />
          ))}
        </View>

        <Text className="font-medium mb-4">Gatilhos</Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {triggersOptions.map((trigger) => (
            <SelectionButton
              key={trigger}
              label={trigger}
              isSelected={triggers.includes(trigger)}
              onPress={() => toggleSelection(trigger, triggers, setTriggers)}
            />
          ))}
        </View>

        <Text className="font-medium mb-4">Medicação</Text>
        <TextInput
          className="bg-gray-100 rounded-lg p-3 mb-4"
          placeholder="Medicamento utilizado"
          value={medication}
          onChangeText={setMedication}
        />
        <TextInput
          className="bg-gray-100 rounded-lg p-3 mb-4"
          placeholder="Resultado, funcionou?"
          value={medicationOutcome}
          onChangeText={setMedicationOutcome}
        />
        <TextInput
          className="bg-gray-100 rounded-lg p-3 mb-6 h-28"
          placeholder="Notas adicionais"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <View className="flex-row justify-between mb-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-6 py-3 bg-gray-200 rounded-lg"
          >
            <Text className="text-black font-medium">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRegister}
            className="px-6 py-3 bg-[#2A667F] rounded-lg"
          >
            <Text className="text-white font-semibold">Registrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
