/**
 * El Flyweight almacena una porción común del estado (también llamado estado intrínseco)
 * que pertenece a varias entidades reales de negocio. El Flyweight acepta el resto
 * del estado (estado extrínseco, único para cada entidad) a través de sus parámetros de método.
 */
class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

/**
 * El FlyweightFactory crea y gestiona los objetos Flyweight. Asegura que los Flyweights
 * se compartan correctamente. Cuando el cliente solicita un Flyweight, la fábrica devuelve
 * una instancia existente o crea una nueva si aún no existe.
 */
class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = <any>{};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }
  // Devuelve el hash de cadena de un Flyweight para un estado dado.
  private getKey(state: string[]): string {
    return state.join("_");
  }
  // Devuelve un Flyweight existente con un estado dado o crea uno nuevo.
  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log(
        "FlyweightFactory: Can't find a flyweight, creating new one."
      );
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log("FlyweightFactory: Reusing existing flyweight.");
    }

    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}
// El código del cliente normalmente crea una serie de Flyweights pre-poblados en la etapa de inicialización.
const factory = new FlyweightFactory([
  ["Chevrolet", "Camaro2018", "pink"],
  ["Mercedes Benz", "C300", "black"],
  ["Mercedes Benz", "C500", "red"],
  ["BMW", "M5", "red"],
  ["BMW", "X6", "white"],
]);
factory.listFlyweights();

function addCarToPoliceDatabase(
  ff: FlyweightFactory,
  plates: string,
  owner: string,
  brand: string,
  model: string,
  color: string
) {
  console.log("\nClient: Adding a car to database.");
  const flyweight = ff.getFlyweight([brand, model, color]);
  // El código cliente almacena o calcula el estado extrínseco y lo pasa
  // a los métodos del Flyweight.
  flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "M5", "red");

addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "X1", "red");

factory.listFlyweights();
