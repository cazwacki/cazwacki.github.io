let urlParam = new URLSearchParams(window.location.search);

let mode = urlParam.get("mode");
let build = urlParam.get("build");

let main_history = []; // size 4
let build_history = []; // size 10

// mode-specific settings
let perk_loop = "./images/" + mode.toLowerCase() + "_perk_loop"
let addon_loop = "./images/" + mode.toLowerCase() + "_addon_loop"
let main_loop = "./images/" + mode.toLowerCase() + "_loop.gif"
let stylized_perk_set = mode == "Killer" ? stylized_killer_perks : stylized_survivor_perks;
let preset_perk_set = mode == "Killer" ? preset_killer_perks : preset_survivor_perks;

// fetch mode-specific data
let main_source;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/' + (mode == "Killer" ? 'killers' : 'items') + '.json', function (response) {
    main_source = response;
});

let perk_set;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/perks.json', function (response) {
    perk_set = response;
    perk_set = Object.fromEntries(
        Object.entries(perk_set).filter(([key, value]) => value.role == mode.toLowerCase()));
});

let addons;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/addons.json', function (response) {
    addons = response;
});

// pre-configuring the page
$("#title").text(build + " " + mode + " Build");
if (build == "Random") {
    $("#selectors").remove();
} else if (build == "Semi-Random") {
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
} else if (build == "Preset") {
    $("#character-img").attr("src", "images/" + mode.toLowerCase() + ".png");
    $("#character-caption").text(mode);
    $("#browser-source").text(
        "https://charles.zawackis.com/dbd/embed.html?mode=" + mode
    );
}

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
        $("#perk" + (i + 1).toString() + "-url").protipSet({
            title: perks[perk].description
        });
        // descUpdate("perk" + (i + 1).toString());
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
    let build_name;
    let chosen_build;
    // roll until a valid build appears
    do {
        build_name =
            Object.keys(preset_perk_set)[
            Math.floor(Math.random() * Object.keys(preset_perk_set).length)
            ];
        chosen_build = preset_perk_set[build_name];
    } while (
        main_history.includes(chosen_build.main) ||
        build_history.includes(build_name)
    );

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
        $("#character-url").protipSet({
            title: main_source[chosen_build.main].description,
        });
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
        $("#addon1-url").protipSet({
            title: addons[chosen_build.addons[0]].description,
        });
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

        $("#addon2-url").attr("href", addons[chosen_build.addons[1]].url);
        $("#addon2-img").attr("src", addons[chosen_build.addons[1]].img_url);
        $("#addon2-caption").text(chosen_build.addons[1]);
        $("#addon2-url").protipSet({
            title: addons[chosen_build.addons[1]].description,
        });
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
            $("#perk" + (i + 1).toString() + "-url").protipSet({
                title: perks[perk].description
            });
            i++;
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
            animateRandom();
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

window.onload = initialLoad;
function initialLoad() {
    setTimeout(() => { displayBuild() }, 500);
}