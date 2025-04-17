let navbar = document.querySelector('.navbar');
document.querySelector('#menu-bar').onclick=() =>{
    navbar.classList.toggle('active');
}

let search = document.querySelector('.search');
document.querySelector('#search').onclick=() =>{
    search.classList.toggle('active');
}

var swiper = new Swiper(".product-row", {
    spaceBetween: 30,
    loop:true,
    centeredSlides:true,
    autoplay:{
        delay:9500,
        disableOnInteraction:false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
var swiper = new Swiper(".blogs-row", {
    spaceBetween: 30,
    loop:true,
    centeredSlides:true,
    autoplay:{
        delay:9500,
        disableOnInteraction:false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation:{
        nextE1 :".swiper-button-next",
        prevE1 :".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
  });

  var swiper = new Swiper(".review-row", {
    spaceBetween: 30,
    loop:true,
    centeredSlides:true,
    autoplay:{
        delay:9500,
        disableOnInteraction:false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  
  document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const priceValue = document.getElementById('priceRange').value;
    const flavourValue = document.getElementById('flavour').value;
    const sizeValue = document.getElementById('size').value;

    const cakes = document.querySelectorAll('.cake-item');

    cakes.forEach(cake => {
      const price = parseInt(cake.getAttribute('data-price'));
      const flavour = cake.getAttribute('data-flavour');
      const size = cake.getAttribute('data-size');

      let show = true;

      if (priceValue !== 'all') {
        const [min, max] = priceValue.split('-').map(Number);
        if (price < min || price > max) show = false;
      }

      if (flavourValue !== 'all' && flavour !== flavourValue) {
        show = false;
      }

      if (sizeValue !== 'all' && size !== sizeValue) {
        show = false;
      }

      cake.style.display = show ? 'block' : 'none';
    });
  });

