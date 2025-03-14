/**
 * La interfaz Component declara un método `accept` que debe recibir la interfaz base
 * del visitante como argumento.
 */
interface Component {
    accept(visitor: Visitor): void;  // El método 'accept' recibe un visitante y le pasa la instancia actual de Component.
}

/**
 * Cada Componente Concreto debe implementar el método `accept` de tal manera que
 * llama al método del visitante correspondiente a la clase del componente.
 */
class ConcreteComponentA implements Component {
    /**
     * Nota que estamos llamando a `visitConcreteComponentA`, lo que coincide con el
     * nombre de la clase actual. De esta manera, dejamos que el visitante sepa la clase del
     * componente con el que está trabajando.
     */
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentA(this);  // Llama al método adecuado del visitante, pasando la instancia actual de ConcreteComponentA.
    }

    /**
     * Los Componentes Concretos pueden tener métodos especiales que no existen en su
     * clase base o interfaz. El Visitante aún puede usar estos métodos
     * ya que está al tanto de la clase concreta del componente.
     */
    public exclusiveMethodOfConcreteComponentA(): string {
        return 'A';  // Un método específico de ConcreteComponentA.
    }
}

class ConcreteComponentB implements Component {
    /**
     * Lo mismo aquí: visitConcreteComponentB => ConcreteComponentB
     */
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentB(this);  // Llama al método adecuado del visitante, pasando la instancia actual de ConcreteComponentB.
    }

    public specialMethodOfConcreteComponentB(): string {
        return 'B';  // Un método específico de ConcreteComponentB.
    }
}

/**
 * La interfaz Visitor declara un conjunto de métodos de visita que corresponden
 * a las clases de los componentes. La firma de un método de visita permite que el visitante
 * identifique la clase exacta del componente con el que está tratando.
 */
interface Visitor {
    visitConcreteComponentA(element: ConcreteComponentA): void;  // Método que se invoca cuando el visitante encuentra un ConcreteComponentA.

    visitConcreteComponentB(element: ConcreteComponentB): void;  // Método que se invoca cuando el visitante encuentra un ConcreteComponentB.
}

/**
 * Los Visitantes Concretos implementan varias versiones del mismo algoritmo, las cuales pueden
 * trabajar con todas las clases concretas de los componentes.
 *
 * El mayor beneficio del patrón Visitor se obtiene cuando se usa con una estructura de objetos
 * compleja, como un árbol Composite. En este caso, podría ser útil almacenar algo de estado
 * intermedio del algoritmo mientras ejecuta los métodos del visitante sobre varios objetos de la estructura.
 */
class ConcreteVisitor1 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
        // Llama a un método exclusivo de ConcreteComponentA y lo combina con el nombre del visitante.
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
        // Llama a un método exclusivo de ConcreteComponentB y lo combina con el nombre del visitante.
    }
}

class ConcreteVisitor2 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
        // Llama a un método exclusivo de ConcreteComponentA y lo combina con el nombre del visitante.
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
        // Llama a un método exclusivo de ConcreteComponentB y lo combina con el nombre del visitante.
    }
}

/**
 * El código del cliente puede ejecutar operaciones del visitante sobre cualquier conjunto de elementos sin
 * tener que averiguar sus clases concretas. La operación accept redirige la llamada a
 * la operación adecuada en el objeto visitante.
 */
function clientCode(components: Component[], visitor: Visitor) {
    for (const component of components) {
        component.accept(visitor);  // Llama al método 'accept' de cada componente, lo que invoca el método correspondiente del visitante.
    }
}

// El cliente crea una lista de componentes.
const components = [
    new ConcreteComponentA(),
    new ConcreteComponentB(),
];

console.log('El código del cliente funciona con todos los visitantes a través de la interfaz base Visitor:');
const visitor1 = new ConcreteVisitor1();  // Crea una instancia de ConcreteVisitor1.
clientCode(components, visitor1);  // Llama al código del cliente con el visitante 1.
console.log('');

console.log('Permite que el mismo código del cliente funcione con diferentes tipos de visitantes:');
const visitor2 = new ConcreteVisitor2();  // Crea una instancia de ConcreteVisitor2.
clientCode(components, visitor2);  // Llama al código del cliente con el visitante 2.
