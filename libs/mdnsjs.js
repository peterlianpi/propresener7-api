// Install mdns-js using npm or yarn:
// npm install mdns-js
// yarn add mdns-js

// Import the mdns-js library
const mdns = require("mdns-js");

// Function to perform mDNS service discovery
const discoverProPresenterService = () => {
  return new Promise((resolve, reject) => {
    // Create a new Browser instance
    const browser = mdns.createBrowser();

    // Listen for 'ready' event indicating that the Browser is ready to start discovering
    browser.on("ready", () => {
      console.log("mDNS Browser is ready");
      // Start discovering services with the specified service type
      browser.discover();
    });

    // Listen for 'update' event indicating that a new service is discovered or an existing service is updated
    browser.on("update", (service) => {
      console.log("Service discovered:", service);
      // Check if the discovered service matches the ProPresenter service
      if (service.name === "pro-presenter") {
        // Extract the host and port from the discovered service
        const discoveredHost = service.addresses[0]; // Assuming the first address is the host
        const discoveredPort = service.port;
        // Stop the Browser since the ProPresenter service is found
        browser.stop();
        // Resolve the promise with the discovered host and port
        resolve({ host: discoveredHost, port: discoveredPort });
      }
    });

    // Listen for 'error' event
    browser.on("error", (error) => {
      console.error("mDNS Browser error:", error);
      // Reject the promise with the error
      reject(error);
    });

    // Set a timeout to stop the Browser in case no service is discovered within a certain time
    setTimeout(() => {
      console.log("mDNS Browser timeout");
      // Stop the Browser
      browser.stop();
      // Reject the promise with a timeout error
      reject(new Error("mDNS Browser timeout"));
    }, 10000); // Adjust the timeout value as needed
  });
};

// Usage example
discoverProPresenterService()
  .then(({ host, port }) => {
    console.log("ProPresenter service discovered:", host, port);
    // Connect to the discovered host and port using WebSocket
  })
  .catch((error) => {
    console.error("Error discovering ProPresenter service:", error);
  });
