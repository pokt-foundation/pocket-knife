import crypto from "isomorphic-webcrypto";
import { fromUint8Array } from 'hex-lite'

function hexStringToByte(str: string): Uint8Array {
  const bytes = [];
  for (let i = 0; i < str.length; i += 2) {
    bytes.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(bytes);
}

/**
 * Converts an Application's Public Key into an address.
 * @param publicKey the application's public key
 * @returns the application's address
 */
export async function getAddressFromPublicKey(
  publicKey: string
): Promise<string> {
  const hash = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    hexStringToByte(publicKey)
  );

  return fromUint8Array(new Uint8Array(hash)).slice(0, 40);
}
