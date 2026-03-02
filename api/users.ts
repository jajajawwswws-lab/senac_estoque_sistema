// api/users.ts

// Interface de usuário
export interface User {
  email: string;
  password: string;
  username: string;
}

// Lista de usuários de teste
const users: User[] = [
  { email: 'teste@teste.com', password: '12345678', username: 'teste' },
];

// Função para retornar todos os usuários
export function getAllUsers(): User[] {
  return users;
}

// Função para buscar usuário por email
export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email);
}
