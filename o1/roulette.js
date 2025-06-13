class Roulette {
  constructor() {
    this.canvas = document.getElementById('rouletteCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.spinButton = document.getElementById('spinButton');
    this.resetButton = document.getElementById('resetButton');

    // Ajuste de tamanho do canvas
    this.canvas.width = 500;
    this.canvas.height = 500;

    // Propriedades da roleta
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = this.canvas.width * 0.4;
    this.rotation = 0;
    this.rotationSpeed = 0;
    this.maxSpeed = 0.3;
    this.friction = 0.995;
    this.segments = 37;
    this.segmentAngle = (Math.PI * 2) / this.segments;

    // Propriedades da bola
    this.ballRadius = 6;
    this.ballAngle = 0;
    this.ballAngularSpeed = 0;
    this.ballDistance = this.radius - this.ballRadius - 5;
    this.radialVelocity = 0;
    this.gravity = 0.1;
    this.bounce = 0.7;

    this.isSpinning = false;
    this.animationId = null;

    this.spinButton.addEventListener('click', () => this.spin());
    this.resetButton.addEventListener('click', () => this.reset());

    this.draw();
  }

  spin() {
    if (!this.isSpinning) {
      this.isSpinning = true;
      this.rotationSpeed = Math.random() * (this.maxSpeed / 2) + (this.maxSpeed / 2);
      this.ballAngularSpeed = this.maxSpeed;
      this.radialVelocity = 0;
      this.animate();
    }
  }

  reset() {
    this.isSpinning = false;
    this.rotation = 0;
    this.rotationSpeed = 0;
    this.ballAngle = 0;
    this.ballAngularSpeed = 0;
    this.ballDistance = this.radius - this.ballRadius - 5;
    this.radialVelocity = 0;
    cancelAnimationFrame(this.animationId);
    this.draw();
  }

  animate() {
    // Atualiza rotação da roleta
    this.rotation += this.rotationSpeed;
    this.rotationSpeed *= this.friction;

    // Atualiza movimento angular da bola
    this.ballAngle += this.ballAngularSpeed;
    this.ballAngularSpeed *= this.friction;

    // Movimento radial da bola sob gravidade
    this.radialVelocity += this.gravity;
    this.ballDistance += this.radialVelocity;

    // Rebote ao bater na borda
    const rim = this.radius - this.ballRadius;
    if (this.ballDistance >= rim) {
      this.ballDistance = rim;
      this.radialVelocity = -this.radialVelocity * this.bounce;
    }

    this.draw();

    if (
      this.rotationSpeed > 0.001 ||
      this.ballAngularSpeed > 0.001 ||
      Math.abs(this.radialVelocity) > 0.001
    ) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.isSpinning = false;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Desenha roleta
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(this.rotation);

    for (let i = 0; i < this.segments; i++) {
      const start = i * this.segmentAngle;
      const end = start + this.segmentAngle;
      
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.arc(0, 0, this.radius, start, end);
      this.ctx.fillStyle = i === 0 ? 'green' : i % 2 === 0 ? 'red' : 'black';
      this.ctx.fill();
      this.ctx.closePath();

      // Números
      this.ctx.save();
      this.ctx.rotate(start + this.segmentAngle / 2);
      this.ctx.translate(this.radius - 20, 0);
      this.ctx.rotate(-this.rotation - (start + this.segmentAngle / 2));
      this.ctx.fillStyle = 'white';
      this.ctx.font = '14px Arial';
      this.ctx.fillText(i.toString(), 0, 0);
      this.ctx.restore();
    }

    // Círculo central
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 25, 0, Math.PI * 2);
    this.ctx.fillStyle = '#fff';
    this.ctx.fill();
    this.ctx.restore();

    // Bola
    const x =
      this.centerX + Math.cos(this.ballAngle) * this.ballDistance;
    const y =
      this.centerY + Math.sin(this.ballAngle) * this.ballDistance;

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.strokeStyle = '#888';
    this.ctx.stroke();
  }
}

window.addEventListener('load', () => new Roulette());
