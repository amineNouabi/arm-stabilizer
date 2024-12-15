#include "stabilizer.h"

MotorsController::MotorsController(const float dt, const float kp = 1.0, const float ki = 0.1, const float kd = 0.01)
	: pid(kp, ki, kd, dt, MOTORS_MIN_OFFSET, MOTORS_MAX_OFFSET), motor1_speed(0), motor2_speed(0) {}

void MotorsController::updateMotorsSpeed(float ref_pitch, float pitch)
{
	// Compute the control signal using the PID controller
	float control_signal = pid.compute(ref_pitch, pitch);

	// Update motor speeds based on the control signal
	motor1_speed = constrain(MOTORS_MID_SPEED + control_signal, MOTORS_MIN_SPEED, MOTORS_MAX_SPEED);
	motor2_speed = constrain(MOTORS_MID_SPEED - control_signal, MOTORS_MIN_SPEED, MOTORS_MAX_SPEED);
}
