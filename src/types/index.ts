export interface UserData {
  name: string;
  birthDate: string;
  cpf: string;
  address: string;
}

export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  image?: string;
  options?: string[];
}

export type RegistrationField = 'name' | 'birthDate' | 'cpf' | 'address';

export interface RegistrationState {
  currentField: RegistrationField | null;
  data: Partial<UserData>;
  isComplete: boolean;
}