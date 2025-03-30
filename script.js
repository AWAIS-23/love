/* script.js */
const image = new Image();
image.src = 'https://i.imgur.com/TcFfrSy.jpg';
image.crossOrigin = "anonymous";
image.onload = function () {
    new Typed('#msg', {
        stringsElement: '#typed-strings',
        typeSpeed: 50,
        showCursor: false,
        fadeOut: true,
        loop: true,
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    
    const particlesArr = [];
    const NoOfParticles = 5000;
    let mappedImage = [];
    const pixelData = ctx.getImageData(0, 0, image.width, image.height);
    ctx.clearRect(0, 0, image.width, image.height);
    
    for (let y = 0; y < image.height; y++) {
        let row = [];
        for (let x = 0; x < image.width; x++) {
            const red = pixelData.data[(y * 4 * pixelData.width) + (x * 4)];
            const green = pixelData.data[(y * 4 * pixelData.width) + (x * 4 + 1)];
            const blue = pixelData.data[(y * 4 * pixelData.width) + (x * 4 + 2)];
            const brightness = Math.sqrt(
                (red * red) * 0.299 + 
                (green * green) * 0.587 + 
                (blue * blue) * 0.114
            ) / 100;
            row.push([brightness, red, green, blue]);
        }
        mappedImage.push(row);
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * image.width;
            this.y = 0;
            this.velocity = Math.random() * 0.5;
            this.size = 1;
        }
        
        update() {
            const pos1 = Math.floor(this.y);
            const pos2 = Math.floor(this.x);
            if (mappedImage[pos1] && mappedImage[pos1][pos2]) {
                this.speed = mappedImage[pos1][pos2][0];
            }
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement;
            if (this.y >= image.height) {
                this.y = 0;
                this.x = Math.random() * image.width;
            }
        }
        
        draw() {
            ctx.beginPath();
            const pos1 = Math.floor(this.y);
            const pos2 = Math.floor(this.x);
            if (mappedImage[pos1] && mappedImage[pos1][pos2]) {
                const [a, r, g, b] = mappedImage[pos1][pos2];
                ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
            }
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < NoOfParticles; i++) {
            particlesArr.push(new Particle());
        }
    }
    
    function animate() {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, image.width, image.height);
        ctx.globalAlpha = 0.2;
        particlesArr.forEach(p => {
            p.update();
            ctx.globalAlpha = p.speed * 0.5;
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
};
