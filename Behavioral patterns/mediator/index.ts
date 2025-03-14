/**
 * La interfaz Mediator declara un método que los componentes pueden usar para
 * notificar al mediador sobre varios eventos. El mediador puede reaccionar a
 * estos eventos y pasar la ejecución a otros componentes.
 */
interface Mediator {
  notify(sender: object, event: string): void;
}

/**
 * Los Mediadores Concretos implementan un comportamiento cooperativo
 * coordinando varios componentes.
 */
class ConcreteMediator implements Mediator {
  private component1: Component1;

  private component2: Component2;
  // Constructor que recibe los componentes y les asigna el mediador.
  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1; // Se asigna el primer componente
    this.component1.setMediator(this); // Se le asigna el mediador
    this.component2 = c2; // Se asigna el segundo componente
    this.component2.setMediator(this); // Se le asigna el mediador
  }
  /**
   * Método que maneja los eventos enviados por los componentes.
   * Dependiendo del evento recibido, el mediador ejecuta ciertas acciones.
   */
  public notify(sender: object, event: string): void {
    if (event === "A") {
      console.log("Mediator reacts on A and triggers following operations:");
      this.component2.doC(); // Llama a la acción `doC()` del `component2`
    }

    if (event === "D") {
      console.log("Mediator reacts on D and triggers following operations:");
      this.component1.doB(); // Llama a la acción `doB()` del `component1`
      this.component2.doC(); // Llama a la acción `doC()` del `component2`
    }
  }
}

/**
 * La clase BaseComponent proporciona la funcionalidad básica de almacenar
 * una instancia del mediador dentro de los objetos de los componentes.
 */
class BaseComponent {
  protected mediator: Mediator; // Se declara el mediador protegido
  // Constructor que permite asignar un mediador al componente.
  constructor(mediator?: Mediator) {
    this.mediator = mediator!; // Se asigna el mediador si se proporciona
  }
  // Método para establecer el mediador en el componente.
  public setMediator(mediator: Mediator): void {
    this.mediator = mediator; // Se asigna el mediador
  }
}
/**
 * Los Componentes Concretos implementan varias funcionalidades.
 * No dependen de otros componentes ni de mediadores concretos.
 */
class Component1 extends BaseComponent {
    // Método que realiza la acción A y notifica al mediador.
  public doA(): void {
    console.log("Component 1 does A.");
    this.mediator.notify(this, "A");
  }
// Método que realiza la acción B y notifica al mediador
  public doB(): void {
    console.log("Component 1 does B.");
    this.mediator.notify(this, "B");
  }
}

class Component2 extends BaseComponent {
    // Método que realiza la acción C y notifica al mediador.
  public doC(): void {
    console.log("Component 2 does C.");
    this.mediator.notify(this, "C");
  }

  public doD(): void {
    console.log("Component 2 does D.");
    this.mediator.notify(this, "D");
  }
}
/**
 * Código del cliente.
 */
// Se crean dos componentes sin mediador
const c1 = new Component1();
const c2 = new Component2();
// Se crea un mediador y se le pasan los componentes
const mediator = new ConcreteMediator(c1, c2);

console.log("Client triggers operation A.");
c1.doA(); // Se ejecuta la acción `doA()` en el `Component1`

console.log("");
console.log("Client triggers operation D.");
c2.doD();  // Se ejecuta la acción `doD()` en el `Component2`
