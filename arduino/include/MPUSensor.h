#ifndef MPUSENSOR_HPP
#define MPUSENSOR_HPP

#if defined(ARDUINO)
#include <Arduino.h>
#endif

#include <MPU9250.h>
#include <SensorFusion.h>

class MPUSensor
{

public:
	MPUSensor() : gx(0), gy(0), gz(0), ax(0), ay(0), az(0), mx(0), my(0), mz(0), temp(0),
				  pitchDegrees(0), rollDegrees(0), yawDegrees(0),
				  pitchRadians(0), rollRadians(0), yawRadians(0),
				  targetPitch(0), targetRoll(0), targetYaw(0),
				  IMU(Wire, 0x68), status(0), filter() {}

	void setup();
	void readAndUpdate();

	float gx, gy, gz, ax, ay, az, mx, my, mz, temp;
	float pitchDegrees, rollDegrees, yawDegrees;
	float pitchRadians, rollRadians, yawRadians;
	float targetPitch, targetRoll, targetYaw;

private:
	MPU9250 IMU;
	int status;
	SF filter;
};

#endif
