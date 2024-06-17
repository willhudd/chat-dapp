<script>
  import { username, user } from './user';

  function signout() {
    user.leave();
    username.set('');
  }
</script>

<header class="header">

  <h1>Chat</h1>
  {#if $username}
    <div class="user-bio">
      <span>Hello <strong>{$username}</strong></span>
      <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${$username}`} alt="" height="25" width="25">
    </div>

    <button class="signout" on:click={signout}>
      Sign Out
    </button>
  {:else}
    <p>SignUp or LogIn to enter a live chat</p>
  {/if}
</header>

<style>

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 10px;
  }

  button {
    margin-top: 14px;
  }

</style>