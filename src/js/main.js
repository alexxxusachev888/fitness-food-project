const refs = {
  tabs: document.querySelectorAll('.tabcontent'),
  tabsHeaders: document.querySelectorAll('.tabheader__item'),
  tabsParent: document.querySelector('.tabcontainer'),
}

refs.tabsParent.addEventListener('click', (event) => {
  const target = event.target;

  if (target && target.classList.contains('tabheader__item')) {

    refs.tabs.forEach((tab, i) => {
      if (target == tab) {
        hideTabContent();
        showTabContent(i);
      }
    })
  }
})

function hideTabContent() {
  refs.tabs.forEach(tab => {
    tab.classList.add('hide');
    tab.classList.remove('show', 'fade');
  });

  refs.tabsHeaders.forEach(tab => {
    tab.classList.remove('tabheader__item_active');
  });
}

function showTabContent(item = 0) {
  refs.tabs[item].classList.add('show', 'fade');
  refs.tabs[item].classList.remove('hide');
  refs.tabsHeaders[item].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

/* window.addEventListener('DOMContentLoaded', function () {

  // Tabs

  let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {

    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function (event) {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}); */