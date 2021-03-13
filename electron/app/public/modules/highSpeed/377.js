class Id377 {
    constructor() {
        this.data = {
            speed: 0
        }
    }

    parseMessage = (message) => {
        let arr = [...message];
        let speed = message.readUIntBE(2, 2)
        this.data.speed = ((speed * 0.65) / 100).toFixed(1);
        return this.data;
    };
}

module.exports = Id377;