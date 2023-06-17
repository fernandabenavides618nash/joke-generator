// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

const joke = [];

const jokeEndpoint = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

const renderToDom = (divID, htmlToRender) => {
  const selectedDiv = document.querySelector(divID);
  selectedDiv.innerHTML = htmlToRender;
};

const htmlStructure = () => {
  const domString = '<h1>Joke generator</h1> <div id="jokeContainer"></div> <div id="btnContainer"></div>';
  renderToDom('#app', domString);
};

const renderJokeBtn = () => {
  const domString = '<button type="button" id="getJoke" class="btn btn-primary">Get A Joke</button>';
  renderToDom('#btnContainer', domString);
};

const renderPunchBtn = () => {
  const domString = '<button type="button" id="getPunchLine" class="btn btn-primary">Get Punchline</button>';
  renderToDom('#btnContainer', domString);
};

const renderNewBtn = () => {
  const domString = '<button type="button" id="newJoke" class="btn btn-primary">Want Another</button>';
  renderToDom('#btnContainer', domString);
};

const renderJoke = (obj) => {
  joke.push(obj);
  let domString = '';
  if (obj.setup) {
    domString += `<h2>${obj.setup}</h2>`;
    renderToDom('#jokeContainer', domString);
    renderPunchBtn();
  } else {
    domString += `<h2>${obj.joke}</h2>`;
    renderToDom('#jokeContainer', domString);
    joke.length = 0;
    renderNewBtn();
  }
};

const renderPunch = () => {
  let domString = '';
  domString += `<h2>${joke[0].setup}</h2><h2>${joke[0].delivery}</h2>`;
  renderToDom('#jokeContainer', domString);
  renderNewBtn();
  joke.length = 0;
};

const getRequest = () => new Promise((resolve, reject) => {
  fetch(jokeEndpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const startApp = () => {
  htmlStructure();
  renderJokeBtn();
};

startApp();

document.querySelector('#btnContainer').addEventListener('click', (e) => {
  e.preventDefault();
  switch (e.target.id) {
    case 'getJoke':
      getRequest().then((value) => renderJoke(value));
      break;
    case 'getPunchLine':
      renderPunch();
      break;
    case 'newJoke':
      getRequest().then((value) => renderJoke(value));
      break;
    default:
      break;
  }
});
