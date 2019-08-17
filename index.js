const find = require("local-devices");
const fs = require("fs");

let devices = [];
let file = 0;
let init = () => {
  find().then(initialDevices => {
    devices = initialDevices;
    setInterval(() => {
      routine();
    }, 5000);
  });
};

let routine = async () => {
  let newDevices = await find();
  console.log(`\n${Date(Date.now()).toString()} `);
  newDevices = mapMacToMorador(newDevices);
  newDevices = sort(newDevices);
  devices = sort(devices);
  printMacs(newDevices);
  /* Has someone connected ? */
  let newConnection = checkNewConnection(newDevices, devices);
  if (newConnection) {
    let date = Date(Date.now()).toString();
    let buffer = `New connection: ${newConnection.mac} \n ${date} \n \n`;
    fs.writeFileSync(`./logs/log${file}`, buffer, err => {
      console.log(err);
    });
    file++;
  }
  /* Has someone disconnected ? */
  /*   let disconnected = checkDisconnection(newDevices, devices);
  if (disconnected) {
    console.log(`Disconnected: ${disconnected}`);
  } */

  devices = newDevices;
};

sort = newDevices => {
  newDevices = newDevices.sort((a, b) => {
    if (a.mac > b.mac) return 1;
    if (a.mac < b.mac) return -1;
    return 0;
  });
  return newDevices;
};

checkNewConnection = (newDevices, devices) => {
  if (newDevices.length > devices.length) {
    for (let i = 0; i < devices.length; i++) {
      if (newDevices[i].mac != devices[i].mac) {
        return newDevices[i];
      }
    }
    /* Its the last one */
    return newDevices[newDevices.length - 1];
  } else {
    return false;
  }
};

printMacs = newDevices => {
  newDevices.forEach(device => {
    console.log(device);
  });
};

mapMacToMorador = devices => {
  devices.forEach(device => {
    switch (device.mac) {
      case "a8:7d:12:55:40:3d":
        device.mac = "fischer cel";
        break;
      case "98:39:8e:8b:d8:6d":
        device.mac = "roca cel";
        break;
      case "a8:16:d0:dd:1f:13":
        device.mac = "berro cel";
        break;
      case "10:02:b5:56:68:e1":
        device.mac = "fischer notebook";
        break;
      case "70:9e:29:7e:95:97":
        device.mac = "PS4";
        break;
      case "30:5a:3a:0e:1a:0b":
        device.mac = "ASUS Computer";
        break;
      case "b0:6e:bf:d6:84:fc":
        device.mac = "ASUS Computer";
        break;
      case "c0:8c:71:3b:9f:56":
        device.mac = "virgem cel";
        break;
      case "c4:84:66:9b:a6:6c":
        device.mac = "fischer ipad";
        break;
      case "9c:f4:8e:4e:fc:d3":
        device.mac = "vini cel";
        break;
      case "d0:50:99:a1:4c:f2":
        device.mac = "asrock inc";
        break;
      default:
        device.mac = `who? ${device.mac}`;
        break;
    }
  });
  return devices;
};

init();
