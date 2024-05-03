#include "stabilization.h"

MPUSensor mpu;
MotorsController motors;

// The time variables to keep track of the time.
unsigned long start_micros, current_micros, deltat_micros, prev_micros;

double current_time = 0.0f, deltat = 0.0f;

void setup()
{

	// serial to display data
#if defined(SERIAL_DEBUG) || defined(SERIAL_PLOTER) || defined(EULER_DATA) || defined(RAW_DATA) || defined(SENSORS_PLOT)
	Serial.begin(115200);

	while (!Serial)
		;
#endif

#ifdef SERIAL_DEBUG
	Serial.println("Starting up ...");
#endif
	// Saves the start time.
	start_micros = micros();

#ifdef SERIAL_DEBUG
	Serial.println("Starting MPU Sensor ...");
#endif
	// Start MPU Sensor
	mpu.setup();

	// Calibrate ESCs
#ifdef SERIAL_DEBUG
	Serial.println("Calibrating ESCs ...");
#endif
	// motors.calibrate();
#ifdef SERIAL_DEBUG
	Serial.println("Calibration done ...");
#endif

	// Save the current time to the previous time.
	prev_micros = micros();
	delay(10);
}

void loop()
{
	// Compute times and delta times in seconds
	current_micros = micros();
	current_time = current_micros / MICRO_TO_SEC; // Convert microseconds to seconds.
	deltat_micros = (current_micros - prev_micros);
	deltat = deltat_micros / MICRO_TO_SEC; // Convert microseconds to seconds.
	prev_micros = current_micros;

#ifdef SERIAL_DEBUG
	Serial.println("Elapsed time (min) " + String((current_micros - start_micros) / 60000000.0f, 3));
	Serial.println("deltat (seconds): " + String(deltat, 4));
#endif
	// // Arm the motor
	// motors.esc_1.speed(MOTOR_ARM_SPEED);

	// read the sensor data and apply the filter to get the orientation.
	mpu.readAndUpdate();

#ifdef SENSORS_PLOT
	Serial << "$" << mpu.gx << " " << mpu.gy << " " << mpu.gz << " " << mpu.ax << " " << mpu.ay << " " << mpu.az << " " << current_time << "\n";
#endif

#ifdef RAW_DATA
	Serial << mpu.ax << ":" << mpu.ay << ":" << mpu.az << ":" << mpu.gx << ":" << mpu.gy << ":" << mpu.gz << ":" << mpu.mx << ":" << mpu.my << ":" << mpu.mz << ":" << current_time << "\n";
#endif

#ifdef EULER_DATA
	Serial << mpu.pitchDegrees << mpu.rollDegrees << mpu.yawDegrees << "\n"
		   << "\n";
#endif

#ifdef SERIAL_PLOTER
	Serial << mpu.pitchRadians << "," << mpu.rollRadians << "," << mpu.yawRadians << "\n";
#endif
	delay(200);
}
