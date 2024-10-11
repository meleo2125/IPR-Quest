import React from 'react';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Import useRouter for navigation

const HomeScreen = () => {
  const router = useRouter(); // Initialize the router

  const handleButtonPress = (buttonName: string) => {
    Alert.alert(`You pressed ${buttonName}`);
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/bg.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {/* Logo */}
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/chapters')}>
          <Text style={styles.buttonText}>Chapters</Text>
        </TouchableOpacity>
        {/* Updated Link for Tips */}
        <Link href="/tips" style={styles.button}>
          <Text style={styles.buttonText}>Get Tips</Text>
        </Link>
      </View>
    </ImageBackground>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 130,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fbeee0',
    borderColor: '#422800',
    borderWidth: 2,
    borderRadius: 30,
    elevation: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginVertical: 5,
    width: '70%',
    alignItems: 'center',
    fontFamily: 'Rimouski-SB',
  },
  buttonText: {
    color: '#422800',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Rimouski-SB',
  },
});

export default HomeScreen;
