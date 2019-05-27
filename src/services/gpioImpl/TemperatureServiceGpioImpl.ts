import {Inject, Provides} from 'typescript-ioc';
import {TemperatureService} from '../TemperatureService';
import {LoggingService} from '../LoggingService';

@Provides(TemperatureService)
export class TemperatureServiceGpioImpl implements TemperatureService {

    @Inject
    loggingService: LoggingService;

    public constructor() {
        this.loggingService.logger.info("Initializing GPIO Temperature Service");
    }

    getTemperature(): number {
        return 0;
    }
}
