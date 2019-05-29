import {Inject, Provides} from 'typescript-ioc';
import {LoggingService} from '../LoggingService';
import {HumidityService} from '../HumidityService';
import {promises, SensorType} from 'node-dht-sensor';

@Provides(HumidityService)
export class HumidityServiceGpioImpl implements HumidityService {

    private pin: number = 3;
    private sensorType: SensorType = 11;
    private lastData: {humidity: number, temperature: number} = {
        humidity: -1,
        temperature: -1,
    };

    @Inject
    loggingService: LoggingService;

    public constructor() {
        this.loggingService.logger.info("Initializing GPIO Humidity Service");
    }

    async getHumidity(): Promise<number> {
        this.loggingService.logger.info("Trying to get some humidity data...");

        try {
            this.lastData = await promises.read(this.sensorType, this.pin);

            return this.lastData.humidity;
        } catch (err) {
            this.loggingService.logger.error("Failed to read data: " + err);
            throw err;
        }
    }

    async getTemperature(): Promise<number> {
        this.loggingService.logger.info("Serving cached temperature data...");
        return this.lastData.temperature;
    }
}
