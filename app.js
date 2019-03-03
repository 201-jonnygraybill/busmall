'use strict';

var firstPic = document.getElementById('firstpic');
var middlePic = document.getElementById('middlepic');
var lastPic = document.getElementById('lastpic');
var allPics = [];

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


function showRandomPic() {
  var random = Math.floor(Math.random() * allPics.length);

  firstPic.src = allPics[random].filepath;
  firstPic.alt = allPics[random].name;
  firstPic.title = allPics[random].name;

  middlePic.src = allPics[random].filepath;
  middlePic.alt = allPics[random].name;
  middlePic.title = allPics[random].name;

  lastPic.src = allPics[random].filepath;
  lastPic.alt = allPics[random].name;
  lastPic.title = allPics[random].name;

}



showRandomPic();
