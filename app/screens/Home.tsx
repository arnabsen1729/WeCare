import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import { HomeProps } from "../types";
import { useTheme, theme, Mode } from "../theme";
import { setDeviceId } from "../state/actions";

const Home = ({ navigation }: HomeProps) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (data: any) => {
    dispatch(setDeviceId(data.id));
    setTimeout(() => navigation.navigate("Status"), 500);
  };
  const { control, handleSubmit, errors } = useForm();

  const { mode } = useTheme();

  return (
    <View style={styles(mode).container}>
      <Text style={styles(mode).header}>Connect me!</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles(mode).input}
            value={value}
            onChangeText={(value) => {
              onChange(value);
              setText(value);
            }}
            placeholder="Enter device ID"
            placeholderTextColor={theme[mode].lightColor}
            autoFocus={true}
            keyboardType="number-pad"
          />
        )}
        name="id"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.id ? (
        <Text style={styles(mode).errorText}>Required.</Text>
      ) : (
        text !== "" && <Text style={styles(mode).successText}>Looks Good.</Text>
      )}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles(mode).btn}
      >
        <Text style={styles(mode).btnText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme[mode].backgroundColor,
      padding: 16,
      display: "flex",
      justifyContent: "center",
    },
    input: {
      height: 48,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme[mode].secondaryColor,
      width: 250,
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: theme[mode].lightColor,
      fontSize: 16,
      fontFamily: "Poppins_400Regular",
    },
    btn: {
      marginVertical: 10,
      backgroundColor: theme[mode].tertiaryColor,
      paddingRight: 25,
      paddingVertical: 8,
      paddingLeft: 8,
      borderRadius: 2,
      maxWidth: 100,
      alignItems: "flex-start",
      justifyContent: "center",
      display: "flex",
    },
    btnText: {
      color: theme[mode].textColor,
      fontFamily: "Poppins_500Medium",
      fontSize: 14,
    },
    header: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 48,
      color: theme[mode].tertiaryColor,
    },
    errorText: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 12,
      color: theme[mode].errorColor,
      marginTop: 5,
      letterSpacing: 0.5,
    },
    successText: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 12,
      color: theme[mode].successColor,
      marginTop: 5,
      letterSpacing: 0.5,
    },
  });
