//login/index.js
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";
import { Stack, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
         console.log("user details", user);
         console.log("user credential", userCredential);
    });
  };

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          router.push('/home');
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
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
      </View>

      <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>

      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={styles.createAccountButton}
      >
        <Text style={styles.buttonText}>Create an Account</Text>
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
  loginButton: {
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

export default Login;
