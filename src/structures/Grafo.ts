import Aresta from "./Aresta";
import CicloEuleriano from "./CicloEuleriano";

export default class Grafo {

  public A: number;
  public adj: Aresta[][] = [];
  public readonly V: number;
  
  constructor(V: number) {
    if (V < 0) {
      throw new Error("Número de vértices no grafo deve ser não negativo");
    }
    this.A = 0;
    this.adj = Array.from({ length: V }, () => []);
    this.V = V;
  }

  public getV() { // e o V
    return this.V;
  } 

  public getA() {
    return this.A;
  }

  private validaVertice(v: number) {
    if (v < 0 || v >= this.V)
        throw new Error("vértice " + v + " não está entre 0 e " + (this.V - 1));
  }

  public addAresta(a: Aresta) {
    const v1 = a.umVertice();
    const v2 = a.outroVertice(v1);
    this.validaVertice(v1);
    this.validaVertice(v2);
    this.adj[v1].unshift(a);
    const a2 = new Aresta(a.getV2(), a.getV1(), a.getPeso());
    this.adj[v2].unshift(a2);
    this.A++;
  }

  public getAdj(v: number) {
    this.validaVertice(v);
    return this.adj[v];
  }

  public getGrau(v: number) {
    this.validaVertice(v);
    return this.adj[v].length;
  }

  public getArestas() {
    const lista: Aresta[] = []
    for (let v = 0; v < this.V; v++) {
        let selfLoops = 0;

        for (const a of this.getAdj(v)) {
          if (a.outroVertice(v) > v) {
            lista.push(a);
            lista.splice(v, 0, a);
          }

          else if (a.outroVertice(v) == v) {
              if (selfLoops % 2 == 0) {
                  lista.push(a);
              }
              selfLoops++;
          }
        }

       
    }
    return lista;
  }
  public existeArestaEntre(v1: number, v2: number) {
    this.validaVertice(v1);
    this.validaVertice(v2);
    for (const a of this.adj[v1]) {
        if (a.outroVertice(v1) == v2) {
            return true;
        }
    }
    return false;
  }

}

const G = new Grafo(4);
G.addAresta(new Aresta(0, 1));
G.addAresta(new Aresta(0, 2));
G.addAresta(new Aresta(1, 3));
G.addAresta(new Aresta(2, 3));


const ciclo = new CicloEuleriano(G);

console.log(ciclo.temCicloEuleriano())