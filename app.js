'use strict';

var firstPic = document.getElementById('firstpic');
var middlePic = document.getElementById('middlepic');
var lastPic = document.getElementById('lastpic');
var results = document.getElementById('results');

var allPics = [];
var turnCount = 0;

function VotingPics(name, extension) {
  this.filepath = `img/${name}${extension}`;
  this.extension = extension;
  this.name = name;
  this.views = 0;
  this.clicks = 0;

  allPics.push(this);
}

new VotingPics('bag','.jpg');
new VotingPics('banana','.jpg');
new VotingPics('bathroom','.jpg');
new VotingPics('boots','.jpg');
new VotingPics('breakfast','.jpg');
new VotingPics('bubblegum','.jpg');
new VotingPics('chair','.jpg');
new VotingPics('cthulhu','.jpg');
new VotingPics('dog-duck','.jpg');
new VotingPics('dragon','.jpg');
new VotingPics('pen','.jpg');
new VotingPics('pet-sweep','.jpg');
new VotingPics('scissors','.jpg');
new VotingPics('shark','.jpg');
new VotingPics('sweep','.png');
new VotingPics('tauntaun','.jpg');
new VotingPics('unicorn','.jpg');
new VotingPics('usb','.gif');
new VotingPics('water-can','.jpg');
new VotingPics('wine-glass','.jpg');

function selectPics() {
  let currentPics = [];
  do {
    do {
      var random = Math.floor(Math.random() * allPics.length);
      var pic = allPics[random];
    } while (previousPics.includes(pic) || currentPics.includes(pic));
    currentPics.push(pic);
  } while (currentPics.length < 3);

  return currentPics;
}

var previousPics = [];
turn();

function turn() {
  var currentPics = selectPics();
  render(currentPics);

  for (var i = 0; i < 3; i++) {
    currentPics[i].views++;
  }

  previousPics = currentPics;

  turnCount++;
}

function render(currentPics) {
  firstPic.src = currentPics[0].filepath;
  firstPic.alt = currentPics[0].name;
  firstPic.title = currentPics[0].name;

  middlePic.src = currentPics[1].filepath;
  middlePic.alt = currentPics[1].name;
  middlePic.title = currentPics[1].name;

  lastPic.src = currentPics[2].filepath;
  lastPic.alt = currentPics[2].name;
  lastPic.title = currentPics[2].name;

  firstPic.addEventListener('click', handleClick);
  middlePic.addEventListener('click', handleClick);
  lastPic.addEventListener('click', handleClick);
}

function handleClick(event) {
  if (turnCount < 26) {
    clickCountAdd(event.target.title);
    turn();
  } else if (turnCount === 26) {
    createTable();
    turnCount++;
  } else {
    return;
  }
}

function clickCountAdd(title) {
  for (var i = 0; i < allPics.length; i++) {
    if (allPics[i].name === title) {
      allPics[i].clicks++;
      break;
    }
  }
}





function createTable() {
  var row = document.createElement('tr');
  var headerTitle = document.createElement('td');
  headerTitle.innerText = 'Pic Name';
  row.appendChild(headerTitle);

  var headerClicksSum = document.createElement('td');
  headerClicksSum.innerText = 'Clicks Total';
  row.appendChild(headerClicksSum);

  var headerViewsSum = document.createElement('td');
  headerViewsSum.innerText = 'Views Total';
  row.appendChild(headerViewsSum);

  var headerClickedPercent = document.createElement('td');
  headerClickedPercent.innerText = 'Clicked Percentage';
  row.appendChild(headerClickedPercent);

  results.appendChild(row);

  for (var i = 0; i < allPics.length; i++) {
    var imageRow = document.createElement('tr');
    var picName = document.createElement('td');
    picName.innerText = allPics[i].name;
    imageRow.appendChild(picName);

    var clicksSumTotal = document.createElement('td');
    clicksSumTotal.innerText = allPics[i].clicks;
    imageRow.appendChild(clicksSumTotal);

    var viewsSumTotal = document.createElement('td');
    viewsSumTotal.innerText = allPics[i].views;
    imageRow.appendChild(viewsSumTotal);

    var clickedPercentageTotal = document.createElement('td');
    clickedPercentageTotal.innerText = (Math.floor((allPics[i].clicks / allPics[i].views) * 100) + '%');
    imageRow.appendChild(clickedPercentageTotal);

    results.appendChild(imageRow);
  }
}
