import {MeasurementSenderService} from '../MeasurementSenderService';
import {Inject, Provides} from 'typescript-ioc';
import {LoggingService} from '../LoggingService';

@Provides(MeasurementSenderService)
export class MeasurementSenderServiceTestImpl implements MeasurementSenderService {

    @Inject
    private loggingService: LoggingService;

    public constructor() {
        this.loggingService.logger.info("Initializing fake Cloud Connection");
    }

    public start() {
        this.loggingService.logger.info("Starting fake Cloud Connection");
    }

    public updateTemperature(temperature: number): void {
        this.loggingService.logger.info("Updated dataToSend for temperature to " + temperature);
    }

    public updateHumidity(humidity: number): void {
        this.loggingService.logger.info("Updated dataToSend for humidity to " + humidity);
    }
}
