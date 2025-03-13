/**
 * La clase `Abstraction` define la interfaz para la parte "de control" de dos
 * jerarquías de clases. Mantiene una referencia a un objeto de la jerarquía de
 * implementación y delega el trabajo real a este objeto.
 */
class Abstraction {
  protected implementation: Implementation; // Guarda una referencia a la implementación.
  /**
   * El constructor recibe un objeto de tipo `Implementation` e inicializa
   * la referencia `implementation`.
   */
  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }
  /**
   * Método que ejecuta una operación utilizando la implementación subyacente.
   *
   * - Llama al método `operationImplementation()` de `Implementation`.
   * - Devuelve el resultado con un mensaje de la `Abstraction`.
   */
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}
/**
 * Puedes extender la Abstracción sin cambiar las clases de Implementación.
 */
class ExtendedAbstraction extends Abstraction {
  /**
   * Este método redefine `operation()` pero sigue usando `Implementation`.
   */
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

interface Implementation {
  operationImplementation(): string;
}
/**
 * Cada `ConcreteImplementation` corresponde a una plataforma específica e
 * implementa la interfaz `Implementation` usando su propia lógica.
 */
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationA: Here's the result on the platform A.";
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationB: Here's the result on the platform B.";
  }
}
/**
 * Excepto en la fase de inicialización, donde un objeto `Abstraction` se
 * enlaza con un objeto `Implementation`, el código cliente solo depende de
 * `Abstraction`. Así, puede usar cualquier combinación de abstracción e implementación.
 */
function clientCode(abstraction: Abstraction) {
  console.log(abstraction.operation());
}
/**
 * El código cliente debería poder trabajar con cualquier combinación de
 * Abstraction e Implementation.
 */
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log("");

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
