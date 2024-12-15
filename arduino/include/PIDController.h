#ifndef _PID_CONTROLLER_H_
#define _PID_CONTROLLER_H_

#include "stabilizer.h"

class PIDController
{
public:
	PIDController(const float kp, const float ki, const float kd, const float dt, const float min, const float max);
	~PIDController();
	float compute(const float ref, const float feedback);

private:
	/* Control law constants */
	const float kp_ = 0, ki_ = 0, kd_ = 0, dt_ = 0, min_, max_;
	/* PID responses */
	float yp_ = 0, yd_ = 0;
	/* Derivative state */
	float prev_error = 0;
	/* Integrator state */
	float istate_ = 0;
	/* Output */
	float y_;
	/* Clamping */
	float anti_windup_ = 1;
};

#endif // _PID_CONTROLLER_H_
