# Arduino-visual-circuit-designer

## Overview
This project is a web-based visual circuit design tool inspired by platforms such as **Wokwi** and **circuito.io**. It allows users to drag and drop Arduino components onto a canvas and automatically generates the corresponding Arduino code based on component configuration.

The goal of this project is to simplify Arduino learning by visually connecting hardware components with auto-generated code.

---

## Features
- Drag-and-drop Arduino components
- Visual canvas for circuit design
- Pin configuration for components
- Automatic Arduino code generation
- Real-time code preview panel
- Beginner-friendly UI

---

## Technologies Used
- React.js
- JavaScript
- CSS
- Wokwi Web Components
- Arduino (C/C++)

---

## How It Works
1. Components such as Arduino Uno, LED, and Button can be dragged onto the canvas.
2. Users select pin values using a dropdown.
3. Arduino code is generated automatically based on the selected configuration.
4. The generated code can be copied and uploaded to an Arduino board.

---

## Arduino Code Example
```cpp
const int ledPin = 8;
const int buttonPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  while (digitalRead(buttonPin) == LOW) {
    digitalWrite(ledPin, HIGH);
    delay(300);
    digitalWrite(ledPin, LOW);
    delay(300);
  }
}
```

## Limitations
1. Auto wiring visualization is not implemented
2. Limited number of supported components
3. No real-time hardware simulation
4. Logic is basic and predefined

## Future Enhancements
1. Auto wiring between components
2. Additional components (LCD, Servo, Sensors)
3. Logic selection blocks (Blink, Toggle, PWM)
4. Export Arduino code as .ino file
5.Integration with simulation engines

## Author
Riya Chhabra
Engineering Student | Web Development & Embedded Systems

## License
This project is intended for academic, learning, and open-source exploration purposes.


