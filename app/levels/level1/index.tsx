import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const Level1Screen = () => {
  const [step, setStep] = useState(0);

  // Dialogue steps to guide the user
  const dialogues = [
    "Hey there, inventor! I'm your guide through the world of patents. Ever thought about what happens when someone comes up with a cool idea or invention?",
    "Well, that's where patents come in! A patent is like a shield that protects your invention so others can't use it without your permission.",
    "You might be thinking, 'Is everything patentable?'. The short answer: Nope! Some things are too common or naturally occurring to patent. Let’s play a game to figure it out!"
  ];

  // Game items for "Patentable or Not"
  const gameItems = [
    { item: 'A new type of smartphone', patentable: true },
    { item: 'A naturally growing plant', patentable: false },
    { item: 'A new software algorithm', patentable: true },
    { item: 'A mathematical formula', patentable: false },
    { item: 'A genetically modified organism', patentable: true }
  ];

  // Game state to check answers
  const [currentItem, setCurrentItem] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const handleNextDialogue = () => {
    if (step < dialogues.length - 1) {
      setStep(step + 1);
    } else {
      // Start the game
      setIsGameActive(true);
    }
  };

  const handleSwipe = (patentable: boolean) => {
    const current = gameItems[currentItem];
    if (patentable === current.patentable) {
      Alert.alert("Correct!", `${current.item} is ${patentable ? 'patentable' : 'not patentable'}.`);
    } else {
      Alert.alert("Oops!", `Actually, ${current.item} is ${current.patentable ? 'patentable' : 'not patentable'}.`);
    }
    
    if (currentItem < gameItems.length - 1) {
      setCurrentItem(currentItem + 1);
    } else {
      Alert.alert("Game Over!", "You've completed this level. Well done!");
      setIsGameActive(false);
      setCurrentItem(0); // Reset game for replay
    }
  };

  return (
    // <ImageBackground
    //   source={require('../../../assets/images/bg.png')}
    //   style={styles.background}
    // >
      <View style={styles.container}>
        {/* Patent Introduction Dialogue */}
        {!isGameActive && (
          <View>
            <Text style={styles.narratorText}>Narrator:</Text>
            <Text style={styles.dialogueText}>{dialogues[step]}</Text>

            <TouchableOpacity style={styles.nextButton} onPress={handleNextDialogue}>
              <Text style={styles.nextButtonText}>{step < dialogues.length - 1 ? "Next" : "Start Game"}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Patentable or Not Mini-game */}
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
    // </ImageBackground>
  );
};

export default Level1Screen;

// Styles
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
    paddingHorizontal: 20,
  },
  narratorText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    
    marginBottom: 10,
  },
  dialogueText: {
    fontSize: 18,
    color: '#fbeee0',
    textAlign: 'center',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#422800',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fbeee0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbeee0',
    marginBottom: 20,
  },
  gameItemText: {
    fontSize: 20,
    color: '#fbeee0',
    textAlign: 'center',
    marginBottom: 20,
  },
  swipeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  swipeButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  swipeLeft: {
    backgroundColor: '#e74c3c',
  },
  swipeRight: {
    backgroundColor: '#2ecc71',
  },
  swipeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
