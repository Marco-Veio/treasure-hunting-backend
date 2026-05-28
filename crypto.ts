import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_KEY;

/**
 * Mensagem que será criptografada
 */
const message =
  "104 116 116 112 58 47 47 103 105 116 104 117 98 46 99 111 109 47";

/**
 * Gera chave de 32 bytes
 */
const key = crypto.createHash("sha256").update(secret!).digest();

/**
 * IV fixo apenas para o desafio
 */
const iv = Buffer.alloc(16, 0);

/**
 * Criptografa usando AES-256-CBC
 */
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

let encrypted = cipher.update(message, "utf8", "hex");

encrypted += cipher.final("hex");

console.log("\nMensagem original:\n");
console.log(message);

console.log("\nMensagem criptografada:\n");
console.log(encrypted);
