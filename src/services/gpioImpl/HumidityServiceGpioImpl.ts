import {Inject, Provides} from 'typescript-ioc';
import {LoggingService} from '../LoggingService';
import {HumidityService} from '../HumidityService';

enum SensorType {
    DHT11 = 11,
    DHT22 = 22,
}

@Provides(HumidityService)
export class HumidityServiceGpioImpl implements HumidityService {

    private pin: number = 3;
    private sensorType: SensorType = SensorType.DHT11;

    @Inject
    loggingService: LoggingService;

    @Inject("node-dht-sensor")
    nodeDhtSensor: any;

    public constructor() {
        this.loggingService.logger.info("Initializing GPIO Humidity Service");
        this.nodeDhtSensor = this.nodeDhtSensor.promises;
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
