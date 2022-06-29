let urlParam = new URLSearchParams(window.location.search);

let mode = urlParam.get("mode");
let build = urlParam.get("build");

let perks_ready = false;
let main_ready = false;
let addons_ready = false;

let perk_set;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/perks.json', function (response) {
    perk_set = response;
    perk_set = Object.fromEntries(
        Object.entries(perk_set).filter(([key, value]) => value.role == mode.toLowerCase()));
    perks_ready = true;
});

let main_source;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/' + (mode == "Killer" ? 'killers' : 'items') + '.json', function (response) {
    main_source = response;
    main_ready = true;
}).then(() => {
    let build_names = Object.keys(preset_perk_set).sort()

    for (let build_name of build_names) {
        let build = preset_perk_set[build_name];
        $('#builds').append(constructBuildString(build_name, build));
    }
});

let addons;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/addons.json', function (response) {
    addons = response;
    addons_ready = true;
});

let preset_perk_set;
if (mode == "Killer") {
    preset_perk_set = preset_killer_perks;
    $('#main-th').text("Killer");
} else if (mode == "Survivor") {
    preset_perk_set = preset_survivor_perks;
    $('#main-th').text("Item");
} else {
    alert(
        "Please click on the DBD Logo and navigate the site using the buttons."
    );
}

function loadBuilds() {
    if (addons_ready && main_ready && perks_ready) {
        let build_names = Object.keys(preset_perk_set).sort()

        for (let build_name of build_names) {
            let build = preset_perk_set[build_name];
            $('#builds').append(constructBuildString(build_name, build));
        }
    } else {
        setTimeout(() => { loadBuilds() }, 200);
    }
}

function constructBuildString(build_name, build) {
    console.log(main_source[build.main]);
    let build_string = '<div class="build-row row align-items-center build-row" onclick="buildModal(\'' + build_name.replace('\'', '\\\'') + '\')"><div class="col-2">'
    // add build name
    build_string += '<span class="h4 perk-caption build-name">' + build_name + '</span></div><div class="col-2 justify-content-center">';
    // add main element
    build_string += '<span class="text-decoration-none">';
    build_string += '<img style="width:10em;height:10em;" src="' + main_source[build.main].img_url + '" />';
    build_string += '<figcaption class="fw-bold perk-caption">' + build.main + '</figcaption></span></div><div class="col-2 justify-content-center">';
    // add addons
    for (let i in build.addons) {
        let addon = build.addons[i];
        console.log(addon);
        build_string += '<span class="protip text-decoration-none">';
        build_string += '<img style="width:4em;height:4em;" class="addon-img" src="' + addons[addon].img_url + '" />';
        build_string += '<figcaption class="perk-caption">' + addon + '</figcaption></span>';
    }
    build_string += '</div><div class="col-6">'
    // add perks
    build_string += '<div id="perk-set" class="w-100 mx-auto row justify-content-center">';
    for (let i in build.perks) {
        let perk = build.perks[i];
        console.log(perk);
        build_string += '<div class="col">';
        build_string += '<span class="protip text-decoration-none">';
        build_string += '<img style="width:8em;height:8em;" class="perk-img" src="' + perk_set[perk].img_url + '" />';
        build_string += '<figcaption class="perk-caption">' + perk + '</figcaption></span>'
        build_string += '</div>';
    }
    build_string += '</div></div><hr style="color:lightgray;"/>';
    return build_string;
}

// load modal with build-specific data, then show the modal
function buildModal(build_name) {
    $('#title').text(build_name);
    let build = preset_perk_set[build_name];
    $('#explanation').text(build.explanation);
    let main = main_source[build.main];
    $('#character-url').attr('href', main.url);
    $('#character-img').attr('src', main.img_url);
    $('#character-caption').text(build.main);
    for (let i = 0; i <= 3; i++) {
        let perk = perk_set[build.perks[i]];
        $('#perk' + (i + 1) + '-url').attr('href', perk.url);
        $('#perk' + (i + 1) + '-img').attr('src', perk.img_url);
        $('#perk' + (i + 1) + '-caption').text(build.perks[i]);
        descUpdate("perk" + (i + 1).toString());
    }
    for (let i = 0; i <= 1; i++) {
        let addon = addons[build.addons[i]]
        $('#addon' + (i + 1) + '-url').attr('href', addon.url);
        $('#addon' + (i + 1) + '-img').attr('src', addon.img_url);
        $('#addon' + (i + 1) + '-caption').text(build.addons[i]);
        descUpdate("addon" + (i + 1).toString());
    }
    $('#build-modal').fadeIn('fast');
}

$(window).click(function (event) {
    if (event.target.id == $('#build-modal').attr('id')) {
        $('#build-modal').fadeOut('fast');
    }
});

function filter() {
    let mainInput = $('#input').val().toUpperCase();
    let table = $('#builds');
    let trs = table.find('.build-row');
    trs.each(function (index) {
        let mainName = trs.eq(index).find('.build-name').text().toUpperCase();
        if (mainName.indexOf(mainInput) > -1) {
            trs.eq(index).fadeIn('fast');
        } else {
            trs.eq(index).fadeOut('fast');
        }
    })
}

function descUpdate(item) {
    console.log(item)
    let proxy = "https://dreamland.zawackis.com:12399/";
    let url = $("#" + item + "-url").attr("href");
    if (url.includes("https://")) {
        if (item.includes("perk")) {
            console.log("perk!")
            $.get(proxy + url, function (response) {
                let info = $(response)
                    .find(".wikitable")
                    .first()
                    .find("td")
                    .last()
                    .find(".formattedPerkDesc")
                    .first();

                info.find("a").each(function () {
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

                $("#" + item + "-url").protipSet({
                    title: resulting_title
                });
            });
        } else if (item.includes("addon")) {
            console.log("addon!");
            $.get(proxy + url, function (response) {
                let info = $(response)
                    .find(".wikitable")
                    .first()
                    .find("tr")
                    .last()
                    .find("td")
                    .first();
                info.find("a").each(function () {
                    $(this).attr("href", "");
                    if ($(this).has("img")) {
                        $(this).find("img").remove();
                    }
                });
                let resulting_title = info
                    .html()
                    .replaceAll("<li>", "<p>")
                    .replaceAll("</li>", "</p>")
                    .replaceAll("<ul>", "")
                    .replaceAll("</ul>", "")
                    .replaceAll("<a", "<span")
                    .replaceAll("</a>", "</span>")
                    .replaceAll(" .", ".")
                    .replaceAll("  ", " ")
                    .replaceAll("&nbsp;%", "%")
                    .replaceAll("\n", "\n\n");
                $("#" + item + "-url").protipSet({
                    title: resulting_title,
                });
            });
        }
    }
}