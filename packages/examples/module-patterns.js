//#region Constructor pattern
/*class Loggerr () {
    constructor(name) {
        this.name = name;
    }

    log(message) {
        console.log(`[${this.name}]: ${message}`);
    }
}

module.exports = Loggerr;*/
//#endregion Constructor pattern

//#region Factory pattern
function Logger(name) { 
    if(!new.target) { 
        return new Logger(name); 
    }
    this.name = name;
}

Logger.prototype.log = function (message) {
    console.log(`[${this.name}]: ${message}`);
};

module.exports = Logger;
//#endregion Factory pattern