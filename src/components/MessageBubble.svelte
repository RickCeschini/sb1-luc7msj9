<gridLayout class="message-container">
  <stackLayout class="message {message.isBot ? 'message-bot' : 'message-user'}">
    {#if message.image}
      <image src="data:image/jpeg;base64,{message.image}" class="message-image" />
    {/if}
    <label text={message.text} textWrap="true" class="message-text" />
  </stackLayout>
</gridLayout>

<script lang="ts">
  import type { Message } from '../types/message';
  export let message: Message;
</script>

<style>
  .message-container {
    margin: 5 0;
  }
  .message {
    padding: 10;
    border-radius: 10;
    max-width: 80%;
  }
  .message-bot {
    background-color: #ffffff;
    align-self: flex-start;
  }
  .message-user {
    background-color: #e8faf1;
    align-self: flex-end;
  }
  .message-image {
    margin-bottom: 5;
    border-radius: 5;
  }
  .message-text {
    color: #333333;
  }
</style>