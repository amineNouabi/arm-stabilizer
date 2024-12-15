class MPUSensor
{

public:
	MPUSensor() : gx(0), gy(0), gz(0),
				  ax(0), ay(0), az(0),
				  gx_offset(0), gy_offset(0), gz_offset(0),
				  ax_offset(0), ay_offset(0), az_offset(0),
				  angle(0), status(0) {}

	void calibrate();
	void setup();
	void readAndUpdate();
	void setFullScaleGyroRange(uint8_t range);
	void setFullScaleAccelRange(uint8_t range);
	void setSleepEnabled(int enabled);
	bool writeBits(uint8_t regAddr, uint8_t data, uint8_t length);
	void readBits(uint8_t regAddr, uint8_t *data, uint8_t length);
	void readAccelData(int16_t *b_ax, int16_t *b_ay, int16_t *b_az);
	void readGyroData(int16_t *b_gx, int16_t *b_gy, int16_t *b_gz);
	float gx, gy, gz, ax, ay, az, temp;
	float gx_offset, gy_offset, gz_offset, ax_offset, ay_offset, az_offset;

	float angle;

private:
	int status;
};
