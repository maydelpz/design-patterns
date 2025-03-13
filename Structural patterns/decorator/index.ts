//La interfaz base `Component` define una operación que los decoradores pueden alterar.
interface Component {
  operation(): string;
}
//`ConcreteComponent` proporciona la implementación predeterminada de la operación.
class ConcreteComponent implements Component {
  public operation(): string {
    return "ConcreteComponent";
  }
}
//`Decorator` sigue la misma interfaz que `Component`, permitiendo envolver componentes.
class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }
// `Decorator` delega el trabajo al componente envuelto.
  public operation(): string {
    return this.component.operation();
  }
}
// `ConcreteDecoratorA` llama al objeto envuelto y modifica su resultado.
class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}
//`ConcreteDecoratorB` también modifica el resultado del objeto envuelto.
class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}
// El código cliente trabaja con cualquier `Component`, sin importar si está decorado o no.
function clientCode(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

const simple = new ConcreteComponent();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");
// Los decoradores pueden envolver tanto `ConcreteComponent` como otros decoradores
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
