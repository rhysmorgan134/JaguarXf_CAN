class Id384 {
    constructor(nightGpio, dayGpio) {
        this.data = {
            night: false
        };
    }

    parseMessage = (message, Id) => {
        let arr = [...message];
        let lights = arr[1] & 16;
        if(lights !== this.data.night) {
            this.data.night = lights
        }
        //console.log('lights', this.data, lights);
        return this.data;
    };
}

module.exports = Id384;



