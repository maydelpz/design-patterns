/**
 * La clase `Facade` proporciona una interfaz simple para la lógica compleja
 * de uno o varios subsistemas.
 *
 * - Delegará las solicitudes a los objetos apropiados del subsistema.
 * - Gestionará el ciclo de vida de los objetos del subsistema.
 *
 * Esto oculta la complejidad del sistema al cliente.
 */
class Facade {
  protected subsystem1: Subsystem1;

  protected subsystem2: Subsystem2;
  /**
   * Dependiendo de las necesidades de la aplicación, se pueden proporcionar
   * objetos de subsistema existentes o dejar que `Facade` los cree automáticamente.
   */
  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }
  /**
   * Los métodos de `Facade` son accesos directos a funcionalidades complejas
   * de los subsistemas. Sin embargo, los clientes solo pueden acceder a una
   * fracción de las capacidades del subsistema.
   */
  public operation(): string {
    let result = "Facade initializes subsystems:\n";
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += "Facade orders subsystems to perform the action:\n";
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();

    return result;
  }
}
/**
 * Un subsistema puede aceptar solicitudes tanto desde la fachada como directamente
 * desde el cliente. Para el subsistema, la fachada es solo otro cliente.
 */
class Subsystem1 {
  public operation1(): string {
    return "Subsystem1: Ready!\n";
  }

  public operationN(): string {
    return "Subsystem1: Go!\n";
  }
}
//Algunas fachadas pueden trabajar con múltiples subsistemas al mismo tiempo.
class Subsystem2 {
  public operation1(): string {
    return "Subsystem2: Get ready!\n";
  }

  public operationZ(): string {
    return "Subsystem2: Fire!";
  }
}
/**
 * El código cliente trabaja con subsistemas complejos a través de una interfaz
 * simple proporcionada por `Facade`. Si la fachada maneja el ciclo de vida del
 * subsistema, el cliente ni siquiera necesita conocer su existencia.
 */
function clientCode(facade: Facade) {
  console.log(facade.operation());
}
/**
 * El código cliente puede tener objetos del subsistema creados previamente.
 * En este caso, `Facade` puede reutilizar esos objetos en lugar de crear nuevos.
 */
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
