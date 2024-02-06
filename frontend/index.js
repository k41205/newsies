// VARS
const DOM = {
  showercase: document.querySelector('.myNewspapers'),
  form: document.querySelector('.newspaperForm'),
  formTitle: document.getElementById('title'),
  formImage: document.getElementById('image'),
  formLink: document.getElementById('link'),
  formAbstract: document.getElementById('abstract'),
  formAuthor: document.getElementById('author'),
  formDate: document.getElementById('date'),
  formLanguages: document.getElementById('languages'),
  search: document.querySelector('.search__collection'),
  searchInput: document.querySelector('.search__input'),
  searchButton: document.querySelector('.search__button--go'),
  add: document.querySelector('.search__button--add'),
  login: document.querySelector('.header__link.header__link--log'),
  labelTitle: document.querySelector('[for="title"]'),
  labelImage: document.querySelector('[for="image"]'),
  labelLink: document.querySelector('[for="link"]'),
  labelAbstract: document.querySelector('[for="abstract"]'),
  labelAuthor: document.querySelector('[for="author"]'),
  labelDate: document.querySelector('[for="date"]'),
  labelLanguages: document.querySelector('[for="languages"]'),
  edit: null,
};

const server = 'https://newsies-backend.onrender.com'; // change it to http://127.0.0.1:3000/ to use it with local server

// temp var used in event delegation to store newspaper id needed in 2 different events
let id;

// store local data
let newspaperArr;
let newspaperOnPageArr;

// restore local data from session
if (sessionStorage.db) newspaperArr ??= JSON.parse(sessionStorage.db);
if (sessionStorage.view) newspaperOnPageArr ??= JSON.parse(sessionStorage.view);
if (sessionStorage.login) DOM.login.classList.add('active');

// API FUNCTIONS
const getAllNewspapers = async (title) => {
  try {
    const res =
      title === ''
        ? await fetch(`${server}/api/v1/newspapers/`)
        : await fetch(`${server}/api/v1/newspapers/?title=${title}`);
    const resBody = await res.json();
    console.log('getAllNewspapers response is: ' + res.status); // debug
    if (title === '') {
      newspaperArr = resBody.data.newspapers; // newspaper array
      sessionStorage.setItem('db', JSON.stringify(newspaperArr));
      return newspaperArr;
    }
    return resBody.data.newspapers;
  } catch (err) {
    console.log(err);
  }
};

const getNewspaper = async (id) => {
  try {
    const res = await fetch(`${server}/api/v1/newspapers/${id}`);
    const resBody = await res.json();
    console.log('getNewspaper response is: ' + res.status);
    return [resBody.message]; // newspaper
  } catch (err) {
    console.log(err);
  }
};

const createNewspaper = async (dataObj) => {
  try {
    const res = await fetch(`${server}/api/v1/newspapers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObj),
    });
    const resBody = await res.json();
    newspaperArr.push(resBody.data.newspaper); // add newspaper in local
    sessionStorage.setItem('db', JSON.stringify(newspaperArr));
    console.log('createNewspaper response is: ' + res.status);
    return newspaperArr;
  } catch (err) {
    console.log(err);
  }
};
[].f;
const updateNewspaper = async (id, dataObj) => {
  try {
    const res = await fetch(`${server}/api/v1/newspapers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    });
    const resBody = await res.json();
    const indexArr = newspaperArr.findIndex((news) => news._id === resBody.data.newspaper._id);
    newspaperArr[indexArr] = resBody.data.newspaper; // update newspaper in local
    sessionStorage.setItem('db', JSON.stringify(newspaperArr));
    console.log('updateNewspaper response is: ' + res.status);
    return newspaperArr;
  } catch (err) {
    console.log(err);
  }
};

const deleteNewspaper = async (id) => {
  try {
    const res = await fetch(`${server}/api/v1/newspapers/${id}`, {
      method: 'DELETE',
    });
    console.log('deleteNewspaper response is: ' + res.status);
    const indexArr = newspaperArr.findIndex((news) => news._id === id);
    newspaperArr.splice(indexArr, 1); // delete newspaper in local
    sessionStorage.setItem('db', JSON.stringify(newspaperArr));
    return newspaperArr;
  } catch (err) {
    console.log(err);
  }
};

// INTERFACE FUNCTIONS
const updateInterface = (newsArr) => {
  newspaperOnPageArr = newsArr;
  sessionStorage.setItem('view', JSON.stringify(newspaperOnPageArr));
  let finalStr = '';
  newsArr.forEach((news) => {
    let tempStr = `<article class="newspaper" data-id="${news._id}">
    <div class="newspaper__header">
      <h2 class="newspaper__title" data-exp="true">${news.title}</h2>
      <button class="newspaper__edit newspaper__button"></button>
      <button class="newspaper__remove newspaper__button"></button>
    </div>
    <div class="newspaper__content">
      <div class="newspaper__img"><img class="newspaper__image" src="${news.image}" alt="cover" data-exp="true"></div>
      <div class="newspaper__text">
        <p class="newspaper__abstract" data-exp="true">${news.abstract}</p>
        <p class="newspaper__publisher">
          by <span class="newspaper__author" data-exp="true">${news.publisher.name}</span> on the
          <span class="newspaper__date" data-exp="true">${new Date(news.publisher.joined_date).toDateString()}</span>
        </p>
      </div>
    </div>
    <div class="newspaper__info">
      <a
        href="${news.link}"
        class="newspaper__link"
        target="_blank"
        data-exp="true">External link here</a
      >
      <p class="newspaper__language">
        available languages: <span class="newspaper__languages" data-exp="true">${news.languages.join(' ')}</span>
      </p>
    </div>
  </article>`;
    finalStr += tempStr;
  });
  DOM.showercase.innerHTML = finalStr;
};

const search = (input) => {
  if (input == '') {
    return [];
  }
  const regex = new RegExp(input, 'i');
  const newsTitleArr = newspaperArr.map((news) => news.title);
  return newsTitleArr.filter((term) => term.match(regex));
};

const saveData = () => {
  return {
    title: DOM.formTitle.value,
    image: DOM.formImage.value,
    link: DOM.formLink.value,
    abstract: DOM.formAbstract.value,
    publisher: {
      id: 1,
      name: DOM.formAuthor.value,
      joined_date: new Date(DOM.formDate.value).toISOString(),
    },
    languages: Array.from(DOM.formLanguages.selectedOptions).map((el) => el.value),
  };
};

const readData = (id) => {
  const article = document.querySelector(`[data-id="${id}"`);
  const articleProps = article.querySelectorAll('[data-exp]');
  const dataObj = {};
  for (const value of articleProps.values()) {
    if (value.hasAttribute('href')) {
      dataObj[value.classList[0].slice(11)] = value.getAttribute('href');
      continue;
    }
    if (value.hasAttribute('src')) {
      dataObj[value.classList[0].slice(11)] = value.getAttribute('src');
      continue;
    }
    if (value.classList.value.includes('newspaper__date')) {
      dataObj[value.classList[0].slice(11)] = new Date(value.innerText).toISOString().slice(0, 10);
      continue;
    }
    dataObj[value.classList[0].slice(11)] = value.innerText;
  }
  return dataObj;
};

const fillForm = (dataObj) => {
  DOM.formTitle.value = dataObj.title;
  DOM.formImage.value = dataObj.image;
  DOM.formLink.value = dataObj.link;
  DOM.formAbstract.value = dataObj.abstract;
  DOM.formAuthor.value = dataObj.author;
  DOM.formDate.value = dataObj.date;
  let valueArr = dataObj.languages.split(' ');
  let langArr = ['en', 'es', 'it', 'fr'];
  let indexArr = [];
  j = 0;
  for (j = 0; j < 4; j++) {
    for (i = 0; i < 4; i++) {
      if (valueArr[j] === langArr[i]) {
        indexArr.push(i);
        break;
      }
    }
  }
  indexArr.forEach((index) => (DOM.formLanguages.options[index].selected = true));
};

const clearForm = () => {
  DOM.formTitle.value = '';
  DOM.formImage.value = '';
  DOM.formLink.value = '';
  DOM.formAbstract.value = '';
  DOM.formAuthor.value = '';
  DOM.formDate.value = '';
  DOM.formLanguages.value = '';
};

const checkForm = () => {
  DOM.labelTitle.style = '';
  DOM.labelImage.style = '';
  DOM.labelLink.style = '';
  DOM.labelAbstract.style = '';
  DOM.labelAuthor.style = '';
  DOM.labelDate.style = '';
  DOM.labelLanguages.style = '';
  let valid = true;
  if (DOM.formTitle.value === '') {
    DOM.labelTitle.style.color = '#ac1010';
    valid = false;
  }
  if (DOM.formImage.value === '') {
    DOM.labelImage.style.color = '#ac1010';
    valid = false;
  }
  if (DOM.formLink.value === '') {
    DOM.labelLink.style.color = '#ac1010';
    valid = false;
  }
  if (DOM.formAbstract.value === '') {
    DOM.labelAbstract.style.color = '#ac1010';
    valid = false;
  }
  if (DOM.formAuthor.value === '') {
    DOM.labelAuthor.style.color = '#ac1010';
    valid = false;
  }
  if (DOM.formDate.value === '') {
    DOM.labelDate.style.color = '#ac1010';
    valid = false;
  }
  if (DOM.formLanguages.value === '') {
    DOM.labelLanguages.style.color = '#ac1010';
    valid = false;
  }
  return valid;
};

// INIT
if (sessionStorage.login) {
  DOM.login.classList.add('active');
  DOM.add.classList.add('active');
  if (newspaperOnPageArr) updateInterface(newspaperOnPageArr);
}

// EVENT DELEGATION
document.addEventListener('click', (e) => {
  // SIMULATE AUTH - LOGIN
  if (
    e.target.classList.value.includes('login') ||
    e.target.classList.value === 'header__link header__link--log' ||
    e.target.parentElement.classList.value === 'header__link header__link--log'
  ) {
    DOM.login.classList.add('active');
    DOM.add.classList.add('active');
    sessionStorage.setItem('login', 'true');
    getAllNewspapers('').then(updateInterface);
    return;
  }

  // SIMULATE AUTH - LOGOUT
  if (
    e.target.classList.value.includes('logout') ||
    e.target.classList.value === 'header__link header__link--log active' ||
    e.target.parentElement.classList.value.includes('active')
  ) {
    DOM.login.classList.remove('active');
    DOM.add.classList.remove('active');
    sessionStorage.clear();
    DOM.showercase.innerHTML = '';
    DOM.search.innerHTML = '';
    DOM.searchInput.value = '';
    newspaperArr = null;
    newspaperOnPageArr = null;
    return;
  }

  // OPEN FORM THROUGH ADD BUTTON
  if (e.target.classList.value.includes('search__button--add')) {
    DOM.form.classList.add('active');
    DOM.add.classList.add('active');
    return;
  }

  // OPEN FORM THROUGH EDIT
  if (e.target.classList.value.includes('newspaper__edit')) {
    DOM.edit = e.target;
    DOM.form.classList.add('active');
    DOM.edit.classList.add('active');
    id = e.target.parentElement.parentElement.getAttribute('data-id');
    const objData = readData(id);
    fillForm(objData);
    return;
  }

  // CLOSE FORM
  if (e.target.classList.value.includes('newspaperForm__discard')) {
    DOM.form.classList.remove('active');
    clearForm();
    return;
  }

  // CREATE NEWS
  if (e.target.classList.value.includes('newspaperForm__save') && DOM.add.classList.contains('active')) {
    if (!checkForm()) return;
    const objSaved = saveData();
    DOM.form.classList.remove('active');
    DOM.add.classList.remove('active');
    clearForm();
    createNewspaper(objSaved).then(updateInterface);
    return;
  }

  // UPDATE NEWS
  if (e.target.classList.value.includes('newspaperForm__save') && DOM.edit?.classList.contains('active')) {
    if (!checkForm()) return;
    const objData = saveData();
    DOM.form.classList.remove('active');
    DOM.edit.classList.remove('active');
    DOM.edit = null;
    clearForm();
    updateNewspaper(id, objData).then(updateInterface);
    id = null;
    return;
  }

  // DELETE NEWS
  if (e.target.classList.value.includes('newspaper__remove')) {
    const id = e.target.parentElement.parentElement.getAttribute('data-id');
    deleteNewspaper(id).then(updateInterface);
    return;
  }

  // SEARCH BAR - SEARCH ITEMS CLICKABLE
  if (e.target.classList.value.includes('search__item')) {
    const indexArr = newspaperArr.findIndex((news) => news.title === e.target.innerText);
    getNewspaper(newspaperArr[indexArr]._id).then(updateInterface);
    return;
  }

  // SEARCH BAR - CLICK ON SEARCH BUTTON
  if (sessionStorage.login) {
    if (e.target.classList.value.includes('search__button--go')) {
      if (DOM.searchInput.value === '') return;
      getAllNewspapers(DOM.searchInput.value).then(updateInterface);
    }
  }
});

// SEARCH BAR - SEARCH TYPED INPUT
DOM.searchInput.addEventListener('input', (e) => {
  if (sessionStorage.login) {
    DOM.search.innerHTML = '';
    const resultArr = search(DOM.searchInput.value);
    resultArr.forEach((result) =>
      DOM.search.insertAdjacentHTML('afterbegin', `<span class="search__item">${result}</span>`)
    );
    return;
  }
});
