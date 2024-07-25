let bounceAnnimId;
let timeoutId;

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('nav li');
    const cartesDiv = document.getElementById("container-cartes");
    let activeNavItem;
    activeNavItem = navItems[0];
    activeNavItem.classList.add('active');
    let firstAItem = navItems[0].getElementsByTagName('a')[0];


    fetch("index-" + firstAItem.getAttribute('peintre') + ".html")
        .then(response => response.text())
        .then(data => {
            cartesDiv.innerHTML = data;
            mouvement();
        });
        navItems.forEach(item => {
            const aItem = item.getElementsByTagName("a")[0];
            aItem.addEventListener("click", (e) => {
            if(activeNavItem != undefined) {
            activeNavItem.classList.remove("active")
            }
            activeNavItem = item;
            activeNavItem.classList.add('active');
            e.preventDefault();
            fetch("index-" + aItem.getAttribute('peintre') + ".html")
            .then(response => response.text())
            .then(data => {
            cartesDiv.innerHTML = data;
            mouvement();
            });
        });
    });
});


function mouvement(){
    clearTimeout(timeoutId);
    cancelAnimationFrame(bounceAnnimId);
    const cartes = document.getElementById('container-cartes');
    let position = -250;
    let velocity = 2;
    const gravity = 0.1;
    const bounceFactor = 0.3;


    function animate() {
        position += velocity;
        velocity += gravity;

        if (position >= 0) {
            position = 0;
            velocity *= -bounceFactor;
        }

        cartes.style.top = position + 'px';
        bounceAnnimId = requestAnimationFrame(animate);
        timeoutId = setTimeout(() => {
            cancelAnimationFrame(bounceAnnimId);
            cartes.style.top = '0px';
        }, 1000);
    }

    animate();
}

