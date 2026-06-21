import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [value, setValue] = useState("");

  useEffect(() => {
    socket.on("receive-changes", (data) => {
      setValue(data);
    });
  }, []);

  const handleChange = (content) => {
    setValue(content);
    socket.emit("send-changes", content);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Real-Time Collaborative Editor</h1>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        style={{ height: "400px" }}
      />
    </div>
  );
}

export default App;