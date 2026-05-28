import { Router } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import lista from "./lista.json";
import isValidToken from "./middleware";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/url", (req, res) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaW5rIjoiaHR0cHM6Ly9naXRodWIuY29tL01hcmNvLVZlaW8vdHJlYXN1cmUtaHVudGluZy1tb2JpbGUiLCJpYXQiOjE1MTYyMzkwMjJ9.e6-NSCb_igw6U6Rxae61GiAm1-vRiGWIvD0N-9phoXw";
  const decoded = jwt.decode(token);
  return res.status(200).json(decoded);
});

router.get("/secret", (req, res) => {
  try {
    const secret = process.env.SECRET_KEY;

    const key = crypto.createHash("sha256").update(secret!).digest();

    const iv = Buffer.alloc(16, 0);

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    let decrypted = decipher.update(
      "044106cadc2fc13dd220bf357e9793e882e4c6c136880ec11ce6643339ffa6fe4127f2e7f48f673b6698cef9e5b78c3735155348feb0edbe40c182e5eb70dc6367c321caf52b54e6ee81c8394c993e18",
      "hex",
      "utf8",
    );

    decrypted += decipher.final("utf8");

    res.status(200).json({
      message: decrypted,
    });
  } catch (error) {
    res.status(500).send({
      error: "Failed to decrypt message",
    });
  }
});

router.get("/fibonacci/:numero", (req, res) => {
  const numero = Number(req.params.numero);

  let sequencia = [0, 1];

  for (let i = 2; i < numero; i++) {
    sequencia.push(sequencia[i - 2] + sequencia[i - 2]);
  }

  sequencia = sequencia.slice(2, numero);

  const resposta = [] as number[];

  for (let i = 0; i < sequencia.length; i++) {
    resposta.push(lista[sequencia[i]]);
  }

  res.status(200).json({
    fibonacci: [0, 1, ...sequencia],
    codigo: resposta,
  });
});

router.get("/jwt", isValidToken, (req, res) => {
  const secret = process.env.SECRET_KEY;

  const key = crypto.createHash("sha256").update(secret!).digest();

  const iv = Buffer.alloc(16, 0);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(
    "dc270b58057b1db6faa25e0eb1fa68f1fb77a3440fe9742a04cde2b8ba920ca99417b08e26b6856a12a8c342395fee4c5e65512d83c8183d6828c73cccdaa11c",
    "hex",
    "utf8",
  );

  decrypted += decipher.final("utf8");

  res.status(200).json({
    message: decrypted,
  });
});

router.get("/hanoi", (req, res) => {
  res.status(200).json({
    titulo: "Desafio da Torre de Hanoi",

    descricao:
      "Resolva a Torre de Hanoi com 3 discos movendo todos os discos da torre A para a torre C. " +
      "Converta apenas os movimentos não repetidos utilizando a tabela abaixo para descobrir o código secreto.",

    estadoInicial: {
      A: [3, 2, 1],
      B: [],
      C: [],
    },

    regras: [
      "Apenas um disco pode ser movido por vez",
      "Um disco maior nunca pode ficar sobre um disco menor",
      "Somente movimentos válidos devem ser convertidos",
    ],

    tabela: {
      "A-B": 114,
      "A-C": 102,
      "B-A": 110,
      "B-C": 116,
      "C-A": 120,
      "C-B": 111,
    },

    dica: "https://www.geogebra.org/m/NqyWJVra",
  });
});

export default router;
