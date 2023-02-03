//Start Chuck Mikolyski
export default function cartAnimation() {
  let keyFrames = [
    { transform: "rotate(30deg)", easing: "ease-in" },
    { transform: "rotate(-15deg)", easing: "ease-out" },
    { transform: "rotate(20deg)", easing: "ease-in" },
    { transform: "rotate(-10deg)", easing: "ease-out" },
    { transform: "rotate(0)" },
  ];

  let options = {
    duration: 1500,
  };

  document.getElementById("cartAnimation").animate(keyFrames, options);
}
//End Chuck Mikolyski
