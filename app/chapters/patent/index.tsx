import React from 'react';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const PatentScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>Patent Levels</Text>

      {/* Level Buttons */}
      {[1, 2, 3, 4, 5].map((level) => (
        <TouchableOpacity
          key={level}
          style={styles.button}
          onPress={() => router.push(`../../levels/level1`)}
        >
          <Text style={styles.buttonText}>Level {level}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fbeee0',
    borderColor: '#422800',
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 7,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    color: '#422800',
    fontSize: 18,
  },
});

export default PatentScreen;
