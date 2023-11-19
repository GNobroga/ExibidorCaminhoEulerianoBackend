import { Request, Response } from "express";
import fs from "fs";
import multerConfig from "../config/multerConfig";
import CicloEuleriano from "../structures/CicloEuleriano";
import Grafo from "../structures/Grafo";
import Aresta from "../structures/Aresta";

export default class IndexController {
  public async execute(request: Request, response: Response) {
    try {
      const filename = `${multerConfig.directory}/${request.file?.originalname}`;
      const readFile = await fs.promises.readFile(filename, "utf-8");

      const params = readFile.replace(/\r/g, "").split("\n");

      if (!params[0] || !params[1]) {
        throw new Error("Número de vértices ou arestas estão faltando.");
      }

      const V = parseInt(params[0]);
      const A = parseInt(params[1]);

      if (Number.isNaN(V) || Number.isNaN(A)) {
        throw new Error(
          "O número de vértices ou arestas não são valores numéricos."
        );
      }

      // [
      //   '5',            '7',
      //   '0 Castelo',    '1 Cachoeiro',
      //   '2 Venda-Nova', '3 Itaoca',
      //   '4 Marataízes', '0 1 ',
      //   '0 3 ',         '1 2 ',
      //   '1 3 ',         '1 4 ',
      //   '2 3',          '3 4'
      // ]

      const cidades = params
        .slice(2)
        .filter((v) =>/^\d+\s[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/.test(v))
        .map(v => ({ index: parseInt(v.split(' ')[0]), nome: v.split(' ')[1], }));

      const adjacencies = params.slice(2 + cidades.length).map((values) => {
        const divisao = values.split(" ");
        return {
          origem: parseInt(divisao[0]),
          destino: parseInt(divisao[1]),
        };
      });

      const grafo = new Grafo(V);

      adjacencies.forEach(({ origem, destino }) => {
        const aresta = new Aresta(origem, destino);
        grafo.addAresta(aresta);
      });

      const cicloEuleriano = new CicloEuleriano(grafo);

      let message = "Esse grafo não tem um ciclo Euleriano.";
      let cicloValues: number[] = [];

      if (cicloEuleriano.temCicloEuleriano()) {
        message = "Ciclo Euleriano encontrado.";
        cicloValues = cicloEuleriano.getCiclo()!.getValores();
      }

      return response.json({
        qntVertices: V,
        qntArestas: A,
        adjacencias: adjacencies,
        message,
        cicloValues,
        cidades,
      });
    } catch (e) {
      if (e instanceof Error) {
        return response.json({ error: e.message });
      } else {
        response.json({ error: "Um erro desconhecido ocorreu." });
      }
    }
  }
}
