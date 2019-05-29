export abstract class HumidityService {
    public async abstract getHumidity(): Promise<number>;
    public async abstract getTemperature(): Promise<number>;
}
