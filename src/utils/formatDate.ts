export const formatDate = (seconds: Date) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleString('pt-BR');
};
