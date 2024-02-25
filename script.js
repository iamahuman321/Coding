var typed = new Typed('#element', {
    strings: ['Discover the wonders of nature', 'Explore diverse biomes', 'Protect our planet'],
    typeSpeed: 60,
});

const contactButtons = document.querySelectorAll('.contact-button');

contactButtons.forEach(button => {
    button.addEventListener('click', () => {
        const email = button.getAttribute('data-email');
        window.open(`mailto:${email}`, '_blank');
    });
});

// common.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
        });
});

