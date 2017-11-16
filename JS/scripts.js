/*jslint browser: true */
/*jslint devel: true */ 
/*global window */

/*

This is the vanilla javascript version of the color converter (Besides a little part)

*/

var hex;
var rgb;
var obhex;
var obrgb;
var rgbValues;
var r;
var g;
var b;
var conHex;
var gone;
var rgbOriginal = "";
var changing;
var hexOriginal;
window.onload = function() {
    obhex = document.getElementsByTagName("input")[1];
    obrgb = document.getElementsByTagName("input")[0];
	colors();
};
function colors() {
	setTimeout(function() {
		$(window).bind('keydown', function(evt) {
			if ((evt.ctrlKey || evt.metaKey) && String.fromCharCode(evt.which).toLowerCase() == 'z') {
				evt.preventDefault();
			}
		});
		hex = obhex.value;
		rgb = obrgb.value;
        //TODO: Add auto remove hex as well
		if (gone && (rgbOriginal != rgb || false)) {
			reset();
			gone = false;
            colors();
		} else {
			try {
				if (hex === "" && rgb.includes(")")) {
                    if (rgb.match(/,/g).length > "2") {
                        console.log("ERROR: Too many arguments");
                        reset();
                        colors();
                    }
					//RGB Code  
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
                    obrgb.value = 'rgb(' + r + ',' + g + ',' + b + ')';
                    if (r == r.toString(16)) {
                        r = "0" + r;
                    }
                    if (g == g.toString(16)) {
                        g = "0" + g;
                    }
                    if (b == b.toString(16)) {
                        b = "0" + b;
                    }
					conHex = "#" + r.toString(16) + g.toString(16) + b.toString(16);
					document.body.style.backgroundColor = conHex;
					obhex.value = conHex;
					gone = true;
                    rgbOriginal = obrgb.value;
					colors();
				} else if (rgb === "") {
					//HEX Code            
					document.body.style.backgroundColor = hex;
					obrgb.value = document.body.style.backgroundColor;
					colors();
				} else {
					colors();
				}
			} catch (err) {
				console.log("ERROR: " + err.message);
				document.body.backgroundColor = "#222";
			}
		}
	}, 100);
}
function reset() {
	obhex.value = '';
	obrgb.value = '';
	// location.reload(true);
}