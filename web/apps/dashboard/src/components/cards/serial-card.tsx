'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStatus } from '@/hooks/use-app-status';
import { Label } from '@radix-ui/react-label';
import { RefreshCcw } from 'lucide-react';
import * as React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Spinner } from '../ui/spinner';

const BAUD_RATES = ['N/A', 9600, 19200, 38400, 57600, 115200];

export default function SerialCard({ ...props }): React.ReactNode {
  const {
    data: serialConfig,
    isLoading,
    error,
    isPendingUpdate,
    updateStatus,
  } = useAppStatus();

  const onRefresh = (): void => {
    updateStatus(115200);
  };

  return (
    <Card {...props}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 py-2">
        <CardTitle>Arduino Configuration: </CardTitle>
        <Button
          disabled={isLoading || isPendingUpdate}
          onClick={onRefresh}
          variant="ghost"
        >
          <RefreshCcw className="size-5" />
        </Button>
      </CardHeader>
      <CardContent>
        {serialConfig ? (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <h1>Serial port:</h1>
              {error || !serialConfig.serialPath ? (
                <span className="text-destructive">N/A</span>
              ) : (
                <span className="text-green-600">
                  {serialConfig.serialPath}
                </span>
              )}
            </div>

            <Label>Serial Baud Rate:</Label>
            <Select
              disabled={
                Boolean(error) || !serialConfig.baudRate || isPendingUpdate
              }
              onValueChange={(newValue) => {
                updateStatus(parseInt(newValue, 10));
              }}
              value={serialConfig.baudRate.toString() || 'N/A'}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a baudrate" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Baudrate: </SelectLabel>
                  {BAUD_RATES.map((rate) => (
                    <SelectItem key={rate} value={`${rate}`}>
                      {rate}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        ) : isLoading || isPendingUpdate ? (
          <Spinner />
        ) : null}
      </CardContent>
    </Card>
  );
}
