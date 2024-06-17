import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';

export const db = GUN(['http://localhost:8765/gun']);

export const user = db.user().recall({ sessionStorage: true });

export const username = writable('');

user.get('alias').on((alias) => {
  if (alias) {
    console.log('Alias retrieved:', alias);
    username.set(alias);
  } else {
    console.log('Alias not set');
  }
});

db.on('auth', async (event) => {
  const alias = await user.get('alias');
  console.log('Auth event alias:', alias);
  username.set(alias);
});