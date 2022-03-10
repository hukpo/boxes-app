import { injectable } from 'tsyringe';

enum LoggerLevel {
  DEBUG = 'DEBUG',
}

@injectable()
export class Logger {
  private _namespace?: string;

  setNamespace(namespace: string): void {
    this._namespace = namespace;
  }

  private formatMessage(level: LoggerLevel, message: string): string {
    return `${level} [${new Date()}]${this._namespace ? ' ' + this._namespace : ''} ${message}`;
  }

  debug(message: string): void {
    console.log(this.formatMessage(LoggerLevel.DEBUG, message));
  }
}
