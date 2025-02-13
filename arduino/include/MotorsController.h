#ifndef MOTORSCONTROLLER_HPP
#define MOTORSCONTROLLER_HPP

#define MOTORS_MIN_SPEED 1000
#define MOTORS_MAX_SPEED 2000

// #define MOTORS_ARM_SPEED 1000.0
// #define MOTORS_MID_SPEED 1200.0

// #define MOTORS_MAX_OFFSET 200
// #define MOTORS_MIN_OFFSET -150

#define MOTORS_1_MIN_SPEED 1060
#define MOTORS_1_MAX_SPEED 1500

#define MOTORS_1_MID_SPEED 1330

#define MOTORS_2_MIN_SPEED 1060
#define MOTORS_2_MAX_SPEED 2000

#define MOTORS_2_MID_SPEED 1350

#define MOTORS_ARM_SPEED 500

#define MOTORS_MAX_OFFSET 500
#define MOTORS_MIN_OFFSET -500

#define MOTOR_1_PIN 12
#define MOTOR_2_PIN 2

#include "stabilizer.h"

class MotorsController
{
public:
	PIDController pid;
	ESC motor1, motor2;
	int motor1_offset = 0, motor2_offset = 0;

	// MotorsController(const float dt, const float kp = 1.0, const float ki = 0.1, const float kd = 0.01);
	MotorsController(const float dt, const float kp = 1, const float ki = 0.05, const float kd = 0.4);

	void setup();
	void updateMotorsSpeed(float ref_pitch, float pitch);
	void updateMotorOffsets(float offset1, float offset2);

	float control_signal;
	int motor1_speed, motor2_speed;
};

#endif
