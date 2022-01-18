const SCROLL_RIGHT = 0;
const SCROLL_DOWN = 1;
const SCROLL_LEFT = 2;
const SCROLL_UP = 3;
const SCROLL_RANDOM = 4;

var panels = [];
var index = 0;

var scrollDirection = 0;
var isScrolling = false;

function newPanel(panelID, complete = function(){}){

    let used = new Set([]);
    for(let i in panels){
        used.add(panels[i].id);
    }

    $.get("/library/", {"used":JSON.stringify(Array.from(used))}, function(data){
        let s = data.indexOf("<!--");
        let e = data.indexOf("-->");

        let id = data.slice(s+4,e);
        console.log(id);

        $(panelID).html(data);

        panels.push({
            id: id, 
            scrollDirection: Math.floor(Math.random() * 4),
            html: $(panelID).html()
        });

        complete();
    });
}


function generateScroll(atEnd = false){
    //scrollDirection = Math.floor(Math.random() * 4);
    // scrollDirection = SCROLL_UP;
    $(".cont").removeClass("cont-down cont-left cont-right cont-up");
    $(".item").removeClass("item-down item-left item-right item-up");
    $(".scroll-cont").removeClass("scroll-cont-down scroll-cont-left scroll-cont-right scroll-cont-up");
    switch(scrollDirection){
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
    newPanel("#item-1", function(){ 
        scrollDirection = panels[index].scrollDirection;
        generateScroll();
        newPanel("#item-2");
    });

    let sizeSVGs = function(){
        if(window.matchMedia("(orientation: portrait)").matches){
            $(".svg-right").attr("preserveAspectRatio","xMidYMid meet");
            $(".svg-left").attr("preserveAspectRatio","xMidYMid meet");
        }else{
            $(".svg-right").attr("preserveAspectRatio","xMinYMax meet");
            $(".svg-left").attr("preserveAspectRatio","xMaxYMax meet");
        }
    };

    //On Resize
    $(window).resize(sizeSVGs);

    //on scroll function
    let activateScroll = function(scrollAmount){
        if(isScrolling) return;

        let scrollContent = $(".scroll-cont");

        let atMaxFunc = function(){
            if(panels[index+1].id != "end_panel"){
                index++;
                
                scrollDirection = panels[index].scrollDirection;
                generateScroll();
    
                $("#item-1").html(panels[index].html);
                if(index + 1 >= panels.length){
                    newPanel("#item-2");
                }else{
                    $("#item-2").html(panels[index + 1].html);
                }
                sizeSVGs();
            }
        };

        let atMinFunc = function(){
            index--;

            scrollDirection = panels[index].scrollDirection;
            generateScroll(true);

            $("#item-1").html(panels[index].html);
            $("#item-2").html(panels[index + 1].html);
            sizeSVGs();
        }

        //Change Scroll Animation Settings in this funciton
        let scrollAnimateFunc = function(arg, finish){
            isScrolling = true;
            sizeSVGs();
            scrollContent.animate(arg, 500, "swing", function(){
                isScrolling = false;
                finish();
            });
        };

        //Change Panel Prior if needed
        if(scrollAmount > 0){
            switch(scrollDirection){
                case SCROLL_RIGHT:
                    if(scrollContent.scrollLeft() == 0 && index > 0)
                        atMinFunc();
                    break;
                case SCROLL_DOWN:
                    if(scrollContent.scrollTop() == 0 && index > 0)
                        atMinFunc();
                    break;
                case SCROLL_LEFT:
                    if(scrollContent.scrollLeft() > 0 && index > 0)
                        atMinFunc();
                    break;
                case SCROLL_UP:
                    if(scrollContent.scrollTop() > 0 && index > 0)
                        atMinFunc();
                    break;
    
            }
        }

        //Animate Scroll
        switch(scrollDirection){
            case SCROLL_RIGHT:
                if(scrollAmount > 0){
                    if(scrollContent.scrollLeft() > 0){
                        scrollAnimateFunc({
                            scrollLeft: 0
                        },function(){});
                    }
                }else if(scrollAmount < 0){
                    if(scrollContent.scrollLeft() < scrollContent.width()){
                        scrollAnimateFunc({
                            scrollLeft: scrollContent.width()
                        }, function(){
                            atMaxFunc();
                        });
                    }
                }
                break;
            case SCROLL_DOWN:
                if(scrollAmount > 0){
                    if(scrollContent.scrollTop() > 0){
                        scrollAnimateFunc({
                            scrollTop: 0
                        },function(){});
                    }
                }else if(scrollAmount < 0){
                    if(scrollContent.scrollTop() < scrollContent.height()){
                        scrollAnimateFunc({
                            scrollTop: scrollContent.height()
                        }, function(){
                            atMaxFunc();
                        });
                    }
                }
                break;
            case SCROLL_LEFT:
                if(scrollAmount > 0){
                    if(scrollContent.scrollLeft() < scrollContent.width()){
                        scrollAnimateFunc({
                            scrollLeft: scrollContent.width()
                        },function(){});
                    }
                }else if(scrollAmount < 0){
                    if(scrollContent.scrollLeft() > 0){
                        scrollAnimateFunc({
                            scrollLeft: 0
                        }, function(){
                            atMaxFunc();
                        });
                    }
                }
                break;
            case SCROLL_UP:
                if(scrollAmount > 0){
                    if(scrollContent.scrollTop() < scrollContent.height()){
                        scrollAnimateFunc({
                            scrollTop: scrollContent.height()
                        },function(){});
                    }
                }else if(scrollAmount < 0){
                    if(scrollContent.scrollTop() > 0){
                        scrollAnimateFunc({
                            scrollTop: 0
                        }, function(){
                            atMaxFunc();
                        });
                    }
                }
                break;

        }
    };

    $(document).on("tap", function(e){

        let eventTarget = $(e.originalEvent.target);

        console.log(eventTarget);

        if(eventTarget.is("textarea") || eventTarget.is("button") || eventTarget.is(".link")){
            return true;
        }

        console.log(window.visualViewport.width, window.innerWidth);

        if(window.visualViewport.width >= window.innerWidth){
            let scrollAmount = e.clientX - (window.innerWidth / 2);

            //dead area in center
            if(Math.abs(scrollAmount) < 200){
                scrollAmount = 0;
            }

            console.log(scrollAmount);

            activateScroll(-scrollAmount);
        }
        return false;
    });

    //Scroll event
    $(".scroll-cont").bind('wheel mousewheel DOMMouseScroll', function(e){
        let scrollAmount = e.originalEvent.wheelDelta;

        activateScroll(scrollAmount);
        
        return false;
    });
});

