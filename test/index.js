document.addEventListener("mouseover", function (event) {
  if (event.target.tagName === "IMG") {
    let img = event.target;
    let container = img.parentNode.querySelector(".button-container");

    if (!container) {
      // 회전 버튼 컨테이너 생성
      container = document.createElement("div");
      container.className = "button-container";

      // 왼쪽 회전 버튼 생성
      let rotateLeft = document.createElement("div");
      rotateLeft.className = "rotate-button";
      rotateLeft.innerHTML = "↺";
      rotateLeft.addEventListener("click", function () {
        rotateImage(img, -90);
        updateButtonPosition(img, container);
      });

      // 회전 버튼을 컨테이너에 추가
      container.appendChild(rotateLeft);

      // 이미지 부모 요소에 컨테이너 추가
      img.parentNode.style.position = "relative";
      img.parentNode.appendChild(container);
    }

    // 버튼 위치 업데이트 및 표시
    updateButtonPosition(img, container);
    container.style.display = "flex";

    // 이미지 및 버튼에서 마우스가 벗어날 때 버튼 숨김
    img.addEventListener("mouseleave", hideContainer);
    container.addEventListener("mouseleave", hideContainer);

    function hideContainer() {
      if (!img.matches(":hover") && !container.matches(":hover")) {
        container.style.display = "none";
      }
    }

    // 이미지나 버튼 위에 있을 때 버튼이 유지되도록 함
    img.addEventListener("mouseenter", showContainer);
    container.addEventListener("mouseenter", showContainer);

    function showContainer() {
      container.style.display = "flex";
    }
  }
});

function getCurrentRotation(img) {
  const st = window.getComputedStyle(img, null);
  const tr = st.getPropertyValue("transform");
  if (tr === "none") return 0;
  const values = tr.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle < 0 ? angle + 360 : angle;
}

function rotateImage(img, degree) {
  const currentRotation = getCurrentRotation(img);
  const newRotation = currentRotation + degree;
  img.style.transform = `rotate(${newRotation}deg)`;
}

function updateButtonPosition(img, container) {
  const rect = img.getBoundingClientRect();
  container.style.top = `${rect.bottom - 50}px`;
  container.style.left = `${rect.right - 40}px`;
}
