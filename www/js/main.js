var position = [0,0];
var resize = [0,0];
var isResize = [false, false];

$(function(){

    $("#heading").mousedown(function (e) {
        if ($(this).parents("#content").hasClass("fullscreen")) {
            return;
        }
        position = [e.pageX, e.pageY];
        e.preventDefault();
        $(this).addClass("grabbing");
    }).mousemove(moveWindow).mouseup(remGrab).mouseleave(remGrab);

    $("#content").mousedown(function (e) {
        if ($(this).hasClass("fullscreen")) {
            return;
        }
        resize = [e.offsetX,e.offsetY];
        e.preventDefault();
    }).mouseup(function (e) {
        e.preventDefault();
        isResize = [false, false];
    }).mouseleave(function(e) {e.preventDefault();}).mousemove(resizeWindow);

    $("#fullscreen").click(function () {
        $(this).parents("#content").toggleClass("fullscreen");
    });

    $("#exit").click(toggleWindow);

    $("#icon a").click(function(e){
        e.preventDefault();
        $(this).addClass("oneclick");
    });
    $("#icon a").dblclick(openWindow);

    $('#wrapper').click(function(e){
        if (!$('#icon a img').is(e.target)) {
            $("#icon a").removeClass("oneclick");
        }
     });
});

function remGrab(e) {
    e.preventDefault();
    $(this).removeClass("grabbing");
}

function moveWindow(e) {
    e.preventDefault();
    if (e.buttons == 0 || $(this).parents("#content").hasClass("fullscreen")) {
        return;
    }
    let new_pos = [e.pageX, e.pageY];
    $(this).parent().offset({
        left: $(this).parent().offset().left + (new_pos[0]-position[0]),
        top: $(this).parent().offset().top + (new_pos[1]-position[1])
    });
    position = new_pos;
}

function resizeWindow(e) {
    e.preventDefault();
    if ($(this).hasClass("fullscreen")) {
        $(this).css('cursor', 'default');
        return;
    }
    let new_pos = [e.offsetX, e.offsetY];
    if (e.offsetX < 5 || e.offsetX > ($(this).width() - 5) || isResize[0]) {
        if ($(this).width() < 200) {
            $(this).width(200);
        }
        $(this).css('cursor', 'w-resize');
        if (e.buttons > 0) {
            isResize[0] = true;
            $(this).width($(this).width() + (new_pos[0] - resize[0]));
        }
    } else if (e.offsetY > ($(this).height() - 35) || isResize[1]) {
        if ($(this).height() < 150) {
            $(this).height(150);
        }
        $(this).css('cursor', 's-resize');
        if (e.buttons > 0) {
            isResize[1] = true;
            $(this).height($(this).height() + (new_pos[1] - resize[1]))
        }
    } else {
        if (e.buttons == 0) {
            isResize = [false, false];
            $(this).css('cursor', 'default');
        }
    }
    
    resize = new_pos;
}

function toggleWindow(e) {
    e.preventDefault();
    $("#exit").parents("#content").toggle(100);
}

function openWindow(e) {
    e.preventDefault();
    $("#content").show(100);
    $(this).removeClass("oneclick");
}