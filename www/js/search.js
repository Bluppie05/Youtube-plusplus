var invidious = "https://invidiou.site/"
var req_api = "https://bitbiz.nl/yt-plusplus-scripts/request.php?url="

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


function onDeviceReady() {
    //$.get("https://invidious.site/", function(data, status){
    //    console.log(data);
    //    document.getElementById("app").innerHTML = data;
    //});

    //fetch('https://bitbiz.nl/yt-plusplus-scripts/request.php?url=https://invidious.snopyta.org/').then(function (data) {
        // The API call was successful!
    //    console.log('success!', data);
    //}).catch(function (err) {
    //    // There was an error
    //    console.warn('Something went wrong.', err);
    //});

    var apiurl = req_api + invidious + 'search?q=' + encodeURIComponent(getUrlVars()["q"]);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", apiurl, true);

    xhttp.onload = function() {
        // start json parsing and processing
        var obj = JSON.parse(this.response);
        console.log(obj);

        //var obj = replaceAll(obj, '="/', '="'+invidious); // make resources cross-capable
        //var obj = replaceAll(obj, invidious+'css/', 'css/individious/'); // replace stylesheets with local ones
        //var obj = replaceAll(obj, '<div class="pure-u-1 pure-u-md-4-24"><a href="'+invidious+'" class="index-link pure-menu-heading">Invidious</a></div>', '') // replace branding
        //var obj = replaceAll(obj, '<link rel="icon" type="image/png" sizes="32x32" href="https://invidiou.site/favicon-32x32.png?v=3f97beb">', ''); // remove icon1
        //var obj = replaceAll(obj, '<link rel="icon" type="image/png" sizes="16x16" href="https://invidiou.site/favicon-16x16.png?v=3f97beb">', ''); // remove icon2
        //var obj = replaceAll(obj, '<a href="https://github.com/iv-org/invidious/issues/1320">Invidious is looking for help.</a>', '');
        //var obj = obj.replace('Are you a developer?', '<input class="searchbox" placeholder="Search on YouTube">');
        //var obj = replaceAll(obj, 'BTC- bc1q342kk63rngdkyqzwrqd2qgjnr67eqs6tpvwlmwra0cn59r4m7vesa0sq28', '');
        var obj = replaceAll(obj, '  ', '');
        var obj = replaceAll(obj, '\n', '');
        var obj = replaceAll(obj, '="/', '="'+invidious); // make resources cross-capable
        var obj = '<div class="pure-g"><div class="pure-u-1 pure-u-md-2-24"></div><div class="pure-u-1 pure-u-md-20-24">' + '<div class="pure-g navbar h-box"><div class="pure-u-1 pure-u-md-12-24 searchbar"><form class="pure-form" action="search.html" method="get"><fieldset><input type="search" style="width:100%" name="q" placeholder="search" value=""></fieldset></form></div></div>' + '<div class="pure-g"><div class="pure-u-1 pure-u-md-1-4">' + obj.split('<div class="pure-g"><div class="pure-u-1 pure-u-md-1-4">')[1].split('</div></h5></div></div></div>')[0] + '</div></h5></div></div></div></div>';

        console.log(obj);
        document.getElementById("app").innerHTML = obj;
    }
    xhttp.send()
}
