// Type definitions for node-dht-sensor 0.3
// Project: https://github.com/momenso/node-dht-sensor#readme
// Definitions by: f11h <https://github.com/f11h>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export function initialize(): void;

export function read(sensorType: SensorType, pinNumber: number, callback: (err: any, temperature: number, humidity: number) => void): void;

export function setMaxRetries(): void;

export namespace initialize {
    const prototype: {
    };

}

export namespace promises {
    function initialize(): Promise<void>;

    function read(sensorType: SensorType, pinNumber: number): Promise<SensorData>;

    function readSync(sensorType: SensorType, pinNumber: number): SensorData;

    function setMaxRetries(): Promise<void>;

    namespace initialize {
        const prototype: {
        };

    }

    namespace setMaxRetries {
        const prototype: {
        };

    }

}

export namespace read {
    const prototype: {
    };

}

export namespace setMaxRetries {
    const prototype: {
    };

}

export enum SensorType {
    DHT22 = 22,
    DHT11 = 11,
}

export interface SensorData {
    temperature: number;
    humidity: number;
}
