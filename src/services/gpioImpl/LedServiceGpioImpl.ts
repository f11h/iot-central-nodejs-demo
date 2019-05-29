import {LedService} from '../LedService';
import {Inject, Provides} from 'typescript-ioc';
import {LoggingService} from '../LoggingService';
import {init} from 'raspi';
import {DigitalOutput} from 'raspi-gpio';

@Provides(LedService)
export class LedServiceGpioImpl implements LedService {

    @Inject
    private loggingService: LoggingService;

    private outputPin: DigitalOutput;

    public constructor() {
        this.loggingService.logger.info("Initializing GPIO Pin...");
        init(() => {
            this.outputPin = new DigitalOutput(8);
            this.loggingService.logger.info("GPIO initialized successfully");
        })
    }

    async setLed(status: boolean): Promise<void> {
        if (this.outputPin) {
            this.loggingService.logger.info("Setting GPIO Pin");
            this.outputPin.write(status ? 0 : 1);
        } else {
            this.loggingService.logger.error("GPIO is not ready.");
        }
    }

    async getLed(): Promise<boolean> {
        return this.outputPin.value == 0;
    }
}
