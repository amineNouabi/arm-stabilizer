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

	long ax_raw = 0, ay_raw = 0, az_raw = 0;
	long gx_raw = 0, gy_raw = 0, gz_raw = 0;

	double gx_rad_s = 0.0, gy_rad_s = 0.0, gz_rad_s = 0.0;
	double gx_deg_s = 0.0, gy_deg_s = 0.0, gz_deg_s = 0.0;

	double ax_g = 0.0, ay_g = 0.0, az_g = 0.0;

	double roll_deg = 0.0, pitch_deg = 0.0, yaw_deg = 0.0;
	double roll_rad = 0.0, pitch_rad = 0.0, yaw_rad = 0.0;

	double a_roll = 0.0, a_pitch = 0.0;
	double g_roll = 0.0, g_pitch = 0.0;
	double g_yaw = 0.0;

	float delta_t;

	MPUSensor(
		float delta_t,
		uint8_t gyro_fs = MPU6050_GYRO_FS_250,
		uint8_t accel_fs = MPU6050_ACCEL_FS_4,
		uint8_t dlpf_bw = MPU6050_DLPF_BW_42,
		uint8_t mpu_address = MPU6050_DEFAULT_ADDRESS);

	int8_t getDeviceId();
	void calibrate(uint16_t loops_number);
	void setup();
	void read();
	void readAccelerometer(bool is_calibrating = false);
	void readGyroscope(bool is_calibrating = false);
	void readAndUpdate();
};

#endif
