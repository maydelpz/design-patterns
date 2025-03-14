/**
 * El Originator mantiene un estado importante que puede cambiar con el tiempo.
 * También define un método para guardar el estado dentro de un memento y otro
 * método para restaurar el estado desde él.
 */
class Originator {
    // Para simplificar, el estado del originator se guarda en una sola variable.
    private state: string; // Definimos la propiedad "state" que almacenará el estado actual.

    constructor(state: string) {
        this.state = state;  // Se asigna el estado inicial al Originator
        console.log(`Originator: My initial state is: ${state}`);
    }

      /**
     * La lógica de negocio del Originator puede afectar su estado interno. Por lo tanto,
     * el cliente debe hacer una copia de seguridad del estado antes de ejecutar cualquier
     * método de la lógica de negocio a través del método `save()`.
     */
    public doSomething(): void {
        console.log('Originator: I\'m doing something important.');
        this.state = this.generateRandomString(30); // Cambia el estado a un nuevo valor aleatorio
        console.log(`Originator: and my state has changed to: ${this.state}`);
    }

    private generateRandomString(length: number = 10): string {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return Array 
            .apply(null, { length }) // Genera un array de la longitud que se pase
            .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length))) // Elige un carácter aleatorio del conjunto
            .join(''); // Une los caracteres para formar la cadena
    }

    // Guarda el estado actual dentro de un memento.
    public save(): Memento {
        return new ConcreteMemento(this.state); // Crea un memento con el estado actual y lo devuelve
    }

   //  Restaura el estado del Originator desde un objeto memento.
    public restore(memento: Memento): void {
        this.state = memento.getState(); // Restaura el estado desde el memento
        console.log(`Originator: My state has changed to: ${this.state}`);
    }
}

/**
 * La interfaz Memento proporciona una manera de recuperar los metadatos del memento,
 * como la fecha de creación o el nombre. Sin embargo, no expone el estado del Originator.
 */
interface Memento {
    getState(): string;

    getName(): string;

    getDate(): string;
}

// El Memento Concreto contiene la infraestructura para almacenar el estado del Originator.
class ConcreteMemento implements Memento {
    private state: string; // Estado guardado del originator

    private date: string; // Fecha de creación del memento

    constructor(state: string) {
        this.state = state; // Se guarda el estado recibido en el memento
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' '); // Se guarda la fecha actual
    }

  // El Originator usa este método cuando restaura su estado.  
    public getState(): string {
        return this.state; // Devuelve el estado almacenado en el memento
    }

   // Los métodos restantes son usados por el Caretaker para mostrar los metadatos del memento.
    public getName(): string {
        return `${this.date} / (${this.state.substr(0, 9)}...)`; // Devuelve el nombre con la fecha y un resumen del estado
    }

    public getDate(): string {
        return this.date; // Devuelve la fecha en que se creó el memento
    }
}

/**
 * El Caretaker no depende de la clase ConcreteMemento. Por lo tanto, no tiene acceso al
 * estado del originator almacenado dentro del memento. Trabaja con todos los mementos
 * a través de la interfaz base Memento.
 */

class Caretaker {
    private mementos: Memento[] = []; // Array que almacena los mementos guardados
 
    private originator: Originator; // El originator cuyo estado se va a gestionar

    constructor(originator: Originator) {
        this.originator = originator;
    }
// Realiza un respaldo del estado actual del originator.
    public backup(): void {
        console.log('\nCaretaker: Saving Originator\'s state...');
        this.mementos.push(this.originator.save());
    }
// Deshace el último cambio, restaurando el estado desde el memento más reciente.
    public undo(): void {
        if (!this.mementos.length) {
            return;
        } 
        const memento = this.mementos.pop();  // Saca el último memento

        console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
        this.originator.restore(memento); // Restaura el estado usando el memento
    }

    public showHistory(): void {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}

// Se crea un originator con un estado inicial
const originator = new Originator('Super-duper-super-puper-super.');
const caretaker = new Caretaker(originator);

caretaker.backup(); // Se guarda el primer estado
originator.doSomething();  // El originator cambia su estado

caretaker.backup();  // Se guarda el segundo estado
originator.doSomething();  // El originator cambia su estado nuevamente

caretaker.backup();  // Se guarda el tercer estado
originator.doSomething();  // El originator cambia su estado una vez más

console.log('');
caretaker.showHistory();  // Muestra el historial de cambios de estado guardados

console.log('\nCliente: Ahora, ¡vamos a revertir los cambios!\n');
caretaker.undo();  // Se restaura el último estado guardado

console.log('\nCliente: ¡Una vez más!\n');
caretaker.undo();  // Se restaura el segundo estado guardado