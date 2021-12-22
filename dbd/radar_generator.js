let urlParam = new URLSearchParams(window.location.search);

// setup radar chart
let killer_labels = ["Stealth", "Informative", "1V1", "Anti-Gens", "Anti-Healing", "Terrorizing", "Clutch", "Map Pressure", "Anti-Information", "Special Effects"]
let survivor_labels = ["Cleansing", "Informative", "Team-Oriented", "Repairing", "Healing", "Clutch", "Stealth", "Self-Sufficient", "Looping", "Looting"]
let mode = urlParam.get("mode");
let code = urlParam.get("code");

let labels = [];

let main_set;
let perk_set;

if (mode == 'Killer') {
    labels = killer_labels;
    main_set = killers;
    perk_set = killer_perks;
} else if (mode == 'Survivor') {
    $('#main-title').text('Select Your Item')
    $('#character-img').attr('src', 'images/item.png')
    $('#character-caption').text('Item')
    labels = survivor_labels;
    main_set = items;
    perk_set = survivor_perks;
} else {
    alert(
        "Please click on the DBD Logo and navigate the site using the buttons."
    );
}

let main_keys = Object.keys(main_set)
let perk_keys = Object.keys(perk_set)

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

let myChart = new Chart(document.getElementById('radar'), config)

/*
setTimeout(() => {
    myChart.data.datasets[0].data = [14, 3, 5, 12, 2, 1, 1, 7, 8, 9]
    myChart.update()
}, 2000);

setTimeout(() => {
    myChart.data.datasets[0].data = [12, 3, 5, 12, 5, 1, 1, 7, 8, 9]
    myChart.update()
}, 4000);
*/

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

let proxy = "https://dreamland.zawackis.com:12399/";

// attempt to load saved build, if any
if (code != null) {
    if (!code.match(/m\d+p\d+p\d+p\d+p\d+a\d+a\d+/g)) {
        alert('Invalid Code.');
    } else {
        let values = code.match(/\d+/g);
        if (values[0] == 999) {
            chooseMain('Clear');
        } else {
            chooseMain(main_keys[values[0]]);
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
                chooseAddon(i, main_set[mainChoice].addons[values[i + 5]]);
            }
        }
    }
}

// 1. generate main (killer / item) modal data
if (mode == 'Killer') {
    main_modal.find('.byo-modal-content').append('<button onclick="chooseMain(\'Clear\')"><img src="images/killer.png" style="width:128px; height:128px;"><figcaption>Reset</figcaption></button>');
    for (let main in main_set) {
        let new_button = '<button id="' + main.replace(/\s/g, '') + '" class="protip" data-pt-width="300" data-pt-position="top" data-pt-scheme="black" data-pt-delay-out="100" data-pt-title="" data-pt-trigger="hover" onclick="chooseMain(\'' + encodeURIComponent(main).replace(/[!'()*]/g, escape) + '\')"><img src="' + main_set[main].img_url + '" style="width:128px; height:128px;"><figcaption>' + main + '</figcaption></button>'
        main_modal.find('.byo-modal-content').append(new_button);
        $.get(proxy + main_set[main].url, function(response) {
            let info = $(response)
                .find("#Overview")
                .parent()
                .findNext("p")

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

            $("#" + main.replace(/\s/g, '')).protipSet({
                title: '<p style="color: lightgrey; font-style: italic;">' + resulting_title + '</p>'
            });
        });
    }
} else if (mode == 'Survivor') {
    main_modal.find('.byo-modal-content').append('<input type="text" id="mainInput" onkeyup="filter(\'main\')" placeholder="Search..." style="width: 60%"><table id="mainTable" class="table-hover" style="table-layout:fixed;"><tbody>');
    // 1 extra row for clear option
    main_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"><td><button onclick="chooseMain(\'Clear\')"><img src="images/item.png" style="width:128px; height:128px;"><figcaption>Reset</figcaption></button></td><td>Clear your current selection.</td></tr>');
    for (let main in main_set) {
        main_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"></tr>');
    }

    for (let i = 0; i < main_keys.length; i++) {
        $.get(proxy + main_set[main_keys[i]].url, function(response) {
            // create element that doesn't need response
            let new_button = '<button onclick="chooseMain(\'' + encodeURIComponent(main_keys[i]).replace(/[!'()*]/g, escape) + '\')"><img src="' + main_set[main_keys[i]].img_url + '" style="width:128px; height:128px;"><figcaption>' + main_keys[i] + '</figcaption></button>'
            let new_desc = ''

            let info = $(response)
                .find(".wikitable")
                .first()
                .find("td")
                .first()

            info.find("a").each(function() {
                $(this).attr("href", "");
                if ($(this).has("img")) {
                    $(this).find("img").remove();
                }
            });

            new_desc = info
                .html()
                .replaceAll('style="', 'style="font-weight: bold; ')
                .replaceAll("<li>", "<span>")
                .replaceAll("</li>", "</span>")
                .replaceAll("<ul>", "")
                .replaceAll("</ul>", "")
                .replaceAll("<a", "<span")
                .replaceAll("</a>", "</span>")
                .replaceAll("<br>", "<br>")
                .replaceAll(" .", ".")
                .replaceAll("  ", " ")
                .replaceAll("'''", "")
                .replaceAll("* ", "")
                .replaceAll("''", "")
                .replaceAll("&nbsp;%", "%");

            // append resulting data to modal
            main_modal.find('.byo-modal-content').find('tr').eq(i + 1).html('<td style="vertical-align: middle; padding: 10px;">' + new_button + '</td><td style="vertical-align: middle; padding-top: 10px;">' + new_desc + '</td>');
        });
    }
}

// 2. generate perk modal data
perk_modal.find('.byo-modal-content').append('<input type="text" id="perkInput" onkeyup="filter(\'perk\')" placeholder="Search for perk..." style="width: 60%"><table id="perkTable" class="table-hover" style="table-layout:fixed;"><tbody>');
// 1 extra row for clear option
perk_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"><td><button onclick="choosePerk(perkIndex, \'Clear\')"><img src="images/blank.png" style="width:128px; height:128px;"><figcaption>Reset</figcaption></button></td><td>Clear your current selection.</td></tr>');
for (let perk in perk_set) {
    perk_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"></tr>');
}
perk_modal.find('.byo-modal-content').append('</tbody></table>');

for (let i = 0; i < perk_keys.length; i++) {
    $.get(proxy + perk_set[perk_keys[i]].url, function(response) {
        // create element that doesn't need response
        let new_button = '<button onclick="choosePerk(perkIndex, \'' + encodeURIComponent(perk_keys[i]).replace(/[!'()*]/g, escape) + '\')"><img src="' + perk_set[perk_keys[i]].img_url + '" style="width:128px; height:128px;"><figcaption>' + perk_keys[i] + '</figcaption></button>'
        let new_desc = ''

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

        new_desc = info
            .html()
            .replaceAll('style="', 'style="font-weight: bold; ')
            .replaceAll("<li>", "<span>")
            .replaceAll("</li>", "</span>")
            .replaceAll("<ul>", "")
            .replaceAll("</ul>", "")
            .replaceAll("<a", "<span")
            .replaceAll("</a>", "</span>")
            .replaceAll("<br>", "<br>")
            .replaceAll(" .", ".")
            .replaceAll("  ", " ")
            .replaceAll("'''", "")
            .replaceAll("* ", "")
            .replaceAll("''", "")
            .replaceAll("&nbsp;%", "%");

        // append resulting data to modal
        // console.log(perk_modal.find('.byo-modal-content').find('tr').get(i));
        perk_modal.find('.byo-modal-content').find('tr').eq(i + 1).html('<td style="vertical-align: middle; padding: 10px;">' + new_button + '</td><td style="vertical-align: middle; padding-top: 10px;">' + new_desc + '</td>');
    });
}

// finalize main choice
function chooseMain(main) {
    main = decodeURIComponent(main)
    mainChoice = main;
    if (main == 'Clear') {
        mainChoice = '';
        if (mode == 'Killer') {
            $('#character-img').attr('src', 'images/killer.png')
            $('#character-caption').text("Killer");
        } else if (mode == 'Survivor') {
            $('#character-img').attr('src', 'images/item.png')
            $('#character-caption').text("Item");
        }
        $("#main-button").protipSet({
            title: ''
        });
    } else {
        $('#character-img').attr('src', main_set[main].img_url)
        $('#character-caption').text(main);
        $.get(proxy + main_set[main].url, function(response) {
            let info = $(response)
                .find("#Overview")
                .parent()
                .findNext("p");

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

            $("#main-button").protipSet({
                title: '<p style="color: lightgrey; font-style: italic;">' + resulting_title + '</p>'
            });
        });

        // update addon modal based on main
        addon_modal.find('.byo-modal-content').empty();
        addon_modal.find('.byo-modal-content').append('<input type="text" id="addonInput" onkeyup="filter(\'addon\')" placeholder="Search for addon..." style="width: 60%"><table id="addonTable" class="table-hover" style="table-layout:fixed;"><tbody>');
        // 1 extra row for clear option
        addon_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"><td><button onclick="chooseAddon(addonIndex, \'Clear\')"><img src="images/addon.png" style="width:128px; height:128px;"><figcaption>Reset</figcaption></button></td><td>Clear your current selection.</td></tr>)');
        for (let perk in perk_set) {
            addon_modal.find('.byo-modal-content').find('tbody').eq(0).append('<tr style="border-bottom:1px solid grey"></tr>');
        }

        main_set[main].addons.forEach(function(addon, i) {
            console.log(addon);
            $.get(proxy + addons[addon].url, function(response) {
                // create element that doesn't need response
                let new_button = '<button onclick="chooseAddon(addonIndex, \'' + encodeURIComponent(addon).replace(/[!'()*]/g, escape) + '\')"><img src="' + addons[addon].img_url + '" style="width:128px; height:128px;"><figcaption>' + addon + '</figcaption></button>'
                let new_desc = ''

                let info = $(response)
                    .find(".wikitable")
                    .first()
                    .find("td")
                    .first()

                info.find("a").each(function() {
                    $(this).attr("href", "");
                    if ($(this).has("img")) {
                        $(this).find("img").remove();
                    }
                });

                new_desc = info
                    .html()
                    .replaceAll('style="', 'style="font-weight: bold; ')
                    .replaceAll("<li>", "<span>")
                    .replaceAll("</li>", "</span>")
                    .replaceAll("<ul>", "")
                    .replaceAll("</ul>", "")
                    .replaceAll("<a", "<span")
                    .replaceAll("</a>", "</span>")
                    .replaceAll("<br>", "<br>")
                    .replaceAll(" .", ".")
                    .replaceAll("  ", " ")
                    .replaceAll("'''", "")
                    .replaceAll("* ", "")
                    .replaceAll("''", "")
                    .replaceAll("&nbsp;%", "%");

                // append resulting data to modal
                // console.log(perk_modal.find('.byo-modal-content').find('tr').get(i));
                addon_modal.find('.byo-modal-content').find('tr').eq(i + 1).html('<td style="vertical-align: middle; padding: 10px;">' + new_button + '</td><td style="vertical-align: middle; padding-top: 10px;">' + new_desc + '</td>');
            });
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

    // remove title then re-add one second later
    $('#' + main).protip().hide();

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
        $('#perk' + (i + 1) + '-img').attr('src', perk_set[perk].img_url)
        $('#perk' + (i + 1) + '-caption').text(perk);

        $.get(proxy + perk_set[perk].url, function(response) {
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

            $("#perk" + (i + 1) + "-button").protipSet({
                title: '<p style="color: lightgrey; font-style: italic;">' + resulting_title + '</p>'
            });
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

        $.get(proxy + addons[addon].url, function(response) {
            let info = $(response)
                .find(".wikitable")
                .first()
                .find("td")
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

            $("#addon" + (i + 1) + "-button").protipSet({
                title: '<p style="color: lightgrey; font-style: italic;">' + resulting_title + '</p>'
            });
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
        labels.forEach(function(value, i) {
            new_data[i] += main_set[mainChoice][value];
        });
    }

    perkChoices.forEach(function(choice, i) {
        if (choice != '') {
            let perk = perk_set[choice];
            labels.forEach(function(value, i) {
                new_data[i] += perk[value];
            });
        }
    })

    addonChoices.forEach(function(choice, i) {
        if (choice != '') {
            let addon = addons[choice];
            labels.forEach(function(value, i) {
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

    trs.each(function(index) {
        let mainName = trs.eq(index).find('figcaption').text().toUpperCase();
        if (mainName.indexOf(mainInput) > -1) {
            trs.eq(index).fadeIn('fast');
        } else {
            trs.eq(index).fadeOut('fast');
        }
    })
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

$(window).click(function(event) {
    if (event.target.id == main_modal.attr('id')) {
        main_modal.fadeOut('fast');
    } else if (event.target.id == perk_modal.attr('id')) {
        perk_modal.fadeOut('fast');
    } else if (event.target.id == addon_modal.attr('id')) {
        addon_modal.fadeOut('fast');
    }
});

// TODO: determine where it came from and update appropriate protip
// update protips
function descUpdate(item) {
    let proxy = "https://dreamland.zawackis.com:12399/";
    let url = $("#" + item + "-url").attr("href");
    if (url.includes("https://")) {
        if (item.includes("perk")) {
            $.get(proxy + url, function(response) {
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

                $("#" + item + "-url").protipSet({
                    title: resulting_title
                });
            });
        } else if (item.includes("addon")) {
            console.log("addon!");
            $.get(proxy + url, function(response) {
                let info = $(response)
                    .find(".wikitable")
                    .first()
                    .find("tr")
                    .last()
                    .find("td")
                    .first();
                info.find("a").each(function() {
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

function copyBuildURL() {
    $("#browser-source").css("color", "lightgreen");

    let prevVal = $("#browser-source").text()

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
            link += 'a' + main_set[mainChoice].addons.indexOf(addonChoices[choice]);
        } else {
            link += 'a999';
        }
    }

    navigator.clipboard.writeText(link);
    $("#browser-source").text("Copied!");

    setTimeout(() => {
        $("#browser-source").text(prevVal);
        $("#browser-source").css("color", "lightslategray");
    }, 1000);
}

// from https://stackoverflow.com/questions/30281166/jquery-this-this-next-next-works-but-this-next-div-does-not
// get the next sibling that matches the selector
// only processes the first item in the passed in jQuery object
// designed to return a jQuery object containing 0 or 1 DOM elements
jQuery.fn.findNext = function(selector) {
    return this.eq(0).nextAll(selector).eq(0);
}