// setup/generator_design and setup/load_data will have run first

$("#title").text(mode === "Survivor" ? "Random Survivor Build" : "Random Killer Build");

generate();
function generate() {
    if (main_ready && perks_ready && addons_ready) {
        presentBuild(randomBuild());
    } else {
        setTimeout(generate, 200);
    }
}

/**
 * Creates a completely random build. The only restrictions are
 * killer / item and addons must be compatible, each perk must be
 * unique, and each addon must be unique. 
 */
function randomBuild() {
    let build = [];

    // select killer / item
    let main_names = Object.keys(mains);
    do { // we have to do this because killer powers are considered items in the backend.
        let build_main_name = main_names[Math.floor(Math.random() * main_names.length)]
        build["main"] = mains[build_main_name];
        build["main"]["name"] = build_main_name;
    } while (build.main.url == undefined)

    // select unique addons
    build["addons"] = [];
    let selected_addons = [];
    while (selected_addons.length < 2) {
        let new_addon_name = build.main.addons[Math.floor(Math.random() * build.main.addons.length)];
        if (selected_addons.indexOf(new_addon_name) === -1) {
            selected_addons.push(new_addon_name);

            let addon = addons[new_addon_name];
            addon["name"] = new_addon_name;
            build.addons.push(addon);
        }
    }

    // select unique perks
    build["perks"] = [];
    let perk_names = Object.keys(perks);
    let selected_perks = [];
    while (selected_perks.length < 4) {
        let new_perk_name = perk_names[Math.floor(Math.random() * perk_names.length)];
        if (selected_perks.indexOf(new_perk_name) === -1) {
            selected_perks.push(new_perk_name);

            let perk = perks[new_perk_name];
            perk["name"] = new_perk_name;
            build.perks.push(perk);
        }
    }

    return build;
}