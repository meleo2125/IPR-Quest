import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const ChaptersScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapters</Text>

      {/* Chapter Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('./patent')}>
        <Text style={styles.buttonText}>Patent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('./chapters/copyright')}>
        <Text style={styles.buttonText}>Copyright</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('./chapters/trademark')}>
        <Text style={styles.buttonText}>Trademark</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('./chapters/design-right')}>
        <Text style={styles.buttonText}>Design Right</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fbeee0',
    borderColor: '#422800',
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#422800',
    fontSize: 18,
  },
});

export default ChaptersScreen;
