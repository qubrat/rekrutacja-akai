// 1. odwróć liczbę
// np dla 12345, funkcja powinna zwrócić 54321
function reverseNumber(num) {
  // uzupełnij tutaj
  let digit,
    result = 0;
  while (num) {
    digit = num % 10;
    result = result * 10 + digit;
    num = (num / 10) | 0;
  }
  return result;
}

console.log("1.", reverseNumber(12345));

// 2. dodaj do siebie wszystkie wartości z tablicy, które są parzyste
// dla tablicy tab powinniśmy otrzymać 2 + 4 + 6 + 8 = 20
const tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function addEven(array) {
  // uzupełnij tutaj
  return array.reduce(
    (acc, current) => acc + (current % 2 === 0 ? current : 0),
    0
  );
}

console.log("2.", addEven(tab));
