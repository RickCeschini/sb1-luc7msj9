{#if !isRegistered}
  <page>
    <actionBar title="Registration" />
    <scrollView>
      <stackLayout class="p-4">
        <RegistrationForm on:submit={handleRegistration} />
      </stackLayout>
    </scrollView>
  </page>
{:else}
  <ChatInterface {messages} on:sendMessage={handleSendMessage} />
{/if}

<script lang="ts">
  import { Message } from '../types/message';
  import { UserData } from '../types/userData';
  import RegistrationForm from './RegistrationForm.svelte';
  import ChatInterface from './ChatInterface.svelte';

  let isRegistered = false;
  let userData: UserData | null = null;
  let messages: Message[] = [{
    id: 1,
    text: "Welcome! Please complete the registration form to start chatting.",
    isBot: true
  }];

  function handleRegistration(event: CustomEvent<UserData>) {
    userData = event.detail;
    isRegistered = true;
    messages = [...messages, {
      id: Date.now(),
      text: `Welcome ${userData.name}! You can now send messages or take photos of your exams using the camera button.`,
      isBot: true
    }];
  }

  function handleSendMessage(event: CustomEvent<{ text: string; image?: string }>) {
    const { text, image } = event.detail;
    messages = [
      ...messages,
      { id: Date.now(), text, isBot: false, image },
      {
        id: Date.now() + 1,
        text: `Thanks for your message${image ? ' and exam photo' : ''}! Our team will get back to you at ${userData?.email}.`,
        isBot: true
      }
    ];
  }
</script>

<style>
  page {
    background-color: #f5f5f5;
  }
</style>