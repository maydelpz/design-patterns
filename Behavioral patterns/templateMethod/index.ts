/**
 * La clase abstracta define un método plantilla que contiene el esqueleto de un
 * algoritmo, compuesto por llamadas a (generalmente) operaciones primitivas abstractas.
 *
 * Las subclases concretas deben implementar estas operaciones, pero dejar intacto el
 * método plantilla.
 */
abstract class AbstractClass {
  // El método plantilla define el esqueleto de un algoritmo.
  public templateMethod(): void {
    this.baseOperation1(); // Ejecuta una operación base.
    this.requiredOperations1(); // Ejecuta una operación obligatoria que debe ser implementada en las subclases.
    this.baseOperation2(); // Ejecuta otra operación base.
    this.hook1(); // Ejecuta un "hook", que puede ser sobreescrito o no por las subclases.
    this.requiredOperation2(); // Ejecuta otra operación obligatoria que debe ser implementada en las subclases.
    this.baseOperation3(); // Ejecuta otra operación base.
    this.hook2(); // Ejecuta otro "hook", que puede ser sobreescrito o no.
  }

  // Estas operaciones ya tienen implementaciones.
  protected baseOperation1(): void {
    console.log("AbstractClass says: I am doing the bulk of the work");
  }

  protected baseOperation2(): void {
    console.log(
      "AbstractClass says: But I let subclasses override some operations"
    );
  }

  protected baseOperation3(): void {
    console.log(
      "AbstractClass says: But I am doing the bulk of the work anyway"
    );
  }
// Estas operaciones deben ser implementadas en las subclases.
  protected abstract requiredOperations1(): void;

  protected abstract requiredOperation2(): void;
  /**
     * Estos son "hooks". Las subclases pueden sobreescribirlos, pero no es obligatorio,
     * ya que los hooks ya tienen una implementación predeterminada (aunque vacía). Los hooks
     * proporcionan puntos adicionales de extensión en algunos lugares clave del algoritmo.
     */

  protected hook1(): void {}

  protected hook2(): void {}
}
/**
 * Las clases concretas deben implementar todas las operaciones abstractas de la clase base.
 * También pueden sobreescribir algunas operaciones con una implementación predeterminada.
 */
class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log("ConcreteClass1 says: Implemented Operation1");
  }

  protected requiredOperation2(): void {
    console.log("ConcreteClass1 says: Implemented Operation2");
  }
}

/**
 * Normalmente, las clases concretas sobreescriben solo una fracción de las operaciones
 * de la clase base.
 */
class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log("ConcreteClass2 says: Implemented Operation1");
  }

  protected requiredOperation2(): void {
    console.log("ConcreteClass2 says: Implemented Operation2");
  }

  protected hook1(): void {
    console.log("ConcreteClass2 says: Overridden Hook1");
  }
}

/**
 * El código del cliente llama al método plantilla para ejecutar el algoritmo. El
 * código del cliente no tiene que conocer la clase concreta de un objeto con el que trabaja, 
 * siempre que trabaje con objetos a través de la interfaz de su clase base.
 */
function clientCode(abstractClass: AbstractClass) {
  abstractClass.templateMethod();
}

console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass1());
console.log("");

console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass2());
