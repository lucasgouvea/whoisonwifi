import Device from "./model/Device";

class DeviceManager {


    devices: Device[];
    excludedDevices: Device[];
    find: any;

    static readonly FISCHER = "a8:7d:12:55:40:3d";
    static readonly ROCA = "98:39:8e:8b:d8:6d";
    static readonly BERRO = "a8:16:d0:dd:1f:13";
    static readonly VINI = "9c:f4:8e:4e:fc:d";

    constructor(find: Function) {
        this.devices = [];
        this.find = find;
        this.excludedDevices = [
            new Device("70:9e:29:7e:95:97", "PS4"),
            new Device("10:02:b5:56:68:e1", "Fischer_Note"),
            new Device("c4:84:66:9b:a6:6c", "Fischer_Ipad"),
            new Device("30:5a:3a:0e:1a:0b", "ASUS_Computer_1"),
            new Device("b0:6e:bf:d6:84:fc", "ASUS_Computer_2"),
            new Device("d0:50:99:a1:4c:f2", "ASRock_INC")
        ];
    }

    addDevice(device: Device): void {
        this.devices.push(device);
    }

    removeDevice(device: Device): void {
        this.devices = this.devices.filter((dev) => dev.mac !== device.mac);
    }

    findMock(): Device[] {
        const devices = [
            new Device('b0:6e:bf:d6:84:ff', "MOCK"),
            new Device('b0:6e:bf:d6:84:f2', "MOCK2"),
        ];
        return devices;
    }

    setInitialDevices(): void {
        console.log("Setting initial devices");
        //this.devices = this.findMock();
        this.devices = [
            new Device('b0:6e:bf:d6:84:ff', "MOCK"),
            new Device('b0:6e:bf:d6:84:f2', "MOCK2"),
            new Device('b0:6e:bf:d6:84:f3', "MOCK3")
        ];
        this.devices = this.sortDevices(this.devices);
    }

    async checkForNewDevice(): Promise<Device | undefined> {
        /* Gotta mock this */
        /* let devices = await this.find(); */
        const { sortDevices, findMock } = this;
        return new Promise((resolve) => {
            setTimeout(() => {
                const devices = sortDevices(findMock());
                if (devices.length > this.devices.length) {
                    const newDevice = this.getNewDevice(devices);
                    resolve(newDevice);
                } else {
                    resolve(undefined);
                }
            }, 500);
        });
    }

    async checkForOutgoingDevice(): Promise<Device | undefined> {
        const { sortDevices, findMock } = this;
        return new Promise((resolve) => {
            setTimeout(() => {
                const devices = sortDevices(findMock());
                if (devices.length < this.devices.length) {
                    const outgoingDevice = this.getOutgoingDevice(devices);
                    resolve(outgoingDevice);
                } else {
                    resolve(undefined);
                }
            }, 500);
        });
    }

    getNewDevice(devices: Device[]): Device {
        /* Searching for the new device */
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].mac !== this.devices[i].mac) {
                return devices[i];
            }
        }
        /* Its the last one */
        return devices[devices.length - 1];
    }

    getOutgoingDevice(devices: Device[]) {
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].mac !== this.devices[i].mac) {
                return this.devices[i];
            }
        }
        /* Its the last one */
        return this.devices[devices.length - 1];
    }


    sortDevices(devices: Device[]): Device[] {
        devices = devices.sort((a, b) => {
            if (a.mac > b.mac) return 1;
            if (a.mac < b.mac) return -1;
            return 0;
        });
        return devices;
    }

    printCurrDevices(): void {
        console.log("~~~~~~~~~ Current Devices ~~~~~~~~~");
        this.devices.forEach(device => {
            console.log(device);
        });
        console.log("~~~~~~~~~ Current Devices ~~~~~~~~~");
    }

    getDevices(): Device[] {
        return this.devices;
    }
}

export = DeviceManager;