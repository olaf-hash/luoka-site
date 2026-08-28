const card = document.querySelector('.card');

if (card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (-y / 10).toFixed(2);
        const rotateY = (x / 10).toFixed(2);
        
        // Dynamic shadow offset pointing away from the tilt
        const shadowX = -x / 15;
        const shadowY = -y / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `${shadowX}px ${shadowY + 20}px 40px rgba(0, 0, 0, 0.5), 0 0 35px rgba(157, 78, 221, 0.3)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(157, 78, 221, 0.15)';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    });
}
const introScreen = document.getElementById('introScreen');
const bgAudio = document.getElementById('bgAudio');
const npPlayBtn = document.getElementById('npPlayBtn');

// Pag-click sa intro screen, mawawala ito at tutugtog ang kanta
introScreen.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
    }, 500);

    bgAudio.play().then(() => {
        npPlayBtn.textContent = '⏸';
    }).catch(error => {
        console.log("Audio autoplay blocked:", error);
    });
});

// Manual play/pause button toggle sa music widget
npPlayBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
        bgAudio.play();
        npPlayBtn.textContent = '⏸';
    } else {
        bgAudio.pause();
        npPlayBtn.textContent = '▶';
    }
});