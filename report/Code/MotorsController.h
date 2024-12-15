#include "ESC.h"

#define MAX_SPEED 2000
#define MIN_SPEED 1000
#define ARM_SPEED 500
#define MEAN_SPEED 1500

class MotorsController
{
public:
	// (PIN, Minimum Value, Maximum Value, Arm Value)
	ESC esc_1(9, MIN_SPEED, MAX_SPEED, ARM_SPEED);
	ESC esc_2(8, MIN_SPEED, MAX_SPEED, ARM_SPEED);
	PID pid(PID_KP, PID_KI, PID_KD, -400, 400);

	void setup();
	void update();
};
