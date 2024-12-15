#ifndef _I2C_INTERFACE_
#define _I2C_INTERFACE_

#include "stabilizer.h"

class I2cInterface
{
private:
	uint8_t deviceAddress;
	uint16_t readTimeout;

public:
	I2cInterface(uint8_t deviceAddress, uint16_t readTimeout);

	int8_t readBytes(uint8_t regAddr, uint8_t length, uint8_t *data);
	int8_t readByte(uint8_t regAddr, uint8_t *data);
	int8_t readBit(uint8_t regAddr, uint8_t bitNum, uint8_t *data);
	int8_t readBits(uint8_t regAddr, uint8_t bitStart, uint8_t length, uint8_t *data);

	bool writeBytes(uint8_t regAddr, uint8_t length, uint8_t *data);
	bool writeByte(uint8_t regAddr, uint8_t data);
	bool writeBit(uint8_t regAddr, uint8_t bitNum, uint8_t data);
	bool writeBits(uint8_t regAddr, uint8_t bitStart, uint8_t length, uint8_t data);
};

#endif /* _I2C_INTERFACE_ */
