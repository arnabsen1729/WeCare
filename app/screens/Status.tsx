import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { LocationService } from "../utils";
import { StatusProps } from "../types";
import { Mode, theme, useTheme } from "../theme";
import EmailCard from "../components/EmailCard";
import {
  addEmail,
  postData,
  removeEmail,
  setAddress,
  setLocation,
  setSending,
} from "../state/actions";
import { useFocusEffect } from "@react-navigation/native";

const Status = ({ navigation, route }: StatusProps) => {
  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const {
    device_id,
    emails,
    latitude,
    longitude,
    address,
    sending,
  } = useSelector((state: any) => state);

  // const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const { mode } = useTheme();

  const onSubmit = (data: any) => {
    dispatch(addEmail({ email: data.email, id: Date.now() }));
    setValue("email", null);
  };

  const locationPerms = async () => {
    const res = await LocationService();
    if (!res) setErrorMsg("Please enable Location Permissions.");
    else {
      dispatch(
        setLocation({
          latitude: res.location.coords.latitude,
          longitude: res.location.coords.longitude,
        })
      );
      const { city, country, district, name, region } = res.geoLocation[0];
      const addr = `${name}, ${district}, ${city}, ${region}, ${country} `;
      dispatch(setAddress(addr));
      setErrorMsg(null);
      console.log("Updating Location.");
    }
  };

  useEffect(() => {
    locationPerms();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const id = setInterval(() => {
        locationPerms();
      }, 25000);
      return () => clearInterval(id);
    }, [])
  );

  const handleSubmission = async () => {
    dispatch(setSending(true));
    dispatch(postData());
  };

  const handleDelete = (id: number) => {
    dispatch(removeEmail(id));
  };

  return (
    <View style={styles(mode).container}>
      <View style={styles(mode).locationContainer}>
        <Text style={styles(mode).locationHeader}>Current Location</Text>
        {!errorMsg && latitude && (
          <View>
            <Text style={styles(mode).locationCoords}>
              Latitude:{" "}
              <Text style={styles(mode).locationCoordsValue}>{latitude}</Text>
            </Text>
            <Text style={styles(mode).locationCoords}>
              Longitude:{" "}
              <Text style={styles(mode).locationCoordsValue}>{longitude}</Text>
            </Text>
            <Text style={styles(mode).address}>{address}</Text>
          </View>
        )}
        {errorMsg && <Text style={styles(mode).errorText}>{errorMsg}</Text>}
      </View>
      <Text style={styles(mode).connectedText}>
        You're connected to device{" "}
        {<Text style={styles(mode).deviceID}>{device_id}</Text>}.
      </Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles(mode).input}
            value={value}
            onChangeText={(value) => onChange(value)}
            placeholder="Enter Email ID"
            placeholderTextColor={theme[mode].lightColor}
          />
        )}
        name="email"
        rules={{ required: !emails }}
        defaultValue=""
      />
      {sent && <Text style={styles(mode).sent}>Email sent.</Text>}
      <ScrollView style={styles(mode).scrollView}>
        {emails.length > 0 &&
          emails.map((item: any) => (
            <EmailCard
              key={item.id}
              {...item}
              onClick={() => handleDelete(item.id)}
            />
          ))}
      </ScrollView>
      <View style={styles(mode).btnContainer}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles(mode).btn}
        >
          <Text style={styles(mode).btnText}>Add Email</Text>
        </TouchableOpacity>
        {!errorMsg && emails && emails?.length > 0 && (
          <TouchableOpacity onPress={handleSubmission} style={styles(mode).btn}>
            <Text style={styles(mode).btnText}>Send</Text>
          </TouchableOpacity>
        )}
        {sending > 0 && (
          <TouchableOpacity
            onPress={() => dispatch(setSending(false))}
            style={styles(mode).btn}
          >
            <Text style={styles(mode).btnText}>Stop Sending</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Status;

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme[mode].backgroundColor,
      padding: 16,
      display: "flex",
      paddingTop: 36,
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
    btnContainer: {
      display: "flex",
      flexDirection: "row",
    },
    btn: {
      marginVertical: 10,
      marginRight: 10,
      backgroundColor: theme[mode].tertiaryColor,
      paddingRight: 25,
      paddingLeft: 10,
      paddingVertical: 8,
      borderRadius: 2,
      maxWidth: 120,
      alignItems: "flex-start",
      justifyContent: "center",
      display: "flex",
    },
    btnText: {
      color: theme[mode].textColor,
      fontFamily: "Poppins_500Medium",
      fontSize: 14,
    },
    connectedText: {
      fontFamily: "Poppins_300Light",
      fontSize: 16,
      color: theme[mode].tertiaryColor,
    },
    deviceID: {
      fontFamily: "Poppins_500Medium",
      color: theme[mode].successColor,
    },
    locationContainer: {
      backgroundColor: theme[mode].secondaryColor,
      maxWidth: 220,
      borderRadius: 10,
      padding: 10,
      marginBottom: 16,
    },
    locationHeader: {
      fontFamily: "Poppins_500Medium",
      fontSize: 12,
      color: theme[mode].tertiaryColor,
    },
    locationCoords: {
      fontFamily: "Poppins_300Light",
      fontSize: 12,
      color: theme[mode].lightColor,
    },
    locationCoordsValue: {
      fontFamily: "Poppins_500Medium",
      color: theme[mode].successColor,
    },
    errorText: {
      fontFamily: "Poppins_500Medium",
      color: theme[mode].errorColor,
      fontSize: 12,
    },
    scrollView: {
      marginVertical: 10,
      minHeight: 0,
    },
    sent: {
      fontFamily: "Poppins_500Medium",
      color: theme[mode].successColor,
      fontSize: 14,
      marginVertical: 5,
    },
    address: {
      color: theme[mode].successColor,
      fontSize: 12,
      marginTop: 5,
      fontFamily: "Poppins_300Light",
    },
  });
