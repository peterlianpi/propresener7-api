import React, { createContext, useContext, useState } from 'react-native'; // Adjust the import for React Native
import { connectWebSocket } from './ProPresenterConnection';

const ProPresenterContext = createContext();

export const useProPresenter = () => useContext(ProPresenterContext);

export const ProPresenterProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState(null);
  const [macros, setMacros] = useState([]);
  const [looks, setLooks] = useState([]);
  const [library, setLibrary] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [presentations, setPresentations] = useState([]);

  const sendRequest = (action, params = {}) => {
    const request = {
      action,
      ...params,
    };
    if (ws) {
      ws.send(JSON.stringify(request));
      console.log(`Sent ${action} request`);
    } else {
      console.error('WebSocket connection not established');
    }
  };

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
    <ProPresenterContext.Provider
      value={{
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
      }}>
      {children}
    </ProPresenterContext.Provider>
  );
};
