import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [ledPin, setLedPin] = useState(13);        // NEW
  const [buttonPin, setButtonPin] = useState(2);  // NEW
  const [ledOn, setLedOn] = useState(false);       // NEW
  const [code, setCode] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@wokwi/elements@latest/dist/wokwi-elements.js";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  // 🔹 Auto-update Arduino code when pins change
  useEffect(() => {
    setCode(generateCode(ledPin, buttonPin));
  }, [ledPin, buttonPin]);

  const dragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  const drop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    if (!type) return;

    const rect = e.currentTarget.getBoundingClientRect();

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    ]);
  };

  // 🔹 Button press → LED blink (UI only)
  const handleButtonPress = () => {
    setLedOn(true);
    setTimeout(() => setLedOn(false), 300);
  };

  const renderComponent = (type) => {
    switch (type) {
      case "arduino":
        return <wokwi-arduino-uno />;
      case "led":
        return <wokwi-led color={ledOn ? "green" : "red"} />;
      case "button":
        return <wokwi-pushbutton onClick={handleButtonPress} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h3>Components</h3>

        <div className="draggable" draggable onDragStart={(e) => dragStart(e, "arduino")}>
          Arduino UNO
        </div>
        <div className="draggable" draggable onDragStart={(e) => dragStart(e, "led")}>
          LED
        </div>
        <div className="draggable" draggable onDragStart={(e) => dragStart(e, "button")}>
          Button
        </div>

        {/* 🔹 PIN CONTROLS */}
        <h4>Pin Settings</h4>

        <label>LED Pin</label>
        <select value={ledPin} onChange={(e) => setLedPin(e.target.value)}>
          {[...Array(14)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>

        <label>Button Pin</label>
        <select value={buttonPin} onChange={(e) => setButtonPin(e.target.value)}>
          {[...Array(14)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      {/* CANVAS */}
      <div
        className="canvas"
        onDragOver={(e) => e.preventDefault()}
        onDrop={drop}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
            style={{ left: item.x, top: item.y }}
          >
            {renderComponent(item.type)}
          </div>
        ))}
      </div>

      {/* CODE PANEL */}
      <div className="code-panel">
        <div className="code-header">
          <h3>Arduino Code</h3>
        </div>

        <textarea
          className="code-area"
          value={code}
          readOnly
        />
      </div>
    </div>
  );
}

/* 🔹 Code generator (clean + safe) */
function generateCode(ledPin, buttonPin) {
  return `
// Auto-generated Arduino Code

const int ledPin = ${ledPin};
const int buttonPin = ${buttonPin};

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    digitalWrite(ledPin, HIGH);
    delay(300);
    digitalWrite(ledPin, LOW);
    delay(300);
  }
}
`;
}
