import crypto from 'crypto'

const ALGORITHM = "aes-192-cbc";

export function encrypt(text: string, encryptionKey: string): string {
    const key = crypto.scryptSync(encryptionKey, "salt", 24);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const encrypted = cipher.update(text, "utf8", "hex");
    return [
        encrypted + cipher.final("hex"),
        Buffer.from(iv).toString("hex"),
    ].join("|");
}

export function decrypt(encryptedText: string, encryptionKey: string): string {
    const key = crypto.scryptSync(encryptionKey, "salt", 24);
    const [encrypted, iv] = encryptedText.split("|");
    if (!iv) throw new Error("IV not found");
    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        key,
        Buffer.from(iv, "hex")
    );
    return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
}


