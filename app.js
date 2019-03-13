'use strict';

// JSON.stringify();  this turns some variables into a string
// JSON.parse(); this turns the string back into the variable (whatever is was; object or array)
// localStorage.getItem(); this retrieves stuff from locaStorage
// localStorage.setItem(); stores stuff in local storage

var picChart;
var chartDrawn = false;

var allPics = []; //This empty array will store all the pictures
var turnCount = 0; //This is the count of how many turns the pictures will display


//Reference items from html document
var firstPic = document.getElementById('firstpic');
var middlePic = document.getElementById('middlepic');
var lastPic = document.getElementById('lastpic');
var results = document.getElementById('results');

//This is the constructor function that will pass in parameters of each picture
function VotingPics(name, extension) {
  this.filepath = `img/${name}${extension}`;
  this.extension = extension;
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  // this.percentage = 0 + '%';

  //This will push the pictures into the empty array
  allPics.push(this);
}

//All pictures created through the constructor function

new VotingPics('bag', '.jpg');
new VotingPics('banana', '.jpg');
new VotingPics('bathroom', '.jpg');
new VotingPics('boots', '.jpg');
new VotingPics('breakfast', '.jpg');
new VotingPics('bubblegum', '.jpg');
new VotingPics('chair', '.jpg');
new VotingPics('cthulhu', '.jpg');
new VotingPics('dog-duck', '.jpg');
new VotingPics('dragon', '.jpg');
new VotingPics('pen', '.jpg');
new VotingPics('pet-sweep', '.jpg');
new VotingPics('scissors', '.jpg');
new VotingPics('shark', '.jpg');
new VotingPics('sweep', '.png');
new VotingPics('tauntaun', '.jpg');
new VotingPics('unicorn', '.jpg');
new VotingPics('usb', '.gif');
new VotingPics('water-can', '.jpg');
new VotingPics('wine-glass', '.jpg');

//This will select which pictures to display
function selectPics() {
  let currentPics = []; //Used let because currentPics will change
  do {
    do {
      var random = Math.floor(Math.random() * allPics.length); //Variable to select random photo from allPics array
      var pic = allPics[random];
    } while (previousPics.includes(pic) || currentPics.includes(pic));
    currentPics.push(pic); //Used to push variable pic into currentPics
  } while (currentPics.length < 3); //Makes sure only three images are in circulation at a time

  return currentPics; //This whole chunk of code ensures that the current three images aren't the same as the last three images
}

var previousPics = []; //Stores the previous three pictures to check against what new three pictures will be
turn(); //Calls turn function

function turn() {
  var currentPics = selectPics();
  render(currentPics);

  for (var i = 0; i < 3; i++) {
    currentPics[i].views++;
  } //Loops through currentPics and adds +one to the views property of each
  previousPics = currentPics;
  turnCount++;
}

//Renders the pictures, and adds event listeners to each onclick
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

//Function to handle the onclick event from the pictures - ensures event can only happen 25 times before creating table function is called
function handleClick(event) {
  if (turnCount < 26) {
    clickCountAdd(event.target.title);
    turn();
  } else if (turnCount === 26) {
    drawChart();
    createTable();
    keepClicks();
    turnCount++;
  } else {
    return;
  }
}

//This adds a click to each picture
function clickCountAdd(title) {
  for (var i = 0; i < allPics.length; i++) {
    if (allPics[i].name === title) {
      allPics[i].clicks++;
      break;
    }
  }
  updateChartArrays();
}

var clicks = [];
var titles = [];
var views = [];
// var percentage = [];

function updateChartArrays() {
  for (var i = 0; i < allPics.length; i++) {
    titles[i] = allPics[i].name;
    clicks[i] = allPics[i].clicks;
    views[i] = allPics[i].views;
    // percentage[i] = (allPics[i].clicks / allPics[i].views);
  }
}

var data = {
  labels: titles,
  backgroundColor: 'slatelightblue',
  datasets: [
    {
      label: 'Votes',
      data: clicks,
      backgroundColor: [
        'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue']
    },

    // {
    //   data: views,
    //   label: 'Views',
    //   backgroundColor: [
    //     'lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue','lightslateblue']

    // },
    // {
    //   data: percentage,
    //   label: 'Percentage',
    //   backgroundColor: [
    //     'gray'
    //   ]
    // }
  ]
};

go();

function go() {
  grabClicks();
  if (allPics.length === 0) {
    turn();
  } else {
    turn();
    updateChartArrays();
  }
}

function keepClicks() {
  var clicksString = JSON.stringify(allPics);
  localStorage.setItem('allPics', clicksString);
}

function grabClicks() {
  var retrievedData = localStorage.getItem('allPics');
  if (retrievedData !== null) {
    allPics = JSON.parse(retrievedData);
  }
}

function drawChart() {
  var ctx = document.getElementById("myChart").getContext("2d");

  picChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
  });
  chartDrawn = true;
}

document.getElementById('draw-chart').addEventListener('click', function () {
  drawChart();
});


document.getElementById('images').addEventListener('click', function (event) {
  clickCountAdd(event.target.id);
  if (chartDrawn) {
    picChart.update();
  }
});

if (localStorage !== null) {
  window.addEventListener('load', drawChart());
}

//This creates and appends the table that defines the views, clicks, and percentages of each image
function createTable() {
  var row = document.createElement('tr');
  var headerTitle = document.createElement('td');
  headerTitle.innerText = 'Picture Name';
  row.appendChild(headerTitle);

  var headerClicksSum = document.createElement('td');
  headerClicksSum.innerText = 'Clicks - Total';
  row.appendChild(headerClicksSum);

  var headerViewsSum = document.createElement('td');
  headerViewsSum.innerText = 'Views - Total';
  row.appendChild(headerViewsSum);

  var headerClickedPercent = document.createElement('td');
  headerClickedPercent.innerText = 'Clicked Percentage';
  row.appendChild(headerClickedPercent);

  results.appendChild(row);

  //Loop through allPics length and create table rows and headings
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
