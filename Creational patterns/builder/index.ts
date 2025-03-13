/* la interfaz expecifica los metodos para crear las diferentes partes
de los objetos producto*/
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

/**
 las clases concretebuilder siguen la interfaz builder y proporcionan 
 implmentaciones especificas de los pasos de contruccion
 */
class ConcreteBuilder1 implements Builder {
  private product: Product1; // Instancia de la clase Product1 que se construirá.
  /**
   * Un constructor de Builder fresco debe contener un objeto de producto en blanco,
   * el cual será utilizado en la construcción posterior.
   */
  constructor() {
    this.reset();
  }
  // Método para reiniciar la construcción de un nuevo producto.

  public reset(): void {
    this.product = new Product1();
  }

  // Todos los pasos de producción trabajan con la misma instancia del producto.
  public producePartA(): void {
    this.product.parts.push("PartA1"); // Añade la parte A al producto.
  }

  public producePartB(): void {
    this.product.parts.push("PartB1");
  }

  public producePartC(): void {
    this.product.parts.push("PartC1");
  }

  /**
   * Los Concrete Builders deben proporcionar sus propios métodos para
   * obtener los resultados. Estos métodos no pueden declararse en la interfaz
   * base Builder, porque diferentes builders pueden producir productos
   * completamente distintos.
   */

  public getProduct(): Product1 {
    const result = this.product; // Obtiene el producto completado.
    this.reset(); // Reinicia el builder para el siguiente producto.
    return result; // Retorna el producto finalizado.
  }
}
/**
 * Los productos creados por los builders suelen ser objetos complejos que
 * contienen varias partes.
 */

class Product1 {
  public parts: string[] = []; //lista de partes del producto
  // Método para listar las partes del producto.
  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}

/**
 * El Director es responsable de ejecutar los pasos de construcción en una
 * secuencia específica. Esto es útil cuando se desea producir productos
 * según un orden o configuración particular.
 *
 * De forma estricta, el Director es opcional, ya que el cliente puede controlar
 * directamente los builders.
 */
class Director {
  private builder: Builder; //el director usa el builder para construir un producto

  /**
   * El Director puede trabajar con cualquier instancia de builder que el código
   * del cliente pase. De esta forma, el cliente puede alterar el tipo final del
   * producto ensamblado.
   */
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

/**
 * El código del cliente crea un objeto builder, lo pasa al director y luego
 * inicia el proceso de construcción. El resultado final es obtenido del objeto
 * builder.
 */
function clientCode(director: Director) {
  const builder = new ConcreteBuilder1(); // Se crea una instancia del builder.
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
const director = new Director();
clientCode(director);
