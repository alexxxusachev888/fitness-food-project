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