/*jslint browser: true */
/*jslint devel: true */
/*global window */
/*

This is the jquery version of the color converter (BETTER)

*/
var rgbValues;
var rgbOriginal;
var rgb;
var hex;
var r = 0,
    g = 0,
    b = 0;
var box = {
	set_color: function(color) {
		$('body').css('background-color', color);
	},
	reset: function() {
		$('.inputs').val('');
	}
};
$('document').ready(function() {
	$('#reset-button').on('click', function() { box.reset(); });
	$(window).bind('keydown', function(evt) {
		if ((evt.ctrlKey || evt.metaKey) && String.fromCharCode(evt.which).toLowerCase() == 'z') {
			evt.preventDefault();
		}
	});
	$("#hexI").on('change', function() {
			hex = $('#hexI').val();
			box.set_color(hex);
            if ($('body').css('backgroundColor') != "rgb(34, 34, 34)") {
            $('#rgbI').val($('body').css('backgroundColor'));
            }
	});
	$('#rgbI').change(function() {
            rgb = $('#rgbI').val();
            splitRGB();
            box.set_color($('#rgbI').val());
            hex = rgbToHex(r,g,b);
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
            $('#hexI').val(hex);
            $('#rgbI').val("rgb(" + r + ", " + g + ", " + b + ")"); 
            }
    });
});


function componentToHex(c) {
    var hex2 = c.toString(16);
    return hex2.length == 1 ? "0" + hex2 : hex2;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function splitRGB() {
    rgb = rgb.replace(" ", "");
    rgb = rgb.replace("rgb", "");
	rgb = rgb.replace("(", "");
	rgb = rgb.replace(")", "");
	rgbValues = rgb.split(",");
	r = parseInt(rgbValues[0]);
	g = parseInt(rgbValues[1]);
	b = parseInt(rgbValues[2]);
    if (r > 255) {
        r = 255;
    }
    if (b > 255) {
        b = 255;
    }
    if (g > 255) {
        g = 255;
    }
}