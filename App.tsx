import { TamaguiProvider, createTamagui } from '@tamagui/core';
import '@tamagui/core/reset.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'tamagui'

import { config } from '@tamagui/config/v3'

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

const queryClient = new QueryClient()

export default function App() {
  const [data, setData] = useState([])

  const checkApi = async () => {
    const res = await fetch('https://next.api.whathebyte.com/posts')
    if (!res.ok) {
      throw new Error("Gabisa pak")
    }

    const dd = await res.json()
    setData(() => dd.data)
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <Button onPress={checkApi}>Check</Button>
          <StatusBar style="auto" />
          <FlatList
            data={data}
            renderItem={({ item }) => <Text>{item.title}</Text>}
            keyExtractor={item => item.id}
          />
        </View>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
