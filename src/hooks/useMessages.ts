import { useState } from 'react';
import type { Message, UserData } from '../types';
import { generateUniqueId } from '../utils/idGenerator';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([{
    id: generateUniqueId(),
    text: "Olá! Vamos começar seu cadastro. Vou fazer algumas perguntas para conhecer você melhor.",
    isBot: true,
  }]);

  const addMessage = (text: string, isBot: boolean, options?: string[]) => {
    const newMessage: Message = {
      id: generateUniqueId(),
      text,
      isBot,
      options,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addErrorMessage = (error: string) => {
    addMessage(error, true);
  };

  const addWelcomeMessage = (userData: UserData) => {
    addMessage(
      `Cadastro concluído com sucesso, ${userData.name}! Agora você pode enviar mensagens ou tirar fotos dos seus exames usando o botão de câmera no canto superior direito.`,
      true
    );
  };

  return {
    messages,
    addMessage,
    addErrorMessage,
    addWelcomeMessage,
  };
}