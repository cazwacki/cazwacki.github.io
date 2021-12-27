let proxy = "https://dreamland.zawackis.com:12399/";

let shrine_reset;
let rank_reset;
let rift_close;

// shrine reset is nearest wednesday 0 utc
let date = new Date();
date.setUTCHours(0, 0, 0, 0);
date.setUTCDate(date.getUTCDate() + ((7 - date.getUTCDay()) % 7 + 3) % 7);
shrine_reset = date.getTime();

// rank reset is nearest 13th 8 utc
date.setUTCHours(8, 0, 0, 0);
if (date.getUTCDate() > 13) {
    date.setUTCMonth(date.getUTCMonth() + 1);
}
date.setUTCDate(13);
rank_reset = date.getTime();

console.log(rank_reset);
console.log(shrine_reset);

rift_close = 0;
$.get(proxy + 'https://deadbydaylight.com/en/archives#intro', function(response) {
    let components = $(response).find('.archives-intro__date').text().split(' ');
    let end_date_month = new Date(Date.parse(components[3] + ' ' + components[4] + ' 2012')).getUTCMonth();
    let now = new Date(Date.now());
    let end_date_year = now.getUTCFullYear()
    if (now.getUTCMonth() > end_date_month) {
        end_date_year += 1;
    }
    console.log(components[3] + ' ' + components[4] + ' ' + end_date_year + ' 16:00:00 UTC');
    rift_close = (new Date(Date.parse(components[3] + ' ' + components[4] + ' ' + end_date_year + ' 16:00:00 UTC'))).getTime();
});

// set end times for timers
setTimeout(() => {
    let x = setInterval(function() {

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let remainders = [shrine_reset - now, rank_reset - now, rift_close - now]

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
$.get(proxy + 'https://deadbydaylight.fandom.com/wiki/Shrine_of_Secrets', function(response) {
    console.log(response);
    let table = $(response).find('.sosTable').first();
    console.log(table);
    table.find('.sosRow').each(function(i) {
        let perk_name = $(this).find('.sosText').first().text().trim();
        console.log(perk_name);
        let discovered_perk = killer_perks[perk_name] || survivor_perks[perk_name];
        console.log(discovered_perk);
        $('#perk' + (i + 1) + '-url').find('h1').text(perk_name);
        $('#perk' + (i + 1) + '-url').find('img').attr('src', discovered_perk.img_url);
        $('#perk' + (i + 1) + '-url').attr('href', discovered_perk.url);

        $.get(proxy + discovered_perk.url, function(response) {
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
    });
});

// get playercount
$.getJSON(proxy + 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=381210', function(data) {
    $('#playercount').find('span').text(data['response']['player_count']);
})

// get dbd news
$.getJSON(proxy + 'https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=381210&feeds=steam_community_announcements&maxlength=200', function(data) {
    let content = $('#news-content');

    let news = data['appnews']['newsitems'];
    news.forEach(function(item, i) {
        content.find('a').eq(i).attr('href', item.url);
        content.find('h1').eq(i).text(item.title + ' - ' + new Date(item.date * 1000).toLocaleDateString());
        if (item.contents.startsWith('{STEAM_CLAN_IMAGE}')) {
            item.contents = item.contents.substring(item.contents.indexOf(' ') + 1);
        }
        content.find('p').eq(i).text(item.contents);
    });
});