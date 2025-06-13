class Roulette {
    constructor() {
        this.canvas = document.getElementById('rouletteCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.spinButton = document.getElementById('spinButton');
        this.resetButton = document.getElementById('resetButton');

        // Set canvas size
        this.canvas.width = 600;
        this.canvas.height = 600;

        // Roulette properties
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = Math.min(this.canvas.width, this.canvas.height) / 2.5;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.maxSpeed = 20;
        this.friction = 0.99;
        this.numbers = Array.from({length: 37}, (_, i) => i); // 0-36
        this.colors = ['green', ...Array(36).fill().map((_, i) => (i % 2 === 0 ? 'red' : 'black'))];

        // Ball properties
        this.ballRadius = 8;
        this.ballAngle = 0;
        this.ballSpeed = 0;
        this.ballDistance = this.radius - 30;
        this.gravity = 0.2;
        this.bounce = 0.7;

        // Animation state
        this.isSpinning = false;
        this.animationId = null;

        // Event listeners
        this.spinButton.addEventListener('click', () => this.spin());
        this.resetButton.addEventListener('click', () => this.reset());

        // Initial draw
        this.draw();
    }

    spin() {
        if (!this.isSpinning) {
            this.isSpinning = true;
            this.rotationSpeed = this.maxSpeed;
            this.ballSpeed = this.maxSpeed * 1.2;
            this.animate();
        }
    }

    reset() {
        this.isSpinning = false;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.ballAngle = 0;
        this.ballSpeed = 0;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.draw();
    }

    animate() {
        // Update rotation
        this.rotation += this.rotationSpeed;
        this.rotationSpeed *= this.friction;

        // Update ball
        this.ballAngle += this.ballSpeed;
        this.ballSpeed *= this.friction;

        // Apply physics to the ball
        if (this.ballSpeed < 2) {
            this.ballDistance = Math.max(
                this.radius - 30,
                this.ballDistance - this.gravity
            );
            
            if (this.ballDistance <= this.radius - 30) {
                this.ballDistance = this.radius - 30;
                this.ballSpeed *= this.bounce;
            }
        }

        // Draw the current frame
        this.draw();

        // Continue animation
        if (this.rotationSpeed > 0.01 || this.ballSpeed > 0.01) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.isSpinning = false;
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the outer ring
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.rotation);

        // Draw roulette segments
        const segmentAngle = (Math.PI * 2) / this.numbers.length;
        this.numbers.forEach((number, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = startAngle + segmentAngle;

            // Draw segment
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.arc(0, 0, this.radius, startAngle, endAngle);
            this.ctx.fillStyle = this.colors[number];
            this.ctx.fill();
            this.ctx.closePath();

            // Draw number
            this.ctx.save();
            this.ctx.rotate(startAngle + segmentAngle / 2);
            this.ctx.translate(this.radius - 25, 0);
            this.ctx.rotate(-this.rotation - (startAngle + segmentAngle / 2));
            this.ctx.fillStyle = 'white';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(number.toString(), 0, 0);
            this.ctx.restore();
        });

        // Draw center circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 20, 0, Math.PI * 2);
        this.ctx.fillStyle = '#2a2a2a';
        this.ctx.fill();
        this.ctx.restore();

        // Draw ball
        const ballX = this.centerX + Math.cos(this.ballAngle) * this.ballDistance;
        const ballY = this.centerY + Math.sin(this.ballAngle) * this.ballDistance;

        this.ctx.beginPath();
        this.ctx.arc(ballX, ballY, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
}

// Initialize the roulette when the page loads
window.addEventListener('load', () => {
    new Roulette();
});
