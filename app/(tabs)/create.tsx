import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useStore } from '@/context/store-context';
import { useRouter } from 'expo-router';


export default function CreateNoteScreen() {
  const { addNote } = useStore();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError('Please provide both a title and content.');
      return;
    }
    addNote(title, content);
    setTitle('');
    setContent('');
    setError('');
    router.push('/'); // Navigate back to list
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Note</Text>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
             <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.content}>
          <TextInput
            style={styles.titleInput}
            placeholder="Note Title"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          <TextInput
            style={styles.bodyInput}
            placeholder="Write your note here..."
            placeholderTextColor="#888"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },
  saveBtn: {
      backgroundColor: '#111',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
  },
  saveBtnText: {
      color: '#fff',
      fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4444',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  content: {
      flex: 1,
      paddingHorizontal: 20,
  },
  titleInput: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: '#eee',
      marginBottom: 16,
  },
  bodyInput: {
      flex: 1,
      fontSize: 18,
      color: '#333',
      lineHeight: 28,
  }
});
