#ifndef MOTORSCONTROLLER_HPP
#define MOTORSCONTROLLER_HPP

#define MOTORS_MIN_SPEED 1000.0
#define MOTORS_MID_SPEED 1500.0
#define MOTORS_MAX_SPEED 2000.0

#define MOTORS_MAX_OFFSET 400.0
#define MOTORS_MIN_OFFSET -400.0

#include "stabilizer.h"

class MotorsController
{
public:
	PIDController pid;
	MotorsController(const float dt, const float kp = 1.0, const float ki = 0.1, const float kd = 0.01);
	void updateMotorsSpeed(float ref_pitch, float pitch);

	float motor1_speed, motor2_speed;
};

#endif
