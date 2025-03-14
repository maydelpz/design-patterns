interface Iterator<T> {
  // Retorna el elemento actual.
  current(): T;
  // Retorna el elemento actual y avanza al siguiente.
  next(): T;
  // Retorna la clave del elemento actual (posición en la colección).
  key(): number;
  // Verifica si la posición actual es válida.
  valid(): boolean;
  // Reinicia el iterador al primer elemento.
  rewind(): void;
}

interface Aggregator {
  // Retorna un iterador externo.
  getIterator(): Iterator<string>;
}

class AlphabeticalOrderIterator implements Iterator<string> {
  private collection: WordsCollection; // Colección a iterar

  private position: number = 0; // Posición actual del iterador

  private reverse: boolean = false; // Indica si el recorrido es inverso

  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1; // Si es inverso, empieza en el último elemento
    }
  }

  public rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  public current(): string {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): string {
    const item = this.collection.getItems()[this.position]; // Guarda el elemento actual
    this.position += this.reverse ? -1 : 1; // Si es inverso, disminuye la posición, si no, la aumenta
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0; // En inverso, la posición debe ser ≥ 0
    }

    return this.position < this.collection.getCount(); // En normal, la posición debe ser < tamaño de la colección
  }
}

class WordsCollection implements Aggregator {
  private items: string[] = []; // Almacena los elementos
  // Devuelve la lista de elementos.
  public getItems(): string[] {
    return this.items;
  }
  // Retorna la cantidad de elementos.
  public getCount(): number {
    return this.items.length;
  }
  // Agrega un nuevo elemento a la colección.
  public addItem(item: string): void {
    this.items.push(item);
  }
  // Retorna un iterador en orden normal.
  public getIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this);
  }
  // Retorna un iterador en orden inverso.
  public getReverseIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}
// Se crea una colección y se le agregan tres elementos.
const collection = new WordsCollection();
collection.addItem("First");
collection.addItem("Second");
collection.addItem("Third");
// Se obtiene un iterador normal y se recorre mientras valid() sea true.
const iterator = collection.getIterator();

console.log("Straight traversal:");
while (iterator.valid()) {
  console.log(iterator.next());
}

console.log("");
console.log("Reverse traversal:");
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}
