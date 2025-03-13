/*declara un conjunto de metodos que devuelven difernetes productos abstrcatos 
estos productos forman una familia y esatn relacionados por un tema o concepto en comun
estos pueden trabajar juntos
cada familia de productos pude tener diferntes variantes, pero los productos d euna variante 
especifica no son compatibles con los de otra
*/

interface AbstractFactory {
  createProductA(): AbstractProductA; //crea un producto A

  createProductB(): AbstractProductB; //crea un producto B
}

/**
 se crea una familia de productos de la variante 1
 garantiza que los productos creados sean compatibles entre si
 */
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1(); // Crea y retorna un producto A1.
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB1(); // Crea y retorna un producto B1.
  }
}

class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

/**
 define la estructura que deben seguir todos los productos de tipo A
 */
interface AbstractProductA {
  usefulFunctionA(): string; // Método que deben implementar los productos A.
}

// es una implementacion concreta de la interfaz de producto A
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
    return "The result of the product A1.";
  }
}

// es otra implementacion concreta de la interfaz de producto A
class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
    return "The result of the product A2.";
  }
}

/**
 * La interfaz AbstractProductB define la estructura de los productos B.
 *
 * - Los productos B pueden funcionar independientemente.
 * - También pueden interactuar con los productos A de su misma variante.
 */
interface AbstractProductB {
  usefulFunctionB(): string;
  /**
   * Permite la colaboración entre un producto B y un producto A.
   * La fábrica se asegura de que los productos sean compatibles.
   */

  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

class ConcreteProductB1 implements AbstractProductB {
  public usefulFunctionB(): string {
    return "The result of the product B1.";
  }
  /**
   * B1 puede interactuar con A1.
   * Aunque acepta cualquier AbstractProductA, solo colabora correctamente con A1.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 collaborating with the (${result})`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  public usefulFunctionB(): string {
    return "The result of the product B2.";
  }

  /**
   * B2 puede interactuar con A2.
   * Aunque acepta cualquier AbstractProductA, solo colabora correctamente con A2.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with the (${result})`;
  }
}
/**
 * El clientCode trabaja con fábricas y productos solo a través de interfaces abstractas.
 
 * - Esto permite cambiar la fábrica concreta sin afectar el código del cliente.
 */
function clientCode(factory: AbstractFactory) {
  // Creamos un producto A usando la fábrica.

  const productA = factory.createProductA();
  // Creamos un producto B usando la misma fábrica.
  const productB = factory.createProductB();
  // Llamamos al método propio del producto B.
  console.log(productB.usefulFunctionB());
  // Llamamos al método de colaboración entre B y A.
  console.log(productB.anotherUsefulFunctionB(productA));
}

console.log("Client: Testing client code with the first factory type...");
clientCode(new ConcreteFactory1());

console.log("");

console.log(
  "Client: Testing the same client code with the second factory type..."
);
clientCode(new ConcreteFactory2());
