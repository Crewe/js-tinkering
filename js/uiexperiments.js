/* uiexperiments.js */
// Pulses the colour of an element whilst it is visible.
var loadingColours = {'colour1':'#00AB22', 'colour2':'#00EF77'};

function pulseBar(element, 
                  colour1 = loadingColours['colour1'], 
                  colour2 = loadingColours['colour2']) {
    if($(element).is(':visible')) {
        $(element).animate({ backgroundColor: colour1 },
            {
                duration: 500,
                complete: function() { pulseBar(element, colour2, colour1) }
         });
    }
};

function poof(element){
    $(element).hide();
}

function localStorageSupport() {
    // LocalStorage is supported!
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    }
    catch (e)
    {
        // It's supported but you don't have access to it.
        alert("Sorry, your browser doesn't support this feature.");
        return false;
    }
};

//$(function() {}); === $(document).ready(function(){});
$(document).ready(function() {
    $("#click-it").click(function() {
        if ($('#loading-bar').is(':visible')) {
            //$('#loading-bar').hide('slow'); // Standard hide
            $('#loading-bar').animate({height: '-1px'}, 'slow')
                .promise().done(poof('#loading-bar')); // Roll-up hide
        } else {
            // Reset the element to its original state (loaded CSS).
            $('#loading-bar').attr('style','');
            // Sometimes the animation isn't fully complete for the callback to work
            // so here it promises that it is. Otherwise the pulsing will never start.
            $('#loading-bar').show('fast').promise().done(pulseBar('#loading-bar'));
        }
        appendResult('#result-data', 
            'Is loading bar now being shown?... ' + $('#loading-bar').is(':visible') + '.\n');
    });
});

$(function() {
    // Hide the preview pane and remove anything that may be in local storage
    // that we use.
    $('#preview-div').hide();

/* Start: Accessibility font size changer */
    // Using Closure with private function, also know as the Module Pattern.
    // Here fontChanger is the 'Module'.
    var fontChanger = (function() {
        var _currentSize = parseInt($('body').css('font-size').replace('px','').replace('em',''));
        var _increment = 3;
        function changeFontSize(sizeDelta) {
            currentSize = _currentSize;
            if (!currentSize) { currentSize = 14; }
            var newSize = currentSize + sizeDelta;

            if (newSize < 14) { newSize = 14; }
            if (newSize >= 26) { newSize = 26; }
        
            $('body').attr('style','font-size:'+ newSize + 'px;');
            _currentSize = newSize;
        }
        
        return {
            bigger: function() { changeFontSize(3); },
            smaller: function() { changeFontSize(-3); },
            value: function() { return _currentSize; },
            stepSize: function() { return _increment; }
        }
    })();

    $('#increase-font').click(function() {
        fontChanger.bigger();
        appendResult('#result-data', 'Font size is now: ' + fontChanger.value() + 'px\n');
    });

    $('#decrease-font').click(function() {
        fontChanger.smaller();
        appendResult('#result-data', 'Font size is now: ' + fontChanger.value() + 'px\n');
    });
/* End: Accessibility font size changer */

    // We can attach the `fileselect` event to the logo-browse
    $(document).on('change', '#logo-browse', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    // Watch for custom `fileselect` event
    $(document).ready( function() {
        $('#logo-browse').on('fileselect', function(event, numFiles, label) {
            // Check for support
            if (!localStorageSupport()) { return; }

            var logoFile = event.target.files[0];
            // Only process image files.
            if (!logoFile || (logoFile && !logoFile.type.match('image.*'))) {
                return;
            }
            
            var reader = new FileReader();
            // Closure to capture the file information
            reader.onload = (function(theFile) {
                return function (e) {
                    $('#logo-image').attr('src', e.target.result);
                    showResult('#result-data', label + ' selected as logo file.\n');
                    appendResult('#result-data', wrapPreText(e.target.result, 100) + '\n');
                    localStorage.setItem('logoImage', e.target.result);
                };
            })(logoFile);   // The paren's at the end of an anon func 
                            // cause it to run immediately.

            reader.readAsDataURL(logoFile);

            $('#preview-div').show();

            var input = $(this).parents('.input-group').find(':text'),
              log = numFiles > 1 ? numFiles + ' files selected' : label;

            if( input.length ) {
              input.val(log);
            } else {
              if( log ) alert(log);
            }
        });
    });

    $('#preview-div').click(function() {
        $('#preview-div').hide();
        if(localStorage['logoImage']) { localStorage.removeItem('logoImage') };
    });

    $('.jumbotron').click(function () {
        if(localStorageSupport()) {
            if(localStorage['logoImage']) {
                $('#from-local').hide(); 
                //$('#from-local').attr('src', localStorage.getItem('logoImage'));
                $('#from-local').show('slow');
            };
        };
    });
});


// Using the short-hand to load hide the bar.
$(function () {
    pulseBar('#loading-bar');
    $('#loading-bar').hide();
});

$(document).ajaxStart(function() { 
    appendResult('#result-data', 'Loading bar now being shown...');
    $('#loading-bar').attr('style','');
    $('#loading-bar').show('slow').promise().done(pulseBar('#loading-bar'));
});

$(document).ajaxStop(function() { 
    appendResult('#result-data', 'Loading bar now being hidden.');
    $('#loading-bar').animate({height: '-1px'}, 'slow').promise().done(poof('#loading-bar'));
});