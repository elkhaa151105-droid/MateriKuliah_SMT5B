
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Login</Text>
      <Text style={styles.title}>Nama: Khaerul Tamam</Text>
      <Text style={styles.title}>NIM: 2488010023</Text>

      <Button
        title="Belum punya akun? Daftar di sini"
        onPress={() => navigation.navigate('Signup')}
      />

      <View style={styles.buttonSpacing}>
        <Button
          title="Masuk ke Beranda"
          onPress={() => navigation.replace('MainTabs')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonSpacing: {
    marginTop: 20,
  },
});