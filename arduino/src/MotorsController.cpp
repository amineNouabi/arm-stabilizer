#include "stabilizer.h"

MotorsController::MotorsController(const float dt, const float kp = 1.7, const float ki = 0.05, const float kd = 0.3)
	: pid(kp, ki, kd, dt, MOTORS_MIN_OFFSET, MOTORS_MAX_OFFSET),
	  motor1_speed(0), motor2_speed(0),
	  control_signal(0), motor1_offset(0), motor2_offset(0),
	  motor1(MOTOR_1_PIN, MOTORS_MIN_SPEED, MOTORS_MAX_SPEED, MOTORS_ARM_SPEED),
	  motor2(MOTOR_2_PIN, MOTORS_MIN_SPEED, MOTORS_MAX_SPEED, MOTORS_ARM_SPEED)
{
}

void MotorsController::setup()
{

#ifdef DEBUG_LOGS
	Serial.println("Starting motors setup ....");

	Serial.println("Calibrating 1st motor ...");
#endif
	motor1.calib();

#ifdef DEBUG_LOGS
	Serial.println("Calibrating 2nd motor ...");
#endif
	motor2.calib();

	updateMotorOffsets(0, 80);
#ifdef DEBUG_LOGS
	Serial.println("Successful Motors setup");
#endif
}

void MotorsController::updateMotorOffsets(float offset1, float offset2)
{
	motor1_offset = offset1;
	motor2_offset = offset2;
}

void MotorsController::updateMotorsSpeed(float ref_pitch, float pitch)
{
	// Compute the control signal using the PID controller
	control_signal = pid.compute(ref_pitch, pitch);

	// Update motor speeds based on the control signal
	motor1_speed = constrain(MOTORS_MID_SPEED + control_signal - motor1_offset, MOTORS_MIN_SPEED, MOTORS_MAX_SPEED);
	motor2_speed = constrain(MOTORS_MID_SPEED - control_signal - motor2_offset, MOTORS_MIN_SPEED, MOTORS_MAX_SPEED);

	// Update the motors speed
	motor1.speed(motor1_speed);
	motor2.speed(motor2_speed);
}
