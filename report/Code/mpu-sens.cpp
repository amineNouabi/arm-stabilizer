// Set the full scale of the gyro to +/- 250 degrees per second
Wire.beginTransmission(0x68);
Wire.write(0x1B);
Wire.write(0x00);
Wire.endTransmission();
// Set the full scale of the accelerometer to +/- 4g.
Wire.beginTransmission(0x68);
Wire.write(0x1C);
Wire.write(0x08);
Wire.endTransmission();
