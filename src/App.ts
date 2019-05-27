import {Inject} from 'typescript-ioc';
import {TemperatureService} from './services/TemperatureService';
import {LoggingService} from './services/LoggingService';
import {HumidityService} from './services/HumidityService';

export class App {

    @Inject
    temperatureService: TemperatureService;

    @Inject
    humidityService: HumidityService;

    @Inject
    loggingService: LoggingService;

    public async start() {
        this.loggingService.logger.info('Hallo Welt!');
        setInterval(async () => await this.loop(), 10000);
    }

    async loop(): Promise<void> {
        this.loggingService.logger.info("Temperatur: " + this.temperatureService.getTemperature());
        this.loggingService.logger.info("Luftfeuchtigkeit: " + (await this.humidityService.getHumidity()).toFixed(1) + "%");
    }
}


