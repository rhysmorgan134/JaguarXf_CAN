class Utils {
    constructor(night, getNight, dayGpio, nightGpio, exec, win){ //, exec, win, test
        this.night = getNight;
        this.dayGpio = dayGpio;
        this.nightGpio = nightGpio;
        this.exec = exec;
        this.win = win;
        // this.dayGpio = dayGpio;
        // this.nightGpio = nightGpio;
        // this.exec = exec;
        this.isNight = false;

        setInterval(this.checkDayNight.bind(this), 100);
        //setInterval(this.adjustAmbient.bind(this), 500);

    }

    checkDayNight() {
        if(this.night > 0 && this.isNight === false) {
            this.nightGpio.writeSync(1);
            this.nightGpio.writeSync(0);
            this.win.setBackgroundColor('#121212');
            this.win.blur();
            this.win.focus();
            console.log("Changed to night");
            this.isNight = true;
        } else if (this.night === 0 && this.isNight === true){
            this.dayGpio.writeSync(1);
            this.dayGpio.writeSync(0);
            this.win.setBackgroundColor('#EEEEEE');
            this.win.blur();
            this.win.focus();
            console.log("Changed to day");
            this.isNight = false;
        }
    }

    // adjustAmbient() {
    //     if(!(this.isNight)) {
	// 	console.log("changing brightness to " )
    //         this.exec("sudo sh -c 'echo " + '"' + this.brightnessValues.adjustedAmbient + '"' + " > /sys/class/backlight/rpi_backlight/brightness'")
    //     }
    // }

    get night() {
        return this.isNight;
    }



}

module.exports = Utils;
