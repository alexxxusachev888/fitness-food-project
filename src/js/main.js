const refs = {
  tabs: document.querySelectorAll('.tabcontent'),
  tabsHeaders: document.querySelectorAll('.tabheader__item'),
  tabsParent: document.querySelector('.tabcontainer'),
}

refs.tabsParent.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('tabheader__item')) {

    refs.tabsHeaders.forEach((tab, i) => {
      if (target == tab) {
        hideTabContent();
        showTabContent(i);
      }
    })
  }
})

function hideTabContent() {
  refs.tabs.forEach(tab => {
    tab.classList.remove('show', 'fade');
    tab.classList.add('hide');
  });

  refs.tabsHeaders.forEach(tab => {
    tab.classList.remove('tabheader__item_active');
  });
}

function showTabContent(item = 0) {
  refs.tabs[item].classList.remove('hide');
  refs.tabs[item].classList.add('show', 'fade');
  refs.tabsHeaders[item].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

// Timer

const deadline = '2023-04-12';
const daysElem = document.querySelector('#days');
const hoursElem = document.querySelector('#hours');
const minutesElem = document.querySelector('#minutes');
const secondsElem = document.querySelector('#seconds');
const timerInterval = setInterval(updateClock, 1000);

function getTimeLeftover(endpoint) {
  let days, hours, minutes, seconds;
  const restOfTime = Date.parse(endpoint) - Date.parse(new Date());

  if (restOfTime <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

  } else {
    days = Math.floor(restOfTime / (1000 * 60 * 60 * 24));
    hours = Math.floor((restOfTime / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((restOfTime / (1000 * 60)) % 60);
    seconds = Math.floor((restOfTime / 1000) % 60);
  }
  return {
    'total': restOfTime,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds,
  }
}

function updateClock() {
  const {
    total,
    days,
    hours,
    minutes,
    seconds
  } = getTimeLeftover(deadline);

  daysElem.innerHTML = addLeadingZero(days);
  hoursElem.innerHTML = addLeadingZero(hours);
  minutesElem.innerHTML = addLeadingZero(minutes);
  secondsElem.innerHTML = addLeadingZero(seconds);

  if (total <= 0) {
    clearInterval(timerInterval);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

updateClock();

// Modal

const modalRefs = {
  openBtn: document.querySelectorAll('[data-modal-open]'),
  closeBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('.modal'),
}

const modalTimerId = setTimeout(onOpenModal, 6000);

modalRefs.openBtn.forEach(btn => btn.addEventListener('click', onOpenModal))
modalRefs.closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('scroll', onLastPxScroll);

function onOpenModal() {
  modalRefs.modal.classList.remove('hide');
  modalRefs.modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  clearTimeout(modalTimerId);

  document.addEventListener('keydown', onEscBtnPress);
  document.addEventListener('click', onEscBtnPress);
}

function onCloseModal() {
  modalRefs.modal.classList.add('hide');
  modalRefs.modal.classList.remove('show');
  document.body.style.overflow = '';

  document.removeEventListener('keydown', onEscBtnPress);
  document.removeEventListener('click', onEscBtnPress);
}

function onEscBtnPress(evt) {
  evt.preventDefault();

  if (evt.code === 'Escape' || evt.target.classList.contains('modal')) {
    onCloseModal();
  }
}

function onLastPxScroll(evt) {
  const pageScroll = window.pageYOffset;
  const userViewHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  if (pageScroll + userViewHeight >= scrollHeight - 1) {
    onOpenModal();
    window.removeEventListener('scroll', onLastPxScroll);
  }
}

//Classes for Cards

class MenuCardMarkup {
  constructor(src, alt, title, descr, price, parentNode) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.parent = document.querySelector(parentNode);
    this.currencyRate = 40;
    this.currencyChange();
  }
  showProp() {
    console.log(this.src);
  }

  currencyChange() {
    this.price = this.price * this.currencyRate;
  }

  renderMarkup() {
    const cardMarkup = document.createElement('div');
    cardMarkup.insertAdjacentHTML('beforeend', `
    <div class="menu__item">
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3> 
      <div class="menu__item-descr">${this.descr}</div> 
      <div class="menu__item-divider"></div> 
      <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"> <span>${this.price}</span>грн/день</div> 
      </div> 
    </div>
    `);
    this.parent.append(cardMarkup);
  }
}

const newMenuCardRender = new MenuCardMarkup(
  "img/tabs/vegy.7efb2180.jpg",
  "vegy",
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  9,
  '.menu .container'
);
newMenuCardRender.showProp();
newMenuCardRender.renderMarkup();