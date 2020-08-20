import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

enum State {
  idle = 'idle',
  running = 'running',
}

type Benchmark = {
  size: number;
  title: string;
}

const benchmarks: Benchmark[] = [
  { size: 100000, title: '100.000' },
  { size: 1000000, title: '1.000.000' },
  { size: 10000000, title: '10.000.000' },
  { size: 100000000, title: '100.000.000' },
];

export default function App() {
  const [status, setStatus] = useState(State.idle);
  const [result, setResult] = useState<{ benchmark: Benchmark, duration: number }>();

  const runBenchmark = useCallback((benchmark: Benchmark) => {
    setResult(undefined);
    setStatus(State.running);

    const startedAt = new Date();
    const list = generateDataList(benchmark.size);
    const endedAt = new Date();

    setStatus(State.idle);
    setResult({ benchmark, duration: endedAt.getTime() - startedAt.getTime() });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.benchmark}>
        <Text style={styles.title}>Last benchmark:</Text>
        <Text>Size: {result?.benchmark.title}</Text>
        <Text>Duration (ms): {result?.duration}</Text>
      </View>
      <View>
        {benchmarks.map(benchmark => (
          <View style={styles.button} key={benchmark.title}>
            <Button
              title={`Generate ${benchmark.title} items`}
              onPress={() => runBenchmark(benchmark)}
              disabled={status !== State.idle}
            />
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  benchmark: {
    margin: 24,
  },
  button: {
    margin: 12,
  },
});

const DATA = {
  a: 'alpha',
  b: 'beta',
  g: 'gamma',
  d: 'delta',
};

function generateDataList(size = 10000) {
  const keys = Object.keys(DATA) as (keyof typeof DATA)[];
  const keysLength = keys.length;

  return new Array(size).fill(null).map((value, index) => DATA[keys[index % keysLength]]);
}
