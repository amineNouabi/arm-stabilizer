#include "stabilizer.h"

I2cInterface::I2cInterface(uint8_t deviceAddress, uint16_t readTimeout)
	: deviceAddress(deviceAddress), readTimeout(readTimeout) {}

bool I2cInterface::writeBit(uint8_t regAddr, uint8_t bitNum, uint8_t data)
{
	uint8_t buffer;
	readByte(regAddr, &buffer);
	buffer = data ? (buffer | (1 << bitNum)) : (buffer & ~((uint8_t)1 << bitNum));
	return (writeByte(regAddr, buffer));
}

bool I2cInterface::writeBits(uint8_t regAddr, uint8_t bitStart, uint8_t length, uint8_t data)
{
	uint8_t buffer;
	readByte(regAddr, &buffer);
	uint8_t mask = ((1 << length) - 1) << (bitStart - length + 1);
	data <<= (bitStart - length + 1);
	data &= mask;
	buffer &= ~(mask);
	buffer |= data;
	return (writeByte(regAddr, buffer));
}

bool I2cInterface::writeByte(uint8_t regAddr, uint8_t data)
{
	return (writeBytes(regAddr, 1, &data));
}

bool I2cInterface::writeBytes(uint8_t regAddr, uint8_t length, uint8_t *data)
{
	if (length >= BUFFER_LENGTH)
	{
#ifdef DEBUG_LOGS
		Serial.println("I2C error: Uimplemented feature writing more than 32 bytes at once.");
#endif
		return (false);
	}

	Wire.beginTransmission(deviceAddress);
	Wire.write(regAddr);

	for (uint8_t k = 0; k < length; k++)
		Wire.write(data[k]);

	return (Wire.endTransmission() == 0);
}

int8_t I2cInterface::readBit(uint8_t regAddr, uint8_t bitNum, uint8_t *data)
{
	uint8_t buffer;
	uint8_t count = readByte(regAddr, &buffer);
	*data = buffer & ((uint8_t)1 << bitNum);
	return (count);
}

int8_t I2cInterface::readBits(uint8_t regAddr, uint8_t bitStart, uint8_t length, uint8_t *data)
{
	uint8_t buffer;
	uint8_t count;
	if ((count = readByte(regAddr, &buffer) > 0))
	{
		uint8_t mask = ((1 << length) - 1) << (bitStart - length + 1);
		*data = (buffer & mask) >> (bitStart - length + 1);
	}
	return (count);
}

int8_t I2cInterface::readByte(uint8_t regAddr, uint8_t *data)
{
	return (readBytes(regAddr, 1, data));
}

int8_t I2cInterface::readBytes(uint8_t regAddr, uint8_t length, uint8_t *data)
{
	if (length >= BUFFER_LENGTH)
	{
#ifdef DEBUG_LOGS
		Serial.println("I2C error: Uimplemented feature reading more than 32 bytes at once.");
#endif
		return (-1);
	}

	uint8_t count = 0;
	uint32_t initialTime = millis();

	Wire.beginTransmission(deviceAddress);
	Wire.write(regAddr);
	Wire.endTransmission();
	Wire.requestFrom(deviceAddress, length);

	while (Wire.available())
	{
		if (millis() - initialTime >= readTimeout)
		{
#ifdef DEBUG_LOGS
			Serial.println("I2C error: Read Timeout");
#endif
			return (-1);
		}
		data[count++] = Wire.read();
	}

	if (count < length)
	{
#ifdef DEBUG_LOGS
		Serial.println("I2C error: mismatch in read length");
#endif
		return (-1);
	}

	return count;
}
