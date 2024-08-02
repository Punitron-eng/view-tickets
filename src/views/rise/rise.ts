export const CheckWords = (a:number) => {
  if (a >= 10000000) {
      return (a / 10000000).toFixed(2) + ' Crore!';
  } else if (a >= 100000 && a <= 99999999) {
      return (a / 100000).toFixed(2) + ' Lakh!';
  } else if (a >= 1000) {
      const thousands = Math.floor(a / 1000);
      const remainder = a % 1000;
      if (remainder === 0) {
          return thousands + ' Thousand!';
      } else {
          return (thousands) + ' Thousand! ';
      }
  } else if (a >= 100) {
      const hundreds = Math.floor(a / 100);
      const remainder = a % 100;
      if (remainder === 0) {
          return hundreds + ' Hundred!';
      } else {
          return hundreds + ' Hundred! ' ;
      }
  } else {
      return a.toString();
  }
};