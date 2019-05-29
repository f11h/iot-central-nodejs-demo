export abstract class MeasurementSenderService {
    abstract updateTemperature(temperature: number): void;
    abstract updateHumidity(humidity: number): void;
    abstract start(): void;
}
