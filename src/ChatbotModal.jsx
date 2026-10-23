import React, { useState, useEffect, useRef } from 'react';
import { sendAIMessage } from './aiService';

export default function ChatbotModal({ isOpen, onClose, initialQuery }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'bot',
      content: `Hello! 👋 I am **Kaushal Shukla's AI Twin**.\n\nAsk me anything about Kaushal's Generative AI skills, work at Netlynx Solutions, engineering projects, or how to get in touch!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const handleSend = async (customText = null) => {
    const textToSend = (customText !== null ? customText : inputValue).trim();
    if (!textToSend || isLoading) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (customText === null) setInputValue('');
    setIsLoading(true);

    try {
      // Handled internally by backend service with zero settings needed from user
      const reply = await sendAIMessage(newMessages);

      setMessages(prev => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          sender: 'bot',
          content: "I'm having trouble processing that right now. Feel free to reach Kaushal directly at kaushalshukla912@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'reset',
        sender: 'bot',
        content: 'Chat history cleared. What would you like to explore about Kaushal?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const quickChips = [
    { label: "⚡ GenAI Skills", query: "What are Kaushal's core skills in Generative AI and LLMs?" },
    { label: "💼 Netlynx Experience", query: "Summarize Kaushal's responsibilities and impact at Netlynx Solutions." },
    { label: "🚀 Projects", query: "What are Kaushal Shukla's top software projects?" },
    { label: "🎓 Education", query: "What is Kaushal's degree and college score?" },
    { label: "📞 Contact", query: "How can I contact or hire Kaushal Shukla?" }
  ];

  if (!isOpen) return null;

  return (
    <div className="vcard-chat-overlay" onClick={onClose}>
      <div className="vcard-chat-modal" onClick={e => e.stopPropagation()}>
        {/* Header - Clean without any exposed settings or key configuration */}
        <div className="chat-header-vcard">
          <div className="chat-profile-row">
            <div className="chat-avatar-badge">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <div className="chat-name">Kaushal's AI Assistant</div>
              <div className="chat-status">
                <span className="status-dot-green"></span>
                <span>Active &amp; Grounded</span>
              </div>
            </div>
          </div>

          <div className="chat-header-tools">
            <button className="chat-tool-btn" onClick={clearChat} title="Clear Chat">
              <span className="material-symbols-outlined">refresh</span>
            </button>
            <button className="chat-tool-btn" onClick={onClose} title="Close">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="chat-body-vcard">
          {messages.map(m => (
            <div key={m.id} className={`chat-msg-row ${m.sender === 'user' ? 'user' : 'bot'}`}>
              <div className={`msg-bubble-vcard ${m.sender === 'user' ? 'user' : 'bot'}`}>
                {m.content.split('\n').map((line, lIdx) => (
                  <p key={lIdx} style={{ marginBottom: line ? '4px' : '8px' }}>
                    {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </p>
                ))}
                <span className="msg-time">{m.timestamp}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-msg-row bot">
              <div className="msg-bubble-vcard bot" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--orange-primary)' }}>sync</span>
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="chat-chips-bar">
          {quickChips.map((chip, idx) => (
            <button key={idx} className="chat-chip" onClick={() => handleSend(chip.query)}>
              {chip.label}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form className="chat-input-vcard" onSubmit={e => { e.preventDefault(); handleSend(); }}>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Ask anything about Kaushal's skills, projects..." 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button type="submit" className="chat-send-btn-vcard" disabled={!inputValue.trim() || isLoading}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
