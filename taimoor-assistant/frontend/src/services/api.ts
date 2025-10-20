import { ChatResponse, HandoffData, HandoffResponse, Config, ContactInfo } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async sendMessage(message: string, sessionId?: string): Promise<ChatResponse> {
    return this.request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId }),
    });
  }

  async getSession(sessionId: string): Promise<{ sessionId: string; messages: any[] }> {
    return this.request<{ sessionId: string; messages: any[] }>(`/chat/session/${sessionId}`);
  }

  async clearSession(sessionId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/chat/session/${sessionId}`, {
      method: 'DELETE',
    });
  }

  async submitHandoff(data: HandoffData): Promise<HandoffResponse> {
    return this.request<HandoffResponse>('/handoff', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getConfig(): Promise<Config> {
    return this.request<Config>('/config');
  }

  async getProjects(featuredOnly = false): Promise<{ projects: any[]; total: number }> {
    const query = featuredOnly ? '?featured=true' : '';
    return this.request<{ projects: any[]; total: number }>(`/config/projects${query}`);
  }

  async getContactInfo(): Promise<ContactInfo> {
    return this.request<ContactInfo>('/config/contact');
  }
}

export const apiService = new ApiService();
