import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

import { COLORS, icons } from "../../constants";
import { ScreenHeaderBtn } from "../common/header/ScreenHeaderBtn";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerTitle: "Profile",
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.chevronLeft}
          dimension="60%"
          handlePress={() => {
            console.log("Home");
            router.push("/home");
          }}
        />
      ),
    });

    const fetchData = async () => {
      try {
        const userCollection = collection(db, "users"); // Replace 'users' with your collection name
        const querySnapshot = await getDocs(userCollection);

        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Assuming you have only one user in the collection for simplicity
        if (usersData.length > 0) {
          setUserData(usersData[0]);
        }
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, [navigation, router]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     title: "Profile",
  //     headerTitleStyle: {
  //       fontSize: 20,
  //       fontWeight: "bold",
  //       //color: "white",
  //     },
  //     headerStyle: {
  //       backgroundColor: "white",
  //       height: 110,
  //       borderBottomColor: "transparent",
  //       shadowColor: "transparent",
  //     },
  //   });
  // }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Navigate to the Login screen or any other screen after sign-out
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <View style={styles.profileContainer}>
          <View style={{alignItems: "center", justifyContent: "center"}}>
            <Image
              source={{
                uri: userData.photo
              }}
              style={{
                width: 100, // Adjust the width and height as needed
                height: 100,
                borderRadius: 50,
              }}
            />
          </View>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>
            {userData.firstname + " " + userData.lastname}
          </Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{userData.email}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.info}>{userData.phone}</Text>

          {/* Add other user properties here */}

          <Pressable style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Background color for the entire screen
  },
  profileContainer: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "80%",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  info: {
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
