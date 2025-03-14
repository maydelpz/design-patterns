// La interfaz Subject declara un conjunto de métodos para gestionar suscriptores.
interface Subject {
  // Adjunta un observador al sujeto.
  attach(observer: Observer): void;
  // Desadjunta un observador del sujeto.
  detach(observer: Observer): void;
  // Notifica a todos los observadores sobre un evento.
  notify(): void;
}
// El Subject posee un estado importante y notifica a los observadores cuando este estado cambia.

class ConcreteSubject implements Subject {
  /**
   * @type {number} Para simplificar, el estado del Subject, que es esencial
   * para todos los suscriptores, se guarda en esta variable.
   */
  public state: number; // Propiedad que guarda el estado del Subject.
  /**
   * @type {Observer[]} Lista de suscriptores. En la vida real, la lista de
   * suscriptores puede almacenarse de manera más completa (por tipo de evento, etc.).
   */
  private observers: Observer[] = []; // Lista de observadores (suscriptores)
  // Los métodos para gestionar las suscripciones.
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer); // Verifica si el observador ya está adjunto.
    if (isExist) {
      return console.log("Subject: Observer has been attached already."); 
    }

    console.log("Subject: Attached an observer.");
    this.observers.push(observer); // Añade el observador a la lista.
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer); // Busca el índice del observador en la lista.
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer."); // Si el observador no existe, muestra mensaje.
    }

    this.observers.splice(observerIndex, 1); // Elimina al observador de la lista.
    console.log("Subject: Detached an observer.");
  }
//  Dispara una actualización en cada suscriptor.
  public notify(): void {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
   /**
     * Usualmente, la lógica de suscripción es solo una fracción de lo que un Subject puede realmente hacer.
     * Los Subjects comúnmente tienen lógica de negocio importante, que dispara el método de notificación siempre que
     * algo importante esté por suceder (o después de que haya sucedido).
     */
  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}
//  La interfaz Observer declara el método update, que los sujetos usan para notificar.
interface Observer {
  update(subject: Subject): void;
}
// Los Observadores Concretos reaccionan a las actualizaciones emitidas por el Subject al que se han adjuntado.

class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log("ConcreteObserverA: Reacted to the event.");
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log("ConcreteObserverB: Reacted to the event.");
    }
  }
}

// Se crea un Subject concreto.
const subject = new ConcreteSubject();

// Se crean dos observadores concretos.
const observer1 = new ConcreteObserverA();
subject.attach(observer1);  // El Observador A se adjunta al Subject.

const observer2 = new ConcreteObserverB();
subject.attach(observer2);  // El Observador B se adjunta al Subject.

// El Subject realiza alguna lógica de negocio, cambiando su estado y notificando a los observadores.
subject.someBusinessLogic();
subject.someBusinessLogic();

// El Observador B se desadjunta del Subject.
subject.detach(observer2);

// El Subject realiza otra vez la lógica de negocio y notifica solo a los observadores restantes.
subject.someBusinessLogic();