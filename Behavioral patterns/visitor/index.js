var ConcreteComponentA = /** @class */ (function () {
    function ConcreteComponentA() {
    }
    ConcreteComponentA.prototype.accept = function (visitor) {
        visitor.visitConcreteComponentA(this);
    };
    ConcreteComponentA.prototype.exclusiveMethodOfConcreteComponentA = function () {
        return 'A';
    };
    return ConcreteComponentA;
}());
var ConcreteComponentB = /** @class */ (function () {
    function ConcreteComponentB() {
    }
    ConcreteComponentB.prototype.accept = function (visitor) {
        visitor.visitConcreteComponentB(this);
    };
    ConcreteComponentB.prototype.specialMethodOfConcreteComponentB = function () {
        return 'B';
    };
    return ConcreteComponentB;
}());
var ConcreteVisitor1 = /** @class */ (function () {
    function ConcreteVisitor1() {
    }
    ConcreteVisitor1.prototype.visitConcreteComponentA = function (element) {
        console.log("".concat(element.exclusiveMethodOfConcreteComponentA(), " + ConcreteVisitor1"));
    };
    ConcreteVisitor1.prototype.visitConcreteComponentB = function (element) {
        console.log("".concat(element.specialMethodOfConcreteComponentB(), " + ConcreteVisitor1"));
    };
    return ConcreteVisitor1;
}());
var ConcreteVisitor2 = /** @class */ (function () {
    function ConcreteVisitor2() {
    }
    ConcreteVisitor2.prototype.visitConcreteComponentA = function (element) {
        console.log("".concat(element.exclusiveMethodOfConcreteComponentA(), " + ConcreteVisitor2"));
    };
    ConcreteVisitor2.prototype.visitConcreteComponentB = function (element) {
        console.log("".concat(element.specialMethodOfConcreteComponentB(), " + ConcreteVisitor2"));
    };
    return ConcreteVisitor2;
}());
function clientCode(components, visitor) {
    for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
        var component = components_1[_i];
        component.accept(visitor);
    }
}
var components = [
    new ConcreteComponentA(),
    new ConcreteComponentB(),
];
console.log('The client code works with all visitors via the base Visitor interface:');
var visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log('');
console.log('It allows the same client code to work with different types of visitors:');
var visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);
