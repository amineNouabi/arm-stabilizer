#ifndef _STABILIZER_H_
#define _STABILIZER_H_

#define DEBUG_LOGS

// #define LOG_RAW_MPU
// #define LOG_ANGLE
#define SERIAL_PLOTER

#define CALIBRATION_LOOP_N 500 // Amount of loops to average the gyro offset

#define I2C_DEFAULT_TIMEOUT 1000 // milliseconds so 1s

#if defined(ARDUINO)
#include <Arduino.h>
#endif

#include <Wire.h>
#include <math.h>

#include "MPURegisterMap.h"
#include "I2cInterface.h"
#include "MPUSensor.h"
#include "PIDController.h"
#include "MotorsController.h"

#endif /* _STABILIZER_H_ */
