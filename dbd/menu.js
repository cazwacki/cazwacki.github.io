let header = document.getElementById('header');
let footer = document.getElementById('footer');
let hamburger = document.getElementById('hamburger');
let menu = document.getElementById('nav-menu');

$("#nav-menu").css('top', header.offsetHeight);
$(document.body).css('padding-top', header.offsetHeight);

hamburger.addEventListener('click', function() {
    const header_rect = header.getBoundingClientRect();
    const footer_rect = footer.getBoundingClientRect();
    $("#nav-menu").css('height', (footer_rect.top - header_rect.bottom) + 'px');

    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
})