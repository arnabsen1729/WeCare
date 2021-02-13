import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Mode, theme, useTheme } from "../theme";

interface Props {
  id: number;
  email: string;
  onClick: () => void;
}

const Email: React.FC<Props> = ({ id, email, onClick }) => {
  const { mode } = useTheme();
  return (
    <View style={styles(mode).emailContainer} key={id}>
      <Text style={styles(mode).emailText}>{email}</Text>
      <TouchableOpacity
        style={styles(mode).deleteBtnContainer}
        onPress={onClick}
      >
        <Text style={styles(mode).deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Email;

const styles = (mode: Mode) =>
  StyleSheet.create({
    emailContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: theme[mode].secondaryColor,
      borderRadius: 5,
      marginVertical: 5,
    },
    emailText: {
      fontFamily: "Poppins_400Regular",
      fontSize: 12,
      color: theme[mode].textColor,
    },
    deleteBtnContainer: {
      marginLeft: "auto",
      paddingVertical: 5,
      paddingHorizontal: 10,
      margin: 1,
      backgroundColor: theme[mode].tertiaryColor,
      borderRadius: 2,
    },
    deleteBtnText: {
      color: theme[mode].backgroundColor,
      fontFamily: "Poppins_600SemiBold",
    },
  });
