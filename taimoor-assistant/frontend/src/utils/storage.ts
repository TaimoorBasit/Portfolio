import { Message, Session } from '../types';

const STORAGE_KEYS = {
  SESSION: 'taimoor_assistant_session',
  MESSAGES: 'taimoor_assistant_messages',
  CONFIG: 'taimoor_assistant_config',
} as const;

export class StorageService {
  private static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return null;
    }
  }

  private static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
    }
  }

  private static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
    }
  }

  static getSession(): Session | null {
    return this.getItem<Session>(STORAGE_KEYS.SESSION);
  }

  static setSession(session: Session): void {
    this.setItem(STORAGE_KEYS.SESSION, session);
  }

  static clearSession(): void {
    this.removeItem(STORAGE_KEYS.SESSION);
  }

  static getMessages(): Message[] {
    return this.getItem<Message[]>(STORAGE_KEYS.MESSAGES) || [];
  }

  static setMessages(messages: Message[]): void {
    this.setItem(STORAGE_KEYS.MESSAGES, messages);
  }

  static addMessage(message: Message): void {
    const messages = this.getMessages();
    messages.push(message);
    this.setMessages(messages);
  }

  static clearMessages(): void {
    this.removeItem(STORAGE_KEYS.MESSAGES);
  }

  static getConfig(): any {
    return this.getItem(STORAGE_KEYS.CONFIG);
  }

  static setConfig(config: any): void {
    this.setItem(STORAGE_KEYS.CONFIG, config);
  }

  static clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => this.removeItem(key));
  }
}
