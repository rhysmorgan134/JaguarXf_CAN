

buttonPress = function(name, event) {
    var k = name
    var col = rgb2hex(document.getElementById(k).style.backgroundColor)
    console.log(col)
    console.log(document.getElementById(name).style.backgroundColor)
    if(col === '#ff9933') {
        document.getElementById(k).style.backgroundColor =  '#161625'
    } else {
        document.getElementById(k).style.backgroundColor =  '#FF9933' 
    }
}

buttonRel = function(name, event) {
    console.log("released")
}

function rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
   }