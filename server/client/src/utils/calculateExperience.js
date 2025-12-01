export const calculateExperience = (startDate) => {
  const start = new Date(startDate);
  const today = new Date();

  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
};
