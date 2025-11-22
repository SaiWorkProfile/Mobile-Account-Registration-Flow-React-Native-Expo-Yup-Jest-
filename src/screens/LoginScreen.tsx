import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loadCredentials } from '../services/auth';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const creds = await loadCredentials();

    if (!creds) {
      setError('No account found. Please register.');
      return;
    }

    if (email !== creds.email || password !== creds.password) {
      setError('Invalid email or password');
      return;
    }

    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Sign In</Text>

      <Text style={styles.label}>EMAIL ADDRESS</Text>
      <TextInput
        style={styles.input}
        placeholder="enter email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>PASSWORD</Text>
      <TextInput
        style={styles.input}
        placeholder="enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>No Account? Register here</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#f7f7f7' },
  title: { fontSize: 22, marginBottom: 20, fontWeight: '600' },
  label: { marginTop: 12, fontSize: 14, fontWeight: '600', color: '#555' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 35,
    backgroundColor: '#c7f2ff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#90e6ff',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 17,
    color: '#0077a8',
  },
  link: { marginTop: 10, fontSize: 13, color: '#007aff' },
  error: { color: 'red', marginTop: 8 },
});
