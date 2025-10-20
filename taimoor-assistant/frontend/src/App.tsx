import React, { useState, useEffect } from 'react';
import { AIAssistant } from './components/ChatWidget';
import { Config } from './types';
import { apiService } from './services/api';
import { StorageService } from './utils/storage';

function App() {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Try to load from cache first
        const cachedConfig = StorageService.getConfig();
        if (cachedConfig) {
          setConfig(cachedConfig);
          setLoading(false);
        }

        // Fetch fresh config from API
        const freshConfig = await apiService.getConfig();
        setConfig(freshConfig);
        StorageService.setConfig(freshConfig);
        setLoading(false);
      } catch (err) {
        console.error('Error loading config:', err);
        setError('Failed to load configuration');
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Taimoor Assistant...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 dark:text-red-400 text-2xl">⚠️</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Configuration Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Demo Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Muhammad Taimoor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Full-Stack Developer & Digital Experience Architect
          </p>
          <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
              Try the AI Assistant
            </h2>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              Click the chat button in the bottom-right corner to interact with Taimoor's AI assistant. 
              Ask about projects, services, or book a consultation!
            </p>
          </div>
        </div>

        {/* Sample Projects */}
        {config?.projects && config.projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {config.projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              AI-Powered Assistant
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Instant project information</li>
              <li>• Technology expertise guidance</li>
              <li>• Direct contact and booking</li>
              <li>• Lead capture and handoff</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Professional Services
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Portfolio websites</li>
              <li>• E-commerce platforms</li>
              <li>• Web applications</li>
              <li>• Custom solutions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant enabled={true} />
    </div>
  );
}

export default App;
