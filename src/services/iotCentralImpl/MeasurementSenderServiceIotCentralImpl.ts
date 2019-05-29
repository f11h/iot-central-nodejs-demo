import {MeasurementSenderService} from '../MeasurementSenderService';
import {Client} from 'azure-iot-device';
import {clientFromConnectionString} from 'azure-iot-device-mqtt';
import {Message} from 'azure-iot-common';
import {Inject, Provides} from 'typescript-ioc';
import {LoggingService} from '../LoggingService';
import {LedService} from '../LedService';

@Provides(MeasurementSenderService)
export class MeasurementSenderServiceIotCentralImpl implements MeasurementSenderService {

    @Inject
    private loggingService: LoggingService;

    @Inject
    private ledService: LedService;

    private readonly connectionString: string = 'HostName=iotc-c48dc415-d885-4395-9ffc-a1420db27be0.azure-devices.net;DeviceId=4674cd61-7550-4298-a101-3f07b2f6d3e5;SharedAccessKey=qbHzI6k9P54qtvMqgkgPffGOu097XttwP9QfWIPPIz8=';
    private settings: { [key: string]: any } = {
        'led': async (newValue: boolean, callback: (value: boolean, status: string) => void) => {
            this.loggingService.logger.info('LED ' + newValue);
            callback(newValue, 'pending');

            await this.ledService.setLed(newValue);

            callback(newValue, 'completed');
            this.loggingService.logger.info('LED ' + newValue + ' completed');
        }
    };
    private client: Client;
    private dataToSend: IotCentralData = {
        temperautre: 0,
        humidity: 0,
        led: false,
    };

    public constructor() {
        this.loggingService.logger.info('Initializing IoT Central');
        this.client = clientFromConnectionString(this.connectionString);
    }

    public start() {
        this.connect();
    }

    public updateTemperature(temperature: number): void {
        this.dataToSend.temperautre = temperature;
    }

    public updateHumidity(humidity: number): void {
        this.dataToSend.humidity = humidity;
    }

    private connect(): void {
        this.loggingService.logger.info('Connecting to IoT Central...');
        this.client.open((err) => {
            if (err) {
                this.loggingService.logger.info(`Device could not connect to Azure IoT Central: ${err.toString()}`);
            } else {
                this.loggingService.logger.info('Device successfully connected to Azure IoT Central');
                setInterval(() => this.sendData(), 5000);
                this.client.getTwin((err, twin) => {
                    if (err) {
                        this.loggingService.logger.info(`Error getting device twin: ${err.toString()}`);
                    } else {
                        this.handleSettings(twin);
                    }
                });
            }
        });
    }

    private async sendData(): Promise<void> {
        const message: Message = new Message(JSON.stringify(this.dataToSend));
        await this.client.sendEvent(message);
    }

    private handleSettings(twin): void {
        twin.on('properties.desired', (desiredChange: { [key: string]: any }) => {
            for (let setting in desiredChange) {
                if (this.settings[setting]) {
                    this.loggingService.logger.info(`Received setting: ${setting}: ${desiredChange[setting].value}`);
                    this.settings[setting](desiredChange[setting].value, (newValue, status, message) => {
                        const patch = {
                            [setting]: {
                                value: newValue,
                                status: status,
                                desiredVersion: desiredChange.$version,
                                message: message
                            }
                        };
                        twin.properties.reported.update(patch, (err) => this.loggingService.logger.info(`Sent setting update for ${setting}; ` +
                            (err ? `error: ${err.toString()}` : `status: success`)));
                    });
                }
            }
        });
    }
}

interface IotCentralData {
    temperautre: number,
    humidity: number,
    led: boolean,
}
