/**
 * La clase Singleton define un getter `instance`, que permite a los clientes acceder
 * a la instancia única del Singleton.
 */
class Singleton {
  static #instance: Singleton; // Variable estática privada que almacena la instancia única del Singleton.
  /**
   * El constructor del Singleton debe ser siempre privado para evitar que se creen instancias
   * directamente utilizando el operador `new`.
   */
  private constructor() {}
  //El getter estático que controla el acceso a la instancia del Singleton.
  public static get instance(): Singleton {
    // Si no existe una instancia, crea una nueva.
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    // Devuelve la instancia única del Singleton.
    return Singleton.#instance;
  }

  public someBusinessLogic() {}
}

function clientCode() {
  const s1 = Singleton.instance; // Obtiene la instancia única del Singleton.
  const s2 = Singleton.instance; // Obtiene la misma instancia del Singleton (debería ser la misma que s1).

  if (s1 === s2) {
    console.log("Singleton works, both variables contain the same instance.");
  } else {
    console.log("Singleton failed, variables contain different instances.");
  }
}

clientCode();
