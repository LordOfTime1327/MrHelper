"use strict";

// burger menu nav appear
let burger = document.getElementById("burger"),
  nav = document.getElementById("nav");
burger.addEventListener("click", function () {
  nav.style.top = "0";
});

let menuClose = document.getElementById("menuClose");
menuClose.addEventListener("click", function () {
  nav.style.top = "-100vh";
});

let menuItem = document.getElementsByClassName("menu__link");
for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener("click", function () {
    nav.style.top = "-100vh";
  });
}

// slider init
$(document).ready(function () {
  $(".slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: false,
  });
});

// changed cursor on slider and slider slide change
let slider = document.getElementById("slider");
slider.addEventListener("mousedown", () => {
  slider.style.cursor = "grabbing";
});
slider.addEventListener("mouseup", () => {
  slider.style.cursor = "grab";
});

// add paddingTop to each section
let header = document.getElementById("header"),
  container = document.getElementsByClassName("container");
for (let i = 1; i < container.length; i++) {
  container[i].style.paddingTop = header.clientHeight + "px";
}

// fullpage scroll init and settings
$(document).ready(function () {
  $("#fullpage").fullpage({
    anchors: ["home", "colors", "buttons", "forms", "cards"],
    menu: "#menu",
    touchSensitivity: 15,
    scrollOverflow: true,
    verticalCentered: false,
    scrollHorizontaly: true,
    continuousHorizontal: true,
    slidesNavigation: true,
    slidesNavPosition: "bottom",
  });

  // refresh colors
  $(".refresh-color")
    .click(function () {
      $(".color").each(function () {
        let randomColor = "#" + Math.random().toString(16).substr(2, 6);
        $(this).css("background-color", randomColor);
        $(this).children(".color__hex").text(randomColor);
      });
    })
    .trigger("click");

  // $("#container-colors").scroll(function () {
  //   console.log("ok");
  // });

  $(".color").click(function () {
    // copied-color
    $("#copied-color").fadeIn().delay(1000).fadeOut();

    // copy color hex
    let input = $("<input>"),
      color = $(this).children(".color__hex").text();
    $("body").append(input);
    input.val(color).select();
    document.execCommand("copy");
    input.remove();
    // let colors = document.getElementsByClassName("color");
    // let colorhex = document.getElementsByClassName("color__hex");
    // for (let i = 0; i < colors.length; i++) {
    //   colors[i].addEventListener("click", function() {
    //     let input = document.createElement("input");
    //     document.body.append(input);
    //     let color = colorhex[i].innerHTML;
    //     input.value = color;
    //     input.select();
    //     input.setSelectionRange(0, 99999);
    //     document.execCommand("copy");
    //     input.remove();
    //   });
    // }
  });
  // add one more color onresize window
  $(window)
    .resize(function () {
      let dopColor = $(".color");
      if (window.innerWidth > 550 && window.innerWidth < 768) {
        dopColor[dopColor.length - 1].style.display = "flex";
      } else if (window.innerWidth > 992 && window.innerWidth < 1440) {
        dopColor[dopColor.length - 1].style.display = "flex";
      } else {
        dopColor[dopColor.length - 1].style.display = "none";
      }
    })
    .trigger("resize");
});

let btnFour = document.getElementsByClassName("btnFour");
for (let i = 0; i < btnFour.length; i++) {
  btnFour[i].addEventListener("mouseover", function (e) {
    // let x = e.clientX - e.target.offsetLeft + 2540 + 208;
    let x = e.clientX - e.target.offsetLeft + window.innerWidth * 3;
    let y = e.clientY - e.target.offsetTop;
    let circle = document.createElement("span");
    circle.setAttribute("class", "btnFour__circle");
    circle.style.left = x + "px";
    circle.style.top = y + "px";
    this.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 1000);
  });
}
