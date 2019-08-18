class Device {

    mac: string;
    name: string;
    ip: number = 0;

    constructor(mac: string, name: string, ip?: number) {
        if (ip) this.ip = ip;
        this.mac = mac;
        this.name = name;
    }
}

export = Device;