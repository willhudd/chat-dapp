<script>
  import { user } from './user';
  import SEA from "gun/sea";

  let username;
  let password;

  function login() {
    user.auth(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        console.log('User authenticated:', username);
      }
    });
  }

  function signp() {
    user.create(username, password, ({ err }) => {

      if (err) {
        alert(err);
      } else {
        console.log('User created:', username);
        login();
      }
    });
  }
</script>

<form class="login">

  <label for="username">Username</label>
  <input id="username" name="username" type="text" bind:value={username}>

  <label for="password">Password</label>
  <input id="password" name="password" autocomplete="off" type="password" bind:value={password}>

  <div class="buttons">
    <button type="button" on:click={login}>Login</button>
    <button type="button" on:click={signp}>Sign Up</button>
  </div>

</form>

<style>

  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .buttons {
    display: block;
    margin: 10px;
  }

</style>