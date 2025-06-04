import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Brain, RefreshCcw } from 'lucide-react-native';
import type { Episode } from '@/types/Episode';
import { DateTime } from 'luxon';
import useCollection from '@/firebase/hooks/useCollection';
import Loading from '@/components/Loading';
import useAuth from '@/firebase/hooks/useAuth';

export default function History() {
  const { user } = useAuth();
  const { data, loading, refreshData } = useCollection<Episode>('episodes');
  
  if (loading && user) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-white px-4">
      <View>
        <Text className="text-3xl font-bold text-center text-[#141414] my-6">
          Histórico de Crises
        </Text>
        <TouchableOpacity
          className="absolute right-4 top-6"
          onPress={refreshData}
        >
          <RefreshCcw size={24} color="#141414" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data.filter((item) => item.userId === user?.uid)}
        keyExtractor={(item) => item.id ?? item.timestamp.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => {
          const dateFormatted = DateTime.fromMillis(item.timestamp).toFormat('dd/MM/yyyy');

          const summary =
            item.symptoms.length > 0
              ? `Sintomas: ${item.symptoms.join(', ')}`
              : `Gatilhos: ${item.triggers.join(', ')}`;

          return (
            <View className="flex-row items-center mb-4 rounded-xl p-4">
              <View className="p-2 bg-slate-100 rounded-lg mr-3 mt-1">
                <Brain size={24} color="#141414" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-[#141414]">
                  {dateFormatted} - {item.dayPeriod}
                </Text>
                <Text className="text-sm text-gray-500">
                  Intensidade: {item.intensity}/10
                </Text>
                <Text className="text-sm text-gray-600 mt-1">{summary}</Text>
                {item.painLocation.length > 0 && (
                  <Text className="text-sm text-gray-600 mt-1">
                    Local da dor: {item.painLocation.join(', ')}
                  </Text>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
