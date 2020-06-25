class Id953 {
    constructor() {
        this.data = {
            oil: 0
        }
    }

    parseMessage = (message) => {
        let arr = [...message];
        this.data.oil = arr[5] - 60;
        return this.data;
    };
}

module.exports = Id953;



