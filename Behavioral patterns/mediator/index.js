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
 * Los Mediadores Concretos implementan un comportamiento cooperativo
 * coordinando varios componentes.
 */
var ConcreteMediator = /** @class */ (function () {
    // Constructor que recibe los componentes y les asigna el mediador.
    function ConcreteMediator(c1, c2) {
        this.component1 = c1; // Se asigna el primer componente
        this.component1.setMediator(this); // Se le asigna el mediador
        this.component2 = c2; // Se asigna el segundo componente
        this.component2.setMediator(this); // Se le asigna el mediador
    }
    /**
     * Método que maneja los eventos enviados por los componentes.
     * Dependiendo del evento recibido, el mediador ejecuta ciertas acciones.
     */
    ConcreteMediator.prototype.notify = function (sender, event) {
        if (event === "A") {
            console.log("Mediator reacts on A and triggers following operations:");
            this.component2.doC(); // Llama a la acción `doC()` del `component2`
        }
        if (event === "D") {
            console.log("Mediator reacts on D and triggers following operations:");
            this.component1.doB(); // Llama a la acción `doB()` del `component1`
            this.component2.doC(); // Llama a la acción `doC()` del `component2`
        }
    };
    return ConcreteMediator;
}());
/**
 * La clase BaseComponent proporciona la funcionalidad básica de almacenar
 * una instancia del mediador dentro de los objetos de los componentes.
 */
var BaseComponent = /** @class */ (function () {
    // Constructor que permite asignar un mediador al componente.
    function BaseComponent(mediator) {
        this.mediator = mediator; // Se asigna el mediador si se proporciona
    }
    // Método para establecer el mediador en el componente.
    BaseComponent.prototype.setMediator = function (mediator) {
        this.mediator = mediator; // Se asigna el mediador
    };
    return BaseComponent;
}());
/**
 * Los Componentes Concretos implementan varias funcionalidades.
 * No dependen de otros componentes ni de mediadores concretos.
 */
var Component1 = /** @class */ (function (_super) {
    __extends(Component1, _super);
    function Component1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Método que realiza la acción A y notifica al mediador.
    Component1.prototype.doA = function () {
        console.log("Component 1 does A.");
        this.mediator.notify(this, "A");
    };
    // Método que realiza la acción B y notifica al mediador
    Component1.prototype.doB = function () {
        console.log("Component 1 does B.");
        this.mediator.notify(this, "B");
    };
    return Component1;
}(BaseComponent));
var Component2 = /** @class */ (function (_super) {
    __extends(Component2, _super);
    function Component2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Método que realiza la acción C y notifica al mediador.
    Component2.prototype.doC = function () {
        console.log("Component 2 does C.");
        this.mediator.notify(this, "C");
    };
    Component2.prototype.doD = function () {
        console.log("Component 2 does D.");
        this.mediator.notify(this, "D");
    };
    return Component2;
}(BaseComponent));
/**
 * Código del cliente.
 */
// Se crean dos componentes sin mediador
var c1 = new Component1();
var c2 = new Component2();
// Se crea un mediador y se le pasan los componentes
var mediator = new ConcreteMediator(c1, c2);
console.log("Client triggers operation A.");
c1.doA(); // Se ejecuta la acción `doA()` en el `Component1`
console.log("");
console.log("Client triggers operation D.");
c2.doD(); // Se ejecuta la acción `doD()` en el `Component2`
