class Id40 {
    constructor(currentBrightness, exec) {
        this.data = {
            brightness: {
                rawLightResistance: 0,
                adjustedLight: 0
            }
        }
        this.currentBrightness = 0;
        this.exec = exec;
    }

    parseMessage = (message, Id) => {
        let arr = [...message];
        this.data.brightness.rawLightResistance = arr[3];
        let inverted = arr[3] / 255;
        this.data.brightness.adjustedLight = Math.floor((inverted * 100) + 20);
        if(this.data.brightness.rawLightResistance > 0 && this.currentBrightness !== this.data.brightness.adjustedLight) {
            this.exec("sudo sh -c 'echo " + '"' + this.data.brightness.adjustedLight + '"' + " > /sys/class/backlight/rpi_backlight/brightness'");
            this.currentBrightness = this.data.brightness.adjustedLight;
        }
        return this.data;
    };
}

module.exports = Id40;



