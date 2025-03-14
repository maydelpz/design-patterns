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
 * La clase abstracta define un método plantilla que contiene el esqueleto de un
 * algoritmo, compuesto por llamadas a (generalmente) operaciones primitivas abstractas.
 *
 * Las subclases concretas deben implementar estas operaciones, pero dejar intacto el
 * método plantilla.
 */
var AbstractClass = /** @class */ (function () {
    function AbstractClass() {
    }
    // El método plantilla define el esqueleto de un algoritmo.
    AbstractClass.prototype.templateMethod = function () {
        this.baseOperation1(); // Ejecuta una operación base.
        this.requiredOperations1(); // Ejecuta una operación obligatoria que debe ser implementada en las subclases.
        this.baseOperation2(); // Ejecuta otra operación base.
        this.hook1(); // Ejecuta un "hook", que puede ser sobreescrito o no por las subclases.
        this.requiredOperation2(); // Ejecuta otra operación obligatoria que debe ser implementada en las subclases.
        this.baseOperation3(); // Ejecuta otra operación base.
        this.hook2(); // Ejecuta otro "hook", que puede ser sobreescrito o no.
    };
    // Estas operaciones ya tienen implementaciones.
    AbstractClass.prototype.baseOperation1 = function () {
        console.log("AbstractClass says: I am doing the bulk of the work");
    };
    AbstractClass.prototype.baseOperation2 = function () {
        console.log("AbstractClass says: But I let subclasses override some operations");
    };
    AbstractClass.prototype.baseOperation3 = function () {
        console.log("AbstractClass says: But I am doing the bulk of the work anyway");
    };
    /**
       * Estos son "hooks". Las subclases pueden sobreescribirlos, pero no es obligatorio,
       * ya que los hooks ya tienen una implementación predeterminada (aunque vacía). Los hooks
       * proporcionan puntos adicionales de extensión en algunos lugares clave del algoritmo.
       */
    AbstractClass.prototype.hook1 = function () { };
    AbstractClass.prototype.hook2 = function () { };
    return AbstractClass;
}());
/**
 * Las clases concretas deben implementar todas las operaciones abstractas de la clase base.
 * También pueden sobreescribir algunas operaciones con una implementación predeterminada.
 */
var ConcreteClass1 = /** @class */ (function (_super) {
    __extends(ConcreteClass1, _super);
    function ConcreteClass1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteClass1.prototype.requiredOperations1 = function () {
        console.log("ConcreteClass1 says: Implemented Operation1");
    };
    ConcreteClass1.prototype.requiredOperation2 = function () {
        console.log("ConcreteClass1 says: Implemented Operation2");
    };
    return ConcreteClass1;
}(AbstractClass));
/**
 * Normalmente, las clases concretas sobreescriben solo una fracción de las operaciones
 * de la clase base.
 */
var ConcreteClass2 = /** @class */ (function (_super) {
    __extends(ConcreteClass2, _super);
    function ConcreteClass2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteClass2.prototype.requiredOperations1 = function () {
        console.log("ConcreteClass2 says: Implemented Operation1");
    };
    ConcreteClass2.prototype.requiredOperation2 = function () {
        console.log("ConcreteClass2 says: Implemented Operation2");
    };
    ConcreteClass2.prototype.hook1 = function () {
        console.log("ConcreteClass2 says: Overridden Hook1");
    };
    return ConcreteClass2;
}(AbstractClass));
/**
 * El código del cliente llama al método plantilla para ejecutar el algoritmo. El
 * código del cliente no tiene que conocer la clase concreta de un objeto con el que trabaja,
 * siempre que trabaje con objetos a través de la interfaz de su clase base.
 */
function clientCode(abstractClass) {
    abstractClass.templateMethod();
}
console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass1());
console.log("");
console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass2());
