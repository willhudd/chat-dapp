<script>
  import Login from "./login.svelte";
  import ChatMessage from "./ChatMessage.svelte";
  import { username, user, db } from "./user";
  import { onMount, afterUpdate } from "svelte";
  import GUN from "gun";
  import SEA from "gun/sea";

  let newMessage = '';
  let messages = [];
  let chatContainer;

  onMount(() => {
  console.log("Component mounted, setting up message listener...");
  db.get('jeff')
    .map()
    .once(async (data, id) => {
      if (data) {
        const key = '#foo';
        try {
          const decryptedMessage = await SEA.decrypt(data.what, key);
          if (decryptedMessage) {
            const alias = data.alias || 'anonymous'; // Retrieve alias directly from message
            console.log('Message alias:', alias);
            const message = {
              who: alias,
              what: decryptedMessage,
              when: GUN.state.is(data, 'what'),
            };
            console.log("Decrypted message:", message);
            if (message.what) {
              messages = [...messages.slice(-12), message]; // Keep only the last 13 messages
              console.log("Message received and decrypted:", message);
            }
          }
        } catch (error) {
          console.error("Decryption error:", error);
        }
      }
    });
});


  afterUpdate(() => {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });

  async function sendMessage() {
  const key = '#foo'; // Use a real secret key in production
  try {
    const secret = await SEA.encrypt(newMessage, key);
    const alias = await user.get('alias');
    const message = {
      what: secret,
      alias: alias, // Include alias in the message
    };
    const index = new Date().toISOString();
    db.get('jeff').get(index).put(message);
    console.log("Message sent:", newMessage, "by", alias);
    newMessage = '';
  } catch (error) {
    console.error("Encryption or sending error:", error);
  }
}

</script>

<div class="chat">
  {#if $username}
    <main class="max" bind:this={chatContainer}>
      {#each messages as message (message.when)}
        <ChatMessage {message} sender={$username} />
      {/each}
    </main>

    <form on:submit|preventDefault={sendMessage}>
      <input type="text" bind:value={newMessage} placeholder="Type your message..." />
      <button type="submit">Send</button>
    </form>
  {:else}
    <main>
      <Login />
    </main>
  {/if}
</div>


<style>

  .chat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    width: 270px;
  }

  .max {
    max-height: 70vh;
    overflow-y: auto;
  }

</style>
