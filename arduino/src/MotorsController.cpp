#include "stabilizer.h"

MotorsController::MotorsController(const float dt, const float kp = 1, const float ki = 0.05, const float kd = 0.4)
	: pid(kp, ki, kd, dt, MOTORS_MIN_OFFSET, MOTORS_MAX_OFFSET),
	  motor1_speed(0), motor2_speed(0),
	  control_signal(0), motor1_offset(0), motor2_offset(0),
	  motor1(MOTOR_1_PIN, MOTORS_MIN_SPEED, MOTORS_MAX_SPEED, MOTORS_ARM_SPEED),
	  motor2(MOTOR_2_PIN, MOTORS_MIN_SPEED, MOTORS_MAX_SPEED, MOTORS_ARM_SPEED)
{
	motor1.setCalibrationDelay(5000);
	motor2.setCalibrationDelay(5000);
}

void MotorsController::setup()
{
#ifdef DEBUG_LOGS
	Serial.println("Starting motors setup ....");

	Serial.println("Calibrating motors ...");
#endif

	motor1.arm();
	motor2.arm();
	delay(2000);

	motor1.speed(MOTORS_MAX_SPEED);
	motor2.speed(MOTORS_MAX_SPEED);
	delay(5000);

	motor1.speed(MOTORS_MIN_SPEED);
	motor2.speed(MOTORS_MIN_SPEED);
	delay(5000);

	// updateMotorOffsets(0, 20);
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
	motor1_speed = constrain((int)(MOTORS_1_MID_SPEED + control_signal), MOTORS_1_MIN_SPEED, MOTORS_1_MAX_SPEED);
	motor2_speed = constrain((int)(MOTORS_2_MID_SPEED - control_signal), MOTORS_2_MIN_SPEED, MOTORS_2_MAX_SPEED);

	// Update the motors speed
	motor1.speed(motor1_speed);
	motor2.speed(motor2_speed);
}
