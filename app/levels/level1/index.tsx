import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import * as Speech from 'expo-speech';

const Level1Screen = () => {
  const [step, setStep] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  const dialogues = [
    "Welcome to the world of patents! I'm your guide, here to help you understand how patents work.",
    "A patent is a special right granted to inventors for their new and innovative ideas. Think of it as a shield that protects your invention so others can't use it without your permission.",
    "Patents encourage innovation by allowing inventors to benefit from their work. Without patents, anyone could take your invention and make it their own!",
    "But remember, not everything can be patented. Some things are too common or naturally occurring to be eligible for a patent.",
    "Now, let’s dive into the game to see what kinds of inventions are patentable and what aren’t!"
  ];

  const gameItems = [
    { item: 'A new type of smartphone', patentable: true },
    { item: 'A naturally growing plant', patentable: false },
    { item: 'A new software algorithm', patentable: true },
    { item: 'A mathematical formula', patentable: false },
    { item: 'A genetically modified organism', patentable: true }
  ];

  useEffect(() => {
    if (step < dialogues.length) {
      Speech.speak(dialogues[step]);
    }
  }, [step]);

  const handleNextDialogue = () => {
    if (step < dialogues.length - 1) {
      setStep(step + 1);
    } else {
      setIsGameActive(true);
    }
  };

  const handleSwipe = (patentable) => {
    const current = gameItems[currentItem];
    if (patentable === current.patentable) {
      Alert.alert("Correct!", `${current.item} is ${patentable ? 'patentable' : 'not patentable'}.`);
    } else {
      Alert.alert("Oops!", `Actually, ${current.item} is ${current.patentable ? 'patentable' : 'not patentable'}.`);
    }

    if (currentItem < gameItems.length - 1) {
      setCurrentItem(currentItem + 1);
    } else {
      setIsGameActive(false);
      setCurrentItem(0);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/level1.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <StatusBar hidden={true} />

        {!isGameActive && (
          <View style={styles.dialogueBox}>
            <Text style={styles.dialogueText}>{dialogues[step]}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextDialogue}>
              <Text style={styles.nextButtonText}>{step < dialogues.length - 1 ? "Next" : "Start Game"}</Text>
            </TouchableOpacity>
          </View>
        )}

        {isGameActive && (
          <View>
            <Text style={styles.title}>Is it Patentable?</Text>
            <Text style={styles.gameItemText}>{gameItems[currentItem].item}</Text>

            <View style={styles.swipeContainer}>
              <TouchableOpacity
                style={[styles.swipeButton, styles.swipeLeft]}
                onPress={() => handleSwipe(false)}
              >
                <Text style={styles.swipeButtonText}>Not Patentable</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.swipeButton, styles.swipeRight]}
                onPress={() => handleSwipe(true)}
              >
                <Text style={styles.swipeButtonText}>Patentable</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Level1Screen;

// Styles (same as before)
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dialogueText: {
    top: 0,
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 0,
    lineHeight: 25,
    width: 300
  },
  nextButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    top:-30,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  gameItemText: {
    top:-30,
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  swipeContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  swipeButton: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  swipeLeft: {
    backgroundColor: '#e74c3c',
  },
  swipeRight: {
    backgroundColor: '#2ecc71',
  },
  swipeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dialogueBox: {
    top: -30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
