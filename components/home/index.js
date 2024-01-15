import { useEffect, useState, useRef } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter, useNavigation } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../constants";

import { Nearbyjobs } from "./nearby/Nearbyjobs";
import { Popularjobs } from "./popular/Popularjobs";
import { ScreenHeaderBtn } from "../common/header/ScreenHeaderBtn";
import { Welcome } from "./welcome/Welcome";

// import {
//   Nearbyjobs,
//   Popularjobs,
//   ScreenHeaderBtn,
//   Welcome,
// } from "../../components";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');

  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerTitle: "",
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.menu}
          dimension="60%"
          handlePress={() => {
            console.log("menu");
          }}
        />
      ),
      headerRight: () => (
        <ScreenHeaderBtn
          iconUrl={icons.profile}
          dimension="70%"
          handlePress={() => {
            console.log("profile");
            router.push("/profile");
          }}
        />
      ),
    });
  }, [navigation, router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />

          {/* <Popularjobs />
          <Nearbyjobs /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
