// setup radar chart
let killer_labels = ["Stealth", "Informative", "1V1", "Anti-Gens", "Anti-Healing", "Terrorizing", "Clutch", "Map Pressure", "Anti-Information", "Special Effects"]
let survivor_labels = ["Cleansing", "Informative", "Team-Oriented", "Repairing", "Healing", "Clutch", "Stealth", "Self-Sufficient", "Looping", "Looting"]
let code = urlParam.get("code");
let build = urlParam.get("build");

if (build != null) {
    // decode and place in input text
    console.log(decodeURIComponent(atob(build)));
    $('#title').val(decodeURIComponent(atob(build)));
}

let labels = [];

// setup selection system
let mainChoice = '';
let perkChoices = ['', '', '', ''];
let addonChoices = ['', ''];

let perkIndex = 0;
let addonIndex = 0;

// setup menus
let main_modal = $('#main-modal');
let perk_modal = $('#perk-modal');
let addon_modal = $('#addon-modal');

let main_keys;
let perk_keys;

labels = mode == 'Killer' ? killer_labels : survivor_labels;

if (mode != "Killer" && mode != "Survivor") {
    alert(
        "Please click on the DBD Logo and navigate the site using the buttons."
    );
}

let data = {
    labels: labels,
    datasets: [{
        label: '',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: true,
        radius: 3,
        backgroundColor: 'rgba(175, 39, 0, 0.3)',
        borderColor: 'rgb(80, 80, 80)',
        pointBackgroundColor: 'rgb(127, 124, 104)',
        pointBorderColor: 'rgb(29, 14, 7)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        color: 'rgb(255, 255, 255)'
    }]
}

const config = {
    type: 'radar',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                borderWidth: 1
            }
        },
        scales: {
            r: {
                min: -1,
                max: 10,
                ticks: {
                    showLabelBackdrop: false,
                    stepSize: 5,
                    color: 'white'
                },
                pointLabels: {
                    color: 'white',
                    font: {
                        size: 12
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    circular: true
                }
            }
        },
        plugins: {
            legend: false
        }
    }
}

let myChart = new Chart(document.getElementById('radar'), config);

$('#main-img').attr('src', 'images/' + mode.toLowerCase() + '.png');
$('#main-caption').text(mode == "Killer" ? "Killer" : "Item");

waitToInitialize();
function waitToInitialize() {
    if (main_ready && perks_ready && addons_ready) {
        main_keys = Object.keys(mains).sort();
        perk_keys = Object.keys(perks).sort();
        initialize();
    } else {
        setTimeout(() => { waitToInitialize(); }, 200);
    }
}

function initialize() {
    // attempt to load saved build, if any
    if (code != null) {
        if (!code.match(/m\d+p\d+p\d+p\d+p\d+a\d+a\d+/g)) {
            alert('Invalid Code.');
        } else {
            let values = code.match(/\d+/g);
            if (values[0] == 999) {
                chooseMain('Clear');
            } else {
                console.log(main_keys[values[0]]);
                chooseMain(encodeURIComponent(main_keys[values[0]]).replace(/[!'()*]/g, escape));
            }

            for (let i = 0; i < 4; i++) {
                if (values[i + 1] == 999) {
                    choosePerk(i, 'Clear');
                } else {
                    perkIndex = i;
                    choosePerk(i, perk_keys[values[i + 1]]);
                }
            }

            for (let i = 0; i < 2; i++) {
                if (values[i + 5] == 999) {
                    chooseAddon(i, 'Clear');
                } else {
                    addonIndex = i;
                    chooseAddon(i, mains[mainChoice].addons[values[i + 5]]);
                }
            }
        }
    }

    // 1. generate main (killer / item) modal data
    if (mode == 'Killer') {
        main_modal.find('.byo-modal-content').append('<button onclick="chooseMain(\'Clear\')"><img src="images/killer.png" style="width:128px; height:128px;"><figcaption>Reset</figcaption></button>');
        for (let main in mains) {
            if (mains[main].addons !== undefined) {
                let new_button = '<button id="' + main.replace(/\s/g, '') + '" class="protip" data-pt-width="300" data-pt-position="top" data-pt-scheme="black" data-pt-delay-out="100" data-pt-title="" data-pt-trigger="hover" onclick="chooseMain(\'' + encodeURIComponent(main).replace(/[!'()*]/g, escape) + '\')"><img src="' + mains[main].img_url + '" style="width:128px; height:128px;"><figcaption>' + main + '</figcaption></button>'
                main_modal.find('.byo-modal-content').append(new_button);
                $("#" + main.replace(/\s/g, '')).protipSet({
                    title: mains[main].description
                });
            }
        }
    } else if (mode == 'Survivor') {
        main_modal.find('.byo-modal-content').append('<input type="text" id="mainInput" class="fw-normal text-light rounded" onkeyup="filter(\'main\')" placeholder="Search..." style="width: 60%"><table id="mainTable" class="table-hover" style="table-layout:fixed;"><tbody>');
        // 1 extra row for clear option
        main_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"><td><button onclick="chooseMain(\'Clear\')"><img src="images/survivor.png" style="width:128px; height:128px;"><figcaption>Reset</figcaption></button></td><td>Clear your current selection.</td></tr>');
        let i = 0;
        for (let main in mains) {
            if (mains[main].addons !== undefined) {
                console.log(mains[main]);
                main_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"></tr>');
                let new_button = '<button onclick="chooseMain(\'' + encodeURIComponent(main).replace(/[!'()*]/g, escape) + '\')"><img src="' + mains[main].img_url + '" style="width:128px; height:128px;"><figcaption>' + main + '</figcaption></button>'
                let new_desc = mains[main].description;
                main_modal.find('.byo-modal-content').find('tr').eq(i + 1).html('<td style="vertical-align: middle; padding: 10px;">' + new_button + '</td><td style="vertical-align: middle; padding-top: 10px; max-width: 60%;">' + new_desc + '</td>');
                i++;
            }
        }
    }

    // 2. generate perk modal data
    perk_modal.find('.byo-modal-content').append('<input type="text" id="perkInput" class="fw-normal text-light rounded" onkeyup="filter(\'perk\')" placeholder="Search for perk..." style="width: 60%"><table id="perkTable" class="table-hover" style="table-layout:fixed;"><tbody>');
    // 1 extra row for clear option
    perk_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"><td><button onclick="choosePerk(perkIndex, \'Clear\')"><img src="images/blank.png" style="width:128px; height:128px;"><figcaption>Reset</figcaption></button></td><td>Clear your current selection.</td></tr>');
    for (let perk in perks) {
        perk_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"></tr>');
    }
    perk_modal.find('.byo-modal-content').append('</tbody></table>');

    for (let i = 0; i < perk_keys.length; i++) {
        let new_button = '<button onclick="choosePerk(perkIndex, \'' + encodeURIComponent(perk_keys[i]).replace(/[!'()*]/g, escape) + '\')"><img src="' + perks[perk_keys[i]].img_url + '" style="width:128px; height:128px;"><figcaption>' + perk_keys[i] + '</figcaption></button>'
        let new_desc = perks[perk_keys[i]].description;
        perk_modal.find('.byo-modal-content').find('tr').eq(i + 1).html('<td style="vertical-align: middle; padding: 10px;">' + new_button + '</td><td style="vertical-align: middle; padding-top: 10px;">' + new_desc + '</td>');
    }
}

// finalize main choice
function chooseMain(main) {
    main = decodeURIComponent(main)
    mainChoice = main;
    if (main == 'Clear') {
        mainChoice = '';
        $('#main-img').attr('src', 'images/' + mode.toLowerCase() + '.png');
        $('#main-caption').text(mode == "Killer" ? "Killer" : "Item");
        $("#main-button").protipSet({
            title: ''
        });
    } else {
        $('#main-img').attr('src', mains[main].img_url)
        $('#main-caption').text(main);
        $("#main-button").protipSet({
            title: mains[main].description
        });

        // update addon modal based on main
        addon_modal.find('.byo-modal-content').empty();
        addon_modal.find('.byo-modal-content').append('<input type="text" id="addonInput" class="fw-normal text-light rounded" onkeyup="filter(\'addon\')" placeholder="Search for addon..." style="width: 60%"><table id="addonTable" class="table-hover" style="table-layout:fixed;"><tbody>');
        // 1 extra row for clear option
        addon_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"><td><button onclick="chooseAddon(addonIndex, \'Clear\')"><img src="images/addon.png" style="width:128px; height:128px;"><figcaption>Reset</figcaption></button></td><td>Clear your current selection.</td></tr>)');
        for (let perk in perks) {
            addon_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"></tr>');
        }

        mains[main].addons.forEach(function (addon, i) {
            console.log(addon);
            // create element that doesn't need response
            let new_button = '<button onclick="chooseAddon(addonIndex, \'' + encodeURIComponent(addon).replace(/[!'()*]/g, escape) + '\')"><img src="' + addons[addon].img_url + '" style="width:128px; height:128px;"><figcaption>' + addon + '</figcaption></button>'
            let new_desc = addons[addon].description;
            addon_modal.find('.byo-modal-content').find('tr').eq(i + 1).html('<td style="vertical-align: middle; padding: 10px;">' + new_button + '</td><td style="vertical-align: middle; padding-top: 10px;">' + new_desc + '</td>');
        });
    }

    chooseAddon(0, 'Clear');
    chooseAddon(1, 'Clear');

    // hide modal and clear typing
    main_modal.fadeOut('fast');
    if (mode == 'Survivor') {
        setTimeout(() => {
            $('#mainInput').val('');
            filter('main');
        }, 200);
    }

    if (mode == 'Killer') {
        $('#' + main.replaceAll(' ', '')).protipHide();
    }

    refreshChart();
}

// finalize perk choice
function choosePerk(i, perk) {
    perk = decodeURIComponent(perk);
    if (perkChoices.includes(perk)) {
        alert('You\'ve already selected this perk!');
        return
    }

    if (perk == 'Clear') {
        perkChoices[i] = '';
        $('#perk' + (i + 1) + '-img').attr('src', 'images/blank.png')
        $('#perk' + (i + 1) + '-caption').text("Perk");
        $("#perk" + (i + 1) + "-button").protipSet({
            title: ''
        });
    } else {
        perkChoices[i] = perk;
        $('#perk' + (i + 1) + '-img').attr('src', perks[perk].img_url)
        $('#perk' + (i + 1) + '-caption').text(perk);
        $("#perk" + (i + 1) + "-button").protipSet({
            title: perks[perk].description
        });
    }

    // hide modal and clear typing
    perk_modal.fadeOut('fast');
    setTimeout(() => {
        $('#perkInput').val('');
        filter('perk');
    }, 200);

    refreshChart();
}

// finalize addon choice
function chooseAddon(i, addon) {
    addon = decodeURIComponent(addon);
    if (addonChoices.includes(addon)) {
        alert('You\'ve already selected this addon!');
        return
    }
    addonChoices[i] = addon;
    if (addon == 'Clear') {
        addonChoices[i] = '';
        $('#addon' + (i + 1) + '-img').attr('src', 'images/addon.png')
        $('#addon' + (i + 1) + '-caption').text("Addon");
        $("#addon" + (i + 1) + "-button").protipSet({
            title: ''
        });
    } else {
        $('#addon' + (i + 1) + '-img').attr('src', addons[addon].img_url)
        $('#addon' + (i + 1) + '-caption').text(addon);
        $("#addon" + (i + 1) + "-button").protipSet({
            title: addons[addon].description
        });
    }

    // hide modal and clear typing
    addon_modal.fadeOut('fast');
    setTimeout(() => {
        $('#addonInput').val('');
        filter('addon');
    }, 200);

    refreshChart();
}

// refresh chart
function refreshChart() {
    // recalculate data
    let new_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    // add data values based on each choice
    if (mainChoice != '') {
        labels.forEach(function (value, i) {
            new_data[i] += mains[mainChoice][value];
        });
    }

    perkChoices.forEach(function (choice, i) {
        if (choice != '') {
            let perk = perks[choice];
            labels.forEach(function (value, i) {
                new_data[i] += perk[value];
            });
        }
    })

    addonChoices.forEach(function (choice, i) {
        if (choice != '') {
            let addon = addons[choice];
            labels.forEach(function (value, i) {
                new_data[i] += addon[value];
            });
        }
    })

    myChart.data.datasets[0].data = new_data;
    myChart.update();
}

// navigation functions
function displayMainModal() {
    main_modal.fadeIn('fast');
}

function filter(type) {
    let mainInput = $('#' + type + 'Input').val().toUpperCase();
    let table = $('#' + type + 'Table');
    let trs = table.find('tr');

    trs.each(function (index) {
        let mainName = trs.eq(index).find('figcaption').text().toUpperCase();
        if (mainName.indexOf(mainInput) > -1) {
            trs.eq(index).fadeIn('fast');
        } else {
            trs.eq(index).fadeOut('fast');
        }
    })
}

function updateBuildName() {
    build = encodeURIComponent(btoa($('#title').val()));
}

function displayPerkModal(index) {
    perkIndex = index;
    perk_modal.fadeIn('fast');
}

function displayAddonModal(index) {
    if (mainChoice == '') {
        let selection;
        if (mode == 'Survivor') {
            selection = 'an item.'
        } else if (mode == 'Killer') {
            selection = 'a killer.'
        }
        alert('Please select ' + selection)
    } else {
        addonIndex = index;
        addon_modal.fadeIn('fast');
    }
}

$(window).click(function (event) {
    if (event.target.id == main_modal.attr('id')) {
        main_modal.fadeOut('fast');
    } else if (event.target.id == perk_modal.attr('id')) {
        perk_modal.fadeOut('fast');
    } else if (event.target.id == addon_modal.attr('id')) {
        addon_modal.fadeOut('fast');
    }
});

function copyBuildURL() {

    let prevVal = $("#copy-build").text();

    // calculate the link
    let link = 'https://charles.zawackis.com/dbd/radar.html?mode=' + mode + '&code='
    if (mainChoice != '') {
        link += 'm' + main_keys.indexOf(mainChoice);
    } else {
        link += 'm999';
    }
    for (let choice in perkChoices) {
        if (perkChoices[choice] != '') {
            console.log(perkChoices[choice]);
            link += 'p' + perk_keys.indexOf(perkChoices[choice]);
        } else {
            link += 'p999';
        }
    }
    for (let choice in addonChoices) {
        if (mainChoice != '' && addonChoices[choice] != '') {
            link += 'a' + mains[mainChoice].addons.indexOf(addonChoices[choice]);
        } else {
            link += 'a999';
        }
    }

    if (build != null && build != '') {
        link += '&build=' + build;
    }

    navigator.clipboard.writeText(link);
    $("#copy-build").text("Copied!");

    setTimeout(() => {
        $("#copy-build").text(prevVal);
        $("#copy-build").css("color", "lightslategray");
    }, 1000);
}

// from https://stackoverflow.com/questions/30281166/jquery-this-this-next-next-works-but-this-next-div-does-not
// get the next sibling that matches the selector
// only processes the first item in the passed in jQuery object
// designed to return a jQuery object containing 0 or 1 DOM elements
jQuery.fn.findNext = function (selector) {
    return this.eq(0).nextAll(selector).eq(0);
}