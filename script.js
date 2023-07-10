const navPanel = document.querySelector('.nav-div');
const overlay = document.querySelector('.overlay');

const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

const expandItem = document.getElementsByClassName('expandable');
const subList = document.getElementsByClassName('sub-list');
const arrow = document.getElementsByClassName('arrow');

menuIcon.addEventListener('click', () => { 
    navPanel.style.width = '200px';
    menuIcon.style.display = 'none';
    overlay.classList.toggle('active');
});

closeIcon.addEventListener('click', () => { 
    navPanel.style.width = '0px';
    menuIcon.style.display = '';
    overlay.classList.toggle('active');
});

for (let i = 0; i < expandItem.length; i++) {
    expandItem[i].addEventListener('click', () => {
        const currentSubList = expandItem[i].nextElementSibling;

        // Deactivate any active sublists
        for (let j = 0; j < subList.length; j++) {
            if (subList[j].classList.contains('active') && subList[j] !== currentSubList) {
                subList[j].classList.remove('active');
                arrow[j].setAttribute('src', 'images/icon-arrow-down.svg');
            }
        }

        if (currentSubList.classList.contains('active')) {
            arrow[i].setAttribute('src', 'images/icon-arrow-down.svg');
        } else {
            arrow[i].setAttribute('src', 'images/icon-arrow-up.svg');
        }

        currentSubList.classList.toggle('active');

        if (window.innerWidth > 800) {
            overlay.classList.toggle('active');
        }
    });
}

// Close sublist when clicking outside
if (window.innerWidth > 800) {
    window.addEventListener('click', (event) => {
        const targetElement = event.target;
        let isSublistClicked = false;
    
        for (let i = 0; i < subList.length; i++) {
            if (subList[i].contains(targetElement)) {
                isSublistClicked = true;
                break;
            }
        }
    
        if (!isSublistClicked && !targetElement.classList.contains('expandable')) {
            for (let i = 0; i < subList.length; i++) {
                subList[i].classList.remove('active');
                arrow[i].setAttribute('src', 'images/icon-arrow-down.svg');
                overlay.classList.remove('active');
            }
        }
    });
}


const imgElement = document.querySelector('.hero-img');

function updateImageSource() {
    if (window.innerWidth < 800) {
        imgElement.setAttribute('src', 'images/image-hero-mobile.png');
    } else {
        imgElement.setAttribute('src', 'images/image-hero-desktop.png');
    }
}

updateImageSource();

window.addEventListener('resize', updateImageSource);
