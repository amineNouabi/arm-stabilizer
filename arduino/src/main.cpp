#include "stabilizer.h"

// Define the sampling time 0.004s = 4ms = 4000µs
const float delta_t = 0.004f;
const uint16_t delta_t_micros = delta_t * 1e6;

uint32_t loop_timer = 0;

MPUSensor mpuSensor(delta_t);
MotorsController motorsController(delta_t);

const float pitch_ref = 0.0;

void setup()
{
#if defined(DEBUG_LOGS) || defined(SERIAL_PLOTER) || defined(LOG_ANGLE) || defined(LOG_RAW_MPU)
	Serial.begin(115200);
#endif

#ifdef DEBUG_LOGS
	Serial.println("-------             ARM Stabilizer (DEBUG: ON)             -------");
	Serial.println("------------------------------------------------------------------");
#endif

	// Setup the MPU Sensor
	mpuSensor.setup();

	loop_timer = micros() + delta_t_micros;
}

void loop()
{

	mpuSensor.readAndUpdate();

	// Update the motors speed
	motorsController.updateMotorsSpeed(pitch_ref, mpuSensor.pitch);

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
	Serial.print(mpuSensor.roll);
	Serial.print("\t");
	Serial.print(mpuSensor.pitch);
	Serial.print("\t");
	Serial.print(mpuSensor.yaw);
	Serial.print("\t");
	Serial.print(motorsController.motor1_speed);
	Serial.print("\t");
	Serial.print(motorsController.motor2_speed);
	Serial.print("\n");
#endif

	// Wait for the next loop time
	while (micros() < loop_timer)
		;
	loop_timer += delta_t_micros;
}
