import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = () => {
  // Ask for permission to access gallery
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access the gallery is required!');
      }
    };
    getPermissions();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };

  const [formData, setFormData] = useState({
    firstName: 'Muhammad',
    lastName: 'Ahmad',
    phone: '+92 3083872646',
    email: 'qdevaan@gmail.com',
    gender: 'Male',
    dateOfBirth: new Date(2000, 1, 2),
    profileImage: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setFormData({ ...formData, dateOfBirth: currentDate });
  };

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Edit Profile</Text>

        {/* Profile Image */}
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          <Image
            source={{ uri: formData.profileImage || 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.form}>
          {/* First Name and Last Name in the same row */}
          <View style={styles.nameRow}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              />
              <Text style={styles.asterisk}>*</Text>
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              />
              <Text style={styles.asterisk}>*</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number (3XXXXXXXX)</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />
            <Text style={styles.asterisk}>*</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              keyboardType="email-address"
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <Text style={styles.asterisk}>*</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.gender}
                style={styles.picker}
                onValueChange={(itemValue) => setFormData({ ...formData, gender: itemValue })}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            <Text style={styles.asterisk}>*</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{formatDate(formData.dateOfBirth)}</Text>
                <Text style={styles.calendarIcon}>📅</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={formData.dateOfBirth}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  title: {
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8,
    textAlign: 'left',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  input: {
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  asterisk: {
    color: '#E4002B',
    position: 'absolute',
    right: 8,
    top: 30,
  },
  pickerContainer: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    top: -7,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    fontSize: 14,
  },
  calendarIcon: {
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: '#E4002B',
    marginTop: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#E4002B',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditProfileScreen;
