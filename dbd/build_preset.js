// setup/generator_design and setup/load_data will have run first

$("#title").text(mode === "Survivor" ? "Preset Survivor Build" : "Preset Killer Build");

let main_history = []; // size 4
let build_history = []; // size 10

generate();
function generate() {
    if (main_ready && perks_ready && addons_ready) {
        let build = presetBuild()
        presentBuild(build);

        // additionally, we have to handle the explanation and title in preset builds.
        $("#title").text = "???"
        $("#explanation").text = "???"

        setTimeout(() => {
            $("#title").text = build.name;
            $("#explanation").text = build.explanation;
        }, 1500)
    } else {
        setTimeout(generate, 200);
    }
}

let preset_perks = mode === "Survivor" ? preset_survivor_perks : preset_killer_perks;

/**
 * Selects a preset build from preset_<>_perks.js.
 */
function presetBuild() {
    let build = [];

    // select build
    let build_names = Object.keys(preset_perks);
    let found_valid_build = false;
    let selected_build;
    let selected_build_name;
    do { // make sure that the build isn't in our history.
        selected_build_name = build_names[Math.floor(Math.random() * build_names.length)];
        selected_build = preset_perks[selected_build_name];
        found_valid_build = build_history.indexOf(selected_build_name) === -1 && main_history.indexOf(selected_build.main) === -1;
    } while (!found_valid_build);

    console.log(selected_build);

    // history management
    main_history.push(selected_build.main);
    build_history.push(selected_build_name);

    if (main_history.length > 4) {
        main_history.shift();
    }
    if (build_history.length > 10) {
        build_history.shift();
    }

    // load killer / item
    build["main"] = mains[selected_build.main];
    build["main"]["name"] = selected_build.main;

    // load addons
    build["addons"] = [];
    for (let i = 0; i < 2; i++) {
        build.addons[i] = addons[selected_build.addons[i]];
        build.addons[i]["name"] = selected_build.addons[i];
    }

    // load perks
    build["perks"] = [];
    for (let i = 0; i < 4; i++) {
        build.perks[i] = perks[selected_build.perks[i]];
        build.perks[i]["name"] = selected_build.perks[i];
    }

    // name & explanation
    build["name"] = selected_build_name;
    build["explanation"] = selected_build.explanation;

    console.log(build);
    return build;
}

// copy the Twitch embed link
$("#browser-source").html("https://charles.zawackis.com/dbd/embed.html?mode=" + mode);
function copyBrowserSource() {
    $("#browser-source").css("color", "lightgreen");

    let prevVal = $("#browser-source").text()

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(prevVal);
    $("#browser-source").text("Copied!");

    setTimeout(() => {
        $("#browser-source").text(prevVal);
        $("#browser-source").css("color", "orange");
    }, 1000);
}