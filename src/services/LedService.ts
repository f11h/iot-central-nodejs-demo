export abstract class LedService {

    public abstract async setLed(status: boolean): Promise<void>;

    public abstract async getLed(): Promise<boolean>;
}
