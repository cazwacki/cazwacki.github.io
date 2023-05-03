/**
 * Plays the slot machine animation, then after the timeout sets the new build
 * data in the page and fades it in. See "setBuild" for the expected structure
 * of build.
 */
function presentBuild(build) {
    slotMachine();
    setTimeout(() => {
        setBuild(build);
        fadeIn();
    }, 1500);
}

/**
 * Sets the HTML elements to the contents of the new build. 
 * build                
 *   |--- main          (killer / item, populated from periodic-dbd-data and include name)
 *   |--- perks[4]      (perks of the build, populated from periodic-dbd-data and include name)
 *   |--- addons[2]     (addons of the build, populated from periodic-dbd-data and include name)
 *   |--- name          (build name, may be null)
 *   |--- explanation   (explanation of the build, may be null)
 */
function setBuild(build) {
    if (build.name) {
        $("#title").text(build.name);
    }

    if (build.explanation) {
        $("#explanation").text(build.explanation);
    }

    // killer / item
    $("#main-caption").text(build.main.name);
    $("#main-url").attr("href", build.main.url);
    $("#main-img").attr("src", build.main.img_url);
    $("#main-url").protipSet({
        title: build.main.description
    });

    // addons
    for (let i = 0; i < 2; i++) {
        $("#addon" + (i + 1).toString() + "-caption").text(build.addons[i].name);
        $("#addon" + (i + 1).toString() + "-url").attr("href", build.addons[i].url);
        $("#addon" + (i + 1).toString() + "-img").attr("src", build.addons[i].img_url);
        $("#addon" + (i + 1).toString() + "-url").protipSet({
            title: build.addons[i].description
        });
    }

    // perks
    for (let i = 0; i < 4; i++) {
        $("#perk" + (i + 1).toString() + "-caption").text(build.perks[i].name);
        $("#perk" + (i + 1).toString() + "-url").attr("href", build.perks[i].url);
        $("#perk" + (i + 1).toString() + "-img").attr("src", build.perks[i].img_url);
        $("#perk" + (i + 1).toString() + "-url").protipSet({
            title: build.perks[i].description
        });
    }

}

/**
 * Fire off slot machine style animation for perks, killer / item, and addons.
 * Sets all text to "???", resets links, and plays the animation.
 */
function slotMachine() {
    $("#explanation").text("???");

    // killer / item
    $("#main-caption").text("???");
    $("#main-url").attr("href", "");
    $("#main-img").attr("src", main_loop);

    // addons
    for (let i = 0; i < 2; i++) {
        $("#addon" + (i + 1).toString() + "-caption").text("???");
        $("#addon" + (i + 1).toString() + "-url").attr("href", "");
        setTimeout(() => { $("#addon" + (i + 1).toString() + "-img").attr("src", addon_loop + i.toString() + ".gif") }, 500 + 250 * i);
    }

    // perks
    for (let i = 0; i < 4; i++) {
        $("#perk" + (i + 1) + "-caption").text("???");
        $("#perk" + (i + 1) + "-url").attr("href", "");
        setTimeout(() => { $("#perk" + (i + 1) + "-img").attr("src", perk_loop + i + ".gif") }, 250 * i);
    }

}

/**
 * Make perks, killer / item, and addons instantly disappear, then fade in.
 * The class that makes this effect occur is removed after the effect plays.
 * Intended to be used with a timeout after calling slotMachine.
 */
function fadeIn() {
    // killer / item
    $("#main-caption").addClass("fadeIn");
    $("#main-img").addClass("fadeIn");
    setTimeout(
        (a, b) => {
            a.removeClass("fadeIn");
            b.removeClass("fadeIn");
        },
        1500,
        $("#main-caption"),
        $("#main-img")
    );

    // addons
    for (let i = 0; i < 2; i++) {
        $("#addon" + (i + 1).toString() + "-caption").addClass("fadeIn");
        $("#addon" + (i + 1).toString() + "-img").addClass("fadeIn");
        setTimeout(
            (a, b) => {
                a.removeClass("fadeIn");
                b.removeClass("fadeIn");
            },
            1500,
            $("#addon" + (i + 1).toString() + "-caption"),
            $("#addon" + (i + 1).toString() + "-img")
        );
    }

    // perks
    for (let i = 0; i < 4; i++) {
        $("#perk" + (i + 1).toString() + "-caption").addClass("fadeIn");
        $("#perk" + (i + 1).toString() + "-img").addClass("fadeIn");
        setTimeout(
            (a, b) => {
                a.removeClass("fadeIn");
                b.removeClass("fadeIn");
            },
            1500,
            $("#perk" + (i + 1).toString() + "-caption"),
            $("#perk" + (i + 1).toString() + "-img")
        );
    }
}