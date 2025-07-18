// import { useState, useRef, useEffect } from 'react';
// import { Send, Bot, X, MessageSquare, RotateCcw } from 'lucide-react';
// import { getLegalAssistance } from '../services/aiService';

// const LegalAssistant = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   // Load messages from localStorage or start with an empty array
//   const [messages, setMessages] = useState(() => {
//     const saved = localStorage.getItem('chatHistory');
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Save messages to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('chatHistory', JSON.stringify(messages));
//   }, [messages]);

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//         // Initial message if chat is empty
//         setMessages([{ role: 'assistant', content: "Hello! I'm your AI legal assistant. How can I help with your questions about wills and estate planning? Important: I am an AI assistant and cannot provide legal advice." }]);
//     }
//   }, [isOpen, messages.length]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const handleNewChat = () => {
//     setMessages([]);
//     localStorage.removeItem('chatHistory');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || loading) return;
    
//     const userMessage = { role: 'user', content: input };
//     const currentHistory = messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);
    
//     try {
//       const response = await getLegalAssistance(input, currentHistory);
//       setMessages(prev => [...prev, { role: 'model', content: response }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again later.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-5 right-5 z-50">
//       {isOpen && (
//         <div className="card w-96 bg-base-100 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in">
//           <div className="card-body p-0">
//             <div className="bg-primary text-primary-content p-3 flex justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <Bot size={24} />
//                 <h3 className="card-title text-lg">Legal Assistance</h3>
//               </div>
//               <div>
//                 <button onClick={handleNewChat} className="btn btn-sm btn-ghost btn-circle" title="New Chat"><RotateCcw size={16} /></button>
//                 <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-ghost btn-circle" title="Close"><X size={20} /></button>
//               </div>
//             </div>
            
//             <div className="h-80 overflow-y-auto p-4 space-y-4">
//               {messages.map((msg, index) => (
//                 <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
//                   <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-secondary' : 'chat-bubble-primary'}`}>{msg.content}</div>
//                 </div>
//               ))}
//               {loading && <div className="chat chat-start"><div className="chat-bubble"><span className="loading loading-dots loading-sm"></span></div></div>}
//               <div ref={messagesEndRef} />
//             </div>
            
//             <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4">
//               <div className="flex gap-2">
//                 <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="input input-bordered flex-1" placeholder="Ask a question..." disabled={loading} />
//                 <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()}><Send size={18} /></button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary btn-circle shadow-lg w-16 h-16" aria-label="Toggle Legal Assistant">
//         {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
//       </button>
//     </div>
//   );
// };

// export default LegalAssistant;


// import { useState, useRef, useEffect } from 'react';
// import { Send, Bot, X, MessageSquare, RotateCcw } from 'lucide-react';
// import { getLegalAssistance } from '../services/aiService';

// const LegalAssistant = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState(() => {
//     const saved = localStorage.getItem('chatHistory');
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem('chatHistory', JSON.stringify(messages));
//   }, [messages]);

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//         // CORRECTED: Use 'model' as the role for the AI's messages
//         setMessages([{ role: 'model', content: "Hello! I'm your AI legal assistant. How can I help with your questions about wills and estate planning? Important: I am an AI assistant and cannot provide legal advice." }]);
//     }
//   }, [isOpen, messages.length]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const handleNewChat = () => {
//     setMessages([]);
//     localStorage.removeItem('chatHistory');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || loading) return;
    
//     const userMessage = { role: 'user', content: input };
//     // The history sent to the backend needs to have the correct 'user' and 'model' roles
//     const currentHistory = messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
    
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);
    
//     try {
//       const response = await getLegalAssistance(input, currentHistory);
//       // CORRECTED: Use 'model' as the role when adding the AI's new response
//       setMessages(prev => [...prev, { role: 'model', content: response }]);
//     } catch (error) {
//       // CORRECTED: Use 'model' as the role for error messages too
//       setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again later.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-5 right-5 z-50">
//       {isOpen && (
//         <div className="card w-96 bg-base-100 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in">
//           <div className="card-body p-0">
//             <div className="bg-primary text-primary-content p-3 flex justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <Bot size={24} />
//                 <h3 className="card-title text-lg">Legal Assistance</h3>
//               </div>
//               <div>
//                 <button onClick={handleNewChat} className="btn btn-sm btn-ghost btn-circle" title="New Chat"><RotateCcw size={16} /></button>
//                 <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-ghost btn-circle" title="Close"><X size={20} /></button>
//               </div>
//             </div>
            
//             <div className="h-80 overflow-y-auto p-4 space-y-4">
//               {/* This rendering logic doesn't need to change, it just checks the role name */}
//               {messages.map((msg, index) => (
//                 <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
//                   <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-secondary' : 'chat-bubble-primary'}`}>{msg.content}</div>
//                 </div>
//               ))}
//               {loading && <div className="chat chat-start"><div className="chat-bubble"><span className="loading loading-dots loading-sm"></span></div></div>}
//               <div ref={messagesEndRef} />
//             </div>
            
//             <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4">
//               <div className="flex gap-2">
//                 <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="input input-bordered flex-1" placeholder="Ask a question..." disabled={loading} />
//                 <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()}><Send size={18} /></button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary btn-circle shadow-lg w-16 h-16" aria-label="Toggle Legal Assistant">
//         {isOpen ? <X/> : <MessageSquare size={32} />}
//       </button>
//     </div>
//   );
// };

// export default LegalAssistant;


import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageSquare, RotateCcw, User, AlertTriangle, ChevronRight, ChevronDown } from 'lucide-react';
import { getLegalAssistance } from '../services/aiService';

const LegalAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        role: 'model', 
        content: "Hello! I'm your AI legal assistant. How can I help with your questions about wills and estate planning?",
        disclaimer: "Important: I am an AI assistant and cannot provide legal advice."
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Add ping effect for new messages when closed
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].role === 'model') {
      setUnreadCount(prev => prev + 1);
      buttonRef.current?.classList.add('animate-ping');
      setTimeout(() => {
        buttonRef.current?.classList.remove('animate-ping');
      }, 1000);
    }
  }, [messages, isOpen]);

  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMessage = { role: 'user', content: input };
    const currentHistory = messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await getLegalAssistance(input, currentHistory);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: 'Sorry, I encountered an error. Please try again later.',
        error: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      setUnreadCount(0);
    }
    setIsOpen(!isOpen);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Format bot responses with bullet points
  const formatResponse = (content) => {
    const points = content.split('\n\n');
    return (
      <div className="space-y-2">
        {points.map((point, index) => (
          <div key={index} className="flex items-start">
            <ChevronRight size={16} className="text-primary flex-shrink-0 mt-1 mr-2" />
            <span>{point}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="card w-96 bg-base-100 shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden animate-fade-in">
          <div className="card-body p-0">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="card-title text-lg font-semibold">Legal Assistant</h3>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online now
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={handleNewChat} 
                  className="btn btn-sm btn-ghost btn-circle text-white hover:bg-white/20"
                  title="New Chat"
                >
                  <RotateCcw size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="btn btn-sm btn-ghost btn-circle text-white hover:bg-white/20"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="h-80 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              {messages.map((msg, index) => (
                <div key={index} className="mb-4">
                  {msg.role === 'user' ? (
                    <div className="flex justify-end mb-2">
                      <div className="bg-blue-500 text-white rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>{msg.content}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start mb-2">
                      <div className={`${msg.error ? 'bg-red-100 border border-red-300 dark:bg-red-900/30 dark:border-red-500' : 'bg-white dark:bg-gray-700'} rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%] shadow-sm`}>
                        <div className="flex items-start gap-2">
                          <div className="bg-indigo-100 p-1 rounded-full mt-1 dark:bg-indigo-900/50">
                            <Bot size={16} className="text-indigo-600 dark:text-indigo-300" />
                          </div>
                          <div className="flex-1">
                            {msg.error ? (
                              <div className="flex items-center gap-2 text-red-600 dark:text-red-300">
                                <AlertTriangle size={16} />
                                <span>{msg.content}</span>
                              </div>
                            ) : (
                              <>
                                <div className="text-gray-800 dark:text-gray-200">
                                  {formatResponse(msg.content)}
                                </div>
                                {msg.disclaimer && (
                                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs flex items-start gap-2 dark:bg-yellow-900/20 dark:border-yellow-700">
                                    <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0 mt-0.5 dark:text-yellow-400" />
                                    <span className="text-yellow-700 dark:text-yellow-300">{msg.disclaimer}</span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-100 p-1 rounded-full dark:bg-indigo-900/50">
                        <Bot size={16} className="text-indigo-600 dark:text-indigo-300" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-300"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-300" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce dark:bg-gray-300" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
              <div className="flex gap-2">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  className="input input-bordered flex-1 rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-300 pl-4 text-gray-900 dark:text-gray-100 dark:bg-gray-700" 
                  placeholder="Type your legal question..." 
                  disabled={loading} 
                />
                <button 
                  type="submit" 
                  className="btn btn-circle btn-primary w-12 h-12 flex items-center justify-center shadow-lg disabled:opacity-50 hover:scale-105 transition-transform" 
                  disabled={loading || !input.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="relative">
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-pulse">
            {unreadCount}
          </span>
        )}
        <button 
          ref={buttonRef}
          onClick={handleToggle} 
          className="btn btn-primary btn-circle shadow-lg w-16 h-16 transition-all duration-300 hover:scale-105"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X size={32} className="transform transition-transform duration-300" />
          ) : (
            <div className="relative">
              <MessageSquare size={32} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default LegalAssistant;