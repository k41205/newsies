/*
TODO

search item function

*/

// VARS
const DOM = {
  showercase: document.querySelector('.myNewspapers__showercase'),
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
  searchButton: document.querySelector('.search__button'),
  add: document.querySelector('.myNewspapers__button--add'),
  edit: null,
};

let newsTitleArr = [];

const getAllNewspapers = async (title) => {
  try {
    const req =
      title === ''
        ? await fetch('http://127.0.0.1:3000/api/v1/newspapers/')
        : await fetch(
            `http://127.0.0.1:3000/api/v1/newspapers/?title=${title}`
          );
    console.log(req);
    console.log(req.headers);
    const dataObj = await req.json();
    return dataObj.data.newspapers; // Newspapers Array
  } catch (err) {
    console.log(err);
  }
};

const getNewspaper = async (id) => {
  try {
    const req = await fetch(`http://127.0.0.1:3000/api/v1/newspapers/${id}`);
    const dataObj = await req.json();
    console.log(dataObj);
    return dataObj; // Newspaper
  } catch (err) {
    console.log(err);
  }
};

const createNewspaper = (dataObj) => {
  fetch('http://127.0.0.1:3000/api/v1/newspapers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataObj),
  })
    .then((response) => {
      console.log(req);
      console.log(req.headers);
      response.json();
    })
    .then((dataObj) => {
      console.log('Success:', dataObj);
    })
    .catch((err) => {
      console.error('Error:', err);
    });
};

const updateNewspaper = (id, dataObj) => {
  fetch(`http://127.0.0.1:3000/api/v1/newspapers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataObj),
  })
    .then((response) => console.log(response.status))
    .catch((err) => console.log(err));
  console.log('updated');
};

const deleteNewspaper = (id) =>
  fetch(`http://127.0.0.1:3000/api/v1/newspapers/${id}`, {
    method: 'DELETE',
  })
    .then((response) => console.log(response.status))
    .catch((err) => console.log(err));

const updateSearch = (newspaperArr) =>
  (newsTitleArr = newspaperArr.map((news) => news.title));

const updateInterface = (newspaperArr) => {
  //   const newspaperArr = await getAllNewspapers('');

  // Update search

  let finalStr = '';
  newspaperArr.forEach((news) => {
    let tempStr = `<article class="newspaper" data-id="${news._id}">
    <div class="newspaper__header">
      <h2 class="newspaper__title" data-exp="true">${news.title}</h2>
      <button class="newspaper__edit newspaper__button"></button>
      <button class="newspaper__remove newspaper__button"></button>
    </div>
    <div class="newspaper__content">
      <div class="newspaper__img"><img class="newspaper__image" src="${
        news.image
      }" alt="cover" data-exp="true"></div>
      <div class="newspaper__text">
        <p class="newspaper__abstract" data-exp="true">${news.abstract}</p>
        <p class="newspaper__publisher">
          by <span class="newspaper__author" data-exp="true">${
            news.publisher.name
          }</span> on the
          <span class="newspaper__date" data-exp="true">${new Date(
            news.publisher.joined_date
          ).toDateString()}</span>
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
        available languages: <span class="newspaper__languages" data-exp="true">${news.languages.join(
          ' '
        )}</span>
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
    languages: Array.from(DOM.formLanguages.selectedOptions).map(
      (el) => el.value
    ),
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
      dataObj[value.classList[0].slice(11)] = new Date(value.innerText);
      continue;
    }
    dataObj[value.classList[0].slice(11)] = value.innerText;
  }
  console.log(dataObj);
  return dataObj;
};

const fillForm = (dataObj) => {
  DOM.formTitle.value = dataObj.title;
  DOM.formImage.value = dataObj.image;
  DOM.formLink.value = dataObj.link;
  DOM.formAbstract.value = dataObj.abstract;
  DOM.formAuthor.value = dataObj.author;
  DOM.formDate.value = dataObj.date;
  DOM.formLanguages.value = dataObj.languages;
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
  if (DOM.formTitle.value === '') {
    console.log('Title required');
    return false;
  }

  if (DOM.formImage.value === '') {
    console.log('Image required');
    return false;
  }
  if (DOM.formLink.value === '') {
    console.log('Link required');
    return false;
  }
  if (DOM.formAbstract.value === '') {
    console.log('Abstract required');
    return false;
  }
  if (DOM.formAuthor.value === '') {
    console.log('Author required');
    return false;
  }
  if (DOM.formDate.value === '') {
    console.log('Date required');
    return false;
  }
  if (DOM.formLanguages.value === '') {
    console.log('At least a language required');
    return false;
  }
  console.log('check ok');
  return true;
};

// INIT
getAllNewspapers('').then((newspaperArr) => updateSearch(newspaperArr));
let id;
document.addEventListener('click', (e) => {
  // DEBUG PURPOSE
  //   console.log(e.target);

  // SIMULATE AUTH
  if (
    e.target.classList.value.includes('header__link--log') ||
    e.target.classList.value.includes('header__icon')
  )
    getAllNewspapers('').then((newspaperArr) => updateInterface(newspaperArr));

  // OPEN FORM THROUGH ADD BUTTON
  if (e.target.classList.value.includes('myNewspapers__button--add')) {
    DOM.form.classList.add('active');
    DOM.add.classList.add('active');
  }

  // CREATE NEWS
  if (
    e.target.classList.value.includes('newspaperForm__save') &&
    DOM.add.classList.contains('active')
  ) {
    if (!checkForm()) return;
    DOM.form.classList.remove('active');
    DOM.add.classList.remove('active');
    const objSaved = saveData();
    createNewspaper(objSaved);
    clearForm();
    console.log('Newspaper posted, loading in 0.5sec');
    setTimeout(updateInterface, 500);
  }

  // OPEN FORM THROUGH EDIT
  if (e.target.classList.value.includes('newspaper__edit')) {
    DOM.edit = e.target;
    DOM.form.classList.add('active');
    DOM.edit.classList.add('active');
    id = e.target.parentElement.parentElement.getAttribute('data-id');
    console.log(id);

    const objData = readData(id);
    fillForm(objData);
  }

  // UPDATE NEWS
  if (
    e.target.classList.value.includes('newspaperForm__save') &&
    DOM.edit?.classList.contains('active')
  ) {
    if (!checkForm()) return;
    DOM.form.classList.remove('active');
    DOM.edit.classList.remove('active');
    DOM.edit = null;
    const objData = saveData();
    updateNewspaper(id, objData);
    clearForm();
    setTimeout(updateInterface, 500);
    id = null;
  }

  // CLOSE FORM
  if (e.target.classList.value.includes('newspaperForm__discard')) {
    DOM.form.classList.remove('active');
  }

  // REMOVE NEWS
  if (e.target.classList.value.includes('newspaper__remove')) {
    const id = e.target.parentElement.parentElement.getAttribute('data-id');
    deleteNewspaper(id);
    setTimeout(updateInterface, 500);
  }

  // CLICK ON SEARCH ITEMS
  if (e.target.classList.value.includes('search__item')) {
    console.log(e.target.innerText);
    getAllNewspapers(e.target.innerText).then((newspaperArr) =>
      updateInterface(newspaperArr)
    );
  }

  // CLICK ON SEARCH BUTTON
  if (e.target.classList.value.includes('search__button')) {
    getAllNewspapers(DOM.searchInput.value).then((newspaperArr) =>
      updateInterface(newspaperArr)
    );
  }
});

// SEARCH
DOM.searchInput.addEventListener('input', (e) => {
  console.log(e);

  DOM.search.innerHTML = '';
  const resultArr = search(DOM.searchInput.value);
  resultArr.forEach((result) =>
    DOM.search.insertAdjacentHTML(
      'afterbegin',
      `<span class="search__item">${result}</span>`
    )
  );
});
