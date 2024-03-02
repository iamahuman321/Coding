document.addEventListener("DOMContentLoaded", function() {
    fetch('/Html/Extra/header.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
        });
});
