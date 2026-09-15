import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>CURRICULUM VITAE</Text>

      <Text style={styles.greeting}>
        Assalamu'alaikum
      </Text>

      <View style={styles.data}>
        <Text style={styles.text}>
          Nama: Khaerul Tamam
        </Text>

        <Text style={styles.text}>
          NIM: 2488010023
        </Text>

        <Text style={styles.text}>
          Asal Sekolah: SMK-TI Intisabi Sumedang
        </Text>

        <Text style={styles.text}>
          Cita-cita: Businessman / Pengusaha
        </Text>
      </View>

      <Text style={styles.subtitle}>
        Rencana Menggapai Cita-cita
      </Text>

      <Text style={styles.plan}>
        1. Mempelajari ilmu bisnis dan kewirausahaan.
      </Text>

      <Text style={styles.plan}>
        2. Meningkatkan kemampuan komunikasi dan kepemimpinan.
      </Text>

      <Text style={styles.plan}>
        3. Memulai usaha kecil untuk mendapatkan pengalaman.
      </Text>

      <Text style={styles.plan}>
        4. Membangun relasi dan memperluas jaringan bisnis.
      </Text>

      <Text style={styles.plan}>
        5. Terus belajar dan mengembangkan kemampuan diri.
      </Text>

      <Text style={styles.plan}>
        6. Mengembangkan usaha secara konsisten hingga menjadi
        pengusaha yang sukses.
      </Text>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  data: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
  },

  plan: {
    fontSize: 15,
    marginBottom: 7,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
});