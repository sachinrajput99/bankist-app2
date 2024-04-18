///this script has nothing to do with project
// const header = document.querySelector('.header');
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content'); //nodelist of element ,it is an iterable so we can loop over them
// const nav = document.querySelector('.nav');
// const section1 = document.querySelector('#section--1');
// const allSection = document.querySelectorAll('.section');
/*
tabsContainer.addEventListener('click', function (e) {
  //e=event
  //e.target=current element
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // remove Active tab
  // setting display to none
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // setting display to grid
  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`) //clicked.dataset.tab= data store in ui (btn ->data attribute)
    .classList.add('operations__content--active');
});

/////////////menu fade

//we are not using closest method here as we don not have sibling to anchor which could be clicked accidentally
const handleHover = function (e) {
  // element on which event happened
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    console.log(link);
    // aal the sibling element
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');
    console.log(logo);
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//mouseover  event do not bubble
// check mdn for reference
// passing argument into handler

// we can only pass 1 argument (e) to handler function but
// if we want to pass multiple values the we can pass an object and from that we can access other values
//when mouse is hovered
nav.addEventListener('mouseover', handleHover.bind(0.4));
// when mouse is un-hovered
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////scroll event
/*
const initialCoords = section1.getBoundingClientRect();

// console.log(initialCoords);

window.addEventListener('scroll', function () {
  // console.log(window.scrollY);
  // console.log('page offset', window.pageYOffset);
  // console.log('initail', initialCoords.top);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
// ////////
// const obsCallBack = function (entries) {
//   //entries are array of threshold entries

//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, //element we want our target element to intersect with (in this case  is viewport)
//   threshold: [0.1], //Threshold, and this is basically the percentage of intersection at which the observer callback will be called, or we can say the percentage that we want to have visible in our root(viewport).
// };
// // threshold :0==>callback is called as soon as the target element moves out of the view or as soon as enters the view
// // threshold :0==>callback is called when target element is 100% visible in the view

// const observer = new IntersectionObserver(obsCallBack, obsOptions);

// observer.observe(section1); //section1 is target element
/*
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entries);
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //no. of pixel applied before the target element
  // rootMargin: '-90px',
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
*/
///////reveal on scroll
/*

const revealSection = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  // console.log(entry.target);
  entry.target.classList.remove('section--hidden');
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});
////////////////////////lazy loading///////
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(image => {
  imageObserver.observe(image);
});
//////////////////building slider component

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  let maxSlide = slides.length;
  // slider.style.transform = `scale(0.4) translateX(-800px)`;
  // slider.style.overflow = `visible`;

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  // 0%,100%,200%,300%,400%

  //function
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
      // console.log(dotContainer);
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  //Next slide

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    // curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();
  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  ////

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
*/
