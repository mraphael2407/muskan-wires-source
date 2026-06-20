import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface LeadData {
  name: string;
  location: string;
  product: string;
  quantity: string;
  projectType: string;
  timeline: string;
  phone: string;
}

const questions = [
  { key: 'name', question: 'Hello! I am Muskan Wires Assistant. May I know your name?', field: 'name' },
  { key: 'location', question: 'Nice to meet you, {name}! Which city/location is your project in?', field: 'location' },
  { key: 'product', question: 'Great! Which product are you interested in? (Barbed Wire, GI Wire, Solar Fencing Wire, Binding Wire, Concertina Wire)', field: 'product' },
  { key: 'quantity', question: 'What quantity do you require? (e.g., 5 tons, 100 rolls)', field: 'quantity' },
  { key: 'projectType', question: 'What type of project is this? (Agricultural, Security, Solar, Infrastructure, Construction)', field: 'projectType' },
  { key: 'timeline', question: 'When do you need the materials? (Immediate, 2-4 weeks, 1-2 months)', field: 'timeline' },
  { key: 'phone', question: 'Finally, what is your phone number so our team can send you a detailed quote?', field: 'phone' },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: questions[0].question,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Store the answer
    const currentQuestion = questions[currentStep];
    const newLeadData = { ...leadData, [currentQuestion.field]: inputValue };
    setLeadData(newLeadData);

    setInputValue('');
    setCurrentStep((prev) => prev + 1);

    // Determine next message
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        const nextQuestion = questions[currentStep + 1];
        let questionText = nextQuestion.question;

        // Replace placeholders
        if (questionText.includes('{name}')) {
          questionText = questionText.replace('{name}', newLeadData.name || inputValue);
        }

        const botMessage: Message = {
          id: messages.length + 1,
          text: questionText,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Conversation complete
        setIsComplete(true);
        const completionMessage: Message = {
          id: messages.length + 1,
          text: `Thank you ${newLeadData.name}! I have recorded your requirements for ${newLeadData.quantity} of ${newLeadData.product} for your ${newLeadData.projectType} project in ${newLeadData.location}. Our team will contact you at ${newLeadData.phone} within 24 hours with a detailed quote. Is there anything else you would like to know?`,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, completionMessage]);
      }
    }, 500);
  };

  const handleRestart = () => {
    setMessages([
      {
        id: 0,
        text: questions[0].question,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setCurrentStep(0);
    setLeadData({});
    setIsComplete(false);
    setInputValue('');
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 bg-rust hover:bg-rust-light text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open AI Sales Assistant"
      >
        <Bot className="w-7 h-7" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-sm shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: '70vh' }}>
          {/* Header */}
          <div className="bg-rust text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Muskan Wires Assistant</h4>
                <p className="text-xs text-white/80">AI Sales Helper</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.sender === 'user'
                      ? 'bg-rust text-white rounded-br-none'
                      : 'bg-white text-forge shadow rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/60' : 'text-steel'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            {isComplete ? (
              <div className="space-y-2">
                <button
                  onClick={handleRestart}
                  className="w-full bg-forge text-white py-2 rounded font-medium text-sm hover:bg-steel transition-colors"
                >
                  Start New Conversation
                </button>
                <a
                  href="https://wa.me/919589707622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-2 rounded font-medium text-sm hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your answer..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:border-rust focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-rust text-white rounded-full flex items-center justify-center hover:bg-rust-light transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
