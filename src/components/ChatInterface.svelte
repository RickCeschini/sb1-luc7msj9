<page>
  <actionBar>
    <navigationButton text="Back" android.systemIcon="ic_menu_back" on:tap={() => history.back()} />
    <actionItem ios.position="right" android.position="actionBar" on:tap={openCamera}>
      <label text="📷" />
    </actionItem>
  </actionBar>

  <gridLayout rows="*, auto">
    <scrollView row="0" id="messagesContainer" on:loaded={onMessagesContainerLoaded}>
      <stackLayout class="messages-container">
        {#each messages as message (message.id)}
          <MessageBubble {message} />
        {/each}
      </stackLayout>
    </scrollView>

    <gridLayout row="1" columns="*, auto" class="input-container">
      <textField
        col="0"
        bind:text={newMessage}
        hint="Type your message..."
        returnKeyType="send"
        on:returnPress={handleSubmit}
        class="input"
      />
      <button
        col="1"
        text="Send"
        class="btn btn-primary btn-rounded"
        on:tap={handleSubmit}
      />
    </gridLayout>
  </gridLayout>
</page>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { takePicture } from '@nativescript/camera';
  import type { Message } from '../types/message';
  import MessageBubble from './MessageBubble.svelte';

  export let messages: Message[] = [];
  let newMessage = '';
  let messagesContainer: any;

  const dispatch = createEventDispatcher<{
    sendMessage: { text: string; image?: string };
  }>();

  function onMessagesContainerLoaded(args: any) {
    messagesContainer = args.object;
  }

  $: if (messages.length && messagesContainer) {
    setTimeout(() => {
      messagesContainer.scrollToVerticalOffset(
        messagesContainer.scrollableHeight,
        false
      );
    }, 0);
  }

  async function openCamera() {
    try {
      const image = await takePicture({
        width: 1024,
        height: 1024,
        keepAspectRatio: true,
        saveToGallery: false
      });

      if (image) {
        dispatch('sendMessage', {
          text: 'Exam photo attached:',
          image: image.toBase64String('jpeg')
        });
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  function handleSubmit() {
    if (newMessage.trim()) {
      dispatch('sendMessage', { text: newMessage });
      newMessage = '';
    }
  }
</script>

<style>
  .messages-container {
    padding: 10;
  }
  .input-container {
    padding: 10;
    background-color: #f5f5f5;
  }
  .input {
    padding: 10;
    margin-right: 10;
  }
</style>