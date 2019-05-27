import {Inject, Provides} from 'typescript-ioc';
import {LoggingService} from '../LoggingService';
import {HumidityService} from '../HumidityService';

@Provides(HumidityService)
export class HumidityServiceTestImpl implements HumidityService {

    @Inject
    loggingService: LoggingService;

    public constructor() {
        this.loggingService.logger.info("Initializing Test Humidity Service");
    }

    async getHumidity(): Promise<number> {
        return 42.0;
    }
}
