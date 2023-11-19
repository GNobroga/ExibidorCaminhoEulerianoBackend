
export default class Aresta {

  public readonly peso: number;
  public ehUsada: boolean = false;

  constructor(public readonly v1: number, public readonly v2: number, peso: number = 0) {
    if (v1 < 0 || v2 < 0) {
      throw new Error("Vértice deve ser um inteiro não negativo");
    } 
    this.peso = peso;
  }

  public getV1() {
    return this.v1;
  }

  public getV2() {
    return this.v2;
  }

  public getEhUsada() {
    return this.ehUsada;
  }

  public setEhUsada(ehUsada: boolean) {
    this.ehUsada = ehUsada;
  }

  public getPeso() {
    return this.peso;
  }

  public umVertice() {
    return this.getV1();
  }

  public outroVertice(vertice: number) {
    if (vertice === this.getV1()) {
      return this.getV2();
    } else if (vertice === this.getV2()) {
      return this.getV1();
    } else {
      throw new Error("Vértice inválido");
    }
  }

  public compareTo(outra: Aresta) {
    if (this.getPeso() > outra.getPeso()) {
      return 1;
    } else if (this.getPeso() < outra.getPeso()) {
      return -1;
    } else {
      return 0;
    }
  }
}