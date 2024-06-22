let canvas = document.getElementById('stars');
let ctx = canvas.getContext('2d');

// Function to set canvas dimensions
function setCanvasDimensions() {
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight;
}

// Set initial canvas dimensions
setCanvasDimensions();

// Handle window resize
window.addEventListener('resize', () => {
    setCanvasDimensions();
    initStars();
});

let stars = [];
let cursor = { x: null, y: null };

let rangeNumStars = document.getElementById('rangeNumStars');
let inputNumStars = document.getElementById('inNumStars');
let outputNumStars = document.getElementById('outNumStars');
let numStars = rangeNumStars.value;
outputNumStars.innerHTML = numStars;

function Star(x, y, radius, velocityX, velocityY, opacity, velocityOpacity, velocityRadius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityRadius = velocityRadius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.opacity = opacity;
    this.velocityOpacity = velocityOpacity;
}

Star.prototype.update = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.opacity += this.velocityOpacity;
    if (this.opacity <= 0 || this.opacity >= 1) {
        this.velocityOpacity = -this.velocityOpacity;
    }

    this.radius += this.velocityRadius;
    if (this.radius <= 0.75 || this.radius >= 3) { // Limit radius change within a range
        this.velocityRadius = -this.velocityRadius;
    }

    if (this.x > canvas.width || this.x < 0) {
        this.velocityX = -this.velocityX;
    }

    if (this.y > canvas.height || this.y < 0) {
        this.velocityY = -this.velocityY;
    }
};

Star.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
};

function initStars() {
    stars.length = 0;
    numStars = rangeNumStars.value;
    for (let i = 0; i < numStars; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let radius = Math.random() * 2.25 + 0.75;
        let velocityRadius = Math.random() * 0.005 - 0.001; // Random change rate for radius
        let velocityX = Math.random() * 0.5 - 0.25; // Random velocity in X direction
        let velocityY = Math.random() * 0.5 - 0.25; // Random velocity in Y direction
        let opacity = Math.random();
        let velocityOpacity = Math.random() * 0.005 - 0.001; // Random change rate for opacity
        stars.push(new Star(x, y, radius, velocityX, velocityY, opacity, velocityOpacity, velocityRadius));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
        drawLineToCursor(star);
    });
    requestAnimationFrame(animate);
}

function drawLineToCursor(star) {
    if (cursor.x !== null && cursor.y !== null) {
        let distance = Math.sqrt((star.x - cursor.x) ** 2 + (star.y - cursor.y) ** 2);
        if (distance < 100) { // Only draw lines for stars within 100px of the cursor
            let lineOpacity = 1 - (distance / 100); // Calculate opacity based on distance
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(cursor.x, cursor.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`; // Use calculated line opacity
            ctx.lineWidth = star.radius * 0.5; // Scale line width with the radius
            ctx.stroke();
            ctx.closePath();
        }
    }
}

// Update number of stars when range input changes
rangeNumStars.addEventListener('input', () => {
    inputNumStars.value = rangeNumStars.value;
    outputNumStars.innerHTML = rangeNumStars.value;
    initStars();
});

// Update number of stars when number input changes
inputNumStars.addEventListener('input', () => {
    rangeNumStars.value = inputNumStars.value;
    outputNumStars.innerHTML = inputNumStars.value;
    initStars();
});

// Track cursor position
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    cursor.x = event.clientX - rect.left;
    cursor.y = event.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => {
    cursor.x = null;
    cursor.y = null;
});

initStars();
animate();
