#include "stabilization.h"

/**
 * @brief Start the MPU Sensor connection and set the configuration.
 *
 * @return void
 */
void MPUSensor::setup()
{
#ifdef SERIAL_DEBUG
	Serial.println("Starting MPU Sensor connection ...");
#endif
	// start communication with MPU Sensor
	status = IMU.begin();
	if (status < 0)
	{
#ifdef SERIAL_DEBUG
		Serial.println("MPU Sensor initialization unsuccessful");
		Serial.print("Status: ");
		Serial.println(status);
#endif
		while (1)
			;
	}

	// // setting the accelerometer full scale range to +/-8G
	// IMU.setAccelRange(MPU9250::ACCEL_RANGE_8G);
	// // setting the gyroscope full scale range to +/-500 deg/s
	// IMU.setGyroRange(MPU9250::GYRO_RANGE_500DPS);
	// // setting DLPF bandwidth to 20 Hz
	// IMU.setDlpfBandwidth(MPU9250::DLPF_BANDWIDTH_20HZ);
	// // setting SRD to 19 for a 50 Hz update rate
	// IMU.setSrd(19);

	// // Calibrate MPU Sensor
	// Serial.println("Calibrating angles ...");
	// Serial.println("Stay Still to targeted orientation ...");
	// Serial.println("Calibration will take 15 seconds ...");
	// start_time = millis();
	// while (start_time + 15000 > millis())
	// {
	// 	readAndUpdate();
	// 	delay(10);
	// }
}

/**
 * @brief Read the sensor data and apply the filter to get the orientation.
 *
 * @return void
 */
void MPUSensor::readAndUpdate()
{
	// read the sensor
	IMU.readSensor();
	ax = IMU.getAccelX_mss();
	ay = IMU.getAccelY_mss();
	az = IMU.getAccelZ_mss();
	gx = IMU.getGyroX_rads();
	gy = IMU.getGyroY_rads();
	gz = IMU.getGyroZ_rads();
	mx = IMU.getMagX_uT();
	my = IMU.getMagY_uT();
	mz = IMU.getMagZ_uT();
	temp = IMU.getTemperature_C();

	// commented out to control the filter update rate
	float deltat = filter.deltatUpdate();

	// filter.MahonyUpdate(gx, gy, gz, ax, ay, az, mx, my, mz, deltat);  //mahony is suggested if there isn't the mag
	filter.MadgwickUpdate(gx, gy, gz, ax, ay, az, mx, my, mz, deltat); // else use the magwick

	rollDegrees = filter.getRoll();
	pitchDegrees = filter.getPitch();
	yawDegrees = filter.getYaw();

	rollRadians = filter.getRollRadians();
	pitchRadians = filter.getPitchRadians();
	yawRadians = filter.getYawRadians();
}
