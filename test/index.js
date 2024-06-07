document.addEventListener("mouseover", function (event) {
  if (event.target.tagName === "IMG") {
    let img = event.target;
    let container = img.parentNode.querySelector(".button-container");

    if (!container) {
      container = document.createElement("div");
      container.className = "button-container";

      let rotateLeft = document.createElement("div");
      rotateLeft.className = "rotate-button";
      rotateLeft.innerHTML = "↺";
      rotateLeft.addEventListener("click", function () {
        img.style.transform = `rotate(${getCurrentRotation(img) - 90}deg)`;
      });

      let rotateRight = document.createElement("div");
      rotateRight.className = "rotate-button";
      rotateRight.innerHTML = "↻";
      rotateRight.addEventListener("click", function () {
        img.style.transform = `rotate(${getCurrentRotation(img) + 90}deg)`;
      });

      container.appendChild(rotateLeft);
      container.appendChild(rotateRight);
      img.parentNode.style.position = "relative";
      img.parentNode.appendChild(container);
    }

    let rect = img.getBoundingClientRect();
    container.style.top = `${img.offsetTop + img.clientHeight - 60}px`;
    container.style.left = `${img.offsetLeft + img.clientWidth - 40}px`;
    container.style.display = "flex";

    container.addEventListener("mouseleave", function () {
      container.style.display = "none";
    });

    img.addEventListener("mouseleave", function () {
      if (!container.matches(":hover")) {
        container.style.display = "none";
      }
    });
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
