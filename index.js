var fs = require('fs');
var d3 = require('d3');

fs.readFile('data/data.csv', 'utf8', function(error, data) {
  data = d3.csvParse(data);
  
  // String parsers  
  function getGender(d) {
    return d === 'Varón' ? 'un hombre' : 'una mujer';
  }
  
  // FIXME: Calculate time frames from months
  function monthYear(d) {
    if (d === 1) {
      return `${d} mes`;
    } else {
      return `${d} meses`;
    }
  }
  
  function getTimeSearching(d) {
    return d !== 'NA' ? `Llevo ${monthYear(d)} buscando trabajo` : 'No busco trabajo';
  }
  
  function getNationality(d) {
    return d.NAC !== 'Española' ? ` de ${d.EXREGNA}` : '';
  }
  
  function getStudies(d) {
    if (d !== 'NA') {
      switch (d) {
        case 'Analfabetos':
          return 'No sé leer';
          break;
        case 'Educación primaria incompleta':
          return 'No acabé primaria';
          break;
        case 'Educación primaria':
          return 'Tengo la primaria';
          break;
        case 'Primera etapa de educación secundaria':
          return 'Acabé la ESO';
          break;
        case 'Segunda etapa de educación secundaria, orientación general':
          return 'Acabé el bachiller';
          break;
        case 'Segunda etapa de educación secundaria, orientación profesional':
          return 'Estudié un módulo';
          break;
        case 'Educación superior':
          return 'Acabé la universidad';
          break;
      }
    } else {
      return '';
    }
  }
  
  // Get a random message from the array
  function getMessage(d) {
    var strings = [
      `Tengo ${d.EDAD.toLowerCase()} y soy ${getGender(d.SEXO)}${getNationality(d)}. ${getTimeSearching(d.DTANT)}. ${getStudies(d.NFORMA)}`,
      `Soy ${getGender(d.SEXO)}${getNationality(d)}, y tengo ${d.EDAD.toLowerCase()}. ${getTimeSearching(d.DTANT)}`,
      `${getTimeSearching(d.DTANT)}. Soy ${getGender(d.SEXO)}${getNationality(d)} ${d.EDAD.toLowerCase()}`
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
