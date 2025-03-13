class Prototype {
  public primitive: any; //campo primitivo, puede ser cualquier tipo de dato
  public component: object; //campo de tipo objeto
  public circularReference: ComponentWithBackReference; //campo de tipo objeto con referencia circular

  /**
   * metodo de clonacion, crea una copia del objeto actual
   * @returns el objeto clonado
   */
  public clone(): this {
    const clone = Object.create(this); // Crea un objeto nuevo, copiando el prototipo de 'this' (esto crea una copia superficial).

    clone.component = Object.create(this.component); // Clona el objeto 'component', de modo que el componente también se clona.
    // Clonar un objeto que tiene un objeto anidado con referencia circular
    // requiere tratamiento especial. Después de que se complete la clonación,
    // el objeto anidado debe apuntar al objeto clonado, en lugar de al objeto original.
    // Usamos el operador de expansión (...) para hacer esto.
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype; //campo que almacna el prototipo

  constructor(prototype: Prototype) {
    this.prototype = prototype; // Inicializa la propiedad 'prototype' con el objeto 'Prototype' que se pasa.
  }
}

//instancia del prototipo
function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245; //asigna un valor primitivo a primitive
  p1.component = new Date(); // Asigna un componente que es un objeto (en este caso, una fecha).
  p1.circularReference = new ComponentWithBackReference(p1); // Crea una referencia circular, donde el objeto contiene una referencia al propio prototipo.
  
  // Clona el objeto 'p1' utilizando el método 'clone'.
  const p2 = p1.clone();
  if (p1.primitive === p2.primitive) {
    console.log(
      "Primitive field values have been carried over to a clone. Yay!"
    );
  } else {
    console.log("Primitive field values have not been copied. Booo!");
  }
  if (p1.component === p2.component) {
    console.log("Simple component has not been cloned. Booo!");
  } else {
    console.log("Simple component has been cloned. Yay!");
  }

  if (p1.circularReference === p2.circularReference) {
    console.log("Component with back reference has not been cloned. Booo!");
  } else {
    console.log("Component with back reference has been cloned. Yay!");
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log(
      "Component with back reference is linked to original object. Booo!"
    );
  } else {
    console.log("Component with back reference is linked to the clone. Yay!");
  }
}

clientCode();
