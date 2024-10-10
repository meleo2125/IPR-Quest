import React, { useState } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Picker } from '@react-native-picker/picker';


const TipsScreen = () => {
  const [idea, setIdea] = useState('');
  const [field, setField] = useState('');
  const [implementation, setImplementation] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [marketPotential, setMarketPotential] = useState('');
  const [innovationLevel, setInnovationLevel] = useState('');
  const [durationOfProtection, setDurationOfProtection] = useState('');
  const [typeOfContent, setTypeOfContent] = useState('');
  const [publicAvailability, setPublicAvailability] = useState('');
  const [collaboration, setCollaboration] = useState('');
  const [geographicScope, setGeographicScope] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!idea || !field || !implementation || !targetAudience || !marketPotential || !innovationLevel || !durationOfProtection || !typeOfContent || !publicAvailability || !collaboration || !geographicScope) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const apiKey = 'AIzaSyCxCKEhGyjFr1F8rwk0uC9V9x8Fcvtl4rk'; // Replace with your API key
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Given the idea: "${idea}", in the field of "${field}", with implementation: "${implementation}", targeting the audience: "${targetAudience}", and considering market potential: "${marketPotential}", innovation level: "${innovationLevel}", protection duration: "${durationOfProtection}", content type: "${typeOfContent}", public availability: "${publicAvailability}", collaboration mode: "${collaboration}", and geographic scope: "${geographicScope}", recommend the most suitable IPR (Patent, Copyright, Design Right, Trademark) and provide a brief rationale (max 7-8 lines).`;

    try {
        const result = await model.generateContent(prompt);
        const cleanResponse = result.response.text().replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markdown
        setResponse(cleanResponse); // Set the cleaned response
      } catch (error) {
        console.error('Error fetching data from Gemini API:', error);
        Alert.alert('Error', 'Failed to fetch response. Please try again later.');
      }
  };

  return (
    <View style={styles.container}>
    <StatusBar hidden={true} />
      <Text style={styles.title} >Get Tips on IPR</Text>
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your idea"
          value={idea}
          onChangeText={setIdea}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter the field of your idea"
          value={field}
          onChangeText={setField}
        />

        <TextInput
          style={styles.input}
          placeholder="Describe the implementation"
          value={implementation}
          onChangeText={setImplementation}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Target audience"
          value={targetAudience}
          onChangeText={setTargetAudience}
        />

        <TextInput
          style={styles.input}
          placeholder="Market potential"
          value={marketPotential}
          onChangeText={setMarketPotential}
        />

        <TextInput
          style={styles.input}
          placeholder="Innovation level"
          value={innovationLevel}
          onChangeText={setInnovationLevel}
        />

        <Picker 
          selectedValue={durationOfProtection}
          style={styles.picker}
          onValueChange={(itemValue) => setDurationOfProtection(itemValue)}>
          <Picker.Item label="Duration of Protection" value="" />
          <Picker.Item label="Short-term" value="Short-term" />
          <Picker.Item label="Long-term" value="Long-term" />
        </Picker>

        <Picker
          selectedValue={typeOfContent}
          style={styles.picker}
          onValueChange={(itemValue) => setTypeOfContent(itemValue)}>
          <Picker.Item label="Type of Content" value="" />
          <Picker.Item label="Literary Work" value="Literary Work" />
          <Picker.Item label="Music" value="Music" />
          <Picker.Item label="Software" value="Software" />
          <Picker.Item label="Invention" value="Invention" />
        </Picker>

        <Picker
          selectedValue={publicAvailability}
          style={styles.picker}
          onValueChange={(itemValue) => setPublicAvailability(itemValue)}>
          <Picker.Item label="Public Availability" value="" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Confidential" value="Confidential" />
        </Picker>

        <Picker
          selectedValue={collaboration}
          style={styles.picker}
          onValueChange={(itemValue) => setCollaboration(itemValue)}>
          <Picker.Item label="Collaboration" value="" />
          <Picker.Item label="Solo" value="Solo" />
          <Picker.Item label="Team" value="Team" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Geographic scope (e.g., country or region)"
          value={geographicScope}
          onChangeText={setGeographicScope}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Get Recommendations</Text>
        </TouchableOpacity>

        {response ? (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#e0f7fa', // Light cyan background
    },
    scrollContainer: {
      width: '100%',
    },
    title: {
      fontSize: 28,
      marginBottom: 20,
      fontFamily: 'Rimouski-SB',
      color: '#00796b', // Teal color for title
      textAlign: 'center',
      textShadowColor: '#000',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
    },
    input: {
      height: 60,
      borderColor: '#00695c', // Darker teal for borders
      borderWidth: 2,
      borderRadius: 15,
      padding: 15,
      width: '100%',
      marginBottom: 20,
      fontFamily: 'Rimouski-SB',
      backgroundColor: '#ffffff', // White background for input fields
      elevation: 5, // Add shadow
    },
    picker: {
      height: 60,
      borderColor: '#00695c',
      borderWidth: 2,
      borderRadius: 15,
      width: '100%',
      marginBottom: 20,
      fontFamily: 'Rimouski-SB',
      backgroundColor: '#ffffff',
      elevation: 5,
    },
    button: {
      backgroundColor: '#ffab00', // Bright yellow-orange for buttons
      borderColor: '#ff8f00', // Slightly darker for border
      borderWidth: 2,
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignItems: 'center',
      elevation: 10,
      marginVertical: 10, // Add margin for spacing
    },
    buttonText: {
      color: '#ffffff', // White text for buttons
      fontSize: 18,
      fontWeight: '700',
      fontFamily: 'Rimouski-SB',
    },
    responseContainer: {
      marginTop: 20,
      padding: 15,
      borderColor: '#00796b',
      borderWidth: 2,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      width: '100%',
    },
    responseText: {
      fontSize: 16,
      color: '#00796b',
      fontFamily: 'Rimouski-SB',
    },
  });
  

export default TipsScreen;
