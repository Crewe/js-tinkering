/* ependpoints.js */

// Some things on CORS
// https://docs.microsoft.com/en-us/aspnet/web-api/overview/security/enabling-cross-origin-requests-in-web-api

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getEpUsers() {
    $.ajax({
        type: 'GET',
        dataType: 'text',
        //crossDomain: true,
        contentType: 'application/json; charset=utf-8',
        //headers: { },
        url: '',
        success: function (response) { 
            var data = response.split(",");
            var text = "";
            for (var i = 0; i < data.length; i++) {
                var pair = data[i].split("/");
                text += "Guid: " + pair[0] + "\nUsername: " + pair[1] + "\n"
                if (i+1 < data.length) { text += "\n" }
            }
            $('#result-data').removeClass('hidden');
            $('#result-data').text(text);
        },
        error: function (response) { $('#result-data').text(response.statusCode) }
    })
}

function getMissedForms() {
    $.ajax({
        type: 'GET',
        crossDomain: true,
        //contentType: "applicaiton/json; charset=utf-8",
        url: '',
        success: function (response) {
            $('#result-data').removeClass('hidden');
            $('#result-data').text(response);
        },
        error: function (response) { $('#result-data').text(response.statusCode) },
    })
}

$(function getRemoteImage() {
    /*$.get({url: 'http://logonoid.com/images/thumbs/nederlandse-spoorwegen-logo.png', 
        success: function(data) { $('#from-local').attr('src', data); }
    });*/
    /*$.get({url: 'https://www.logolounge.com/wd/uploads/17388_236085.jpg',
        success: function(data) { $('#from-local').attr('src', data); },
        fail: function(data) { $('#from-local').attr('src', data); }
    });*/
    //$('#from-local').attr('src', 'http://logonoid.com/images/thumbs/nederlandse-spoorwegen-logo.png');
    //$('#from-local').show();
});