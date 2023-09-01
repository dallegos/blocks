const body = document.body;
const boxes = document.getElementsByClassName("box");

let currentIndex = 1;
let currentBox = document.getElementById(`box${currentIndex}`);
currentBox.classList.add("active");

let transformationValues = {
  perspective: 1250,
  rotateX: 60,
  rotateZ: 45,
  translateZ: -70,
  scale: 1,
};

let pointerMove = (e) => {
  var x = e.pageX / window.innerWidth - 0.5;
  var y = e.pageY / window.innerHeight - 0.5;
  transformationValues = {
    ...transformationValues,
    rotateX: y * 30 + 60,
    rotateZ: -x * 30 + 45,
  };
  applyTransform();
};

let zoom = (event) => {
  event.preventDefault();
  transformationValues.scale += event.deltaY * -0.01;
  transformationValues.scale = Math.min(
    Math.max(0.125, transformationValues.scale),
    4
  );
  applyTransform();
};

let applyTransform = () => {
  Array.from(boxes).forEach((box) => {
    box.style.transform = `
      perspective(${transformationValues.perspective}px)
      rotateX(${transformationValues.rotateX}deg)
      rotateZ(${transformationValues.rotateZ}deg)
      translateZ(${transformationValues.translateZ}px)
      scale(${transformationValues.scale})
    `;
  });
};

body.addEventListener("pointermove", pointerMove);
//body.onwheel = zoom;

/** Toggler */
const toggler = document.getElementById("toggle");

let toggle = (event) => {
  event.preventDefault();
  currentBox.classList.toggle("active");
};

toggler.addEventListener("click", toggle);

/** Next & prev */
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let changeBox = (event, direction) => {
  event.preventDefault();

  const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
  const newBox = document.getElementById(`box${newIndex}`);

  if (newBox) {
    currentBox.classList.remove("active");

    setTimeout(() => {
      newBox.classList.add("active");
      currentIndex = newIndex;
      currentBox = newBox;
    }, 1000);
  }
};

prevButton.addEventListener("click", (event) => changeBox(event, "prev"));
nextButton.addEventListener("click", (event) => changeBox(event, "next"));
