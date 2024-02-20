import React, { createContext, useContext, useState } from 'react';
import { connectWebSocket } from './ProPresenterConnection';

const ProPresenterDataContext = createContext();

export const useProPresenterData = () => useContext(ProPresenterDataContext);

export const ProPresenterDataContextProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState(null);
  const [macros, setMacros] = useState([]);
  const [looks, setLooks] = useState([]);
  const [library, setLibrary] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [presentations, setPresentations] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [host, setHost] = useState('');
  const [password, setPassword] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 999;
  const retryInterval = 3000;

  // Function to connect WebSocket when component mounts
  const startWebSocketConnection = () => {
    connectWebSocket(
      host,
      setConnected,
      setWs,
      setMessage,
      handleAction,
      handleWebSocketClose // Pass the onCloseCallback
    );
  };

  const handleWebSocketClose = () => {
    // Handle WebSocket close event
    console.log('WebSocket connection closed');
    // Additional logic if needed
  };

  // Function to handle different actions
  const handleAction = (data) => {
    switch (data.action) {
      case 'macrosRequest':
        setMacros(data.macros);
        break;
      case 'looksRequest':
        setLooks(data.looks);
        break;
      case 'libraryRequest':
        setLibrary(data.library);
        break;
      case 'playlistRequestAll':
        setPlaylist(data.playlistAll);
        break;

      // Add more cases for other actions as needed
      default:
        break;
    }
  };

  const sendRequest = (action, params = {}, callback) => {
    const request = {
      action,
      ...params,
    };
    if (ws) {
      ws.send(JSON.stringify(request));
      console.log(`Sent ${action} request`);
      if (callback) {
        // If a callback is provided, pass it to handle the response
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(`Received ${data.action} response : `, data);
          callback(data);
        };
      }
    } else {
      console.error('WebSocket connection not established');
    }
  };

  // Function to send authentication request
  const sendAuthentication = (password) => {
    const authCommand = {
      action: 'authenticate',
      protocol: '701',
      password: password,
    };
    if (ws) {
      ws.send(JSON.stringify(authCommand));
      console.log('Sent authentication command');
    } else {
      console.error('WebSocket connection not established');
    }
  };

  return (
    <ProPresenterDataContext.Provider
      value={{
        host,
        setHost,
        password,
        setPassword,
        connected,
        setConnected,
        ws,
        setWs,
        message,
        setMessage,
        macros,
        setMacros,
        looks,
        setLooks,
        library,
        setLibrary,
        playlist,
        setPlaylist,
        presentations,
        setPresentations,
        sendAuthentication,
        sendRequest,
        fetchData,
        setFetchData,
        isAuthenticated,
        setIsAuthenticated,
        handleWebSocketClose,
        handleAction,
        retryCount,
        setRetryCount,
        maxRetries,
        retryInterval,
        startWebSocketConnection,
      }}
    >
      {children}
    </ProPresenterDataContext.Provider>
  );
};
