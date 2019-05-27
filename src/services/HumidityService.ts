export abstract class HumidityService {
    public async abstract getHumidity(): Promise<number>;
}
