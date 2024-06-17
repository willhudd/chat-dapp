<script>
  export let message;
  export let sender;
</script>

<div class="chat-message">
  <strong>{message.who}:</strong> {message.what}
</div>

<style>
  .chat-message {
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-height: 400px;
  }
</style>
