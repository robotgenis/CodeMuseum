

var panels = [];
var index = 0;

var rand = 0;

function newPanel(id){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);

    $(id).html("<div class='item-cont'><p>A paragraph #2</p></div>");

    $(id).children().css("background-color", "#" + randomColor);

    panels.push($(id).html());
    console.log(panels);
}

function generateScroll(atEnd = false){
    rand = Math.floor(Math.random() * 3);
    //rand = 1;
    if(rand == 0){
        $(".cont").removeClass("cont-2 cont-3").addClass("cont-1");
        $(".item").removeClass("item-2 item-3").addClass("item-1");
        $(".scroll-cont").removeClass("scroll-cont-2 scroll-cont-3").addClass("scroll-cont-1");
        $(".scroll-cont").scrollLeft((atEnd) ? $(".item").width() : 0);
        
    }else if(rand == 1){
        $(".cont").removeClass("cont-1 cont-3").addClass("cont-2");
        $(".item").removeClass("item-1 item-3").addClass("item-2");
        $(".scroll-cont").removeClass("scroll-cont-1 scroll-cont-3").addClass("scroll-cont-2");
        $(".scroll-cont").scrollTop((atEnd) ? $(".item").height() : 0);
    }else{
        $(".cont").removeClass("cont-1 cont-2").addClass("cont-3");
        $(".item").removeClass("item-1 item-2").addClass("item-3");
        $(".scroll-cont").removeClass("scroll-cont-1 scroll-cont-2").addClass("scroll-cont-3");
        $(".scroll-cont").scrollLeft((atEnd) ? 0 : $(".item").width());
    }
}

$(document).ready(function(){
    newPanel("#item-1");
    newPanel("#item-2");
    generateScroll();

    $(document).bind('mousewheel', function(e){
        let scr = $(".scroll-cont");

        let atMin = false;
        let atMax = false;
        if(rand == 0){ 
            $(".scroll-cont").scrollLeft($(".scroll-cont").scrollLeft() - e.originalEvent.wheelDelta);

            if(e.originalEvent.wheelDelta > 0 && scr.scrollLeft() == 0 && index > 0){
                atMin = true;
            }
            if(e.originalEvent.wheelDelta < 0 && $(".cont").width() == scr.width() + scr.scrollLeft()){
                atMax = true;
            }
        }
        if(rand == 1){
            if(e.originalEvent.wheelDelta > 0 && scr.scrollTop() == 0 && index > 0){
                atMin = true;
            }
            if(e.originalEvent.wheelDelta < 0 && $(".cont").height() == scr.height() + scr.scrollTop()){
                atMax = true;
            }
        }
        if(rand == 2){ 
            $(".scroll-cont").scrollLeft($(".scroll-cont").scrollLeft() + e.originalEvent.wheelDelta);

            if(e.originalEvent.wheelDelta > 0 && $(".cont").width() == scr.width() + scr.scrollLeft() && index > 0){
                atMin = true;
            }
            if(e.originalEvent.wheelDelta < 0 && scr.scrollLeft() == 0){
                atMax = true;
            }
        }

        if(atMin){
            console.log("min");

            generateScroll(true);

            index--;
            $("#item-1").html(panels[index]);
            $("#item-2").html(panels[index + 1]);
        }
        if(atMax){
            console.log("max");

            generateScroll();

            index++;

            $("#item-1").html(panels[index]);

            if(index + 1 >= panels.length){
                newPanel("#item-2");
            }else{
                $("#item-2").html(panels[index + 1]);
            }
        }
    });
});

