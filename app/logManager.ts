import Device from './model/Device';
import fs = require('fs');
import jsonfile = require('jsonfile');

class LogManager {

    path: string;

    constructor(path?: string) {
        this.path = "./logs";
        if (path) this.path = path;
        fs.mkdir(this.path, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }

    createDeviceLogsFile(device: Device): void {
        const pathIn: string = `${this.path}/${device.name}/${device.name}_in.json`;
        const pathOut: string = `${this.path}/${device.name}/${device.name}_out.json`;
        if (!fs.existsSync(pathIn) && !fs.existsSync(pathOut)) {
            console.log("Creating logs directory");
            fs.mkdirSync(`${this.path}/${device.name}`, { recursive: true });
            console.log("Creating logs files");
            jsonfile.writeFileSync(pathIn, { logs: [] });
            jsonfile.writeFileSync(pathOut, { logs: [] });
        }
    }

    hasLogFile(device: Device): boolean {
        const pathIn: string = `${this.path}/${device.name}/${device.name}_in.json`;
        const pathOut: string = `${this.path}/${device.name}/${device.name}_out.json`;
        if (!fs.existsSync(pathIn) || !fs.existsSync(pathOut)) {
            return false;
        }
        return true;
    }

    appendLog(device: Device, date: Date, type: string): void {
        console.log(`Appending date log to ${device.name} with date = ${date}`);
        const path: string = `${this.path}/${device.name}/${device.name}_${type}.json`;
        const { logs } = jsonfile.readFileSync(path);
        logs.push(date);
        jsonfile.writeFileSync(path, { logs });
    }
}

export = LogManager;