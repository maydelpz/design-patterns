var Facade = /** @class */ (function () {
    function Facade(subsystem1, subsystem2) {
        this.subsystem1 = subsystem1 || new Subsystem1();
        this.subsystem2 = subsystem2 || new Subsystem2();
    }
    Facade.prototype.operation = function () {
        var result = "Facade initializes subsystems:\n";
        result += this.subsystem1.operation1();
        result += this.subsystem2.operation1();
        result += "Facade orders subsystems to perform the action:\n";
        result += this.subsystem1.operationN();
        result += this.subsystem2.operationZ();
        return result;
    };
    return Facade;
}());
var Subsystem1 = /** @class */ (function () {
    function Subsystem1() {
    }
    Subsystem1.prototype.operation1 = function () {
        return "Subsystem1: Ready!\n";
    };
    Subsystem1.prototype.operationN = function () {
        return "Subsystem1: Go!\n";
    };
    return Subsystem1;
}());
var Subsystem2 = /** @class */ (function () {
    function Subsystem2() {
    }
    Subsystem2.prototype.operation1 = function () {
        return "Subsystem2: Get ready!\n";
    };
    Subsystem2.prototype.operationZ = function () {
        return "Subsystem2: Fire!";
    };
    return Subsystem2;
}());
function clientCode(facade) {
    console.log(facade.operation());
}
var subsystem1 = new Subsystem1();
var subsystem2 = new Subsystem2();
var facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
