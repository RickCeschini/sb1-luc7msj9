export function validateBirthDate(value: string): string | null {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!dateRegex.test(value)) {
    return 'Por favor, digite a data no formato DD/MM/AAAA';
  }
  
  const [day, month, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return 'Data inválida';
  }
  
  return null;
}

export function validateCPF(value: string): string | null {
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(value)) {
    return 'Por favor, digite apenas os 11 números do CPF';
  }
  return null;
}