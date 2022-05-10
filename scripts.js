const box = document.querySelector("#box1");
const body = document.body;

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
    rotateX: y * 100 + 60,
    rotateZ: -x * 100 + 45,
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
  box.style.transform = `
    perspective(${transformationValues.perspective}px)
    rotateX(${transformationValues.rotateX}deg)
    rotateZ(${transformationValues.rotateZ}deg)
    translateZ(${transformationValues.translateZ}px)
    scale(${transformationValues.scale})
  `;
};

//body.addEventListener("pointermove", pointerMove);
//body.onwheel = zoom;
