
// converte a data no formato retornado do prisma para o formato local BR
export const formatDate = (_date?: string) => {
  if (_date) {
    return `${new Date(_date).toLocaleDateString()} ${new Date(_date).toLocaleTimeString()}`;
  }else {
    return '';
  }
}