// La clase Target define la interfaz específica del dominio que el código cliente usa.

class Target {
  public request(): string {
    return "Target: The default target's behavior.";
  }
}

/**
 * La clase Adaptee tiene un comportamiento útil, pero su interfaz es incompatible
 * con el código cliente existente. El Adaptee necesita alguna adaptación antes de que el
 * código cliente pueda usarlo.
 */
class Adaptee {
  public specificRequest(): string {
    return ".eetpadA eht fo roivaheb laicepS";
  }
}

//La clase Adapter hace que la interfaz del Adaptee sea compatible con la interfaz del Target.
class Adapter extends Target {
  private adaptee: Adaptee;
  //El constructor del Adapter recibe un Adaptee y lo guarda.

  constructor(adaptee: Adaptee) {
    super(); // Llama al constructor de la clase base Target.
    this.adaptee = adaptee; // Almacena el objeto Adaptee.
  }
  /**
   * Sobrescribe el método `request` de la clase base (Target), adaptándolo
   * para que pueda usar el método incompatible del Adaptee (`specificRequest`).
   *
   * Este método realiza la adaptación:
   * 1. Llama al método `specificRequest` del Adaptee.
   * 2. Invierte el string que devuelve `specificRequest`.
   * 3. Devuelve el resultado en un formato compatible con la interfaz `request` de Target.
   */
  public request(): string {
    const result = this.adaptee.specificRequest().split("").reverse().join("");
    return `Adapter: (TRANSLATED) ${result}`;
  }
}
function clientCode(target: Target) {
  console.log(target.request()); // Pasa el objeto Target normal al código cliente.
}

console.log("Client: I can work just fine with the Target objects:");
const target = new Target();
clientCode(target);

console.log("");
// Aquí, se crea un objeto Adaptee y se muestra que la interfaz no es compatible:
const adaptee = new Adaptee();
console.log(
  "Client: The Adaptee class has a weird interface. See, I don't understand it:"
);
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log("");

console.log("Client: But I can work with it via the Adapter:");
const adapter = new Adapter(adaptee);
clientCode(adapter);
