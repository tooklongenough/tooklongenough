document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#39ff14']; // Neon pink, cyan, yellow, neon green
    const sparkles = 50; // Number of sparkles
    const trails = [];
  
    // Create the sparkles (neon circles)
    for (let i = 0; i < sparkles; i++) {
      const trail = document.createElement('div');
      trail.style.position = 'fixed';
      trail.style.width = '10px'; // Size of the sparkles
      trail.style.height = '10px';
      trail.style.borderRadius = '50%';
      trail.style.pointerEvents = 'none';
      trail.style.opacity = '0.8';
      trail.style.zIndex = '9999';
      trail.style.transition = 'transform 0.5s ease-out, opacity 0.8s ease-out';
      trail.style.backgroundColor = colors[i % colors.length];
      document.body.appendChild(trail);
      trails.push(trail);
    }
  
    let current = 0;
  
    // Update sparkle position and animation
    window.addEventListener('mousemove', function (e) {
      const trail = trails[current];
      trail.style.left = (e.pageX - 5) + 'px'; // Offset for centered circle
      trail.style.top = (e.pageY - 5) + 'px'; // Offset for centered circle
      trail.style.opacity = '1';
      trail.style.transform = 'translateY(-10px) rotate(15deg)';
  
      setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'translateY(-30px) rotate(90deg)';
      }, 300); // Time before it fades out and floats upwards
  
      current = (current + 1) % sparkles;
    });
  });
  