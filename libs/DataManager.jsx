import React, { useEffect, useState } from "react";
// Assuming useProPresenterData is available in React Native as well
import { useProPresenterData } from "./ProPresenterDataProvider";

const DataManager = () => {
  const {
    setMacros,
    setLooks,
    setLibrary,
    setPlaylist,
    sendRequest,
    fetchData,
    setFetchData,
  } = useProPresenterData();
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      if (fetchData && !dataFetched) {
        // Request all data
        await Promise.all([
          sendRequest("macrosRequest"),
          sendRequest("looksRequest"),
          sendRequest("libraryRequest"),
          sendRequest("playlistRequestAll"),
        ]);
        setFetchData(false);
        setDataFetched(true);
      }
    };

    fetchDataIfNeeded();

    // Clean up if needed
    return () => {
      // Any cleanup code
    };
  }, [dataFetched, fetchData, sendRequest, setFetchData]);

  return null;
};

export default DataManager;
