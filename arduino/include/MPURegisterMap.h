#ifndef _MPU_REGISTER_MAP_H_
#define _MPU_REGISTER_MAP_H_

/*
 * REGISTER MAP for MPU 60X0:
 *  - Ordered by register address.
 *  - not full only used registers for this project.
 */

// Config registers
#define MPU6050_RA_CONFIG 0x1A
#define MPU6050_RA_GYRO_CONFIG 0x1B
#define MPU6050_RA_ACCEL_CONFIG 0x1C

// Accelerometer out
#define MPU6050_RA_ACCEL_XOUT_H 0x3B
#define MPU6050_RA_ACCEL_XOUT_L 0x3C
#define MPU6050_RA_ACCEL_YOUT_H 0x3D
#define MPU6050_RA_ACCEL_YOUT_L 0x3E
#define MPU6050_RA_ACCEL_ZOUT_H 0x3F
#define MPU6050_RA_ACCEL_ZOUT_L 0x40
#define MPU6050_RA_ACCEL_OUT MPU6050_RA_ACCEL_XOUT_H

// Gyroscope out
#define MPU6050_RA_GYRO_XOUT_H 0x43
#define MPU6050_RA_GYRO_XOUT_L 0x44
#define MPU6050_RA_GYRO_YOUT_H 0x45
#define MPU6050_RA_GYRO_YOUT_L 0x46
#define MPU6050_RA_GYRO_ZOUT_H 0x47
#define MPU6050_RA_GYRO_ZOUT_L 0x48
#define MPU6050_RA_GYRO_OUT MPU6050_RA_GYRO_XOUT_H

// Power management
#define MPU6050_RA_PWR_MGMT_1 0x6B

// Who am i
#define MPU6050_RA_WHO_AM_I 0x75

/********        ORDERED REGISTER MAP END        **********/

/**
 * Helper values for registers
 *  - Bit positions and lengths
 *  - Values for configuration
 *
 */

// MPU address
#define MPU6050_ADDRESS_AD0_LOW 0x68  // address pin low (GND), default for InvenSense evaluation board
#define MPU6050_ADDRESS_AD0_HIGH 0x69 // address pin high (VCC)
#define MPU6050_DEFAULT_ADDRESS MPU6050_ADDRESS_AD0_LOW

// MPU Config
#define MPU6050_CFG_DLPF_BIT 2
#define MPU6050_CFG_DLPF_LENGTH 3

#define MPU6050_DLPF_BW_256 0x00
#define MPU6050_DLPF_BW_188 0x01
#define MPU6050_DLPF_BW_98 0x02
#define MPU6050_DLPF_BW_42 0x03
#define MPU6050_DLPF_BW_20 0x04
#define MPU6050_DLPF_BW_10 0x05
#define MPU6050_DLPF_BW_5 0x06

// Accelerometer CONFIG
#define MPU6050_ACONFIG_AFS_SEL_BIT 4
#define MPU6050_ACONFIG_AFS_SEL_LENGTH 2

#define MPU6050_ACCEL_FS_2 0x00
#define MPU6050_ACCEL_FS_4 0x01
#define MPU6050_ACCEL_FS_8 0x02
#define MPU6050_ACCEL_FS_16 0x03

// Gyroscope CONFIG
#define MPU6050_GCONFIG_FS_SEL_BIT 4
#define MPU6050_GCONFIG_FS_SEL_LENGTH 2

#define MPU6050_GYRO_FS_250 0x00
#define MPU6050_GYRO_FS_500 0x01
#define MPU6050_GYRO_FS_1000 0x02
#define MPU6050_GYRO_FS_2000 0x03

// Power Management
#define MPU6050_PWR1_DEVICE_RESET_BIT 7
#define MPU6050_PWR1_SLEEP_BIT 6
#define MPU6050_PWR1_CYCLE_BIT 5
#define MPU6050_PWR1_TEMP_DIS_BIT 3
#define MPU6050_PWR1_CLKSEL_BIT 2
#define MPU6050_PWR1_CLKSEL_LENGTH 3

// Who am i
#define MPU6050_WHO_AM_I_BIT 6
#define MPU6050_WHO_AM_I_LENGTH 6
#define MPU6050_WHO_AM_I 0x34

#endif /* _MPU_REGISTER_MAP_H_ */
