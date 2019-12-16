var position = [0,0];
var resize = [0,0];
var isResize = [false, false, false];
var isMove = false;

$(function(){

    $("#wrapper").mousedown(function (e) {
        let coff = [$("#content").offset().left, $("#content").offset().left + $("#content").width(), $("#content").offset().top, $("#content").offset().top + $("#content").height()];
        if ((e.pageX > coff[0] - 5 && e.pageX < coff[0] + 5) || (e.pageX > coff[1] - 5 && e.pageX < coff[1] + 5)) {
            resize = [e.pageX, e.pageY];
            isResize = [true, false, (e.pageX > coff[0] - 5 && e.pageX < coff[0] + 5)];
        } // resize X
        
        if ((e.pageY > coff[2] - 5 && e.pageY < coff[2] + 5) || (e.pageY < coff[3] + 5 && e.pageY > coff[3] - 5)) {
            resize = [e.pageX, e.pageY];
            isResize = [false, true, (e.pageY > coff[2] - 5 && e.pageY < coff[2] + 5)];
        } // resize Y

        if ($("#heading").is(e.target) && !isResize[1]) {
            isMove = true;
            $("#wrapper *").css("cursor","grabbing");
            position = [e.pageX, e.pageY];
        } // move
    }).mousemove(function (e) {
        if ($("#content").hasClass("fullscreen")) {
            return;
        } // return if is in fullscreen

        let coff = [$("#content").offset().left, $("#content").offset().left + $("#content").width(), $("#content").offset().top, $("#content").offset().top + $("#content").height()];
        

        if (e.buttons == 0) {
            if((e.pageX > coff[0] - 5 && e.pageX < coff[0] + 5) || (e.pageX > coff[1] - 5 && e.pageX < coff[1] + 5)) {
                $("#wrapper *").css("cursor","w-resize");
            } else if((e.pageY > coff[2] - 5 && e.pageY < coff[2] + 5) || (e.pageY < coff[3] + 5 && e.pageY > coff[3] - 5)) {
                $("#wrapper *").css("cursor", "n-resize");
            } else if (!isMove && !isResize[0] && !isResize[1]) {
                $("#wrapper *").css("cursor", "");
            } // set cursors 
            return;
        } // return if nothing pressed bruuh

        if (isMove && !isResize[1]) {
            e.preventDefault();
            let new_pos = [e.pageX, e.pageY];
            $("#content").offset({
                left: $("#content").offset().left + (new_pos[0]-position[0]),
                top: $("#content").offset().top + (new_pos[1]-position[1])
            });
            position = new_pos;
            return;
        } // Posun okna

        if (isResize[0]) {
            e.preventDefault(); 
            let offset = [$("#content").offset().left, $("#content").offset().top];
            let new_res = [e.pageX, e.pageY];
            let width = $("#content").width();
            let new_width = [width - (new_res[0] - resize[0]), width + (new_res[0] - resize[0])];
            
            if (isResize[2] && new_width[0] > 300) { // resize zleva
                $("#content").width(width - (new_res[0] - resize[0]));
                $("#content").offset({left: offset[0] + (new_res[0] - resize[0])});
            } else if (new_width[1] > 300) { // resize zprava
                $("#content").width(width + (new_res[0] - resize[0]));
                $("#content").offset({left: offset[0]});
            }
            resize = new_res;
        } else if (isResize[1]) {
            e.preventDefault(); 
            let offset = [$("#content").offset().left, $("#content").offset().top];
            let new_res = [e.pageX, e.pageY];
            let height = $("#content").height();
            let new_height = [height - (new_res[1] - resize[1]), height + (new_res[1] - resize[1])];

            if (isResize[2] && new_height[0] > 300) { // resize zhora
                $("#content").height(height - (new_res[1] - resize[1]));
                $("#content").offset({top: offset[1] + (new_res[1] - resize[1])});
            } else if (new_height[1] > 300) { // resize zdola
                $("#content").height(height + (new_res[1] - resize[1]));
                $("#content").offset({top: offset[1]});
            }
            resize = new_res;
        }
    }).mouseup(function (e) {
        isMove = false;
        isResize = [false, false, false];
        $("#heading").css("cursor","");
    });

    $("#fullscreen").click(function () { // Fullscreen handler
        $(this).parents("#content").toggleClass("fullscreen");
    });

    $("#exit").click(toggleWindow); // Křížek handler

    $("#minimize").click(function(){alert("ALE NEEE!!!")}); // Křížek handler

    $("#icon a").click(function(e){ // Otevření okna
        e.preventDefault();
        $(this).addClass("oneclick");
    });
    $("#icon a").dblclick(openWindow);

    $('#wrapper').click(function(e){ // Simaluce ikon na ploše
        if (!$('#icon a img').is(e.target)) {
            $("#icon a").removeClass("oneclick");
        }
     });
});

function toggleWindow(e) {
    e.preventDefault();
    $("#exit").parents("#content").toggle(100);
}

function openWindow(e) {
    e.preventDefault();
    $("#content").show(100);
    $(this).removeClass("oneclick");
}