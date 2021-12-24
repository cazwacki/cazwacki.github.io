let proxy = "https://dreamland.zawackis.com:12399/";

let shrine_reset;
let rank_reset;
let rift_close;

// get current patch
$.get(proxy + 'https://dbd.onteh.net.au/patchnotes', function(response) {
    let info = $(response)
        .find(".version")
        .first()
        .find("h1");

    new_desc = info
        .text().split(" ")[0];

    $('#patch-name').text(new_desc);
});

// get shrine
$.ajax({
    crossDomain: true,
    dataType: 'jsonp',
    url: 'https://dbd.onteh.net.au/api/shrine?includeperkinfo=1&json',
    success: function(data) {
        console.log(data);
        shrine_reset = data['end'];
        let perks = data['perks'];
        perks.forEach(function(perk, i) {
            $('#perk' + (i + 1) + '-url').find('h1').text(perk['name']);
            let discovered_perk;
            if (i < 2) {
                discovered_perk = killer_perks[perk['name']];
            } else {
                discovered_perk = survivor_perks[perk['name']];
            }

            $('#perk' + (i + 1) + '-url').find('img').attr('src', discovered_perk.img_url);
            $('#perk' + (i + 1) + '-url').attr('href', discovered_perk.url);

            $.get(discovered_perk.url, function(response) {
                let info = $(response)
                    .find(".wikitable")
                    .first()
                    .find("td")
                    .last()
                    .find(".formattedPerkDesc")
                    .first();

                info.find("a").each(function() {
                    $(this).attr("href", "");
                    if ($(this).has("img")) {
                        $(this).find("img").remove();
                    }
                });

                let resulting_title = info
                    .html()
                    .replaceAll('style="', 'style="font-weight: bold; ')
                    .replaceAll("<li>", "<p>")
                    .replaceAll("</li>", "</p>")
                    .replaceAll("<ul>", "")
                    .replaceAll("</ul>", "")
                    .replaceAll("<a", "<span")
                    .replaceAll("</a>", "</span>")
                    .replaceAll("<br>", "<br><br>")
                    .replaceAll(" .", ".")
                    .replaceAll("  ", " ")
                    .replaceAll("'''", "")
                    .replaceAll("* ", "")
                    .replaceAll("''", "")
                    .replaceAll("&nbsp;%", "%")
                    .replaceAll("\n", "\n\n");

                $('#perk' + (i + 1) + '-url').protipSet({
                    title: resulting_title
                });
            });

        })
    }
});

// $.getJSON('https://dbd.onteh.net.au/api/shrine?includeperkinfo=1&json', function(data) {

// });

// get playercount
$.getJSON(proxy + 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=381210', function(data) {
    $('#playercount').find('span').text(data['response']['player_count']);
})

// get dbd news
$.getJSON(proxy + 'https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=381210&feeds=steam_community_announcements&maxlength=200', function(data) {
    let content = $('#news-content');

    let news = data['appnews']['newsitems'];
    news.forEach(function(item, i) {
        console.log(content.find('a'));
        content.find('a').eq(i).attr('href', item.url);
        content.find('h1').eq(i).text(item.title + ' - ' + new Date(item.date * 1000).toLocaleDateString());
        if (item.contents.startsWith('{STEAM_CLAN_IMAGE}')) {
            item.contents = item.contents.substring(item.contents.indexOf(' ') + 1);
        }
        content.find('p').eq(i).text(item.contents);
    });
});

// get rank reset
$.ajax({
    crossDomain: true,
    dataType: 'jsonp',
    url: 'https://dbd.onteh.net.au/api/rankreset?json',
    success: function(data) {
        rank_reset = data['rankreset'];
    }
});

// get rift close
$.ajax({
    crossDomain: true,
    dataType: 'jsonp',
    url: 'https://dbd.onteh.net.au/api/archives?json',
    success: function(data) {
        let archives = Object.keys(data);
        rift_close = data[archives[archives.length - 1]].end;
    }
});

// set end times for timers
setTimeout(() => {
    let x = setInterval(function() {

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let remainders = [shrine_reset * 1000 - now + 1000, rank_reset * 1000 - now, rift_close * 1000 - now]

        let targets = ['#shrine-timer', '#grade-timer', '#rift-timer'];
        remainders.forEach(function(remainder, i) {
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
                $(targets[i]).find('span').text("the past");
            }
        });
    }, 1000);
}, 1000);