class Id680 {
    constructor(canIds, outIds) {
        this.canIds = canIds;
        this.outIds = outIds;
        this.data = {
            settings: {
            }
        }
    }

    parseMessage = (message, Id) => {
        let strId2 = Id.toString();

        //turn the message buffer to an array
        let arr2 = [...message];

        //loop though each byte defined in the json
        for (let k in this.canIds[strId2]) {

            //for each byte, set the relevant object key bit to the value set in the canbus message through bitwise operation
            for (let i = 0; i < this.canIds[strId2][k].length; i++) {
                this.data.settings[this.canIds[strId2][parseInt(k)][i.toString()].handle] = !!(arr2[parseInt(k)] & this.canIds[strId2][parseInt(k)][i.toString()].val);
            }
        };
        return this.data;
    };
}

module.exports = Id680;



