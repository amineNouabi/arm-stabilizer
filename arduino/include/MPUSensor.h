#ifndef MPUSENSOR_HPP
#define MPUSENSOR_HPP

#include "stabilizer.h"

class MPUSensor
{
private:
	uint8_t accel_fs, gyro_fs, dlpf_bw;
	long ax_offset, ay_offset, az_offset, gx_offset, gy_offset, gz_offset;
	I2cInterface i2c;

	const float _fusion_alpha = 0.9996f;
	const float _r2d = 180.0f / 3.14159265359f;
	const float _g_scale[4] = {131.0, 65.5, 32.8, 16.4};
	const float _a_scale[4] = {16384.0, 8192.0, 4096.0, 2048.0};

public:
	long ax_raw, ay_raw, az_raw, gx_raw, gy_raw, gz_raw;
	double ax, ay, az, gx, gy, gz;
	double roll, pitch, yaw;
	double a_roll, a_pitch, a_yaw;
	double g_roll, g_pitch, g_yaw;
	float delta_t;

	MPUSensor(
		float delta_t,
		uint8_t mpu_address = MPU6050_DEFAULT_ADDRESS,
		uint8_t gyro_fs = MPU6050_GYRO_FS_250,
		uint8_t accel_fs = MPU6050_ACCEL_FS_4,
		uint8_t dlpf_bw = MPU6050_DLPF_BW_42);

	int8_t getDeviceId();
	void calibrate(uint16_t loops_number);
	void setup();
	void read();
	void readAccelerometer(bool is_calibrating = false);
	void readGyroscope(bool is_calibrating = false);
	void readAndUpdate();
};

#endif
