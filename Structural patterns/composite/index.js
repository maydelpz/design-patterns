var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * La clase base `Component` declara operaciones comunes para objetos simples y
 * compuestos en una jerarquía de composición.
 */
var Component = /** @class */ (function () {
    function Component() {
    }
    //Permite asignar o quitar un padre a un componente en la estructura de árbol.
    Component.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    Component.prototype.getParent = function () {
        return this.parent;
    };
    /**
     * Métodos para manejar hijos en la estructura de árbol. En componentes hoja,
     * estos métodos estarán vacíos porque no tienen hijos.
     */
    Component.prototype.add = function (component) { };
    Component.prototype.remove = function (component) { };
    /**
     * Indica si el componente puede tener hijos (si es un "compuesto").
     * Por defecto, los componentes hoja devuelven `false`.
     */
    Component.prototype.isComposite = function () {
        return false;
    };
    return Component;
}());
//`Leaf` representa los objetos finales en la composición. No pueden tener hijos.
var Leaf = /** @class */ (function (_super) {
    __extends(Leaf, _super);
    function Leaf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Leaf.prototype.operation = function () {
        return "Leaf";
    };
    return Leaf;
}(Component));
// `Composite` representa los objetos compuestos que pueden contener hijos.
var Composite = /** @class */ (function (_super) {
    __extends(Composite, _super);
    function Composite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        return _this;
    }
    //Un objeto compuesto puede agregar o quitar otros componentes (simples o compuestos).
    Composite.prototype.add = function (component) {
        this.children.push(component);
        component.setParent(this); // Asigna el padre.
    };
    Composite.prototype.remove = function (component) {
        var componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);
        component.setParent(null); // Elimina la referencia al padre.
    };
    Composite.prototype.isComposite = function () {
        return true; // Un objeto compuesto puede contener hijos.
    };
    /**
     * `operation()` recorre todos los hijos, llama a `operation()` en cada uno y
     * combina los resultados en una cadena.
     */
    Composite.prototype.operation = function () {
        var results = [];
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            results.push(child.operation());
        }
        return "Branch(".concat(results.join("+"), ")");
    };
    return Composite;
}(Component));
//El código cliente trabaja con cualquier componente a través de la interfaz base.
function clientCode(component) {
    console.log("RESULT: ".concat(component.operation()));
}
var simple = new Leaf();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");
var tree = new Composite(); //arbol principal
var branch1 = new Composite();
branch1.add(new Leaf()); //hoja 1
branch1.add(new Leaf()); //hoja 2
var branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log("Client: Now I've got a composite tree:");
clientCode(tree);
console.log("");
/**
 * El código cliente puede manejar cualquier tipo de componente sin preocuparse
 * por su clase concreta.
 */
function clientCode2(component1, component2) {
    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log("RESULT: ".concat(component1.operation()));
}
console.log("Client: I don't need to check the components classes even when managing the tree:");
clientCode2(tree, simple);
