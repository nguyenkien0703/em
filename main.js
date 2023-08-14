
document.addEventListener("DOMContentLoaded", function () {
    var hearts = [];
  
    var canvas = document.createElement("canvas");
    var c = canvas.getContext("2d");
  
    document.body.appendChild(canvas);
    canvas.style.zIndex = "9999";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    function Heart(x, y) {
      this.x = x;
      this.y = y;
      this.opacity = 0.8;
    }
  
    Heart.prototype.draw = function (c) {
      c.globalAlpha = this.opacity;
      c.fillStyle = "red";
      c.font = "20px Arial";
      c.fillText("❤️", this.x, this.y);
      c.globalAlpha = 1;
    };
  
    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
  
      for (var i = 0; i < hearts.length; i++) {
        hearts[i].y -= 1;
        hearts[i].opacity -= 0.0099999;
        hearts[i].draw(c);
  
        if (hearts[i].opacity <= 0) {
          hearts.splice(i, 1);
          i--;
        }
      }
    }
  
    animate();
  
    function createHeart(x, y) {
      var heart = new Heart(x, y);
      hearts.push(heart);
    }
  
    function autoCreateHeart() {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      createHeart(x, y);
  
      setTimeout(autoCreateHeart, 50); // Thời gian tạo trái tim tự động (ms)
    }
  
    autoCreateHeart();
  
    var timeout;
  
    function handleMouseMove(event) {
      clearTimeout(timeout);
      createHeart(event.clientX, event.clientY);
  
      timeout = setTimeout(function () {
        createHeart(event.clientX, event.clientY);
      }, 1000);
    }
  
    function handleMouseLeave() {
      clearTimeout(timeout);
    }
  
    function handleMouseStill(event) {
        clearTimeout(timeout);
        createHeart(event.clientX, event.clientY);
      
        timeout = setTimeout(function () {
          createHeart(event.clientX, event.clientY);
        }, 50);
      }
    document.addEventListener("mousemove", handleMouseMove);
  
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseStill);
  });
  