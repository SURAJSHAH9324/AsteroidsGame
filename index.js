const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.rotation = 0;
  }
  draw() {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation);
    c.translate(-this.position.x, -this.position.y);

    c.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false);
    c.fillStyle = "red";
    c.fill();

    c.beginPath();
    c.moveTo(this.position.x + 30, this.position.y);
    c.lineTo(this.position.x - 10, this.position.y - 10);
    c.lineTo(this.position.x - 10, this.position.y + 10);
    c.closePath();

    c.strokeStyle = "white";
    c.stroke();
    c.restore();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});

const Keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
const SPEED = 4;
const Rotaional_Speed = 0.05;
const friction = 0.99;

function animate() {
  window.requestAnimationFrame(animate);
  // console.log('animate')
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();

  if (Keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED;
    player.velocity.y = Math.sin(player.rotation) * SPEED;
  } else if (!Keys.w.pressed) {
    player.velocity.x *= friction;
    player.velocity.y *= friction;
  }

  if (Keys.d.pressed) player.rotation += Rotaional_Speed;

  if (Keys.a.pressed) player.rotation -= Rotaional_Speed;
}
animate();

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      console.log("W is pressed");
      Keys.w.pressed = true;
      break;
    case "KeyA":
      Keys.a.pressed = true;
      break;
    case "KeyD":
      Keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      console.log("W is pressed");
      Keys.w.pressed = false;
      break;
    case "KeyA":
      Keys.a.pressed = false;
      break;
    case "KeyD":
      Keys.d.pressed = false;
      break;
  }
});
