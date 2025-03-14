var Originator = /** @class */ (function () {
    function Originator(state) {
        this.state = state;
        console.log("Originator: My initial state is: ".concat(state));
    }
    Originator.prototype.doSomething = function () {
        console.log('Originator: I\'m doing something important.');
        this.state = this.generateRandomString(30);
        console.log("Originator: and my state has changed to: ".concat(this.state));
    };
    Originator.prototype.generateRandomString = function (length) {
        if (length === void 0) { length = 10; }
        var charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array
            .apply(null, { length: length })
            .map(function () { return charSet.charAt(Math.floor(Math.random() * charSet.length)); })
            .join('');
    };
    Originator.prototype.save = function () {
        return new ConcreteMemento(this.state);
    };
    Originator.prototype.restore = function (memento) {
        this.state = memento.getState();
        console.log("Originator: My state has changed to: ".concat(this.state));
    };
    return Originator;
}());
var ConcreteMemento = /** @class */ (function () {
    function ConcreteMemento(state) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    ConcreteMemento.prototype.getState = function () {
        return this.state;
    };
    ConcreteMemento.prototype.getName = function () {
        return "".concat(this.date, " / (").concat(this.state.substr(0, 9), "...)");
    };
    ConcreteMemento.prototype.getDate = function () {
        return this.date;
    };
    return ConcreteMemento;
}());
var Caretaker = /** @class */ (function () {
    function Caretaker(originator) {
        this.mementos = [];
        this.originator = originator;
    }
    Caretaker.prototype.backup = function () {
        console.log('\nCaretaker: Saving Originator\'s state...');
        this.mementos.push(this.originator.save());
    };
    Caretaker.prototype.undo = function () {
        if (!this.mementos.length) {
            return;
        }
        var memento = this.mementos.pop();
        console.log("Caretaker: Restoring state to: ".concat(memento.getName()));
        this.originator.restore(memento);
    };
    Caretaker.prototype.showHistory = function () {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (var _i = 0, _a = this.mementos; _i < _a.length; _i++) {
            var memento = _a[_i];
            console.log(memento.getName());
        }
    };
    return Caretaker;
}());
var originator = new Originator('Super-duper-super-puper-super.');
var caretaker = new Caretaker(originator);
caretaker.backup();
originator.doSomething();
caretaker.backup();
originator.doSomething();
caretaker.backup();
originator.doSomething();
console.log('');
caretaker.showHistory();
console.log('\nClient: Now, let\'s rollback!\n');
caretaker.undo();
console.log('\nClient: Once more!\n');
caretaker.undo();
