import find = require("local-devices");
import DeviceManager from "./deviceManager";
import Device from "./model/Device";
import LogManager from "./logManager";

const deviceManager = new DeviceManager(find);
const logManager = new LogManager();


const routine = async () => {
    deviceManager.setInitialDevices();
    const devices = deviceManager.getDevices();
    devices.forEach(device => {
        logManager.createDeviceLogsFile(device);
    });
    setInterval(async () => {
        const device = await deviceManager.checkForNewDevice();
        if (device instanceof Device) {
            console.log(`New device: ${device.mac}, ${device.name}`);
            deviceManager.addDevice(device);
            if (!logManager.hasLogFile(device)) {
                logManager.createDeviceLogsFile(device);
            }
            logManager.appendLog(device, new Date(), 'in');
        } else {
            console.log('no new device');
        }

        const device = await deviceManager.checkForOutgoingDevice();
        if (device instanceof Device) {
            console.log(`Outgoing device: ${device.mac}, ${device.name}`);
            deviceManager.removeDevice(device);
            logManager.appendLog(device, new Date(), 'out');
        } else {
            console.log('no outgoing device');
        }
        deviceManager.printCurrDevices();
    }, 4000);


};

routine();


