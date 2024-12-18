import React from 'react';
import { ChatInterface } from './components/ChatInterface';
import { MobileContainer } from './components/Layout';
import { useMessages } from './hooks/useMessages';
import { useRegistration } from './hooks/useRegistration';
import type { UserData } from './types';

function App() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const { messages, addMessage, addErrorMessage, addWelcomeMessage } = useMessages();

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data);
    setIsRegistered(true);
    addWelcomeMessage(data);
  };

  const { currentQuestion, handleResponse, isComplete } = useRegistration(handleRegistrationComplete);

  React.useEffect(() => {
    if (currentQuestion && !isComplete) {
      addMessage(currentQuestion, true);
    }
  }, [currentQuestion, isComplete]);

  const handleSendMessage = (text: string, image?: string) => {
    addMessage(text, false);
    
    if (!isRegistered) {
      const result = handleResponse(text);
      if (!result.isValid) {
        addErrorMessage(result.error!);
      }
    } else if (userData) {
      addMessage(
        `Mensagem recebida! ${image ? 'Foto do exame anexada.' : ''} Em breve nossa equipe entrará em contato.`,
        true
      );
    }
  };

  return (
    <MobileContainer>
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        showCamera={isRegistered}
      />
    </MobileContainer>
  );
}

export default App;