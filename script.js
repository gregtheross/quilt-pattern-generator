var indexes = [
    1,1,1,1,1,1,1,1,1,1,1,
    2,2,2,2,2,2,2,2,2,2,2,
    3,3,3,3,3,3,3,3,3,3,3,
    4,4,4,4,4,4,4,4,4,4,4,
    5,5,5,5,5,5,5,5,5,5,5,
    6,6,6,6,6,6,6,6,6,6,6,
    7,7,7,7,7,7,7,7,7,7,7,
    8,8,8,8,8,8,8,8,8,8,8,
    9,9,9,9,9,9,9,9,9,9,9,
];

var columns = 11;
var rows = 8;


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

$(function() {

    var shuffledTriangles = shuffle(indexes);

    var isUp = true;
    var html = "";
    var shuffleIndex = 0;
    for (var i = 0; i < rows; i++)
    {

        html += "<div class='row'>";
        for (var j = 0; j < columns; j++)
        {
            if (isUp){
                html+= "<div class='triangle up color-"+ shuffledTriangles[shuffleIndex] +"'>";
            } else {
                html+= "<div class='triangle down color-"+ shuffledTriangles[shuffleIndex] + "'>";
            }

            html += "</div>";
            isUp = !isUp;
            shuffleIndex++;
        }

        html += "</div>";
    }

    //console.log(html);
    
    $("#quilt").append(html);
});