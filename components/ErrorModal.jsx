import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const ErrorModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.errorTitle}>Registration Error</Text>
          <Text style={styles.errorMessage}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#0088FF",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
