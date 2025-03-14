/**
 * El Contexto define la interfaz de interés para los clientes. También mantiene
 * una referencia a una instancia de una subclase de Estado, que representa el
 * estado actual del Contexto.
 */
class Context {
   
    private state: State; // Propiedad que mantiene el estado actual del contexto.

    constructor(state: State) {
        this.transitionTo(state);  // Al crear el Contexto, se inicializa con un estado.
    }

   //El Contexto permite cambiar el objeto State en tiempo de ejecución.
    public transitionTo(state: State): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);  // Muestra el cambio de estado.
        this.state = state; // Actualiza el estado actual con el nuevo estado.
        this.state.setContext(this); // Se establece el contexto en el nuevo estado.
    }

    // El Contexto delega parte de su comportamiento al objeto State actual.
    public request1(): void {
        this.state.handle1(); // Delegación de la solicitud 1 al estado actual.
    
    }

    public request2(): void {
        this.state.handle2(); // Delegación de la solicitud 2 al estado actual.
    }
}

/**
 * La clase base State declara los métodos que todos los Estados Concretos deben
 * implementar y también proporciona una referencia al objeto Context, asociado
 * con el Estado. Esta referencia se usa para que los Estados puedan cambiar el
 * Contexto a otro Estado.
 */
abstract class State {
    protected context: Context;  // Referencia al contexto asociado con el estado.

    public setContext(context: Context) {
        this.context = context;  // Establece el contexto en el estado.
    }

    // Métodos que deben ser implementados por los estados concretos.
    public abstract handle1(): void;

    public abstract handle2(): void;
}

/**
 * Los Estados Concretos implementan varios comportamientos asociados con un estado
 * específico del Contexto.
 */
class ConcreteStateA extends State {
    public handle1(): void {
        console.log('ConcreteStateA handles request1.'); // El comportamiento del estado A para la solicitud 1.
        console.log('ConcreteStateA wants to change the state of the context.'); // Muestra que el estado A quiere cambiar el contexto.
        this.context.transitionTo(new ConcreteStateB()); // Cambia el contexto al estado B.
    }

    public handle2(): void {
        console.log('ConcreteStateA handles request2.'); // El comportamiento del estado A para la solicitud 2.
    }
}

class ConcreteStateB extends State {
    public handle1(): void {
        console.log('ConcreteStateB handles request1.'); // El comportamiento del estado B para la solicitud 1.
    }

    public handle2(): void {
        console.log('ConcreteStateB maneja request2.');  // El comportamiento del estado B para la solicitud 2.
        console.log('ConcreteStateB quiere cambiar el estado del contexto.');  // Muestra que el estado B quiere cambiar el contexto.
        this.context.transitionTo(new ConcreteStateA());  // Cambia el contexto al estado A.
    }
}


const context = new Context(new ConcreteStateA());  // Crea un contexto con el estado inicial ConcreteStateA.
context.request1();  // Realiza la solicitud 1, lo cual cambia el estado a ConcreteStateB.
context.request2();  // Realiza la solicitud 2, que es manejada por ConcreteStateB.