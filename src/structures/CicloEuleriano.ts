import Aresta from "./Aresta";
import Fila from "./Fila";
import Grafo from "./Grafo";
import Pilha from "./Pilha";

export default class CicloEuleriano {

  private ciclo: Pilha<number> | null = new Pilha();

  constructor(G: Grafo) {
  
    if (this._noHasAdjacentsAndCiclo(G)) {
      throw Error('Todos os vértices precisam ter o grau par.');
    }

    const adj: Fila<Aresta>[] = Array.from({ length: G.getV() }, () => new Fila());

    for (let v = 0; v < G.getV(); v++) {
      let autoLacos = 0;
      for (const a of G.getAdj(v)) {
        const w = a.getV2();
        if (v === w) {
          if (autoLacos % 2 === 0) {
            const a1 = new Aresta(v, w);
            adj[v].enfileira(a1);
            adj[w].enfileira(a1);
          }
          autoLacos++;
        } else if (v < w) {
          const a2 = new Aresta(v, w);
          adj[v].enfileira(a2);
          adj[w].enfileira(a2);
        }
      }
    }

    const s = CicloEuleriano.verticeNaoIsolado(G);
    const pilha: Pilha<number> = new Pilha();
    pilha.empilha(s);

    while (!pilha.isEmpty()) {
      let v = pilha.desempilha() as number;
      while (!adj[0].isEmpty()) {
        const aresta = adj[v].desenfileira() as Aresta;
        if (aresta.getEhUsada()) {
          continue;
        }
        aresta.setEhUsada(true);
        pilha.empilha(v);
        v = aresta.outroVertice(v);
      }
      this.ciclo!.empilha(v);
    }

    if (this.ciclo!.getTamanho() != G.getA() + 1) {
      this.ciclo = null;
    }
  }

  public temCicloEuleriano() {
    return this.ciclo !== null && this.ciclo.getTamanho() > 0; 
  }

  private _noHasAdjacentsAndCiclo(grafo: Grafo): boolean {
    for (let i = 0 ; i < grafo.getV() ; i++) {
      if (grafo.getGrau(i) % 2 !== 0) {
        return true;
      } 
    }

    return false || !grafo.getA();
  }

  private static verticeNaoIsolado(G: Grafo) {
    for (let v = 0 ; v < G.getV() ; v++) {
      if (G.getGrau(v) > 0) {
        return v;
      }
    }
    return -1;
  }

  public getCiclo() {
    return this.ciclo;
  }

}