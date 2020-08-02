class Id126 {
    constructor(reverseGpio, homeGpio) {
        this.data = {
            reverse: false
        };
        this.reverseGpio = reverseGpio;
        this.homeGpio = homeGpio;
        this.prevReverse = this.data.reverse;
        setInterval(this.revCheck.bind(this), 2000)
    }

    parseMessage = (message, Id) => {
        let arr = [...message];
        let reverseData = arr[1];
        if(reverseData & 4) {
            this.data.reverse = true
        } else {
            this.data.reverse = false;
        }
        if(this.prevReverse !== this.data.reverse) {
            if (this.data.reverse === true) {
                this.reverseGpio.writeSync(1);
                this.reverseGpio.writeSync(0);
                this.prevReverse = true;
		console.log("reverse GPIO high")
            } else {
                this.homeGpio.writeSync(1);
                this.homeGpio.writeSync(0);
                this.prevReverse = false;
		console.log("normal GPIO high")
            }
        }
        return this.data;
    };

    revCheck = () => {
	console.log(this.data.reverse);
        if(this.data.reverse === true) {
            this.reverseGpio.writeSync(1);
	    this.reverseGpio.writeSync(0);
	console.log("revers toggled")
        } else {
            if(this.reverseGpio.readSync() === 1) {
                console.log("reverse was high when should be low");
		this.reverseGpio.writeSync(0);
            }
        }
    };
}

module.exports = Id126;



