


function toggleSidebar() {
  var sidebar = document.getElementById("div_menu");
  if (sidebar.style.width === "250px") {
    sidebar.style.width = "0";
  } else {
    sidebar.style.width = "250px";
  }
}

document.body.addEventListener('click', function() {
    
    
  const menu = document.querySelector('.div_menu');
      menu.classList.toggle('collapsed');
  });


//carrossel
const carousel = document.querySelector('.carroseu');
const cards = document.querySelectorAll('.carta');
const prevBtn = document.querySelector('.botao_volta');
const nextBtn = document.querySelector('.botao_vai');


let a = 0;

function updateCarousel() {
  carousel.style.transform = `translateX(${-a * 260}px)`;
}

nextBtn.addEventListener('click', () => {
  a = (a + 1) % cards.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  a = (a - 1 + cards.length) % cards.length;
  updateCarousel();
});


 
