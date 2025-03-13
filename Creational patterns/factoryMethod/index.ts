
/*la clase abstracta creator declara el metodo el cual es reponsable de devolver un objeto 
de la interfaz product, asl subclases deben proporcionar una implementacion concreta de ste metodo*/ 
abstract class Creator {
    /*este es el metodo que las subclase deben implementar, su objetivo es devolver un objeto 
    que implemente la interfaz product*/ 
    public abstract factoryMethod(): Product;

    /** este metodo es el que usa el producto devuelto por el factoryMethod 
     * aunque el metodo principal de creator no crea el producto directamente,
     * si define una logica de negocio que usa el producto
     */
    public someOperation(): string {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}
/**
 * ConcreteCreator1 es una subclase concreta de Creator.
 * Implementa el método de fábrica y devuelve un producto específico.
 */
class ConcreteCreator1 extends Creator {

    public factoryMethod(): Product {
        return new ConcreteProduct1(); // Retorna una instancia de ConcreteProduct1
    }
}
/**
 * ConcreteCreator2 es otra implementación concreta de Creator.
 * Retorna una instancia diferente de Product.
 */
class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2(); // Retorna una instancia de ConcreteProduct2
    }
}

/**
 * La interfaz Product declara el comportamiento que todos los productos deben tener.
 */
interface Product {
    operation(): string; // Método que deben implementar todos los productos concretos.
}

/**
 * ConcreteProduct1 es una implementación concreta de la interfaz Product.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';  // Mensaje que representa el resultado de la operación.
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * clientCode() es una función que recibe un objeto Creator como argumento.
 * No necesita conocer la clase exacta del creador ni del producto que se está utilizando.
 * Solo interactúa con ellos a través de sus interfaces.
 */
function clientCode(creator: Creator) {
    
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());  // Llamamos al método someOperation() del creador.
    
}

/**
 * Simulación de ejecución del código.
 * Dependiendo de qué creador usemos, obtendremos un producto diferente.
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());