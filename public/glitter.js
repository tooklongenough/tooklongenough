document.addEventListener('DOMContentLoaded', function () {
    let colors;
    const sparkles = 50; // Number of sparkles
    const trails = [];

    // Function to set colors based on the current theme
    const setGlitterColors = () => {
        const theme = document.body.classList[0]; // Check the current theme class

        if (theme === 'theme-neon') {
            colors = ['#ff00ff', '#00ffff', '#ffff00', '#39ff14']; // Neon pink, cyan, yellow, neon green
        } else if (theme === 'theme-vapourwave') {
            colors = ['#ffafcc', '#cdb4db', '#a2d2ff', '#5c5c8a']; // Pastel pinks, lavender, and soft blue
        } else if (theme === 'theme-electric') {
            colors = ['#1e90ff', '#32cd32', '#00ff7f', '#ffff00']; // Electric blue, neon green, yellow
        } else if (theme === 'theme-classical') {
            colors = ['#ffdf00', '#b38d3f', '#ff5c8d', '#7f7f00']; // Gold, brown, red, dark green
        } else {
            colors = ['#ff00ff', '#00ffff', '#ffff00', '#39ff14']; // Default to neon colors if theme is not set
        }

         // Update the existing trails with the new colors
        trails.forEach((trail, index) => {
            trail.style.backgroundColor = colors[index % colors.length];
        });
    };

    setGlitterColors(); // Set the initial colors when page loads

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

    // MutationObserver to watch for theme changes
    const observer = new MutationObserver(() => {
        setGlitterColors(); // Refresh glitter colors when theme changes dynamically
    });

    // Observe changes to the classList of the <body> tag
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  });
  