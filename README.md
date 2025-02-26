# Stabilization of a rotating arm

## ⚠️ Under Construction
This is a work in progress. Some of the code may not work as expected. Content may be incomplete or subject to change.

## Introduction

This project is about stabilizing a rotating arm. The arm is mounted on a pivot and is free to rotate in the vertical plane.

<img src="presentation/assets/fonction.png">

The goal is to stabilize the arm in the horizontal position (angle = 0). The arm is equipped with two motors and their propellers that can apply a torque to the arm. The motor is controlled by a microcontroller. The microcontroller reads the angle of the arm and applies a torque to the arm to stabilize it.

## 3D model

<img src="presentation/assets/3d-cad.png" style="background-color: white;">

## Hardware

The hardware consists of the following components:

- Motors (brushless motors)
- Microcontroller (Arduino ATmega2560)
- IMU sensor (MPU6050 or MPU9250)
- Motor driver (ESC 30A)
- Power supply (12V)

## Software

The software consists of the following components:

- `arduino`: The code that runs on the microcontroller
- `web`: a server and dashboard that displays data from the microcontroller.

### Arduino

The arduino code reads the angle of the arm from the IMU sensor and applies a torque to the arm to stabilize it. The code also reads the setpoint angle from the server and adjusts the torque to reach the setpoint.

#### Components

- `MPUSensor`: A class that encapsulates the MPU sensor readings and configuration using `I2CInterface` and filtering.
- `I2CInterface`: A class that encapsulates the I2C communication with the MPU sensor.
- `MotorsController`: A class that encapsulates the motor control logic and the PID controller.
- `PIDController`: A class that encapsulates the PID controller logic.

### Web

For more details, see the [web directory README](web/README.md).

#### Server

The server communicates with the microcontroller through a serial port and emits data through websockets to the dashboard. The server is built using Node.js and Socket.io.

#### Dashboard

The dashboard is a web application that displays data from the microcontroller in real-time. The dashboard is built using am5Charts and Socket.io.

## Authors

- [Ahmed Amine Nouabi](https://github.com/amineNouabi)
