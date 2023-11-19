
export default class <T> {

  private readonly valores: T[] = [];

  public enfileira(value: T) {
    this.valores.unshift(value);
  }  


  public desenfileira() {
    if (this.isEmpty()) {
      throw new Error('The queue is empty.');
    }
    return this.valores.shift();
  }


  public getTamanho() {
    return this.valores.length;
  }

  public isEmpty(): boolean {
    return this.valores.length === 0;
  }

}