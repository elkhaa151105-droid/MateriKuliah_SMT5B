import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';

// ============================================
// PALET WARNA
// ============================================
const COLORS = {
  primary: '#1E293B',
  accent: '#10B981',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  subtext: '#64748B',
  border: '#E2E8F0',
};

// ============================================
// DATA PROFIL
// ============================================
const Profile = {
  name: 'Khaerul Tamam',
  role: 'Businessman',
  email: 'khaerultamam@mail.uinssc.ac.id',
  phone: '081222030012',
  location: 'Jatiserang, Panyingkiran, Majalengka',

  bio: 'Saya adalah seorang mahasiswa yang memiliki semangat untuk terus belajar dan mengembangkan diri. Saya memiliki cita-cita menjadi seorang businessman yang sukses dengan membangun usaha sendiri, menciptakan peluang, dan memberikan manfaat bagi orang lain. Untuk mencapai cita-cita tersebut, saya berusaha meningkatkan kemampuan dalam bidang bisnis, teknologi, komunikasi, dan kepemimpinan.',

  avatar: require('./assets/profile.jpeg'),

  isAvailable: true,
};

// ============================================
// DATA SKILLS
// ============================================
const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript', level: 88, color: '#F7DF1E' },
  { id: '4', name: 'TypeScript', level: 80, color: '#3178C6' },
  { id: '5', name: 'Node.js', level: 70, color: '#339933' },
  { id: '6', name: 'Firebase', level: 82, color: '#FFCA28' },
];

// ============================================
// DATA PENGALAMAN & PENDIDIKAN
// ============================================
const SECTIONS = [
  {
    title: '💼 Pengalaman Kerja',
    data: [
      {
        id: 'e1',
        role: 'Training Instructor Assistant',
        company: 'BLKK Ulul Albaab',
        period: '2022 - 2024',
        desc: 'Membantu instruktur dalam memfasilitasi pelatihan, menyusun materi, dan membimbing peserta.',
      },
      {
        id: 'e2',
        role: 'Admin Sekolah',
        company: 'SMP-IT Ulul Albaab',
        period: '2023 - 2024',
        desc: 'Mengelola administrasi sekolah, termasuk pendataan siswa, surat-menyurat, dan dokumentasi kegiatan sekolah.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - 2029',
        desc: 'IPK 3.65',
      },
      {
        id: 'd2',
        role: 'SMK Teknik Informatika',
        company: 'SMK-TI Intisabi Sumedang',
        period: '2021 - 2024',
        desc: 'Menempuh pendidikan jurusan Teknik Informatika.',
      },
    ],
  },
];

// ============================================
// DATA SOSIAL MEDIA
// ============================================
const SOCIAL = [
  { id: 's1', label: 'GitHub', icon: '🐙', url: 'github.com/elkhaa151105-droid' },
  { id: 's2', label: 'Instagram', icon: '💼', url: 'https://www.instagram.com/khayyy_am?stkn=MTF3bWRoajZ0MXVrYg==' },
  { id: 's3', label: 'E-mail', icon: '🌐', url: 'tamamsantuy15@gmail.com' },
];

// ============================================
// KOMPONEN SKILL CARD
// ============================================
const SkillCard = ({ item }) => {
  return (
    <View style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{item.name}</Text>
        <Text style={styles.skillPercent}>{item.level}%</Text>
      </View>

      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            { width: `${item.level}%`, backgroundColor: item.color },
          ]}
        />
      </View>
    </View>
  );
};

// ============================================
// KOMPONEN TIMELINE CARD
// ============================================
const TimelineCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.timelineCard}
      onPress={() => onPress(item)}
      activeOpacity={0.75}
    >
      <View style={styles.timelineDot} />

      <View style={styles.timelineContent}>
        <Text style={styles.timelineRole}>{item.role}</Text>
        <Text style={styles.timelineCompany}>{item.company}</Text>
        <Text style={styles.timelinePeriod}>{item.period}</Text>
        <Text style={styles.timelineHint}>Ketuk untuk detail →</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function App() {
  // -- STATE ----------------------------------------------------
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [pressing, setPressing] = useState(false);

  // State Tab Navigasi Sederhana
  const [activeTab, setActiveTab] = useState('Info');

  // Animasi Avatar
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.08, duration: 1200, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: "", message: "" });

  const showAlert = (title, message) => {
    setAlertData({ title, message });
    setAlertVisible(true);
  };

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      showAlert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      showAlert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim`);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1a1a2e" barStyle="light-content" />

      {/* HEADER BAR */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? '🟢 Open' : '🔴 Busy'}
          </Text>
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{ false: '#555', true: '#4ade80' }}
            thumbColor={openToWork ? '#fff' : '#aaa'}
          />
        </View>
      </View>

      {/* TAB NAVIGASI SEDERHANA */}
      <View style={styles.tabContainer}>
        {['Info', 'Skills', 'Kontak'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* TAB 1: INFO PROFIL & RIWAYAT */}
          {(activeTab === 'Info' || activeTab === 'All') && (
            <>
              <View style={styles.profileSection}>
                <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                  <Image source={Profile.avatar} style={styles.avatar} />
                </Animated.View>

                {openToWork && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>✅ Open to Work</Text>
                  </View>
                )}

                <Text style={styles.profileName}>{Profile.name}</Text>
                <Text style={styles.profileTitle}>{Profile.role}</Text>
                <Text style={styles.profileBio}>{Profile.bio}</Text>

                <View style={styles.contactRow}>
                  <Text style={styles.contactItem}>📧 {Profile.email}</Text>
                  <Text style={styles.contactItem}>📍 {Profile.location}</Text>
                </View>
                <Text style={styles.contactItem}>📱 {Profile.phone}</Text>

                <View style={styles.socialRow}>
                  {SOCIAL.map((s) => (
                    <TouchableOpacity
                      key={s.id}
                      style={styles.socialBtn}
                      onPress={() => showAlert('🔗 Link', s.url)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.socialIcon}>{s.icon}</Text>
                      <Text style={styles.socialLabel}>{s.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Pressable
                  style={({ pressed }) => [styles.downloadBtn, pressed && styles.downloadBtnPressed]}
                  onPressIn={() => setPressing(true)}
                  onPressOut={() => setPressing(false)}
                  onPress={() => showAlert('📥 Download', 'CV sedang diunduh...')}
                >
                  <Text style={styles.downloadBtnText}>
                    {pressing ? '⏳ Mengunduh...' : '📥 Download CV (PDF)'}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>📄 Riwayat</Text>
                <Text style={styles.sectionSubtitle}>
                  ↳ SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
                </Text>
                <SectionList
                  sections={SECTIONS}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TimelineCard item={item} onPress={handleCardPress} />
                  )}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                  )}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
              </View>
            </>
          )}

          {/* TAB 2: SKILLS */}
          {(activeTab === 'Skills' || activeTab === 'All') && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>🛠️ Keahlian</Text>
              <Text style={styles.sectionSubtitle}>
                ↳ FlatList: menampilkan list data secara efisien
              </Text>
              <FlatList
                data={SKILLS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SkillCard item={item} />}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              />
            </View>
          )}

          {/* TAB 3: KONTAK */}
          {(activeTab === 'Kontak' || activeTab === 'All') && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>📬 Hubungi Saya</Text>
              <Text style={styles.sectionSubtitle}>
                ↳ TextInput, Button, ActivityIndicator
              </Text>

              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#888"
                value={senderName}
                onChangeText={setSenderName}
                returnKeyType="next"
                editable={!sending}
              />

              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!sending}
              />

              {sending ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="large" color="#7c3aed" />
                  <Text style={styles.loadingText}>Mengirim pesan...</Text>
                </View>
              ) : (
                <Button title="✉️ Kirim Pesan" color="#7c3aed" onPress={handleSend} />
              )}
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL DETAIL RIWAYAT */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>📅 {selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL ALERT KUSTOM */}
      <Modal
        transparent={true}
        visible={alertVisible}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>{alertData.title}</Text>
            <Text style={styles.alertMessage}>{alertData.message}</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => setAlertVisible(false)}>
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// ============================================
// STYLESHEET
// ============================================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { flex: 1 },

  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d44',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  switchLabel: { color: '#9ca3af', fontSize: 12, fontWeight: '600' },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    padding: 6,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    justifyContent: 'space-around',
  },
  tabButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  tabButtonActive: { backgroundColor: '#7c3aed' },
  tabText: { color: '#9ca3af', fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: '#fff', fontWeight: '700' },

  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: '#7c3aed', marginBottom: 8 },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: '#4ade80',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: { color: '#4ade80', fontSize: 12, fontWeight: '700' },
  profileName: { color: '#fff', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  profileTitle: { color: '#a78bfa', fontSize: 14, fontWeight: '600', marginTop: 4, marginBottom: 14, textAlign: 'center' },
  profileBio: { color: '#9ca3af', fontSize: 13, lineHeight: 20, textAlign: 'center', marginBottom: 16, paddingHorizontal: 8 },

  contactRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 6 },
  contactItem: { color: '#9ca3af', fontSize: 12, textAlign: 'center', marginBottom: 4 },

  socialRow: { flexDirection: 'row', gap: 12, marginTop: 16, marginBottom: 20 },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: { color: '#a78bfa', fontSize: 11, fontWeight: '600' },

  downloadBtn: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
  },
  downloadBtnPressed: { backgroundColor: '#5b21b6' },
  downloadBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  sectionTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 4 },
  sectionSubtitle: { color: '#6b7280', fontSize: 11, fontStyle: 'italic', marginBottom: 16 },
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#7c3aed',
  },
  sectionHeaderText: { color: '#a78bfa', fontWeight: '700', fontSize: 13 },

  skillCard: { backgroundColor: '#16213e', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#2d2d44' },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  skillName: { color: '#f0f0f0', fontWeight: '600', fontSize: 13 },
  skillPercent: { color: '#a78bfa', fontWeight: '700', fontSize: 13 },
  progressBg: { height: 6, backgroundColor: '#0f172a', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 4 },

  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#7c3aed', marginTop: 4, marginRight: 12 },
  timelineContent: { flex: 1 },
  timelineRole: { color: '#fff', fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: '#a78bfa', fontSize: 13, marginBottom: 2 },
  timelinePeriod: { color: '#9ca3af', fontSize: 11, marginBottom: 6 },
  timelineHint: { color: '#f59e0b', fontSize: 11, fontStyle: 'italic' },

  textInput: {
    backgroundColor: '#0f172a',
    color: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#2d2d44',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: { height: 100, textAlignVertical: 'top' },

  loadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 10 },
  loadingText: { color: '#a78bfa', fontSize: 14, fontWeight: '600' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: '#7c3aed',
  },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany: { color: '#a78bfa', fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod: { color: '#9ca3af', fontSize: 13, marginBottom: 16 },
  modalDivider: { height: 1, backgroundColor: '#2d2d44', marginBottom: 16 },
  modalDesc: { color: '#f0f0f0', fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: { backgroundColor: '#7c3aed', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  modalCloseBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  alertOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' },
  alertBox: { width: '85%', maxWidth: 340, backgroundColor: '#fff', borderRadius: 16, padding: 24, elevation: 5 },
  alertTitle: { fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  alertMessage: { fontSize: 16, color: '#555', marginBottom: 24 },
  alertButton: { alignSelf: 'flex-end', paddingHorizontal: 16, paddingVertical: 10 },
  alertButtonText: { color: '#2196F3', fontSize: 16, fontWeight: 'bold' },
});