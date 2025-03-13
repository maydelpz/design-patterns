/**
 las clases concretebuilder siguen la interfaz builder y proporcionan
 implmentaciones especificas de los pasos de contruccion
 */
var ConcreteBuilder1 = /** @class */ (function () {
    /**
     * Un constructor de Builder fresco debe contener un objeto de producto en blanco,
     * el cual será utilizado en la construcción posterior.
     */
    function ConcreteBuilder1() {
        this.reset();
    }
    // Método para reiniciar la construcción de un nuevo producto.
    ConcreteBuilder1.prototype.reset = function () {
        this.product = new Product1();
    };
    // Todos los pasos de producción trabajan con la misma instancia del producto.
    ConcreteBuilder1.prototype.producePartA = function () {
        this.product.parts.push("PartA1"); // Añade la parte A al producto.
    };
    ConcreteBuilder1.prototype.producePartB = function () {
        this.product.parts.push("PartB1");
    };
    ConcreteBuilder1.prototype.producePartC = function () {
        this.product.parts.push("PartC1");
    };
    /**
     * Los Concrete Builders deben proporcionar sus propios métodos para
     * obtener los resultados. Estos métodos no pueden declararse en la interfaz
     * base Builder, porque diferentes builders pueden producir productos
     * completamente distintos.
     */
    ConcreteBuilder1.prototype.getProduct = function () {
        var result = this.product; // Obtiene el producto completado.
        this.reset(); // Reinicia el builder para el siguiente producto.
        return result; // Retorna el producto finalizado.
    };
    return ConcreteBuilder1;
}());
/**
 * Los productos creados por los builders suelen ser objetos complejos que
 * contienen varias partes.
 */
var Product1 = /** @class */ (function () {
    function Product1() {
        this.parts = []; //lista de partes del producto
    }
    // Método para listar las partes del producto.
    Product1.prototype.listParts = function () {
        console.log("Product parts: ".concat(this.parts.join(", "), "\n"));
    };
    return Product1;
}());
/**
 * El Director es responsable de ejecutar los pasos de construcción en una
 * secuencia específica. Esto es útil cuando se desea producir productos
 * según un orden o configuración particular.
 *
 * De forma estricta, el Director es opcional, ya que el cliente puede controlar
 * directamente los builders.
 */
var Director = /** @class */ (function () {
    function Director() {
    }
    /**
     * El Director puede trabajar con cualquier instancia de builder que el código
     * del cliente pase. De esta forma, el cliente puede alterar el tipo final del
     * producto ensamblado.
     */
    Director.prototype.setBuilder = function (builder) {
        this.builder = builder;
    };
    Director.prototype.buildMinimalViableProduct = function () {
        this.builder.producePartA();
    };
    Director.prototype.buildFullFeaturedProduct = function () {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    };
    return Director;
}());
/**
 * El código del cliente crea un objeto builder, lo pasa al director y luego
 * inicia el proceso de construcción. El resultado final es obtenido del objeto
 * builder.
 */
function clientCode(director) {
    var builder = new ConcreteBuilder1(); // Se crea una instancia del builder.
    director.setBuilder(builder); // Se pasa el builder al director.
    console.log("Standard basic product:");
    director.buildMinimalViableProduct(); // El director construye el producto mínimo.
    builder.getProduct().listParts(); // El builder obtiene el producto y lista sus partes.
    console.log("Standard full featured product:");
    director.buildFullFeaturedProduct();
    builder.getProduct().listParts();
    // el patrón Builder puede usarse sin la clase Director.
    console.log("Custom product:");
    builder.producePartA();
    builder.producePartC();
    builder.getProduct().listParts();
}
// Se crea un director y se llama al código del cliente.
var director = new Director();
clientCode(director);
