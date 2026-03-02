// api/users.ts
export interface User {
  email: string;
  password: string;
  username: string;
}

// Usuários de teste
const users: User[] = [
  { email: 'teste@teste.com', password: '12345678', username: 'teste' },
];

export function getAllUsers() {
  return users;
}

export function findUserByEmail(email: string) {
  return users.find(u => u.email === email);
}
