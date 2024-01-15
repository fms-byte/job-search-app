// Import necessary modules from React Native
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, router, useNavigation } from "expo-router";
import { COLORS } from "../../constants";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const handleRegisterPress = () => {
    if (email === "" ||password === "" ||phone === "" ||firstname === "" ||lastname === "" ||country === "") {
      Alert.alert(
        "Invalid Detials",
        "Please Enter all the credentials",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials._tokenResponse.email;
        const uid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${uid}`), {
          email: user,
          phone: phone,
          password: password,
          firstname: firstname,
          lastname: lastname,
          country: country,
        });
      }
    );
    router.push('/home');
  };

  // const handleRegisterPress = () => {
  //   router.push("/home");
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <Text style={styles.title}>Register</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={firstname}
          onChangeText={(text) => setFirstname(text)}
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#999"
        />
        <TextInput
          value={lastname}
          onChangeText={(text) => setLastname(text)}
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#999"
        />
        <TextInput
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#999"
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <TextInput
          value={country}
          onChangeText={(text) => setCountry(text)}
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity
        onPress={handleRegisterPress}
        style={styles.registerButton}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>

      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={styles.createAccountButton}
      >
        <Text style={styles.buttonText}>Already has an account? Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginBottom: 10,
  },
  createAccountButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  or: {
    color: "#999",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Register;
