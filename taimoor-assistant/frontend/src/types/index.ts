export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIAssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sessionId: string;
}

export interface Session {
  id: string;
  messages: Message[];
  createdAt: Date;
  lastActivity: Date;
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
  contactShared?: boolean;
  followupActions?: string[];
}

export interface HandoffData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;
}

export interface HandoffResponse {
  ok: boolean;
  message?: string;
  leadId?: string;
  error?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  featured: boolean;
}

export interface Config {
  assistantName: string;
  accentColor: string;
  bookingLink: string;
  projects: Project[];
  features: {
    chat: boolean;
    handoff: boolean;
    contactSharing: boolean;
    projectShowcase: boolean;
  };
  ui: {
    theme: string;
    primaryColor: string;
    borderRadius: string;
    animation: boolean;
  };
}

export interface ContactInfo {
  email: string;
  bookingLink: string;
  phone: string;
  website: string;
}
