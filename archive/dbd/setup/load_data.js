let urlParam = new URLSearchParams(window.location.search);

let mode = urlParam.get("mode");

let main_loop = "./images/" + mode.toLowerCase() + "_loop.gif"
let perk_loop = "./images/" + mode.toLowerCase() + "_perk_loop"
let addon_loop = "./images/" + mode.toLowerCase() + "_addon_loop"

let main_ready = false;
let perks_ready = false;
let addons_ready = false;

let mains;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/' + (mode == "Survivor" ? 'items' : 'killers') + '.json', function (response) {
    mains = response;
    main_ready = true;
});

let perks;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/perks.json', function (response) {
    perks = response;
    perks = Object.fromEntries(
        Object.entries(perks).filter(([key, value]) => value.role == mode.toLowerCase()));
    perks_ready = true;
});

let addons;
$.getJSON('https://raw.githubusercontent.com/cazwacki/periodic-dbd-data/master/addons.json', function (response) {
    addons = response;
    addons_ready = true;
});