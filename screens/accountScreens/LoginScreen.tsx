import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import OTPVerificationScreen from './OTPVerificationScreen';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const handleSendOTP = () => {
    // Handle OTP sending logic here
    console.log('Sending OTP to:', email);
    setShowOtpScreen(true);
  };

  useEffect(() => {
    // Try loading a GIF and log result
    const gifTest = require('../assets/login.gif');
    console.log('Trying to load GIF:', gifTest);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Check with a remote URL for GIF */}
        <Image
          source={require('../assets/login.gif')} // Test with a known valid local GIF
          style={[styles.animation, { borderWidth: 1, borderColor: 'red' }]} // Added border for debugging
          resizeMode="contain" // Ensure GIF fits well within the container
          onLoad={() => setImageLoaded(true)} // Mark image as loaded
          onError={() => console.log('Error loading image.')} // Log any errors
        />
        
        {!imageLoaded && (
          <Text style={styles.errorText}>GIF is not loading. Check the file path and integrity.</Text>
        )}

        <Text style={styles.title}>Welcome!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.asterisk}>*</Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleSendOTP}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>

      <OTPVerificationScreen
        isVisible={showOtpScreen}
        onClose={() => setShowOtpScreen(false)}
        email={email}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    padding: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center', // Ensure content is centered properly
  },
  animation: {
    width: 250, // Adjust size of GIF
    height: 250, // Adjust size of GIF
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#00FF00', // Debugging border
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  asterisk: {
    color: '#E4002B',
    fontSize: 20,
    marginLeft: 8,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#E4002B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;

