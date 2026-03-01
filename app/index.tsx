import { useRef } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BottomSheet, { type BottomSheetRef } from '../components/BottomSheet';
import { ScrollView } from 'react-native-gesture-handler';

export default function App() {
  const sheetRef = useRef<BottomSheetRef>(null);
  const onlyCenteredContent = false;

  return (
    <View style={styles.screen}>

      <Text style={styles.welcome}>Welcome</Text>

      <Pressable
        style={styles.openBtn}
        onPress={() => sheetRef.current?.open()}
      >
        <Text style={styles.openBtnText}>Open</Text>
      </Pressable>


      <BottomSheet ref={sheetRef} snapPoint={0.5}>

        {!onlyCenteredContent && <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.label}>Enter Project Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Project name"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <Pressable style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </Pressable>

          <Text style={styles.description}>
            Give your project a memorable name that reflects its purpose.
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Tips</Text>
            <Text style={styles.cardBody}>
              Use descriptive names like "Weather App" or "Todo Tracker" so you
              can easily find your project later.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Tips</Text>
            <Text style={styles.cardBody}>
              Use descriptive names like "Weather App" or "Todo Tracker" so you
              can easily find your project later.
            </Text>
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="What is this project about?"
            multiline
            numberOfLines={3}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <Pressable style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </Pressable>

          <Text style={styles.description}>
            A good description helps collaborators understand the project scope.
          </Text>

          <Text style={styles.footerText}>
            You can always change these details later in project settings.
          </Text>

        </ScrollView>}

        {onlyCenteredContent && <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, }}>
          <Text style={styles.label}>Enter Project Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Project name"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <Pressable style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </Pressable>

          <Text style={styles.description}>
            Give your project a memorable name that reflects its purpose.
          </Text>
        </View>}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  openBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
  },
  openBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    width: '100%',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  description: {
    fontSize: 13,
    color: '#888',
    marginTop: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#F2F4F7',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  submitBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 16,
    
  },
});
