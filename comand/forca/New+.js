const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const colors = ["#ff004c", "#ffff00", "#00e7ff", "#ff00f7", "#ffa500"];
let fireworksInterval;

function createParticles(x, y) {
    const count = Math.random() * 50 + 50;
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 4 + 1,
            radius: Math.random() * 3 + 1,
            alpha: 1,
            decay: Math.random() * 0.03 + 0.01,
        });
    }
}

function updateParticles() {
    particles.forEach((particle, index) => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.alpha -= particle.decay;

        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });
}

function drawParticles() {
    particles.forEach((particle) => {
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}

function launchFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    createParticles(x, y);
}

function startFireworks() {
    if (!fireworksInterval) {
        fireworksInterval = setInterval(launchFirework, 500);
    }
}

function stopFireworks() {
    if (fireworksInterval) {
        clearInterval(fireworksInterval);
        fireworksInterval = null;
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopFireworks();
    } else {
        startFireworks();
    }
});

startFireworks();
animate();
