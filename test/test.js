function isPalindrome(word) {
  // 여기에 코드를 작성하세요

  for (let i = 0; i <= Math.floor(word.length / 2); i++) {
    let right = word[i];
    let left = word[word.length - i - 1];

    if (right !== left) return false;
  }
  return true;
}

// 테스트 코드
console.log(isPalindrome("racecar"));
console.log(isPalindrome("stars"));
console.log(isPalindrome("기러기"));
console.log(isPalindrome("123321"));
console.log(isPalindrome("hello"));
console.log(isPalindrome("kayak"));
