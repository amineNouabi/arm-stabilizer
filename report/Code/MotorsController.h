#ifndef MOTORSCONTROLLER_HPP
#define MOTORSCONTROLLER_HPP

#define MOTORS_MIN_SPEED 1050.0
#define MOTORS_MAX_SPEED 1400.0

#define MOTORS_ARM_SPEED 1000.0
#define MOTORS_MID_SPEED 1200.0

#define MOTORS_MAX_OFFSET 200
#define MOTORS_MIN_OFFSET -150

#define MOTOR_1_PIN 12
#define MOTOR_2_PIN 2

#include "stabilizer.h"

class MotorsController
{
public:
	PIDController pid;
	ESC motor1, motor2;
	float motor1_offset, motor2_offset;

	// MotorsController(const float dt, const float kp = 1.0, const float ki = 0.1, const float kd = 0.01);
	MotorsController(const float dt, const float kp = 1.7, const float ki = 0.05, const float kd = 0.3);

	void setup();
	void updateMotorsSpeed(float ref_pitch, float pitch);
	void updateMotorOffsets(float offset1, float offset2);

	float control_signal, motor1_speed, motor2_speed;
};

#endif
