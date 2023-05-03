let proxy = "https://dreamland.zawackis.com:12399/";

let shrine_reset;
let shrine_loaded = false;
let rank_reset;
let rift_close;
let rift_loaded = false;

$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/shrine.json', function (shrine) {
    for (let i = 0; i <= 3; i++) {
        $('#perk' + (i + 1) + '-url').find('h1').text(shrine.perks[i].id);
        $('#perk' + (i + 1) + '-url').find('img').attr('src', shrine.perks[i].img_url);
        $('#perk' + (i + 1) + '-url').attr('href', shrine.perks[i].url);
        $('#perk' + (i + 1) + '-url').protipSet({
            title: shrine.perks[i].description.replaceAll("<li>", '<li style="margin: 1rem">')
        });
    }
    shrine_reset = shrine.end * 1000;
    console.log(shrine_reset);
    shrine_loaded = true;
});

// rank reset is nearest 13th 8 utc
date = new Date();
date.setUTCHours(8, 0, 0, 0);
if (date.getUTCDate() >= 13) {
    date.setUTCMonth(date.getUTCMonth() + 1);
}
date.setUTCDate(13);
rank_reset = date.getTime();

rift_close = 0;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/rift.json', function (response) {
    rift_close = response.end * 1000;
    rift_loaded = true;
});

setTimers();
function setTimers() {
    if (shrine_loaded && rift_loaded) {
        let x = setInterval(function () {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let remainders = [shrine_reset - now, rank_reset - now, rift_close - now]

            let targets = ['#shrine-timer', '#grade-timer', '#rift-timer'];
            remainders.forEach(function (remainder, i) {
                // Time calculations for days, hours, minutes and seconds
                let days = Math.floor(remainder / (1000 * 60 * 60 * 24)).toLocaleString('en-US', { minimumIntegerDigits: 2 });
                let hours = Math.floor((remainder % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toLocaleString('en-US', { minimumIntegerDigits: 2 });;
                let minutes = Math.floor((remainder % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-US', { minimumIntegerDigits: 2 });;
                let seconds = Math.floor((remainder % (1000 * 60)) / 1000).toLocaleString('en-US', { minimumIntegerDigits: 2 });;
                let text = hours + ':' + minutes + ':' + seconds
                if (days > 0) {
                    text = days + ' days, ' + text
                }
                $(targets[i]).find('span').text(text);
                // If the count down is finished, write some text
                if (remainder < 0) {
                    if (i != 2) {
                        $(targets[i]).find('span').text("???");
                    } else {
                        $(targets[i]).text('Rift closed');
                    }
                }
            });
        }, 1000);
    } else {
        setTimeout(setTimers, 200);
    }
}

// get current patch
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/version.json', function (version) {
    console.log(version.latest);
    $('#patch-name').text(version.latest.slice(0, version.latest.indexOf('_')));
});

// get playercount
$.getJSON(proxy + 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=381210', function (data) {
    $('#playercount').find('span').text(data['response']['player_count']);
})

// get dbd news
$.getJSON(proxy + 'https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=381210&feeds=steam_community_announcements&maxlength=200', function (data) {
    let content = $('#news-content');

    let news = data['appnews']['newsitems'];
    news.forEach(function (item, i) {
        content.find('a').eq(i).attr('href', item.url);
        content.find('h1').eq(i).text(item.title + ' - ' + new Date(item.date * 1000).toLocaleDateString());
        if (item.contents.startsWith('{STEAM_CLAN_IMAGE}')) {
            item.contents = item.contents.substring(item.contents.indexOf(' ') + 1);
        }
        content.find('p').eq(i).text(item.contents);
    });
});