var fs = require('fs');
var d3 = require('d3');

fs.readFile('data/data_small.csv', 'utf8', function(error, data) {
  data = d3.csvParse(data);
  
  // String parsers
  function getGenderArticle(arg) {
    return arg === 'Varón' ? 'un' : 'una';
  }
  
  function getGender(arg) {
    return arg === 'Varón' ? 'hombre' : 'mujer';
  }
  
  // Get a random message from the array
  function getMessage(d) {
    var strings = [
      `Tengo ${d.EDAD.toLowerCase()} y soy ${getGenderArticle(d.SEXO)} ${getGender(d.SEXO)}`,
      `Soy ${getGenderArticle(d.SEXO)} ${getGender(d.SEXO)}, ${d.EDAD.toLowerCase()}`
    ];
    
    return strings[Math.floor(d3.randomUniform(0, strings.length)())];
  }
  
  // Return the tweet
  data.forEach(function(d) {
    d.string = getMessage(d);
  });
  
  // Store only the tweet
  var result = d3.csvFormatRows(data.map(function(d, i) {
    return [
      d.string
    ];
  }));
  
  fs.writeFile('tweet_list.txt', result, function(err) {
    console.log('File written 🚀');
  });
});
