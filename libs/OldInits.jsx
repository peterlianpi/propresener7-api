import { useEffect, useState } from "react";
import { useProPresenter } from "../components/ProPresenterContext";
import LoginPage from "../components/Login/Login";
import Macros from "../components/Macros/Macros";
import Looks from "../components/Looks/Looks";
import Libraries from "../components/Libraries/Libraries";
import Playlists from "../components/Playlists/Playlists";
import ClearAll from "../components/ClearAll/ClearAll";

function OldInits() {
  const {
    connected,
    setConnected,
    setWs,
    message: wsMessage,
    setMessage: setWsMessage,
    macros,
    setMacros,
    looks,
    setLooks,
    library,
    setLibrary,
    playlist,
    setPlaylist,

    sendAuthentication,
    sendRequest,
  } = useProPresenter();

  const host =
    localStorage.getItem("host") ||
    import.meta.env.VITE_PROPRESENTER_CONTROL_HOST ||
    "";
  const password =
    localStorage.getItem("password") ||
    import.meta.env.VITE_PROPRESENTER_CONTROL_PASSWORD ||
    "";

  const [authenticated, setAuthenticated] = useState(false);
  const [autoConnected, setAutoConnected] = useState(false);
  const [initialMessage, setInitialMessage] = useState(null);
  const [fetchData, setFetchData] = useState(false); // Flag to control data fetching

  useEffect(() => {
    // Save initial message value for passing to LoginPage
    setInitialMessage((initialMessage) => initialMessage || wsMessage);
  }, [wsMessage]);

  useEffect(() => {
    connectWebSocket(); // Automatically connect when component mounts
  }, []); // Empty dependency array ensures it runs only once

  useEffect(() => {
    // Automatically connect when component mounts
    if (!autoConnected && connected && password.length > 0) {
      sendAuthentication(password);
      setAutoConnected(true);
    }
  }, [password, connected, sendAuthentication, autoConnected]);

  useEffect(() => {
    // Redirect to home page if authentication succeeds
    if (wsMessage && wsMessage.authenticated === 1) {
      setAuthenticated(true);
      setFetchData(true);
    }
  }, [wsMessage]);

  // Function to fetch all data after successfull authentication
  useEffect(() => {
    if (fetchData) {
      // Request all data
      sendRequest("macrosRequest");
      sendRequest("looksRequest");
      sendRequest("libraryRequest");
      sendRequest("playlistRequestAll");
      setFetchData(false);
    }
  }, [fetchData, sendRequest]);

  // Function to connect to the WebSocket server
  const connectWebSocket = () => {
    const webSocket = new WebSocket(`ws://${host}/remote`);

    webSocket.onopen = () => {
      console.log("Connected to WebSocket");
      setConnected(true);
      setWs(webSocket);
    };

    webSocket.onerror = (error) => {
      console.log("WebSocket error : ", error);
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setWsMessage(data);
      console.log("Received message : ", event.data);

      // Handle different actions
      handleAction(data);
    };
  };

  // Function to handle different actions
  const handleAction = (data) => {
    switch (data.action) {
      case "macrosRequest":
        setMacros(data.macros);
        break;
      case "looksRequest":
        setLooks(data.looks);
        break;
      case "libraryRequest":
        setLibrary(data.library);
        break;
      case "playlistRequestAll":
        setPlaylist(data.playlistAll);
        break;

      // Add more cases for other actions as needed
      default:
        break;
    }
  };

  const handleAuthenticate = () => {
    sendAuthentication(password);
  };

  if (!authenticated) {
    // If not authenticated,render the login page
    return (
      <LoginPage
        message={initialMessage}
        sendAuthentication={handleAuthenticate}
      />
    );
  }

  return (
    <section>
      {connected && initialMessage && initialMessage.authenticated === 1 && (
        <div>
          Connected to ProPresenter{" "}
          <span>
            {initialMessage.majorVersion}:{initialMessage.minorVersion}:
            {initialMessage.patchVersion}
          </span>
        </div>
      )}

      <ClearAll />
    </section>
  );
}
export default OldInits;
