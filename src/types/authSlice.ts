export interface User {
  id: number;
  username: string;
  email: string;
  roles?: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
