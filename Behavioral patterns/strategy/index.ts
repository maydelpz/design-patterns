// El Contexto define la interfaz de interés para los clientes.

class Context {
  /**
   * @type {Strategy} El Contexto mantiene una referencia a uno de los objetos
   * Strategy. El Contexto no sabe la clase concreta de la estrategia. Debe
   * trabajar con todas las estrategias a través de la interfaz Strategy.
   */
  private strategy: Strategy; // Propiedad que mantiene la estrategia actual del contexto.

  /**
   * Generalmente, el Contexto acepta una estrategia a través del constructor,
   * pero también proporciona un setter para cambiarla en tiempo de ejecución.
   */
  constructor(strategy: Strategy) {
    this.strategy = strategy; // Se inicializa el contexto con una estrategia.
  }
  /**
   * Generalmente, el Contexto permite reemplazar un objeto Strategy en tiempo
   * de ejecución.
   */
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy; // Cambia la estrategia actual.
  }
  /**
   * El Contexto delega parte del trabajo al objeto Strategy en lugar de
   * implementar múltiples versiones del algoritmo por sí mismo.
   */
  public doSomeBusinessLogic(): void {
    console.log(
      "Context: Sorting data using the strategy (not sure how it'll do it)"
    );
    const result = this.strategy.doAlgorithm(["a", "b", "c", "d", "e"]); // La estrategia ejecuta el algoritmo.
    console.log(result.join(",")); // Muestra el resultado después de ejecutar el algoritmo.
  }
}
/**
 * La interfaz Strategy declara operaciones comunes para todas las versiones
 * soportadas de algún algoritmo.
 *
 * El Contexto usa esta interfaz para llamar al algoritmo definido por las
 * Estrategias Concretas.
 */
interface Strategy {
  doAlgorithm(data: string[]): string[];
}
/**
 * Las Estrategias Concretas implementan el algoritmo siguiendo la interfaz
 * Strategy base. La interfaz hace que sean intercambiables en el Contexto.
 */
class ConcreteStrategyA implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}
/**
 * El código del cliente elige una estrategia concreta y la pasa al contexto. El
 * cliente debe estar consciente de las diferencias entre las estrategias para
 * hacer la elección correcta.
 */
const context = new Context(new ConcreteStrategyA());
console.log("Client: Strategy is set to normal sorting.");
context.doSomeBusinessLogic();

console.log("");
// Cambia la estrategia a la B (orden inverso).
console.log("Client: Strategy is set to reverse sorting.");
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
