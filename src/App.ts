import {Inject} from 'typescript-ioc';
import {TemperatureService} from './services/TemperatureService';
import {LoggingService} from './services/LoggingService';
import {HumidityService} from './services/HumidityService';
import {MeasurementSenderService} from './services/MeasurementSenderService';

export class App {

    @Inject
    temperatureService: TemperatureService;

    @Inject
    humidityService: HumidityService;

    @Inject
    loggingService: LoggingService;

    @Inject
    measurementSender: MeasurementSenderService;

    public async start() {
        this.loggingService.logger.info('Hallo Welt!');
        setInterval(async () => await this.loop(), 10000);
        this.measurementSender.start();
    }

    async loop(): Promise<void> {
        const temperature: number = this.temperatureService.getTemperature();
        const humidity: number = await this.humidityService.getHumidity();

        this.measurementSender.updateTemperature(temperature);
        this.measurementSender.updateHumidity(humidity);

        this.loggingService.logger.info("Temperatur: " + temperature);
        this.loggingService.logger.info("Luftfeuchtigkeit: " + humidity.toFixed(1) + "%");
    }
}


