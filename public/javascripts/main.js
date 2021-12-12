
const SCROLL_RIGHT = 0;
const SCROLL_DOWN = 1;
const SCROLL_LEFT = 2;
const SCROLL_UP = 3

var panels = [];
var index = 0;

var rand = 0;

function newPanel(panelID){
    $.get("/library/", {"used":[]}, function(data){
        console.log(data);

        let s = data.indexOf("<!--");
        let e = data.indexOf("-->");

        let id = data.slice(s+4,e);
        console.log(id);

        $(panelID).html(data);

        panels.push({
            id: id, 
            html: $(panelID).html()
        });
    });
}

function generateScroll(atEnd = false){
    rand = Math.floor(Math.random() * 4);
    // rand = SCROLL_UP;
    $(".cont").removeClass("cont-down cont-left cont-right cont-up");
    $(".item").removeClass("item-down item-left item-right item-up");
    $(".scroll-cont").removeClass("scroll-cont-down scroll-cont-left scroll-cont-right scroll-cont-up");
    switch(rand){
        case SCROLL_RIGHT:
            $(".cont").addClass("cont-right");
            $(".item").addClass("item-right");
            $(".scroll-cont").addClass("scroll-cont-right");
            $(".scroll-cont").scrollLeft((atEnd) ? $(".item").width() : 0);
            break;
        case SCROLL_DOWN:
            $(".cont").addClass("cont-down");
            $(".item").addClass("item-down");
            $(".scroll-cont").addClass("scroll-cont-down");
            $(".scroll-cont").scrollTop((atEnd) ? $(".item").height() : 0);
            break;
        case SCROLL_LEFT:
            $(".cont").addClass("cont-left");
            $(".item").addClass("item-left");
            $(".scroll-cont").addClass("scroll-cont-left");
            $(".scroll-cont").scrollLeft((atEnd) ? 0 : $(".item").width());
            break;
        case SCROLL_UP:
            $(".cont").addClass("cont-up");
            $(".item").addClass("item-up");
            $(".scroll-cont").addClass("scroll-cont-up");
            $(".scroll-cont").scrollTop((atEnd) ? 0 : $(".item").height());
            break;

    }
}

$(document).ready(function(){

    //Create initial page
    newPanel("#item-1");
    newPanel("#item-2");
    generateScroll();

    //Scroll event
    $(".scroll-cont").bind('mousewheel DOMMouseScroll', function(e){

        let scrollAmount = e.originalEvent.wheelDelta;

        let scrollContent = $(".scroll-cont");

        let atMin = false;
        let atMax = false;

        switch(rand){
            case SCROLL_RIGHT:
                scrollContent.scrollLeft(scrollContent.scrollLeft() - scrollAmount);

                if(scrollAmount > 0 && scrollContent.scrollLeft() == 0 && index > 0){
                    atMin = true;
                }
                if(scrollAmount < 0 && $(".cont").width() == scrollContent.width() + scrollContent.scrollLeft()){
                    atMax = true;
                }
                break;
            case SCROLL_DOWN:
                scrollContent.scrollTop(scrollContent.scrollTop() - scrollAmount);

                if(scrollAmount > 0 && scrollContent.scrollTop() == 0 && index > 0){
                    atMin = true;
                }
                if(scrollAmount < 0 && $(".cont").height() == scrollContent.height() + scrollContent.scrollTop()){
                    atMax = true;
                }
                break;
            case SCROLL_LEFT:
                scrollContent.scrollLeft(scrollContent.scrollLeft() + scrollAmount);

                if(scrollAmount > 0 && $(".cont").width() == scrollContent.width() + scrollContent.scrollLeft() && index > 0){
                    atMin = true;
                }
                if(scrollAmount < 0 && scrollContent.scrollLeft() == 0){
                    atMax = true;
                }
                break;
            case SCROLL_UP:
                scrollContent.scrollTop(scrollContent.scrollTop() + scrollAmount);

                if(scrollAmount > 0 && $(".cont").height() == scrollContent.height() + scrollContent.scrollTop() && index > 0){
                    atMin = true;
                }
                if(scrollAmount < 0 && scrollContent.scrollTop() == 0){
                    atMax = true;
                }
                break;

        }

        if(atMin){
            generateScroll(true);

            index--;
            $("#item-1").html(panels[index].html);
            $("#item-2").html(panels[index + 1].html);
        }
        if(atMax){
            generateScroll();

            index++;

            $("#item-1").html(panels[index].html);
            if(index + 1 >= panels.length){
                newPanel("#item-2");
            }else{
                $("#item-2").html(panels[index + 1].html);
            }
        }
        return false;
    });
});

