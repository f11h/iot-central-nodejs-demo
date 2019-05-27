import {Inject, Provides} from 'typescript-ioc';
import {TemperatureService} from '../TemperatureService';
import {LoggingService} from '../LoggingService';

@Provides(TemperatureService)
export class TemperatureServiceTestImpl implements TemperatureService {

    @Inject
    loggingService: LoggingService;

    public constructor() {
        this.loggingService.logger.info("Initializing Test Temperature Service");
    }

    getTemperature(): number {
        return 42.0;
    }
}
