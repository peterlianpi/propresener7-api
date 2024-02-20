import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { ProPresenterDataContextProvider } from "./libs/ProPresenterDataProvider";
import Inits from "./libs/Inits";
import Center from "./components/Center";

export default function App() {
  return (
    <ProPresenterDataContextProvider>
      <View style={styles.container}>
        <Center>
          <Inits />
          </Center>
        <StatusBar style="auto" />
      </View>
    </ProPresenterDataContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
