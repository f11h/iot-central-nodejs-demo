import {createLogger, format, Logger, transports} from 'winston';
import {Format} from 'logform';
import {Singleton} from 'typescript-ioc';

@Singleton
export class LoggingService {

    private filename: string = 'logger.log';
    public readonly logger: Logger;

    public constructor() {
        this.logger = this.createLogger();
    }

    private createLogger(): Logger {
        const myFormat: Format = format.printf(({level, message, label, timestamp}) => {
            if (label) {
                return `${timestamp} [${label}] ${level}: ${message}`;
            } else {
                return `${timestamp} ${level}: ${message}`;
            }
        });

        return createLogger({
            transports: [
                new transports.Console(),
                new transports.File({filename: this.filename}),
            ],
            format: format.combine(
                format.timestamp(),
                myFormat
            )
        });
    }
}
