require("../css/main.css");
import AOS from 'aos';

AOS.init({
  once: true,
  duration: 800,
});

const inViewSections = new Set();
const offsetMap = new Map();
const targetMap = new Map();

function calculateOffsetsOfSections(sections, map) {
  const bodyTop = document.body.getBoundingClientRect().top;
  sections.forEach(function(section) {
    const sectionTop = section.getBoundingClientRect().top;
    const offset = sectionTop - bodyTop;
    map.set(section, offset);
  });
}

function mapTargetsOfSections(sections, map) {
  sections.forEach(function(section) {
    const target = section.querySelector('.scroll');
    if (target !== null) {
      map.set(section, target);
    }
  });
}

function observeSections(sections, observer) {
  sections.forEach(function(section) {
    observer.observe(section);
  });
}

function intersectionCallback(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting === true) {
      inViewSections.add(entry.target);
    } else {
      inViewSections.delete(entry.target);
    }
  });
}

const observer = new IntersectionObserver(intersectionCallback, {
  root: null,
  rootMargin: '0px',
  threshold: [0]
});

let sections = document.querySelectorAll('.section');
calculateOffsetsOfSections(sections, offsetMap);
mapTargetsOfSections(sections, targetMap);
observeSections(sections, observer);

window.addEventListener('resize', function(e) {
  calculateOffsetsOfSections(sections, offsetMap);
});

window.addEventListener('scroll', function(e) {
  inViewSections.forEach(function(section) {
    if (offsetMap.has(section) && targetMap.has(section)) {
      const target = targetMap.get(section);
      const offset = offsetMap.get(section);
      var rate = Math.round((window.pageYOffset - offset) * -0.2);
      target.style.transform = 'scale(1.6) translate3d(0px, ' + rate + 'px, -1000px)';
    }
  });
}, {passive: true});

document.addEventListener('click', event => {
  if (!event.target.matches('.plus-btn') && !event.target.parentElement.matches('.plus-btn')) return
  event.preventDefault();
  document.body.classList.toggle('menu-open');
});

// document.querySelectorAll('.plus-btn').forEach(tmpElement => {
//   // tmpElement.on
// })
// $('.plus-btn').click(function(){
//     $('body').toggleClass('menu-open');
// })


// // const observer = new IntersectionObserver(entries => {
// //     entries.forEach(entry => {
// //       const square = entry.target.querySelector('.animation');
// //       if (entry.isIntersecting) {
// //         square.classList.add('animation-animate');
// //         return;
// //       }
// //     });
// // });
// // observer.observe(document.querySelector('.animation-wrapper'));

// // $('.plus-btn').click(function(){
// //     $('body').toggleClass('menu-open');
// // })
