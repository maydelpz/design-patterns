/*declara un conjunto de metodos que devuelven difernetes productos abstrcatos
estos productos forman una familia y esatn relacionados por un tema o concepto en comun
estos pueden trabajar juntos
cada familia de productos pude tener diferntes variantes, pero los productos d euna variante
especifica no son compatibles con los de otra
*/
/**
 se crea una familia de productos de la variante 1
 garantiza que los productos creados sean compatibles entre si
 */
var ConcreteFactory1 = /** @class */ (function () {
    function ConcreteFactory1() {
    }
    ConcreteFactory1.prototype.createProductA = function () {
        return new ConcreteProductA1(); // Crea y retorna un producto A1.
    };
    ConcreteFactory1.prototype.createProductB = function () {
        return new ConcreteProductB1(); // Crea y retorna un producto B1.
    };
    return ConcreteFactory1;
}());
var ConcreteFactory2 = /** @class */ (function () {
    function ConcreteFactory2() {
    }
    ConcreteFactory2.prototype.createProductA = function () {
        return new ConcreteProductA2();
    };
    ConcreteFactory2.prototype.createProductB = function () {
        return new ConcreteProductB2();
    };
    return ConcreteFactory2;
}());
// es una implementacion concreta de la interfaz de producto A
var ConcreteProductA1 = /** @class */ (function () {
    function ConcreteProductA1() {
    }
    ConcreteProductA1.prototype.usefulFunctionA = function () {
        return "The result of the product A1.";
    };
    return ConcreteProductA1;
}());
// es otra implementacion concreta de la interfaz de producto A
var ConcreteProductA2 = /** @class */ (function () {
    function ConcreteProductA2() {
    }
    ConcreteProductA2.prototype.usefulFunctionA = function () {
        return "The result of the product A2.";
    };
    return ConcreteProductA2;
}());
var ConcreteProductB1 = /** @class */ (function () {
    function ConcreteProductB1() {
    }
    ConcreteProductB1.prototype.usefulFunctionB = function () {
        return "The result of the product B1.";
    };
    /**
     * B1 puede interactuar con A1.
     * Aunque acepta cualquier AbstractProductA, solo colabora correctamente con A1.
     */
    ConcreteProductB1.prototype.anotherUsefulFunctionB = function (collaborator) {
        var result = collaborator.usefulFunctionA();
        return "The result of the B1 collaborating with the (".concat(result, ")");
    };
    return ConcreteProductB1;
}());
var ConcreteProductB2 = /** @class */ (function () {
    function ConcreteProductB2() {
    }
    ConcreteProductB2.prototype.usefulFunctionB = function () {
        return "The result of the product B2.";
    };
    /**
     * B2 puede interactuar con A2.
     * Aunque acepta cualquier AbstractProductA, solo colabora correctamente con A2.
     */
    ConcreteProductB2.prototype.anotherUsefulFunctionB = function (collaborator) {
        var result = collaborator.usefulFunctionA();
        return "The result of the B2 collaborating with the (".concat(result, ")");
    };
    return ConcreteProductB2;
}());
/**
 * El clientCode trabaja con fábricas y productos solo a través de interfaces abstractas.
 
 * - Esto permite cambiar la fábrica concreta sin afectar el código del cliente.
 */
function clientCode(factory) {
    // Creamos un producto A usando la fábrica.
    var productA = factory.createProductA();
    // Creamos un producto B usando la misma fábrica.
    var productB = factory.createProductB();
    // Llamamos al método propio del producto B.
    console.log(productB.usefulFunctionB());
    // Llamamos al método de colaboración entre B y A.
    console.log(productB.anotherUsefulFunctionB(productA));
}
console.log("Client: Testing client code with the first factory type...");
clientCode(new ConcreteFactory1());
console.log("");
console.log("Client: Testing the same client code with the second factory type...");
clientCode(new ConcreteFactory2());
