/* eslint-disable react/prop-types */
import { useState } from "react";
import { useProPresenterData } from "./ProPresenterDataProvider";

function ProPresenterAuthentcation() {
  const { ws } = useProPresenterData();

  const [authenticated, setAuthenticated] = useState(false);

  const sendAuthentication = (password) => {
    const authCommand = {
      action: "authenticate",
      protocol: "701",
      password: password,
    };
    if (ws) {
      ws.send(JSON.stringify(authCommand));
      console.log("Sent authentication command");
    } else {
      console.error("WebSocket connection not established");
    }
  };

  return null; //This component doesn't render anything
}
export default ProPresenterAuthentcation;
