#include "stabilization.h"

MotorsController::MotorsController() : esc_1(MOTOR_1_PIN, MOTOR_MIN_SPEED, MOTOR_MAX_SPEED, MOTOR_ARM_SPEED)
{
#if AVAILABLE_ESCS > 1
	esc_2 = ESC(MOTOR_2_PIN, MOTOR_MIN_SPEED, MOTOR_MAX_SPEED, MOTOR_ARM_SPEE);
#endif
}

void MotorsController::calibrate()
{
	esc_1.calib();
	esc_1.stop();

#if AVAILABLE_ESCS > 1
	esc_2.calib();
	esc_2.stop();
#endif
}
