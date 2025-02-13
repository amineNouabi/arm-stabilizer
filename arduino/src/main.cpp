#include "stabilizer.h"

// Define the sampling time 0.004s = 4ms = 4000µs
const float delta_t = 0.004f;
const uint16_t delta_t_micros = 4000;

const float alpha_fusion = 0.9996f;

uint32_t loop_timer = 0;

MPUSensor mpuSensor(
	delta_t
	// MPU6050_ACCEL_FS_4,
	// MPU6050_GYRO_FS_250,
	// MPU6050_DLPF_BW_42,
	// MPU6050_ADDRESS_AD0_HIGH
);

MotorsController motorsController(delta_t);

const float pitch_ref = 0.0f;

void setup()
{
#if defined(DEBUG_LOGS) || defined(SERIAL_PLOTER) || defined(LOG_ANGLE) || defined(LOG_RAW_MPU)
	Serial.begin(115200);
#endif

#ifdef DEBUG_LOGS
	Serial.println("-------             ARM Stabilizer (DEBUG: ON)             -------");
	Serial.println("------------------------------------------------------------------");
#endif

	Serial.println("5 seconds before starting the motors ...");
	delay(5000);

	// Setup the motors
	motorsController.setup();

	// Setup the MPU Sensor
	mpuSensor.setup();

	loop_timer = micros() + delta_t_micros;
}

void loop()
{
	// Read and update the sensor data: output roll, pitch and yaw
	mpuSensor.readAndUpdate();

	// Update the motors speed
	motorsController.updateMotorsSpeed(pitch_ref, mpuSensor.pitch_deg);

#if defined(DEBUG_LOGS) && defined(LOG_ANGLE)
	Serial.print("roll\t");
	Serial.print(mpuSensor.roll);
	Serial.print("\tpitch\t");
	Serial.print(mpuSensor.pitch);
	Serial.print("\tyaw\t");
	Serial.println(mpuSensor.yaw);
#endif /* ANGLE_PRINT */

#if defined(DEBUG_LOGS) && defined(LOG_RAW_MPU)
	// Print raw data
	Serial.print("Accel\t");
	Serial.print(mpuSensor.ax_raw);
	Serial.print("\t");
	Serial.print(mpuSensor.ay_raw);
	Serial.print("\t");
	Serial.print(mpuSensor.az_raw);

	Serial.print("\tGyro\t");
	Serial.print(mpuSensor.gx_raw);
	Serial.print("\t");
	Serial.print(mpuSensor.gy_raw);
	Serial.print("\t");
	Serial.println(mpuSensor.gz_raw);
#endif /* RAW_MPU_DATA */

#ifdef SERIAL_PLOTER
	/**
	 * Serial plotter data format:
	 * 	roll	pitch	yaw 	control_signal
	 */
	Serial.print(mpuSensor.roll_deg);
	Serial.print("\t");
	Serial.print(mpuSensor.pitch_deg);
	Serial.print("\t");
	Serial.print(mpuSensor.yaw_deg);
	Serial.print("\t");
	Serial.print(motorsController.control_signal);
	Serial.print("\n");
	/**
	 * Serial plotter data format: a_roll g_roll a_pitch g_pitch g_yaw
	 */

	// Serial.print(mpuSensor.a_roll);
	// Serial.print("\t");
	// Serial.print(mpuSensor.g_roll);
	// Serial.print("\t\t\t");
	// Serial.print(mpuSensor.a_pitch);
	// Serial.print("\t");
	// Serial.print(mpuSensor.g_pitch);
	// Serial.print("\t\t\t");
	// Serial.print(mpuSensor.g_yaw);
	// Serial.print("\n");

#endif

	// Wait for the next loop time
	while (micros() < loop_timer)
		;
	loop_timer += delta_t_micros;
}
