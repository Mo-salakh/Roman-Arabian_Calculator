function calculator(string)
{
  // Разделяем строку на операнды и оператор
  const [operand1, operator, operand2] = string.split(' ');
  
  // Проверяем, являются ли операнды римскими числами
  const isRoman = /[IVX]/.test(operand1 + operand2);

  
  // Проверяем, содержит ли выражение только арабские или только римские числа
  if ((/\d/.test(operand1) && /\D/.test(operand2)) || (/\D/.test(operand1) && /\d/.test(operand2))) {
    throw new Error('Операнды должны быть либо арабскими, либо римскими числами');
  }

  //Выбрасываем ошибку при некорректных данных
  if(string.split(' ').length !== 3) {
    throw new Error('Некорректные данные');
  }
  
  

  // Преобразование операнды в числа
  const num1 = isRoman ? romanToArabic(operand1) : parseInt(operand1, 10);
  const num2 = isRoman ? romanToArabic(operand2) : parseInt(operand2, 10);

  // римское число в арабское
  function romanToArabic(roman) {
    const romanNumerals = {
      I: 1,
      II: 2,
      IV: 4,
      V: 5,
      IX: 9,
      X: 10,
      XL: 40,
      L: 50,
      XC: 90,
      C: 100,
    };

    let result = 0;
    
    let i = 0;
    while (i < roman.length) {
      if (romanNumerals[roman]) {
        result += romanNumerals[roman];
        break;
      } else {
        result += romanNumerals[roman[i]];
        i++;
      }
    }

    return result;
  }
  
  // Проверяем, находятся ли операнды в допустимом диапазоне
  if (num1 < 1 || num1 > 10 || num2 < 1 || num2 > 10) {
    throw new Error('Операнды должны быть в диапазоне от 1 до 10');
  }

  // Выполнение операции 
  let result = 0;
  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = Math.floor(num1 / num2); // Учитываем только целую часть при делении
      break;
    default:
      throw new Error('Недопустимый оператор');
  }

  // Возвращаем результат
  return isRoman ? arabicToRoman(result) : result.toString(); //Здесь в переменной isRoman находятся римские числа переведенные в арабские. 


  // Функция для преобразования арабского числа в римское
  function arabicToRoman(arabic) {
    if (arabic === 0) {
      return ''; // Возвращаем пустую строку вместо нуля
    }

    const arabicNumbers = [
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' },
    ];

    let result = '';
    let remaining = arabic;
    for (const { value, numeral } of arabicNumbers) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }

    return result;
  }
}


module.exports = calculator;