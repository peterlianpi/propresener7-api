import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ClearAll from "../components/ClearAll/ClearAll";
import LoginPage from "../components/Login/Login";
import DataManager from "./DataManager";
import { useProPresenterData } from "./ProPresenterDataProvider";

const Inits = () => {
  const {
    host,
    setConnected,
    setWs,
    setMessage,
    handleAction,
    handleWebSocketClose,
    connected,
    message: webSocketMessage,
    sendAuthentication,
    fetchData,
    setFetchData,
    isAuthenticated,
    setIsAuthenticated,
    startWebSocketConnection,
  } = useProPresenterData();

  const [autoConnected, setAutoConnected] = useState(false);
  const [initialMessage, setInitialMessage] = useState(null);
  const password = "control";

  useEffect(() => {
    // Function to connect WebSocket when component mounts
    if (!connected && host) {
      startWebSocketConnection();
    }
  }, [connected, host, startWebSocketConnection]);

  useEffect(() => {
    // Set fetchData to true after authentication
    if (isAuthenticated && !fetchData) {
      setFetchData(true);
    }
  }, [isAuthenticated, fetchData, setFetchData]);

  useEffect(() => {
    // Automatically send authentication when connected and not authenticated
    if (
      !isAuthenticated &&
      !autoConnected &&
      connected &&
      password &&
      password.length > 0
    ) {
      sendAuthentication(password);
      setAutoConnected(true);
    }
  }, [
    password,
    connected,
    sendAuthentication,
    autoConnected,
    isAuthenticated,
    setIsAuthenticated,
  ]);

  useEffect(() => {
    // Set authenticated and fetchData to true after successful authentication
    if (connected && webSocketMessage && webSocketMessage.authenticated === 1) {
      // Save initial WebSocket message value for passing to LoginPage
      setInitialMessage((prevMessage) => prevMessage || webSocketMessage);
      setIsAuthenticated(true);
      setFetchData(true);
    }
  }, [webSocketMessage, setFetchData, setIsAuthenticated, connected]);

  // Render LoginPage if not authenticated
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <LoginPage message={initialMessage} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        {connected && initialMessage && initialMessage.authenticated === 1 ? (
          <View
            style={[styles.notificationDot, { backgroundColor: "green" }]}
          />
        ) : (
          <View style={[styles.notificationDot, { backgroundColor: "red" }]} />
        )}
      </View>
      {connected && initialMessage && initialMessage.authenticated === 1 && (
        <Text style={styles.connectedText}>
          Connected to ProPresenter {initialMessage.majorVersion}:
          {initialMessage.minorVersion}:{initialMessage.patchVersion}
        </Text>
      )}
      <ClearAll />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  loginContainer: {
    width: 320,
    height: 480,
    justifyContent: "center",
    borderRadius: 8,
  },
  notificationContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  notificationDot: {
    position: "absolute",
    width: 150,
    height: 6,
    borderRadius: 4,
    top: 0,
  },
  connectedText: {
    marginTop: 8,
  },
});

export default Inits;
