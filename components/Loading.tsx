import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" className="mt-3 text-cyan-800" />
    </View>
  );
};