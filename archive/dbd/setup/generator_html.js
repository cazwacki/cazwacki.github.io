// main & addons
let main_div = document.createElement('div');
main_div.id = "main-addons";
main_div.classList.add("mx-auto", "row", "justify-content-center");

let addons_col = document.createElement('div');
addons_col.classList.add("col");
addons_col.append(build_component("addon1", "top", "addon-img", "images/addon.png", "h5", false),
    build_component("addon2", "top", "addon-img", "images/addon.png", "h5", false));

main_div.append(build_component("main", "left", "main-img", mode === "Survivor" ? "images/survivor.png" : "images/killer.png", "h4", true),
    addons_col);

// perks
let perk_div = document.createElement('div');
perk_div.id = "perk-set";
perk_div.classList.add("mx-auto", "row", "justify-content-center");

for (let i = 0; i < 4; i++) {
    perk_div.append(build_component("perk" + (i + 1).toString(), "bottom", "perk-img", "images/blank.png", "h5", true));
}

document.getElementsByClassName("fadeIn")[0].prepend(
    document.createElement('br'),
    main_div,
    perk_div
);

/**
 * Builds out a component consisting of a protip reference, a link, an image,
 * and a caption. This is better than copying and pasting as it lets me put
 * integral changes all in one place and propogate them across the generators.
 * 
 * @param {string} string The component being changed (ex. main, addon1, addon2)
 * @param {string} protip_position Where the protip should pop up
 * @param {string} img_type The image type (main, addon, perk)
 * @param {string} img_path The path to the default image
 * @param {string} caption_size h-size of the caption (h6, h5, etc.)
 * @param {boolean} with_col Whether to wrap it in a div with class "col"
 * @returns the component as a fully populated element
 */
function build_component(string, protip_position, img_type, img_path, caption_size, with_col) {
    let a = document.createElement('a');
    a.id = string + "-url"
    a.classList.add("protip");
    a.setAttribute("data-pt-width", 300);
    a.setAttribute("data-pt-position", protip_position);
    a.setAttribute("data-pt-scheme", "black");
    a.setAttribute("data-pt-delay-out", 100);
    a.setAttribute("data-pt-trigger", "hover");
    a.setAttribute("href", "");
    a.setAttribute("target", "_blank");

    let img = document.createElement('img');
    img.id = string + "-img";
    img.classList.add(img_type);
    img.src = img_path;

    let figcaption = document.createElement('figcaption');
    figcaption.id = string + "-caption";
    figcaption.classList.add(caption_size, "perk-caption");
    figcaption.innerHTML = string;

    a.append(img, figcaption);

    if (with_col) {
        let col_div = document.createElement('div');
        col_div.classList.add('col');
        col_div.append(a);
        return col_div;
    } else {
        return a;
    }
}