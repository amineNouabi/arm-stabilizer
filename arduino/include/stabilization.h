#ifndef STABILIZATION_HPP
#define STABILIZATION_HPP

#include <Streaming.h>

#include <MPU9250.h>
#include <SensorFusion.h>
#include "MPUSensor.h"

#include <control.h>
#include <ESC.h>
#include "MotorsController.h"

#define MICRO_TO_SEC 1000000.0

// #define EULER_DATA
// #define SENSORS_PLOT
#define RAW_DATA
// #define SERIAL_PLOTER
// #define SERIAL_DEBUG

#define AVAILABLE_ESCS 1

#define MOTOR_1_PIN 9
#define MOTOR_2_PIN 10

#define MOTOR_MIN_SPEED 1000
#define MOTOR_MAX_SPEED 2000
#define MOTOR_ARM_SPEED 1700

#define PID_KP 0.5
#define PID_KI 0.5
#define PID_KD 0.5

#endif
