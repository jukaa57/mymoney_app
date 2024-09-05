const Data = new Date();
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export const monthString = months[Data.getMonth()]

// console.log(`Today's date is: ${Data.toISOString().split('T')[0]}`);

function formatDate() {
    const options = { day: '2-digit' , month: '2-digit', year: 'numeric' };
    return Data.toLocaleDateString('pt-BR', options);
}

export function moneyMask(value: string){
  // Remove tudo que não é número
  let cleanValue = value.replace(/\D/g, '');

  // Adiciona o ponto antes dos dois últimos dígitos
  cleanValue = cleanValue.replace(/(\d)(\d{2})$/, '$1.$2');

  return cleanValue;
}