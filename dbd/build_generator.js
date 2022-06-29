let urlParam = new URLSearchParams(window.location.search);

let mode = urlParam.get("mode");
let build = urlParam.get("build");

let main_history = []; // size 4
let build_history = []; // size 10

let perk_loop;
let addon_loop;
let main_loop;

let perk_set;
let stylized_perk_set;
let preset_perk_set;
let main_source;

$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/perks.json', function (response) {
    perk_set = response;
    console.log(perk_set);
}).then(() => {
    if (mode == "Killer") {
        perk_set = Object.fromEntries(
            Object.entries(perk_set).filter(([key, value]) => value.role == "killer"));
        stylized_perk_set = stylized_killer_perks;
        preset_perk_set = preset_killer_perks;
        perk_loop = "./images/killer_perk_loop";
        if (build == "Preset") {
            $("#character-img").attr("src", "images/killer.png");
            $("#character-caption").text("Killer");
            $("#browser-source").text(
                "https://charles.zawackis.com/dbd/embed.html?mode=Killer"
            );

            $.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/killers.json', function (response) {
                main_source = response;
            });
            main_loop = "./images/killer_loop.gif";
            addon_loop = "./images/killer_addon_loop";
        }
    } else if (mode == "Survivor") {
        perk_set = Object.fromEntries(
            Object.entries(perk_set).filter(([key, value]) => value.role == "survivor"));
        stylized_perk_set = stylized_survivor_perks;
        preset_perk_set = preset_survivor_perks;
        perk_loop = "./images/survivor_perk_loop";
        if (build == "Preset") {
            $("#character-img").attr("src", "images/item.png");
            $("#character-caption").text("Item");
            $("#browser-source").text(
                "https://charles.zawackis.com/dbd/embed.html?mode=Survivor"
            );

            $.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/items.json', function (response) {
                console.log(response);
                main_source = response;
            });
            main_loop = "./images/item_loop.gif";
            addon_loop = "./images/survivor_addon_loop";
        }
    } else {
        alert(
            "Please click on the DBD Logo and navigate the site using the buttons."
        );
    }
});

//DEBUG
// console.log(Object.keys(preset_perk_set).length);
// for (let i = 0; i < Object.keys(preset_perk_set).length; i++) {
//     let build_name = Object.keys(preset_perk_set)[i];
//     console.log('--' + build_name);
//     let chosen_build = preset_perk_set[build_name];
//     for (let i = 0; i < 4; i++) {
//         console.log(perk_set[chosen_build.perks[i]]);
//     }
//     for (let i = 0; i < 2; i++) {
//         console.log(items[chosen_build.addons[i]]);
//     }
// }

if (build != "Semi-Random") {
    $("#selectors").remove();
} else {
    $(".build-aspect").each(function () {
        for (let style in stylized_perk_set) {
            $(this).append("<option>" + style + "</option>");
        }
    });
    let style_1 = stylized_perk_set[$("#style-1 option:selected").val()];
    let style_2 = stylized_perk_set[$("#style-2 option:selected").val()];
    if (style_1 == style_2) {
        $("#build-description").text(
            "This build will help you " + style_1.description + "."
        );
    } else {
        $("#build-description").text(
            "This build will help you " +
            style_1.description +
            " and " +
            style_2.description +
            "."
        );
    }
}

$("#title").text(build + " " + mode + " Build");

function animateRandom() {
    // clear figcaptions and URLs
    for (let i = 0; i < 4; i++) {
        $("#perk" + (i + 1) + "-caption").text("???");
        $("#perk" + (i + 1) + "-url").attr("href", "");
        setTimeout(() => { $("#perk" + (i + 1) + "-img").attr("src", perk_loop + i + ".gif") }, 250 * i);
    }
    if (build == "Preset") {
        // here we also have to animate killer, power, addons as well as select them
        $("#title").text("???");
        $("#explanation").text("???");
        // tool for survivors
        $("#character-caption").text("???");
        $("#character-url").attr("href", "");
        $("#character-img").attr("src", main_loop);

        $("#power-caption").text("???");
        $("#power-url").attr("href", "");
        $("#power-img").attr("src", main_loop);

        $("#addon1-caption").text("???");
        $("#addon1-url").attr("href", "");
        setTimeout(() => { $("#addon1-img").attr("src", addon_loop + "0.gif") }, 500);

        $("#addon2-caption").text("???");
        $("#addon2-url").attr("href", "");
        setTimeout(() => { $("#addon2-img").attr("src", addon_loop + "1.gif") }, 750);
    }
}

function fetchAndFade(perks) {
    let i = 0;
    for (let perk in perks) {
        // display unique perk in appropriate section of the page
        $("#perk" + (i + 1).toString() + "-url").attr("href", perks[perk].url);
        $("#perk" + (i + 1).toString() + "-img").attr("src", perks[perk].img_url);
        $("#perk" + (i + 1).toString() + "-img").addClass("fadeIn");
        $("#perk" + (i + 1).toString() + "-caption").text(perk);
        $("#perk" + (i + 1).toString() + "-caption").addClass("fadeIn");
        let current_i = i + 1;
        descUpdate("perk" + (i + 1).toString());
        setTimeout(
            (dom_img, dom_caption) => {
                dom_img.removeClass("fadeIn");
                dom_caption.removeClass("fadeIn");
            },
            1500,
            $("#perk" + (i + 1).toString() + "-img"),
            $("#perk" + (i + 1).toString() + "-caption")
        );
        i++;
    }
}

function randomBuild() {
    let perks = [];
    // ensure all perk values are unique
    for (let i = 0; i < 4; i++) {
        // get a unique perk
        let uniquePerk = true;
        do {
            uniquePerk = true;
            let perk_name =
                Object.keys(perk_set)[
                Math.floor(Math.random() * Object.keys(perk_set).length)
                ];
            if (perks[perk_name] != null) {
                uniquePerk = false;
            } else {
                perks[perk_name] = perk_set[perk_name];
            }
        } while (!uniquePerk);
    }
    return perks;
}

function styledBuild() {
    let perk_sets = [];
    let style_1 = stylized_perk_set[$("#style-1 option:selected").val()];
    let style_2 = stylized_perk_set[$("#style-2 option:selected").val()];
    let perks = [];

    // guarantee at least one unique perk from each set is provided
    let perk_name_1 =
        style_1.perks[Math.floor(Math.random() * style_1.perks.length)];
    perks[perk_name_1] = perk_set[perk_name_1];

    let uniquePerk = true;
    do {
        uniquePerk = true;
        let perk_name_2 =
            style_2.perks[Math.floor(Math.random() * style_2.perks.length)];
        if (perks[perk_name_2] != null) {
            uniquePerk = false;
        } else {
            perks[perk_name_2] = perk_set[perk_name_2];
        }
    } while (!uniquePerk);

    // ensure all perk values are unique
    for (let i = 2; i < 4; i++) {
        // get a unique perk
        do {
            uniquePerk = true;
            let style;
            if (style_1.description == "extend a chase") {
                style = 2;
            } else if (style_2.description == "extend a chase") {
                style = 1;
            } else {
                style = Math.floor(Math.random() * 2);
            }
            let perk_name;
            if (style == 1) {
                perk_name =
                    style_1.perks[Math.floor(Math.random() * style_1.perks.length)];
            } else {
                perk_name =
                    style_2.perks[Math.floor(Math.random() * style_2.perks.length)];
            }

            if (perks[perk_name] != null) {
                uniquePerk = false;
            } else {
                perks[perk_name] = perk_set[perk_name];
            }
        } while (!uniquePerk);
    }
    return perks;
}

function presetBuild() {
    animateRandom();
    let build_name =
        Object.keys(preset_perk_set)[
        Math.floor(Math.random() * Object.keys(preset_perk_set).length)
        ];
    let chosen_build = preset_perk_set[build_name];

    while (
        // DEBUG
        // chosen_build.main != 'The Trapper'
        main_history.includes(chosen_build.main) ||
        build_history.includes(build_name)
    ) {
        build_name =
            Object.keys(preset_perk_set)[
            Math.floor(Math.random() * Object.keys(preset_perk_set).length)
            ];
        chosen_build = preset_perk_set[build_name];
    }
    main_history.push(chosen_build.main);
    build_history.push(build_name);

    if (main_history.length > 6) {
        main_history.shift();
    }

    if (build_history.length > 15) {
        build_history.shift();
    }

    let perks = [];
    for (let i = 0; i < 4; i++) {
        perks[chosen_build.perks[i]] = perk_set[chosen_build.perks[i]];
        setTimeout(
            (dom_img, dom_caption) => {
                dom_img.removeClass("fadeIn");
                dom_caption.removeClass("fadeIn");
            },
            3000,
            $("#perk" + (i + 1).toString() + "-img"),
            $("#perk" + (i + 1).toString() + "-caption")
        );
    }
    setTimeout(() => {
        // tool for survivors
        $("#character-url").attr("href", main_source[chosen_build.main].url);
        $("#character-img").attr("src", main_source[chosen_build.main].img_url);
        $("#character-caption").text(chosen_build.main);
        $("#character-img").addClass("fadeIn");
        $("#character-caption").addClass("fadeIn");
        setTimeout(
            (dom_img, dom_caption) => {
                dom_img.removeClass("fadeIn");
                dom_caption.removeClass("fadeIn");
            },
            1500,
            $("#character-img"),
            $("#character-caption")
        );

        $("#addon1-url").attr("href", addons[chosen_build.addons[0]].url);
        $("#addon1-img").attr("src", addons[chosen_build.addons[0]].img_url);
        $("#addon1-caption").text(chosen_build.addons[0]);
        $("#addon1-img").addClass("fadeIn");
        $("#addon1-caption").addClass("fadeIn");
        setTimeout(
            (dom_img, dom_caption) => {
                dom_img.removeClass("fadeIn");
                dom_caption.removeClass("fadeIn");
            },
            1500,
            $("#addon1-img"),
            $("#addon1-caption")
        );
        descUpdate("addon1");

        $("#addon2-url").attr("href", addons[chosen_build.addons[1]].url);
        $("#addon2-img").attr("src", addons[chosen_build.addons[1]].img_url);
        $("#addon2-caption").text(chosen_build.addons[1]);
        $("#addon2-img").addClass("fadeIn");
        $("#addon2-caption").addClass("fadeIn");
        setTimeout(
            (dom_img, dom_caption) => {
                dom_img.removeClass("fadeIn");
                dom_caption.removeClass("fadeIn");
            },
            1500,
            $("#addon2-img"),
            $("#addon2-caption")
        );
        descUpdate("addon2");

        $("#title")
            .empty()
            .append("<strong>" + build_name + "</strong>");
        $("#explanation")
            .empty()
            .append(
                "<strong>" +
                chosen_build.meme +
                "</strong>: " +
                chosen_build.explanation
            );
        $("#title").addClass("fadeIn");
        $("#explanation").addClass("fadeIn");
        setTimeout(
            (title, explanation) => {
                title.removeClass("fadeIn");
                explanation.removeClass("fadeIn");
            },
            1500,
            $("#title"),
            $("#explanation")
        );
        let i = 0;
        for (let perk in perks) {
            // display unique perk in appropriate section of the page
            $("#perk" + (i + 1).toString() + "-url").attr("href", perks[perk].url);
            $("#perk" + (i + 1).toString() + "-img").attr("src", perks[perk].img_url);
            $("#perk" + (i + 1).toString() + "-img").addClass("fadeIn");
            $("#perk" + (i + 1).toString() + "-caption").text(perk);
            $("#perk" + (i + 1).toString() + "-caption").addClass("fadeIn");
            i++;
        }
        for (let i = 0; i < 4; i++) {
            descUpdate("perk" + (i + 1).toString());
        }
    }, 1500);
}

function displayBuild() {
    switch (build) {
        case "Random":
            animateRandom();
            setTimeout(() => {
                fetchAndFade(randomBuild());
            }, 1501);
            break;
        case "Semi-Random":
            animateRandom();
            setTimeout(() => {
                fetchAndFade(styledBuild());
            }, 1501);
            break;
        case "Preset":
            presetBuild();
            break;
        default:
            alert(
                "Please click on the DBD Logo and navigate the site using the buttons."
            );
    }
}

function updateDescription() {
    let style_1 = stylized_perk_set[$("#style-1 option:selected").val()];
    let style_2 = stylized_perk_set[$("#style-2 option:selected").val()];
    if (style_1 == style_2) {
        $("#build-description").text(
            "This build will help you " + style_1.description + "."
        );
    } else {
        $("#build-description").text(
            "This build will help you " +
            style_1.description +
            " and " +
            style_2.description +
            "."
        );
    }
}

function copyBrowserSource() {
    $("#browser-source").css("color", "lightgreen");

    let prevVal = $("#browser-source").text()

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(prevVal);
    $("#browser-source").text("Copied!");

    setTimeout(() => {
        $("#browser-source").text(prevVal);
        $("#browser-source").css("color", "lightslategray");
    }, 1000);
}

// $.ajaxSetup({
//     headers: {
//         'Origin': "google.com"
//     }
// });

function descUpdate(item) {
    let proxy = "https://dreamland.zawackis.com:12399/";
    let url = $("#" + item + "-url").attr("href");
    if (url.includes("https://")) {
        if (item.includes("perk")) {
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

window.onload(setTimeout(() => { displayBuild() }, 500));