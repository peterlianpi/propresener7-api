import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useProPresenterData } from '../../libs/ProPresenterDataProvider';
import { connectWebSocket } from '../../libs/ProPresenterConnection';

const LoginPage = () => {
  const {
    host,
    setHost,
    password,
    setPassword,
    sendAuthentication,
    connected,
    message,
    setConnected,
    setWs,
    setMessage,
    handleAction,
    handleWebSocketClose,
  } = useProPresenterData();

  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    if (host && !connected) {
      connectWebSocket(
        host,
        setConnected,
        setWs,
        setMessage,
        handleAction,
        handleWebSocketClose
      );
    }
  }, [host]);

  const handleAuthenticate = () => {
    if (connected) {
      sendAuthentication(password);
    }
    if (!connected) {
      setConnectionError(`WebSocket connection to ${host} is not established`);
      setTimeout(() => {
        setConnectionError(null);
      }, 2000);
    } else if (message && !message.authenticated) {
      setConnectionError(message.error);
      setTimeout(() => {
        setConnectionError(null);
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="hostname or ip:port"
        value={host}
        onChangeText={setHost}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {connectionError && <Text style={styles.error}>{connectionError}</Text>}
      <Button title="Authenticate" onPress={handleAuthenticate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    width:150,
    fontSize: 24,
    fontWeight: '900',
    textAlign:'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    textAlign:'center',
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginPage;
