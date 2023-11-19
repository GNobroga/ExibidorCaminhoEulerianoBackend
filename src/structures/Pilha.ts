
export default class <T> {

  private readonly valores: T[] = [];

  public empilha(value: T) {
    this.valores.push(value); 
  }  

  public desempilha() {
    if (this.isEmpty()) {
      throw new Error('The stack is empty.');
    }
    return this.valores.pop();
  }

  public getTamanho() {
    return this.valores.length;
  }

  public isEmpty(): boolean {
    return this.valores.length === 0;
  }

  public getValores() {
    return this.valores;
  }

}