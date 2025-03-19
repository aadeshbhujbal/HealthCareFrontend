import { StorageAdapter } from '../auth/auth.service';

export class WebStorageAdapter implements StorageAdapter {
  private isClient = typeof window !== 'undefined';

  async getItem(key: string): Promise<string | null> {
    if (!this.isClient) return null;
    return window.localStorage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    if (!this.isClient) return;
    window.localStorage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    if (!this.isClient) return;
    window.localStorage.removeItem(key);
  }
} 