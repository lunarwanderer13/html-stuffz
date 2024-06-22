let images = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7'];
let index = 11;

images.forEach(id => {
    let element = document.getElementById(id);

    element.style.transition = 'transform 0.5s ease-in-out, filter 0.5s ease-in-out';

    element.addEventListener('mouseover', () => {
        element.style.zIndex = index;
        index++;
        element.style.filter = 'drop-shadow(0 0 1rem black)';
        element.style.transform = 'scale(1.13)';
    });

    element.addEventListener('mouseout', () => {
        element.style.filter = 'none';
        element.style.transform = 'scale(1)';
    });
});