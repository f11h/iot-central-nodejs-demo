import {LedService} from '../LedService';
import {Inject, Provides} from 'typescript-ioc';
import {LoggingService} from '../LoggingService';

@Provides(LedService)
export class LedServiceTestImpl implements LedService {
    private led: boolean = false;

    @Inject
    private loggingService: LoggingService;

    async setLed(status: boolean): Promise<void> {
        this.loggingService.logger.info("Setting LED Status to " + status);
        this.led = status;
    }

    async getLed(): Promise<boolean> {
        this.loggingService.logger.info("Serving last stores LED Status: " + status);
        return this.led;
    }
}
