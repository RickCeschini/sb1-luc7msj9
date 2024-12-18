import { useState, useCallback } from 'react';
import type { RegistrationState, RegistrationField, UserData } from '../types';
import { validateBirthDate, validateCPF } from '../utils/validators';

const REGISTRATION_QUESTIONS = {
  name: 'Por favor, digite seu nome completo:',
  birthDate: 'Qual é sua data de nascimento? (DD/MM/AAAA):',
  cpf: 'Digite seu CPF (apenas números):',
  address: 'Qual é seu endereço completo?',
  gender: 'Qual é seu sexo? (masculino ou feminino):',
  height: 'Qual é sua altura em metros? (ex: 1.75):',
  weight: 'Qual é seu peso em kg? (ex: 70):',
  bloodType: 'Qual é seu tipo sanguíneo? (ex: A+, B-, O+):', // Nova pergunta
  phoneNumber: 'Qual é seu número de telefone? (apenas números):', // Nova pergunta
  email: 'Qual é seu e-mail?', // Nova pergunta
} as const;

const FIELD_ORDER: RegistrationField[] = [
  'name',
  'birthDate',
  'cpf',
  'address',
  'gender',
  'height',
  'weight',
  'bloodType', // Adicionando 'bloodType'
  'phoneNumber', // Adicionando 'phoneNumber'
  'email', // Adicionando 'email'
];

const FIELD_VALIDATORS: Record<
  RegistrationField,
  ((value: string) => string | null) | null
> = {
  name: null,
  birthDate: validateBirthDate,
  cpf: validateCPF,
  address: null,
  gender: (value: string) => {
    if (value !== 'masculino' && value !== 'feminino') {
      return 'Por favor, digite "masculino" ou "feminino".';
    }
    return null;
  },
  height: (value: string) => {
    const height = parseFloat(value);
    if (isNaN(height) || height <= 0) {
      return 'Por favor, digite uma altura válida em metros.';
    }
    return null;
  },
  weight: (value: string) => {
    const weight = parseFloat(value);
    if (isNaN(weight) || weight <= 0) {
      return 'Por favor, digite um peso válido em kg.';
    }
    return null;
  },
  bloodType: (value: string) => {
    const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validBloodTypes.includes(value)) {
      return 'Por favor, digite um tipo sanguíneo válido (ex: A+, B-, O+).';
    }
    return null;
  },
  phoneNumber: (value: string) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Aceita números de 10 a 15 dígitos
    if (!phoneRegex.test(value)) {
      return 'Por favor, digite um número de telefone válido (apenas números).';
    }
    return null;
  },
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validação básica de e-mail
    if (!emailRegex.test(value)) {
      return 'Por favor, digite um e-mail válido.';
    }
    return null;
  },
};

export function useRegistration(onComplete: (data: UserData) => void) {
  const [state, setState] = useState<RegistrationState>({
    currentField: 'name',
    data: {},
    isComplete: false,
  });

  const getCurrentQuestion = useCallback(() => {
    if (!state.currentField) return null;
    return REGISTRATION_QUESTIONS[state.currentField];
  }, [state.currentField]);

  const validateField = (
    field: RegistrationField,
    value: string
  ): string | null => {
    const validator = FIELD_VALIDATORS[field];
    return validator ? validator(value) : null;
  };

  const handleResponse = useCallback(
    (response: string) => {
      if (!state.currentField) return null;

      const validationError = validateField(state.currentField, response);
      if (validationError) {
        return {
          isValid: false,
          error: validationError,
        };
      }

      const currentIndex = FIELD_ORDER.indexOf(state.currentField);
      const nextField = FIELD_ORDER[currentIndex + 1] || null;
      const newData = { ...state.data, [state.currentField]: response };

      setState((prev) => ({
        currentField: nextField,
        data: newData,
        isComplete: !nextField,
      }));

      if (!nextField && Object.keys(newData).length === FIELD_ORDER.length) {
        const height = parseFloat(newData.height);
        const weight = parseFloat(newData.weight);
        const imc = weight / (height * height);
        newData.imc = imc.toFixed(2);

        onComplete(newData as UserData);
      }

      return {
        isValid: true,
        error: null,
      };
    },
    [state, onComplete]
  );

  return {
    currentQuestion: getCurrentQuestion(),
    handleResponse,
    isComplete: state.isComplete,
  };
}
