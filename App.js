import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  DrawerLayoutAndroid,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  Image,
  Animated,
} from "react-native";
import { TextInput } from "@react-native-material/core";
import myImage from "./assets/favicon.png";

export default function App() {
  const [isText, setIsTaxt] = useState(false);
  const [taskesData, setTaskesData] = useState([]);
  const [taskTextNow, setTaskTextNow] = useState("");

  const OpenURLButton = ({ url, children }) => {
    const handlePressLink = useCallback(async () => {
      await Linking.openURL(url);
    }, [url]);

    return (
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          marginVertical: 8,
          borderRadius: 5,
          padding: 10,
          marginTop: 7,
        }}
        onPress={handlePressLink}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 17,
            fontWeight: 600,
          }}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  };

  const animationLoading = useRef(new Animated.Value(0)).current;

  const runAnimationLoading = () => {
    Animated.timing(animationLoading, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    runAnimationLoading();
  }, []);

  const [loading, setLoading] = useState(true);
  if (loading) {
    setTimeout(() => setLoading(false), 2000); // simulate loading time
    return (
      <Animated.View
        style={{
          opacity: animationLoading,
          position: "absolute",
          top: "50%",
          width: "100%",
        }}
      >
        <Text style={{ fontWeight: 700, textAlign: "center", fontSize: 40 }}>
          Loading...
        </Text>
      </Animated.View>
    );
  }
  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      renderNavigationView={() => {
        return (
          <View
            style={{
              height: "100%",
            }}
          >
            <View style={{ marginTop: 40 }}>
              <OpenURLButton url={"https://mahmoud-abdullah-anani.vercel.app/"}>
                My Portfolo
              </OpenURLButton>
              <OpenURLButton url={"https://github.com/MahmoudAbdullahAnani"}>
                My Github
              </OpenURLButton>
              <OpenURLButton
                url={"https://www.linkedin.com/in/mahmoud-abdullah-ab253920b/"}
              >
                My Linkedin
              </OpenURLButton>
            </View>
            <Image
              source={require("./assets/bnhjglpr.bmp")}
              style={{ width: "100%", borderRadius: 20, marginTop: 20 }}
            />
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                backgroundColor: "rgba(60,60,60,1)",
                position: "absolute",
                bottom: 0,
                width: "100%",
                paddingVertical: 10,
              }}
            >
              © 2023 Copyright : Mahmoud Abdullah Anani
            </Text>
          </View>
        );
      }}
      drawerPosition="right"
      drawerBackgroundColor="rgba(50,50,50,.9)"
      style={{
        backgroundColor:
          "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
      }}
    >
      <View style={{ marginTop: 50 }}>
        {taskTextNow ? (
          <TouchableOpacity
            onPress={() => {
              setTaskesData([
                ...taskesData,
                { id: Math.random(), text: taskTextNow },
              ]);
              setTaskTextNow("");
            }}
            activeOpacity={0.5}
          >
            <Text
              style={{
                backgroundColor: "rgba(80,80,80,0.9)",
                borderRadius: 10,
                marginHorizontal: 40,
                color: "white",
                textAlign: "center",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              Add Task
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Taskify
          </Text>
        )}
        <TouchableHighlight style={{ paddingHorizontal: 30, marginTop: 20 }}>
          <TextInput
            defaultValue={taskTextNow}
            onChangeText={(e) => {
              setTaskTextNow(e);
            }}
            placeholder="Write Your Tasks..."
            autoFocus={true}
            multiline={true}
            style={{ marginBottom: 10 }}
            variant="outlined"
          />
        </TouchableHighlight>
      </View>
      <FlatList
        style={{}}
        data={taskesData}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                const filteringTaskes = taskesData.filter(
                  (task) => task.text !== item.text
                );
                setTaskesData(filteringTaskes);
              }}
              onLongPress={() => {
                const filteringTaskes = taskesData.filter(
                  (task) => task.text === item.text
                );
                const filteringNotTaskes = taskesData.filter(
                  (task) => task.text !== item.text
                );
                setTaskesData(filteringNotTaskes);
                setTaskTextNow(filteringTaskes[0].text);
              }}
              activeOpacity={0.2}
              style={{
                margin: 5,
                display: "flex",
                borderColor:
                  "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                borderWidth: 2,
                borderStyle: "solid",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 20,
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: 6,
                }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  viewItems: {},
});
