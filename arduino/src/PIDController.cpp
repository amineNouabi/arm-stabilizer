#include "stabilizer.h"

PIDController::PIDController(const float kp, const float ki, const float kd, const float dt, const float min, const float max)
	: kp_(kp), ki_(ki), kd_(kd), dt_(dt), min_(min), max_(max), yp_(0), yd_(0), prev_error(0), istate_(0), y_(0), anti_windup_(1) {}

PIDController::~PIDController() {}

float PIDController::compute(const float ref, const float feedback)
{
	float error = ref - feedback;
	/* Proportional error */
	yp_ = kp_ * error;

	/* Derivative error */
	yd_ = kd_ * (error - prev_error) / dt_;
	prev_error = error;

	/* Compute output */
	y_ = yp_ + ki_ * istate_ + yd_;

	/* Saturation and anti-windup */
	if (y_ > max_)
	{
		y_ = max_;
		if (ki_ * error > 0)
			anti_windup_ = 0;
		else
			anti_windup_ = 1;
	}
	else if (y_ < min_)
	{
		y_ = min_;
		if (ki_ * error < 0)
			anti_windup_ = 0;
		else
			anti_windup_ = 1;
	}
	else
		anti_windup_ = 1;

	/* Integrator state */
	istate_ += dt_ * error * anti_windup_;

	return y_;
}
