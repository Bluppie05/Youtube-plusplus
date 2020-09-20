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

    var apiurl = req_api + invidious + 'watch?v=' + encodeURIComponent(getUrlVars()["v"]);

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
        var vidinfo = obj.split('<video style="outline:none;width:100%;background-color:#000"')[1] //.split('>')[0]
        var vidlink = vidinfo.split('src="')[1].split('"')[0];
        var vidtitle = vidinfo.split('title="')[1].split('"')[0];
        var vidposter = vidinfo.split('poster="')[1].split('"')[0];
        console.log(vidlink);
        
        var obj = '<video id="my-video" class="video-js vjs-theme-forest" controls preload="auto" width="100%" height="100%" poster="'+vidposter+'" data-setup="{}" style="height:100%;width:100%;"><source id="vidsource" src="'+vidlink+'" type="video/mp4" /><source src="'+vidlink+'" type="video/webm" /><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>'


        console.log(obj);
        document.getElementById("app").innerHTML = obj;
    }
    xhttp.send()
}
