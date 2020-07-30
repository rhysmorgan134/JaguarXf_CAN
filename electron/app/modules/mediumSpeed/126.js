class Id126 {
    constructor(reverseGpio) {
        this.data = {
            reverse: false
        };
        this.reverseGpio = reverseGpio;
        this.homeGpio = homeGpio;
        this.prevReverse = this.data.reverse;
        setInterval(this.revCheck.bind(this), 100)
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
            } else {
                this.homeGpio.writeSync(1);
                this.homeGpio.writeSync(0);
                this.prevReverse = false;
            }
        }
        return this.data;
    };

    revCheck = () => {
        if(this.data.reverse) {
            this.reverseGpio.writeSync(this.reverseGpio.readSync() ^1);
        } else {
            if(this.reverseGpio.readSync() === 1) {
                this.reverseGpio.writeSync(0);
            }
        }
    };
}

module.exports = Id126;



