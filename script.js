'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');

///////////////////////////////////////
/////////////////////////////////////////////////////////// Modal window//////////////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////tabbed component//////////////////////////////////////////////

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // remove Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// //////////////////////////////////////////////////////Menu fade///////////////////////////////////////////////

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');
    console.log(logo);
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// passing argument into handler
//when mouse is hovered
nav.addEventListener('mouseover', handleHover.bind(0.5));
// when mouse is un-hovered
nav.addEventListener('mouseover', handleHover.bind(1));

// ///////////////////////////////////////////////////////////sticky navigation//////////////////////////////////////
/*
const initialCoords = section1.getBoundingClientRect();

console.log(initialCoords);

window.addEventListener('scroll', function () {
  console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
//////////////observer Api
/*
// callback function (obsCallback) here will get called each time that the observed element, so our target element here, is intersecting the root element at the threshold that we defined, okay?

const obsCallBack = function (entries) {
  //entries are array of threshold entries

  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null, //element we want our target to intersect (in our case  is viewport)
  threshold: [0, 0.2], //Threshold, and this is basically the percentage of intersection at which the observer callback will be called, or we can say the percentage that we want to have visible in our root(viewport).
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);

observer.observe(section1); //section1 is target element
*/
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin: '-90px',
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////revealing elements on scroll////////
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (entries.isIntersecting) return;

  entry.target.classList.remove('section--hidden'); // shows the section

  // un-observes on section intersection
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  // observe the section if it intersects or not
  sectionObserver.observe(section);

  section.classList.add('section--hidden'); // hidding the section
});

/////////////////////////////////////////////////////// Button scrolling////////////////////////////////////////
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // x,y,top,bottom values in px of  section1
  console.log(s1coords);

  //  x,y,top,bottom values in px of targeted element
  console.log(e.target.getBoundingClientRect());

  // scroll in px from starting of page
  console.log('current scroll (X/Y)', scrollX, scrollY);

  // checking height /width of viewport
  console.log(
    'height / width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling :- for old browsers

  // position frm vh + scroll from pages/top

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // scrolling :- for mordern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

//building slider component

// /////////////////////////////////////////////page navigation

// page navigation without using event delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });
/////////////////////////////////////////////////////////////////////////////////
// for event delegation
// 1. Add event listener common parent element
// 2. Determine what element originated the event
//3. matching strategy
////////////////////////////////////////////////////////////////////////////////
// page navigation using event delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //3.matching strategy

  if (e.target.classList.contains('nav__link')) {
    // section linking id of the element that is clicked
    const id = e.target.getAttribute('href');
    // e.target gives us the element which is clicked
    // console.log(e.Target);
    // scrolls the window to section whose id we are getting in the  line 102
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////////////////////////////////
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

//////////////////////selecting elements ,creating elements, deleting elements using javascript//////////////////////

console.log(allSection);

document.getElementById('section--1');

// dom collection is  life collection
// meaning :- if dom changes then the html collection automatically updates
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// creating and inserting elements

const message = document.createElement('div');
message.classList.add('cookie-message');

// message.textContent = 'we use cookie for improved functionality and analytics.';

message.innerHTML =
  'we use cookie for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';

// make message as header ka first child
// header.prepend(message);

/// make message as header ka last child
// header.append(message);

///cloning message to use it somewhere else
// header.append(message.cloneNode(message));

///make message as sibling of header(1st sibling)
// header.before(message);

///make message as sibling of header(last sibling)
// header.after(message);
/*
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();

    message.parentElement.removeChild(message);
  });
*/
////////////////////////////////////////////////////////////////////////// styles//////////////////////////////////////////////////////

///adding styles

/*
message.style.backgroundColor = '#37383d';

// getting computed styles (css file's styles)
console.log(getComputedStyle(message).color);

// changing color of root variable in css file
document.documentElement.style.setProperty('--color-primary', 'orangered');

///changing logos alternate text
logo.alt = 'Beautiful minimalist logo';

// getAttribute gives us the attribute value
console.log(logo.getAttribute('src'));

// setAttribute sets the value of attribute
logo.setAttribute('company', 'Bankist');
*/

///////////////////////////////////////////////////////code of styles
///adding styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

// getting computed styles (css file's styles)
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// changing color of root variable in css file
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);

///changing logos alternate text
logo.alt = 'Beautiful minimalist logo';
// non standard

console.log(logo.design);
/// attribute does not exist so console shows ;- null
console.log(logo.getAttribute('designer'));

// setAttribute sets the value of attribute
logo.setAttribute('company', 'Bankist');

/// getting logos source destination
console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');

///getAttribute gives us the attribute value
console.log(link.href);
console.log(link.getAttribute('href'));

// data Attributes
console.log(logo.dataset.versionNumber);

// classes (method of classes)
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes

// don't use this  only allow to put one class and it will overwrite all other classes
logo.className = 'jonas';

// /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// scrolling feature/////////////////////////////////////

/*

  //  x,y,top,bottom values in px of targeted element
  console.log(e.target.getBoundingClientRect());

  
  // scroll in px from starting of page
  console.log('current scroll (X/Y)', scrollX, scrollY);

*/ /*

/////////////////////////////////////////////////code of scrolling feature
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // x,y,top,bottom values in px of  section1
  console.log(s1coords);

  //  x,y,top,bottom values in px of targeted element
  console.log(e.target.getBoundingClientRect());

  // scroll in px from starting of page
  console.log('current scroll (X/Y)', scrollX, scrollY);

  // checking height /width of viewport
  console.log(
    'height / width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling :- for old browsers

  // position frm vh + scroll from pages/top

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // scrolling :- for mordern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/
////////////////////////////////////////////////////////////////events in javascript
//  types of events and event handling
const h1 = document.querySelector('h1');

const alertH1 = function () {
  // alert('great your are reading heading');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1, 3000));

/// old way of adding events
// h1.onmouseover = function () {
//   alert('great your are reading heading');
// };

///////////////////////////////////////////////////Event propagation//////////////////////////////////

// event listeners work in 3 phase

// when we click on the element then click event is generated at top of the dom tree that is in the document
// 1.capturing phase:-when event move from document to child where handler is attached
// 2.target phase:-when event reaches targeted child
// 3.bubbling phase:-when event moves up again to the document

// all these  event handlers  gets triggers (fire) in bubbling phase

// stop propagation
// e.stopPropagation();

///3rd parameter is used to change capturing phase from false to true

// //////////////////////////////////////////////
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('nav-links', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('nav-link', e.target, e.currentTarget);
});

///3rd parameter is used to change capturing phase from false to true
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('nav', e.target, e.currentTarget);
  },
  false
);
*/
/////////////////////////////////////////DOM traversing
/*
// const h1 =document.querySelector('h1')

//  going downwards

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'blue';
h1.lastElementChild.style.color = 'orangered';

// going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// going sideways

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// going up and  selecting all siblings
console.log(h1.parentElement.children);
console.log([...h1.parentElement.children]);

// converting html collection to an array

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
