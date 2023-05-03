$("#title").text(mode === "Survivor" ? "Themed Survivor Build" : "Themed Killer Build");

let styled_perks = mode === "Survivor" ? stylized_survivor_perks : stylized_killer_perks;

generate();
function generate() {
    if (main_ready && perks_ready && addons_ready) {
        presentBuild(styledBuild());
    } else {
        setTimeout(generate, 200);
    }
}

function styledBuild() {
    let build = [];

    let style_1 = styled_perks[$("#style-1 option:selected").val()];
    let style_2 = styled_perks[$("#style-2 option:selected").val()];

    // KILLER / ITEM
    let main;
    let main_names;
    if (mode === "Survivor") {
        // pool items, select one randomly (if none choose any item)
        main_names = Array.from(new Set(style_1.items.concat(style_2.items)));
        if (main_names.length === 0) {
            // fallback if no items are in the styles
            main_names = Object.keys(mains).filter(main => mains[main].img_url != undefined);
        }
    } else {
        // select completely randomly
        main_names = Object.keys(mains);
    }
    let selected_main_name = main_names[Math.floor(Math.random() * main_names.length)];
    build["main"] = mains[selected_main_name];
    build["main"]["name"] = selected_main_name;
    console.log(build);

    // ADDONS
    build["addons"] = [];
    let addon_names = Array.from(new Set(style_1.addons.concat(style_2.addons)));
    addon_names = addon_names.filter(name => build.main.addons.includes(name));
    if (addon_names.length === 0 || addon_names == undefined) {
        // fallback if no main-compatible addons remain
        addon_names = build.main.addons;
    }
    // shuffle addons
    addon_names.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 2; i++) {
        let selected_addon = addon_names.shift();
        build["addons"].push(addons[selected_addon]);
        build["addons"][i]["name"] = selected_addon;
    }

    // PERKS
    build["perks"] = [];

    // fetch and shuffle perks
    let perk_names = Array.from(new Set(style_1.perks.concat(style_2.perks)));
    perk_names.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
        let selected_perk = perk_names.shift();
        build["perks"].push(perks[selected_perk]);
        build["perks"][i]["name"] = selected_perk;
    }

    console.log(build);
    return build;
}

// populate dropdown selections
$(".build-aspect").each(function () {
    for (let style in styled_perks) {
        $(this).append("<option>" + style + "</option>");
    }
});
let style_1 = styled_perks[$("#style-1 option:selected").val()];
let style_2 = styled_perks[$("#style-2 option:selected").val()];
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

// updates the description under the inputs once a new build style is selected.
function updateDescription() {
    let style_1 = styled_perks[$("#style-1 option:selected").val()];
    let style_2 = styled_perks[$("#style-2 option:selected").val()];
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