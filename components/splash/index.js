import { StyleSheet, Text, View, Image } from "react-native";
import { Link, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Stack, useRouter } from "expo-router";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Hide the header by setting the headerShown option to false
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Add your splash screen image or any other components */}
      <Stack.Screen
  options={{ headerShown: false }}
/>
      <Image
        source={require("../../assets/splash.png")}
        style={styles.splashImage}
        resizeMode="cover"
      />

      <Text style={styles.splashText}>Welcome to Job Search app. </Text>
      <Text style={styles.splashSubText}>
        Embark on a journey with the Job Search app, where opportunities unfold
        like chapters of a career story. Discover your professional narrative as
        you navigate through a tapestry of possibilities, illuminating the path
        to your dream career.
      </Text>

      {/* Optional: Add a link to navigate to the home screen */}
      <Link href="/login" style={styles.link}>
        <Text style={styles.linkText}>
          Get Started
        </Text>
        <AntDesign name="arrowright" size={16} color="white" />
      </Link>
    </View>
  );
};

// ... (previous imports)

// const Splash = () => {
//   const navigation = useNavigation();
//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//     });
//   }, [navigation]);

//   const navigateToLogin = () => {
//     navigation.navigate("Login");
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/splash.png")}
//         style={styles.splashImage}
//         resizeMode="cover"
//       />

//       <Text style={styles.splashText}>Welcome to Job Search app. </Text>
//       <Text style={styles.splashSubText}>
//         Embark on a journey with the Job Search app, where opportunities unfold
//         like chapters of a career story. Discover your professional narrative as
//         you navigate through a tapestry of possibilities, illuminating the path
//         to your dream career.
//       </Text>

//       {/* Optional: Add a link to navigate to the login screen */}
//       <TouchableOpacity onPress={navigateToLogin} style={styles.link}>
//         <Text style={styles.linkText}>Get Started 
//         <AntDesign name="arrowright" size={16} color="white" /></Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F4EC", // Set your desired background color
  },
  splashImage: {
    width: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    marginBottom: 30,
  },
  splashText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  splashSubText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    marginHorizontal: 10,
  },
  link: {
    padding: 10,
    backgroundColor: "#7E30E1", // Set your desired link button color
    borderRadius: 15,
  },
  linkText: {
    color: "#fff", // Set your desired link button text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Splash;
