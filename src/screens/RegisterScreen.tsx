import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { storeCredentials } from '../services/auth';
import { saveDraft, loadDraft, clearDraft } from '../services/draftStorage';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
    },
  });

  // Load saved draft on mount
  useEffect(() => {
    const load = async () => {
      const draft = await loadDraft();
      if (!draft) return;

      Object.entries(draft).forEach(([key, value]) => {
        // @ts-expect-error – dynamic key assignment is safe
        setValue(key, value);
      });
    };

    load();
  }, [setValue]);

  // Save partial data while typing
  const saveField = (key: keyof RegisterForm, value: string) => {
    saveDraft({ [key]: value });
  };

  const onSubmit = async (data: RegisterForm) => {
    await storeCredentials(data);
    await clearDraft();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* First Name */}
      <Text style={styles.label}>FIRST NAME</Text>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={(v) => {
              field.onChange(v);
              saveField('firstName', v);
            }}
          />
        )}
      />
      {errors.firstName && (
        <Text style={styles.error}>{errors.firstName.message}</Text>
      )}

      {/* Last Name */}
      <Text style={styles.label}>LAST NAME</Text>
      <Controller
        name="lastName"
        control={control}
        rules={{ required: 'Last name is required' }}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={(v) => {
              field.onChange(v);
              saveField('lastName', v);
            }}
          />
        )}
      />
      {errors.lastName && (
        <Text style={styles.error}>{errors.lastName.message}</Text>
      )}

      {/* Phone */}
      <Text style={styles.label}>PHONE NUMBER</Text>
      <Controller
        name="phone"
        control={control}
        rules={{ required: 'Phone number is required' }}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={field.value}
            onChangeText={(v) => {
              field.onChange(v);
              saveField('phone', v);
            }}
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      {/* Email */}
      <Text style={styles.label}>EMAIL</Text>
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Email is required' }}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={(v) => {
              field.onChange(v);
              saveField('email', v);
            }}
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password */}
      <Text style={styles.label}>PASSWORD</Text>
      <Controller
        name="password"
        control={control}
        rules={{ required: 'Password is required' }}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            secureTextEntry
            value={field.value}
            onChangeText={(v) => field.onChange(v)}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  label: { marginTop: 10, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#c7f2ff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#90e6ff',
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 17,
    color: '#0077a8',
  },
  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#007aff',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
