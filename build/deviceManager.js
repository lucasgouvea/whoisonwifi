"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Device_1 = __importDefault(require("./model/Device"));
var DeviceManager = /** @class */ (function () {
    function DeviceManager(find) {
        //this.devices = [];
        this.devices = [
            new Device_1.default('b0:6e:bf:d6:84:ff', "MOCK"),
            new Device_1.default('b0:6e:bf:d6:84:f2', "MOCK2")
        ];
        this.find = find;
        this.excludedDevices = [
            new Device_1.default("70:9e:29:7e:95:97", "PS4"),
            new Device_1.default("10:02:b5:56:68:e1", "Fischer Note"),
            new Device_1.default("c4:84:66:9b:a6:6c", "Fischer Ipad"),
            new Device_1.default("30:5a:3a:0e:1a:0b", "ASUS Computer 1"),
            new Device_1.default("b0:6e:bf:d6:84:fc", "ASUS Computer 2"),
            new Device_1.default("d0:50:99:a1:4c:f2", "ASRock INC")
        ];
    }
    DeviceManager.prototype.addDevice = function (device) {
        this.devices.push(device);
    };
    DeviceManager.prototype.findMock = function () {
        var devices = [
            new Device_1.default('b0:6e:bf:d6:84:ff', "MOCK"),
            new Device_1.default('b0:6e:bf:d6:84:f2', "MOCK2"),
            new Device_1.default('b0:6e:bf:d6:84:f2', "MOCK3")
        ];
        return devices;
    };
    DeviceManager.prototype.checkForNewDevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sortDevices, findMock;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this, sortDevices = _a.sortDevices, findMock = _a.findMock;
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            var devices = sortDevices(findMock());
                            if (devices.length > _this.devices.length) {
                                var newDevice = _this.getNewDevice(devices);
                                resolve(newDevice);
                            }
                            else {
                                resolve(undefined);
                            }
                        }, 500);
                    })];
            });
        });
    };
    DeviceManager.prototype.getNewDevice = function (devices) {
        /* Searching for the new device */
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].mac !== this.devices[i].mac) {
                return devices[i];
            }
        }
        /* Its the last one */
        return devices[devices.length - 1];
    };
    DeviceManager.prototype.sortDevices = function (devices) {
        devices = devices.sort(function (a, b) {
            if (a.mac > b.mac)
                return 1;
            if (a.mac < b.mac)
                return -1;
            return 0;
        });
        return devices;
    };
    DeviceManager.prototype.printCurrDevices = function () {
        console.log("~~~~~~~~~ Current Devices ~~~~~~~~~");
        this.devices.forEach(function (device) {
            console.log(device);
        });
        console.log("~~~~~~~~~ Current Devices ~~~~~~~~~");
    };
    DeviceManager.prototype.getDevices = function () {
        return this.devices;
    };
    DeviceManager.FISCHER = "a8:7d:12:55:40:3d";
    DeviceManager.ROCA = "98:39:8e:8b:d8:6d";
    DeviceManager.BERRO = "a8:16:d0:dd:1f:13";
    DeviceManager.VINI = "9c:f4:8e:4e:fc:d";
    return DeviceManager;
}());
module.exports = DeviceManager;
