class Id40 {
    constructor(currentBrightness, exec) {
        this.data = {
            brightness: {
                rawLightResistance: 0,
                adjustedLight: 0
            },
            gear: {

            }
        };
        this.prevGear = 0;
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
        let gear = arr[4];
        if(!(this.prevGear === gear)) {
            if(this.prevGear === 1) {
                // this.dash.page('Android Auto');
            }
            if (gear === 0) {
                console.log("in Park");
                this.data.gear = "park";
                this.prevGear = gear;
            } else {
                switch (gear) {
                    case gear & 1:
                        console.log("in reverse");
                        this.data.gear = "reverse";
                        this.prevGear = gear;
                        // this.dash.page('Camera');
                        break;
                    case gear & 2:
                        console.log("in neutral");
                        this.data.gear = "neutral";
                        this.prevGear = gear;
                        break;
                    case gear & 4:
                        console.log("in drive");
                        this.data.gear = "drive";
                        this.prevGear = gear;
                        break;
                    case gear & 8:
                        console.log("in sport");
                        this.data.gear = "sport";
                        this.prevGear = gear;
                        break;
                }

            }
        }
        return this.data;
    };
}

module.exports = Id40;



