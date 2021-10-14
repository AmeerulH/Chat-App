import React from "react";
import socketIOClient from "socket.io-client";
import { useState, useEffect } from "react";
import { Card, Button, InputGroup, FormControl, Table } from "react-bootstrap";

const Chat = () => {
  const socket = socketIOClient("http://192.168.100.188:5000");
  const [text, setText] = useState("");
  const [press, setPress] = useState(false);
  const [chat, setChat] = useState([]);

  function sendText() {
    setText(text);
    setPress(true);
    console.log(text);
  }

  useEffect(() => {
    if (press === true) {
      socket.onopen = socket.emit("chat", {
        username: "Ameerul",
        message: text,
      });

      socket.on("chat", function (data) {
        console.log("username:", data.username, "message:", data.message);
      });

      socket.emit("typing", "Ameerul");

      socket.on("chat", function (data) {
        console.log(data.username, "is typing...");
      });
      setPress(false);
    }
    // Get message history ranging from yesterday to right now (time format is UNIX timestamp in milliseconds)
    socket.emit(
      "history",
      { from: Date.now() - 86400000, to: Date.now() },
      function (response) {
        const newArr = response;
        setChat(newArr.slice(-10));
      }
    );
  }, [chat]);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title
          style={{
            backgroundColor: "black",
            color: "white",
            alignItems: "start",
          }}
        >
          Chat App
        </Card.Title>
        <Table striped bordered hover variant="dark">
          {chat.map((c, index) => {
            return (
              <tr style={{ color: "black" }} key={index}>
                <td>{c.username}</td>
                <td>{c.text}</td>
              </tr>
            );
          })}
        </Table>
        <br />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Message..."
            aria-label="Message..."
            aria-describedby="basic-addon2"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            onClick={sendText}
            variant="outline-secondary"
            id="button-addon2"
          >
            Send
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default Chat;
