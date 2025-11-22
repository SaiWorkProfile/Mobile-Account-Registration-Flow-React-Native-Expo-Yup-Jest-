import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loadCredentials, clearCredentials } from '../services/auth';
import { User } from '../types/User';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const creds = await loadCredentials();
      setUser(creds);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await clearCredentials();
    navigation.replace('Login'); // ✅ now works
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.value}>{user.firstName}</Text>

        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.value}>{user.lastName}</Text>

        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{user.phone}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 30,
  },
  label: { fontSize: 14, color: '#666', marginTop: 10 },
  value: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  button: {
    backgroundColor: '#ffdddd',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffbbbb',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#b30000',
  },
  loadingText: { fontSize: 18, textAlign: 'center', marginTop: 50 },
});
