#ifndef MPUSENSOR_HPP
#define MPUSENSOR_HPP

#include "stabilizer.h"

class MPUSensor
{
private:
	uint8_t accel_fs, gyro_fs, dlpf_bw;
	long ax_offset, ay_offset, az_offset, gx_offset, gy_offset, gz_offset;
	I2cInterface i2c;

	/**
	 * @brief Complementary filter alpha value.
	 */
	const float _fusion_alpha = 0.9996f;

	/**
	 * @brief Gyroscope sensitivity scale factors.
	 */
	const double _g_scale[4] = {131.0, 65.5, 32.8, 16.4};

	/**
	 * @brief Accelerometer sensitivity scale factors.
	 */
	const double _a_scale[4] = {16384.0, 8192.0, 4096.0, 2048.0};

public:
	/**
	 * @brief Conversion factor from radians to degrees.
	 */
	const double _r2d = 180.0f / 3.14159265359f;

	long ax_raw, ay_raw, az_raw, gx_raw, gy_raw, gz_raw;

	double gx_rad_s, gy_rad_s, gz_rad_s;
	double gx_deg_s, gy_deg_s, gz_deg_s;

	double ax_g, ay_g, az_g;

	double roll_deg, pitch_deg, yaw_deg;
	double roll_rad, pitch_rad, yaw_rad;

	double a_roll, a_pitch;
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
