$(document).on('ready', function () {
  $('.partners-slider').slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $('.quote-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    swipeToSlide: true,
    autoplaySpeed: 6000
  });

  $('.industries-slider').slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $('.reviews-slider').slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: '30px',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1
        },
      },
    ],
  });

  $('.difference-slider').slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $('select:not(.ignore)').niceSelect();
  FastClick.attach(document.body);

});


document.addEventListener("DOMContentLoaded", () => {
  const headerNav = document.querySelector("#header");
  let currentScrollPos = window.pageYOffset;

  window.onscroll = function () {
    currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 100) {
      headerNav.classList.add('header-fix');
    } else {
      headerNav.classList.remove('header-fix');
    }
  }


  const rangeInput = document.querySelectorAll(".range-input input");
  const priceInput = document.querySelectorAll(".price-input input");
  const range = document.querySelector(".price-range-slider .price-range-progress");
  let priceGap = 1000;

  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "price-input__input-min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });


});

