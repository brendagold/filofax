// Hamburger function

function myFunction() {
  let x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// Log in and Sign Up
let x = document.getElementById('login');
let y = document.getElementById('signup');
let z = document.getElementById('btn');

function signup() {
  x.style.left = '-400px';
  y.style.left = '50px';
  z.style.left = '110px';
}

function login() {
  x.style.left = '50px';
  y.style.left = '450px';
  z.style.left = '0';
}

//Create Entry

function _(id) {
  return document.getElementById(id);
}

function getRs() {
  let title = _('title').value;
  let txt = _('text').value;
  const d = new Date();

  _(
    'rs'
  ).innerHTML += `<div class="card"><h3>${title}</h3><p>${txt}</p> <small> ${d.toLocaleTimeString()}, ${d.toDateString()} </small></div>`;

  _('title').value = '';
  _('text').value = '';
}

window.onload = function () {
  let x = document.getElementsByClassName('content-intro');
  // let y = document.getElementsByClassName('content-intro')[0].innerHTML;
  let i;
  let z;
  for (i = 0; i < x.length; i++) {
    z = x[i].innerHTML;

    const words = z.toString().slice(0, 50) + '......';
    // const truncated = words.toString().slice(0, 12);
    // let v = truncated.join('...');
    console.log(words);
    // console.log(truncated);

    x[i].innerHTML = words;
  }
  // console.log(y);
};
