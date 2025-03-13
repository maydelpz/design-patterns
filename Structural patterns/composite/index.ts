/**
 * La clase base `Component` declara operaciones comunes para objetos simples y
 * compuestos en una jerarquía de composición.
 */
abstract class Component {
  protected parent!: Component | null; // Guarda una referencia al componente padre.
  //Permite asignar o quitar un padre a un componente en la estructura de árbol.
  public setParent(parent: Component | null) {
    this.parent = parent;
  }

  public getParent(): Component | null {
    return this.parent;
  }
  /**
   * Métodos para manejar hijos en la estructura de árbol. En componentes hoja,
   * estos métodos estarán vacíos porque no tienen hijos.
   */
  public add(component: Component): void {}

  public remove(component: Component): void {}
  /**
   * Indica si el componente puede tener hijos (si es un "compuesto").
   * Por defecto, los componentes hoja devuelven `false`.
   */
  public isComposite(): boolean {
    return false;
  }
  // Método abstracto que las subclases deben implementar.
  public abstract operation(): string;
}
//`Leaf` representa los objetos finales en la composición. No pueden tener hijos.
class Leaf extends Component {
  public operation(): string {
    return "Leaf";
  }
}
// `Composite` representa los objetos compuestos que pueden contener hijos.
class Composite extends Component {
  protected children: Component[] = [];
  //Un objeto compuesto puede agregar o quitar otros componentes (simples o compuestos).
  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this); // Asigna el padre.
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null); // Elimina la referencia al padre.
  }

  public isComposite(): boolean {
    return true; // Un objeto compuesto puede contener hijos.
  }
  /**
   * `operation()` recorre todos los hijos, llama a `operation()` en cada uno y
   * combina los resultados en una cadena.
   */
  public operation(): string {
    const results: string[] = [];
    for (const child of this.children) {
      results.push(child.operation());
    }

    return `Branch(${results.join("+")})`;
  }
}
//El código cliente trabaja con cualquier componente a través de la interfaz base.
function clientCode(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

const simple = new Leaf();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");

const tree = new Composite(); //arbol principal
const branch1 = new Composite();
branch1.add(new Leaf()); //hoja 1
branch1.add(new Leaf()); //hoja 2
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log("Client: Now I've got a composite tree:");
clientCode(tree);
console.log("");
/**
 * El código cliente puede manejar cualquier tipo de componente sin preocuparse
 * por su clase concreta.
 */
function clientCode2(component1: Component, component2: Component) {
  if (component1.isComposite()) {
    component1.add(component2);
  }
  console.log(`RESULT: ${component1.operation()}`);
}

console.log(
  "Client: I don't need to check the components classes even when managing the tree:"
);
clientCode2(tree, simple);
