// const myNumberTag = document.getElementById("myNumber");
// const decreaseBtn = document.getElementById("decrease");
// const increaseBtn = document.getElementById("increase");

// let myNumber = +myNumberTag.textContent;

// decreaseBtn.onclick = function () {
//   if (myNumber > 0) {
//     myNumber--;
//     myNumberTag.textContent = myNumber;
//   }
// };

// increaseBtn.onclick = function () {
//   myNumber++;
//   myNumberTag.textContent = myNumber;
// };

// const colorBtns = document.getElementsByClassName("color-btn");

// for (let btn of colorBtns) {
//   btn.onclick = function () {
//     myNumberTag.style.color = btn.dataset.color;
//     console.log(btn);
//   };
// }

const gradeBtn = document.querySelector("#grade");

gradeBtn.onclick = function () {
  alert("정답입니다!👏🏻");
};
