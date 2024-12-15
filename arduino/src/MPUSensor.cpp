#include "stabilizer.h"

MPUSensor ::MPUSensor(
	float delta_t, uint8_t mpu_address = MPU6050_DEFAULT_ADDRESS, uint8_t gyro_fs = MPU6050_GYRO_FS_250, uint8_t accel_fs = MPU6050_ACCEL_FS_4, uint8_t dlpf_bw = MPU6050_DLPF_BW_42)
	: accel_fs(accel_fs), gyro_fs(gyro_fs), dlpf_bw(dlpf_bw),
	  roll(0), pitch(0), yaw(0),
	  i2c(mpu_address, I2C_DEFAULT_TIMEOUT),
	  delta_t(delta_t)
{
}

void MPUSensor::calibrate(uint16_t loops_number)
{
#ifdef DEBUG_LOGS
	Serial.println("-----------------------------------");
	Serial.println("Starting MPU Sensor calibration ...");
#endif

	ax_offset = ay_offset = az_offset = gx_offset = gy_offset = gz_offset = 0;

	uint16_t counter;

	for (counter = 0; counter < loops_number; counter++)
	{
		readAccelerometer(true);

		ax_offset += ax_raw;
		ay_offset += ay_raw;
		az_offset += az_raw;

#ifdef DEBUG_LOGS
		Serial.print(".");
#endif
		delayMicroseconds(3700);
	}

	ax_offset /= loops_number;
	ay_offset /= loops_number;
	az_offset /= loops_number;

#ifdef DEBUG_LOGS
	Serial.println("");
	Serial.println("Accelerometer Calibration done.");
	Serial.println("ax_offset:\t" + String(ax_offset));
	Serial.println("ay_offset:\t" + String(ay_offset));
	Serial.println("az_offset:\t" + String(az_offset));
	Serial.println("Starting Gyroscope Calibration ...");
#endif

	for (counter = 0; counter < loops_number; counter++)
	{
		readGyroscope(true);

		gx_offset += gx_raw;
		gy_offset += gy_raw;
		gz_offset += gz_raw;

#ifdef DEBUG_LOGS
		Serial.print(".");
#endif
		delayMicroseconds(3700);
	}

	gx_offset /= loops_number;
	gy_offset /= loops_number;
	gz_offset /= loops_number;

#ifdef DEBUG_LOGS
	Serial.println("");
	Serial.println("Gyroscope Calibration done.");
	Serial.println("gx_offset:\t" + String(gx_offset));
	Serial.println("gy_offset:\t" + String(gy_offset));
	Serial.println("gz_offset:\t" + String(gz_offset));
	Serial.println("Calibration done.");
#endif
}

int8_t MPUSensor::getDeviceId()
{
	uint8_t buffer;
	if (i2c.readBits(MPU6050_RA_WHO_AM_I, MPU6050_WHO_AM_I_BIT, MPU6050_WHO_AM_I_LENGTH, &buffer) > 0)
		return (buffer);
	return (-1);
}

void MPUSensor::setup()
{
#ifdef DEBUG_LOGS
	Serial.println("-----------------------------------");
	Serial.println("Starting MPU Sensor setup ...");
#endif

	while (getDeviceId() != MPU6050_WHO_AM_I)
	{
#ifdef DEBUG_LOGS
		Serial.println("Error: MPU Sensor not found, please provide a valid MPU-60X0.");
		Serial.println("Rechecking in 5 seconds ...");
#endif
		delay(5000);
	}

#ifdef DEBUG_LOGS
	Serial.println("Successfully Found MPU Sensor ...");
	Serial.println("Configuring MPU Sensor ...");
#endif

	// By default the MPU-6050 sleeps. So we have to wake it up.
	// We want to write to the PWR_MGMT_1 register (6B hex) 0 at SLEEP bit
	if (!i2c.writeBit(MPU6050_RA_PWR_MGMT_1, MPU6050_PWR1_SLEEP_BIT, 0))
	{
#ifdef DEBUG_LOGS
		Serial.println("Error: Could not wake up MPU Sensor.");
#endif
	}

	// Set the Clock Source to PLL with X axis gyroscope reference
	// 	if (!i2c.writeBits(MPU6050_RA_PWR_MGMT_1, MPU6050_PWR1_CLKSEL_BIT, MPU6050_PWR1_CLKSEL_LENGTH, 0x01))
	// 	{
	// #ifdef DEBUG_LOGS
	// 		Serial.println("Error: Could not set the clock source to PLL with X axis gyroscope reference.");
	// #endif
	// 	}

	// Set the full scale of the gyro to (default = +- 250º/s).
	if (!i2c.writeBits(MPU6050_RA_GYRO_CONFIG, MPU6050_GCONFIG_FS_SEL_BIT, MPU6050_GCONFIG_FS_SEL_LENGTH, gyro_fs))
	{
#ifdef DEBUG_LOGS
		Serial.println("Error: Could not set the full scale of the gyro.");
#endif
	}
	// Set the full scale of the accelerometer to (default = +- 4g).
	if (!i2c.writeBits(MPU6050_RA_ACCEL_CONFIG, MPU6050_ACONFIG_AFS_SEL_BIT, MPU6050_ACONFIG_AFS_SEL_LENGTH, accel_fs))
	{
#ifdef DEBUG_LOGS
		Serial.println("Error: Could not set the full scale of the accelerometer to +/- 4g.");
#endif
	}
	// Set some filtering to improve the raw data. BandWidth (default = 42Hz)
	if (!i2c.writeBits(MPU6050_RA_CONFIG, MPU6050_CFG_DLPF_BIT, MPU6050_CFG_DLPF_LENGTH, dlpf_bw))
	{
#ifdef DEBUG_LOGS
		Serial.println("Error: Could not set some filtering to improve the raw data.");
#endif
	}

#ifdef DEBUG_LOGS
	Serial.println("Successful MPU Sensor setup");
#endif

	calibrate(CALIBRATION_LOOP_N);

#ifdef DEBUG_LOGS
	Serial.println("Starting Loop program with these settings:");

	Serial.print("gyro_fs:\t");
	Serial.print(gyro_fs);
	Serial.print("\tLSB TO º/s\t");
	Serial.println(_g_scale[gyro_fs]);

	Serial.print("accel_fs:\t");
	Serial.print(accel_fs);
	Serial.print("\tLSB TO g\t");
	Serial.println(_a_scale[accel_fs]);

	Serial.print("dlpf_bw:\t");
	Serial.println(dlpf_bw);
#endif

	delay(1000);
}

void MPUSensor::readAccelerometer(bool is_calibrating = false)
{
	uint8_t buffer[6];

	if (i2c.readBytes(MPU6050_RA_ACCEL_OUT, 6, buffer) != 6)
	{
#ifdef DEBUG_LOGS
		Serial.println("Error: Could not read the accelerometer data.");
#endif
		return;
	}

	ax_raw = ((((int16_t)buffer[0]) << 8) | buffer[1]);
	ay_raw = ((((int16_t)buffer[2]) << 8) | buffer[3]);
	az_raw = ((((int16_t)buffer[4]) << 8) | buffer[5]);

	if (!is_calibrating)
	{
		ax = (ax_raw -= ax_offset) / _a_scale[gyro_fs];
		ay = (ay_raw -= ay_offset) / _a_scale[gyro_fs];
		az = (az_raw -= az_offset + _a_scale[accel_fs]) / _a_scale[gyro_fs];
	}
}

void MPUSensor::readGyroscope(bool is_calibrating = false)
{
	uint8_t buffer[6];

	if (i2c.readBytes(MPU6050_RA_GYRO_OUT, 6, buffer) != 6)
	{
#ifdef DEBUG_LOGS
		Serial.println("Error: Could not read the gyroscope data.");
#endif
		return;
	}

	gx_raw = (((((int16_t)buffer[0]) << 8) | buffer[1]));
	gy_raw = (((((int16_t)buffer[2]) << 8) | buffer[3]));
	gz_raw = (((((int16_t)buffer[4]) << 8) | buffer[5]));

	if (!is_calibrating)
	{
		gx = (gx_raw -= gx_offset) / _g_scale[gyro_fs];
		gy = (gy_raw -= gy_offset) / _g_scale[gyro_fs];
		gz = (gz_raw -= gz_offset) / _g_scale[gyro_fs];
	}
}

void MPUSensor::read()
{
	readAccelerometer();
	readGyroscope();
}

void MPUSensor::readAndUpdate()
{
	read();

	// Roll calculation
	a_roll = atan2(ay, sqrt(ax * ax + az * az)) * _r2d;
	g_roll = roll + gx * delta_t;

	roll = _fusion_alpha * g_roll + (1 - _fusion_alpha) * a_roll;

	// Pitch calculation
	a_pitch = atan2(ax, sqrt(ay * ay + az * az)) * _r2d;
	g_pitch = pitch + gy * delta_t;

	pitch = _fusion_alpha * g_pitch + (1 - _fusion_alpha) * a_pitch;

	// Yaw calculation
	a_yaw = atan2(ay, sqrt(ax * ax + az * az)) * _r2d;
	g_yaw = yaw + gz * delta_t;

	yaw = _fusion_alpha * g_yaw + (1 - _fusion_alpha) * a_yaw;
}
