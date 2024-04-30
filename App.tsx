import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

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
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button title='Click me' onPress={checkApi} />
        <StatusBar style="auto" />
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          keyExtractor={item => item.id}
        />
      </View>
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
