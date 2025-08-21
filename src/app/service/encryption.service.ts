import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class EncryptionService {
  private readonly key = CryptoJS.enc.Utf8.parse('MostafaMango2025_Secure_Key_1234');
  private readonly iv = CryptoJS.enc.Utf8.parse('MostafaMango2025');

  encrypt(plainText: string): string {
    const encrypted = CryptoJS.AES.encrypt(plainText, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    
    // Convert to URL-safe Base64
    return encrypted.toString()
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  decrypt(cipherTextBase64: string): string {
    // Convert from URL-safe Base64 to standard Base64
    let base64 = cipherTextBase64
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Add padding if needed
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    const decrypted = CryptoJS.AES.decrypt(base64, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  buildQuery(params: Record<string, string | number | boolean | undefined | null>): string {
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) usp.set(k, String(v));
    });
    return usp.toString();
  }

  debugEncryption(plainText: string): void {
    console.log('=== ENCRYPTION DEBUG ===');
    console.log('Original plain text:', plainText);
    
    const encrypted = this.encrypt(plainText);
    console.log('Encrypted (URL-safe Base64):', encrypted);
    
    const decrypted = this.decrypt(encrypted);
    console.log('Decrypted back:', decrypted);
    
    console.log('Match (original vs decrypted):', plainText === decrypted);
    console.log('=== END DEBUG ===');
  }
}