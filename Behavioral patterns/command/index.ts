//La interfaz Command declara un método para ejecutar un comando.
interface Command {
  execute(): void;
}

//Algunos comandos pueden implementar operaciones simples por sí mismos.
class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`
    );
  }
}

/**
 * Sin embargo, algunos comandos pueden delegar operaciones más complejas a otros objetos,
 * llamados "receptores".
 */
class ComplexCommand implements Command {
  private receiver: Receiver;
  //Datos del contexto, necesarios para lanzar los métodos del receptor.
  private a: string;

  private b: string;
  /**
   * Los comandos complejos pueden aceptar uno o varios objetos receptor junto con
   * cualquier dato del contexto a través del constructor.
   */
  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  //Los comandos pueden delegar a cualquier método de un receptor.
  public execute(): void {
    console.log(
      "ComplexCommand: Complex stuff should be done by a receiver object."
    );
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

/**
 * Las clases Receiver contienen lógica importante de negocio. Saben cómo realizar
 * todo tipo de operaciones, asociadas con la ejecución de una solicitud. De hecho,
 * cualquier clase puede servir como un Receiver.
 */
class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a}.)`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on (${b}.)`);
  }
}

//El Invoker está asociado con uno o varios comandos. Envía una solicitud al comando.
class Invoker {
  private onStart: Command;

  private onFinish: Command;
  // Inicializa los comandos.
  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }
  /**
   * El Invoker no depende de clases concretas de comandos o receptores. El
   * Invoker pasa una solicitud a un receptor de forma indirecta, ejecutando un
   * comando.
   */
  public doSomethingImportant(): void {
    console.log("Invoker: Does anybody want something done before I begin?");
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log("Invoker: ...doing something really important...");

    console.log("Invoker: Does anybody want something done after I finish?");
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object): object is Command {
    return object.execute !== undefined;
  }
}
//El código del cliente puede parametrizar un invocador con cualquier comando.
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say Hi!"));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, "Send email", "Save report"));

invoker.doSomethingImportant();
