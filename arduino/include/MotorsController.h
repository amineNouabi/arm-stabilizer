#ifndef MOTORSCONTROLLER_HPP
#define MOTORSCONTROLLER_HPP

#include "stabilization.h"

#include <control.h>

class MotorsController
{
public:
	ESC esc_1;
#if AVAILABLE_ESCS > 1
	ESC esc_2;
#endif

	// bfs::Pid pid;
	MotorsController();
	void calibrate();
	// void readAndUpdate();
};

#endif
