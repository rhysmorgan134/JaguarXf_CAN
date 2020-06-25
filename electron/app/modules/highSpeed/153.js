class Id153 {
    constructor() {
        this.data = {
            revs: 0
        }
    }

    parseMessage = (message) => {
        let arr = [...message];
        let revs = message.readUIntBE(4, 2);
        this.data.revs = revs &~ 57344;
        return this.data;
    };
}

module.exports = Id153;



