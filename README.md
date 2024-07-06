# Stabilization of a rotating arm

## Warning : Under Construction 
This is a work in progress. Some of the code may not work as expected.

## Introduction

This project is about stabilizing a rotating arm. The arm is mounted on a pivot and is free to rotate in the horizontal plane.

<img src="ressources/function.png">

The goal is to stabilize the arm in the horizontal position. The arm is equipped with two motors that can apply a torque to the arm. The motor is controlled by a microcontroller. The microcontroller reads the angle of the arm and applies a torque to the arm to stabilize it.

## 3D model

<img src="ressources/3d-cad.png" style="background-color: white;">

## Hardware

The hardware consists of the following components:

- Motors (brushless motors)
- Microcontroller (Arduino ATmega2560)
- IMU sensor (MPU6050 or MPU9250)
- Motor driver (ESC 30A)
- Power supply (12V)

## Software

There are 3 main software components:

- `arduino`: The code that runs on the microcontroller
- `dashboard`: A web application that displays data from the microcontroller in real-time.
- `server`: A server that communicates with the microcontroller and emmits data to the dashboard

### Arduino

The arduino code reads the angle of the arm from the IMU sensor and applies a torque to the arm to stabilize it. The code also reads the setpoint angle from the server and adjusts the torque to reach the setpoint.

#### Components

- `MPUSensor`: A class that encapsulates the MPU sensor readings, configuration, and filtering.
- `MotorsController`: A class that encapsulates the motor control logic and the PID controller.

### Dashboard

The dashboard is a web application that displays data from the microcontroller in real-time. The dashboard is built using Chart.js.

### Server

The server communicates with the microcontroller and emits data to the dashboard. The server is built using Node.js and Socket.io.
