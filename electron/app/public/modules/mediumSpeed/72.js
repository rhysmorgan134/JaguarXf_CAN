class Id72 {
    constructor() {
        this.data = {
            climate: {
                interiorTemp: 0
            }
        }
    }

    parseMessage = (message, Id) => {
        let arr = [...message];
        this.data.climate.interiorTemp = arr[4] - 40;
        return this.data;
    };
}

module.exports = Id72;



