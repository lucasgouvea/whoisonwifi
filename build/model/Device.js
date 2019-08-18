"use strict";
var Device = /** @class */ (function () {
    function Device(mac, name, ip) {
        this.ip = 0;
        if (ip)
            this.ip = ip;
        this.mac = mac;
        this.name = name;
    }
    return Device;
}());
module.exports = Device;
