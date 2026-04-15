// Simple JWT generation for VideoSDK (client-side only)
// Does not use Node.js crypto – uses Web Crypto API

const API_KEY = process.env.NEXT_PUBLIC_VIDEOSDK_API_KEY!;
const SECRET_KEY = process.env.NEXT_PUBLIC_VIDEOSDK_SECRET_KEY!;

// Base64Url encode
function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// HMAC-SHA256 using Web Crypto
async function hmacSha256(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

export async function generateToken(roomId?: string, participantId?: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    apikey: API_KEY,
    permissions: ['allow_join', 'allow_mod'],
    version: 2,
    ...(roomId && { roomId }),
    ...(participantId && { participantId }),
  };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = await hmacSha256(signatureInput, SECRET_KEY);
  return `${signatureInput}.${signature}`;
}
