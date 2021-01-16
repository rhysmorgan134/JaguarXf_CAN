class Id217 {
    constructor() {
        this.data = {
            coolant: 0
        }
    }

    parseMessage = (message) => {
        let arr = [...message];
        this.data.coolant = arr[0] - 60;
        return this.data;
    };
}

module.exports = Id217;



