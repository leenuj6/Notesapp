import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username,
        password,
      });
  
      if (response.status === 200) {
        const { token } = response.data;
        await AsyncStorage.setItem('userToken', token);
        Alert.alert('Login successful');
        // Navigate to the next screen or home screen
      }
    } catch (error) {
      Alert.alert('Login failed', 'Invalid username or password');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.infoText}>Not a member? Register now!</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('Sign Up')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  infoText: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default LoginScreen;
