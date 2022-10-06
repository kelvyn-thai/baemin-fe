import React from "react";
import socket from "socket";

const DriverPage: React.FC = () => {
  const [state, setState] = React.useState();
  const handleConnectSocket = () => {
    socket.on("connection", (...args) => {
      console.log("args", args);
    });
  };
  React.useEffect(() => {
    handleConnectSocket();
  }, []);
  return <div>This is driver page</div>;
};

export default React.memo(DriverPage);
