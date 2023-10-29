const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }
  draw() {
    c.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false);
    c.fillStyle = 'red';
    c.fill();

    c.moveTo(this.position.x + 30, this.position.y);
    c.lineTo(this.position.x - 10, this.position.y - 10);
    c.lineTo(this.position.x - 10, this.position.y + 10);
    c.closePath()

    c.strokeStyle = "white";
    c.stroke();
  }
}

const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});
player.draw();

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            console.log("W is pressed");
            break;
        case 'KeyA':
            console.log("A is pressed");
            break;
        case 'KeyD':
            console.log("D is pressed");
            break;
    }
});
