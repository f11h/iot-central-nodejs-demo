import {Inject, Provides} from 'typescript-ioc';
import {LoggingService} from '../LoggingService';
import {HumidityService} from '../HumidityService';

// Ignore TypeScript Error on development machines because this lib is not available for non-raspi-systems
// @ts-ignore
import * as nodeDht from 'node-dht-sensor';

enum SensorType {
    DHT11 = 11,
    DHT22 = 22,
}

interface DhtSensor {
    read(sensorType: number, pin: number): Promise<{humidity: number, temperature: number}>;
}

@Provides(HumidityService)
export class HumidityServiceGpioImpl implements HumidityService {

    private pin: number = 3;
    private sensorType: SensorType = SensorType.DHT11;
    private nodeDhtSensor: DhtSensor;

    @Inject
    loggingService: LoggingService;

    public constructor() {
        this.loggingService.logger.info("Initializing GPIO Humidity Service");
        this.nodeDhtSensor = nodeDht.promises;
    }

    async getHumidity(): Promise<number> {
        this.loggingService.logger.info("Trying to get some humidity data...");

        try {
            const result = await this.nodeDhtSensor.read(this.sensorType, this.pin);
            return result.humidity;
        } catch (err) {
            this.loggingService.logger.error("Failed to read data: " + err);
            throw err;
        }
    }
}
