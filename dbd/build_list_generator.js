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

loadBuilds();
function loadBuilds() {
    if (addons_ready && main_ready && perks_ready) {
        $('#remove-me').remove();

        let build_names = Object.keys(preset_perk_set).sort();

        for (let build_name of build_names) {
            let build = preset_perk_set[build_name];
            $('#builds').append(constructBuildString(build_name, build));
        }
    } else {
        setTimeout(() => { loadBuilds() }, 200);
    }
}

function constructBuildString(build_name, build) {
    // console.log(build.main);
    // console.log(mains[build.main]);
    let build_string = '<div class="build-row row align-items-center build-row" onclick="buildModal(\'' + build_name.replace('\'', '\\\'') + '\')"><div class="col-2">'
    // add build name
    build_string += '<span class="h4 perk-caption build-name">' + build_name + '</span></div><div class="col-2 justify-content-center">';
    // add main element
    build_string += '<span class="text-decoration-none">';
    build_string += '<img style="width:10em;height:10em;" src="' + mains[build.main].img_url + '" />';
    build_string += '<figcaption class="fw-bold perk-caption">' + build.main + '</figcaption></span></div><div class="col-2 justify-content-center">';
    // add addons
    // console.log(build);
    for (let i in build.addons) {
        let addon = build.addons[i];
        // console.log(addon);
        // console.log(addons[addon]);
        build_string += '<span class="protip text-decoration-none">';
        build_string += '<img style="width:4em;height:4em;" class="addon-img" src="' + addons[addon].img_url + '" />';
        build_string += '<figcaption class="perk-caption">' + addon + '</figcaption></span>';
    }
    build_string += '</div><div class="col-6">'
    // add perks
    build_string += '<div id="perk-set" class="w-100 mx-auto row justify-content-center">';
    for (let i in build.perks) {
        let perk = build.perks[i];
        // console.log(perk);
        // console.log(perk_set[perk]);
        build_string += '<div class="col">';
        build_string += '<span class="protip text-decoration-none">';
        build_string += '<img style="width:8em;height:8em;" class="perk-img" src="' + perks[perk].img_url + '" />';
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
    let main = mains[build.main];
    $('#character-url').attr('href', main.url);
    $('#character-img').attr('src', main.img_url);
    $('#character-caption').text(build.main);
    $('#character-url').protipSet({
        title: main.description,
    });
    for (let i = 0; i <= 3; i++) {
        let perk = perks[build.perks[i]];
        $('#perk' + (i + 1) + '-url').attr('href', perk.url);
        $('#perk' + (i + 1) + '-img').attr('src', perk.img_url);
        $('#perk' + (i + 1) + '-caption').text(build.perks[i]);
        $('#perk' + (i + 1) + '-url').protipSet({
            title: perk.description,
        });
    }
    for (let i = 0; i <= 1; i++) {
        let addon = addons[build.addons[i]]
        $('#addon' + (i + 1) + '-url').attr('href', addon.url);
        $('#addon' + (i + 1) + '-img').attr('src', addon.img_url);
        $('#addon' + (i + 1) + '-caption').text(build.addons[i]);
        $('#addon' + (i + 1) + '-url').protipSet({
            title: addon.description,
        });
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
        let content = trs.eq(index).text().toUpperCase();
        if (content.indexOf(mainInput) > -1) {
            trs.eq(index).fadeIn('fast');
        } else {
            trs.eq(index).fadeOut('fast');
        }
    })
}