/**
 * 273. Integer to English Words
 * Difficulty: Hard
 * 
 * Convert a non-negative integer to its english words representation. Given input is guaranteed to be less than 2^31 - 1.
 * 
 * Example 1:
 *  Input: 123
 *  Output: "One Hundred Twenty Three"
 * 
 * Example 2:
 *  Input: 12345
 *  Output: "Twelve Thousand Three Hundred Forty Five"
 * 
 * Example 3:
 *  Input: 1234567
 *  Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
 * 
 * Example 4:
 *  Input: 1234567891
 *  Output: "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"
 */

const numberToWords = (num) => {
  const ones = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine'
  }
  const lessThan20 = {
    10: 'Ten',
    11: 'Eleven',
    12: 'Twelve',
    13: 'Thirteen',
    14: 'Fourteen',
    15: 'Fifteen',
    16: 'Sixteen',
    17: 'Seventeen',
    18: 'Eighteen',
    19: 'Nineteen'
  }
  const tens = {
    2: 'Twenty',
    3: 'Thirty',
    4: 'Forty',
    5: 'Fifty',
    6: 'Sixty',
    7: 'Seventy',
    8: 'Eighty',
    9: 'Ninety'
  }

  // handle 1-2 digits
  const twos = val => {
    if (val == 0) {
      return ''
    } else if (val < 10) {
      return ones[val];
    } else if (val < 20) {
      return lessThan20[val];
    } else {
      // handle values >= 20
      // get tens digit
      const tenVal = Math.floor(val / 10);
      // get singles digit
      const rest = val % 10;
      if (rest !== 0) {
        return tens[tenVal] + ' ' + ones[rest];
      } else {
        return tens[tenVal];
      }
    }
  }

  // handle 3 digit
  const threes = val => {
    // get hundreds digit
    const hundred = Math.floor(val / 100);
    // get remaining 1-2 digits to be handled by twos()
    const rest = val % 100;
    let res = '';
    if (hundred !== 0 && rest !== 0) {
      res = ones[hundred] + ' Hundred ' + twos(rest);
    } else if (hundred === 0 && rest !== 0) {
      res = twos(rest);
    } else if (hundred !== 0 && rest === 0) {
      res = ones[hundred] + ' Hundred';
    }

    return res;
  }

  if (num === 0) return 'Zero';

  // assign 10^3 values for readability
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  // get number of billions/millions/thousands/remainder to be handled by threes()
  const numBillions = Math.floor(num / billion);
  const numMillions = Math.floor((num - numBillions * billion) / million);
  const numThousands = Math.floor((num - numBillions * billion - numMillions * million) / thousand);
  const remainder = num % 1000;

  let result = '';
  if (numBillions > 0) {
    result = threes(numBillions) + " Billion";
  }
  if (numMillions > 0) {
    if (result.length > 0) {
      result += " ";
    }
    result += threes(numMillions) + " Million";
  }
  if (numThousands > 0) {
    if (result.length > 0) {
      result += " ";
    }
    result += threes(numThousands) + " Thousand";
  }
  if (remainder > 0) {
    if (result.length > 0) {
      result += " ";
    }
    result += threes(remainder);
  }

  return result;
}

console.log(numberToWords(89273652));