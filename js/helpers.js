/* helpers.js */

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function wrapPreText(text, cols=80, wrapChar='\u21AA') {
    var tempText = text;
    var output = text.length < cols ? text : '';
    var index = 0;
    while (tempText.length > cols) {
        output += (index++ > 0 ? wrapChar : '') + tempText.substring(0, cols) + '\n';
        // look ahead
        if (tempText.substring(cols).length <= cols) {
            tempText = tempText.substring(cols);
            output += wrapChar + tempText;
        }
        tempText = tempText.substring(cols);
    }
    return output;
}

function showResult(elem, data) {
    $(elem).removeClass('hidden');
    $(elem).text(data);
}

function appendResult(elem, data) {
    $(elem).removeClass('hidden');
    var text = $(elem).text();
    $(elem).text(text + data);
}