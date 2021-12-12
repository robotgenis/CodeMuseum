
// var test = `
//              k;double sin()
//          ,cos();main(){float A=
//        0,B=0,i,j,z[1760];char b[
//      1760];printf("\\x1b[2J");for(;;
//   ){memset(b,32,1760);memset(z,0,7040)
//   ;for(j=0;6.28>j;j+=0.07)for(i=0;6.28
//  >i;i+=0.02){float c=sin(i),d=cos(j),e=
//  sin(A),f=sin(j),g=cos(A),h=d+2,D=1/(c*
//  h*e+f*g+5),l=cos      (i),m=cos(B),n=s\\
// in(B),t=c*h*g-f*        e;int x=40+30*D*
// (l*h*m-t*n),y=            12+15*D*(l*h*n
// +t*m),o=x+80*y,          N=8*((f*e-c*d*g
//  )*m-c*d*e-f*g-l        *d*n);if(22>y&&
//  y>0&&x>0&&80>x&&D>z[o]){z[o]=D;;;b[o]=
//  ".,-~:;=!*#$@"[N>0?N:0];}}/*#****!!-*/
//   printf("\\x1b[H");for(k=0;1761>k;k++)
//    putchar(k%80?b[k]:10);A+=0.04;B+=
//      0.02;}}/*****####*******!!=;:~
//        ~::==!!!**********!!!==::-
//          .,~~;;;========;;;:~-.
//              ..,--------,*/`

const SCROLL_RIGHT = 0;
const SCROLL_DOWN = 1;
const SCROLL_LEFT = 2;
const SCROLL_UP = 3

var panels = [];
var index = 0;

var rand = 0;

function newPanel(id){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);

    $(id).html("<div class='item-cont'><p>A paragraph #" + String(panels.length + 1) + "</p></div>");

    $(id).children().css("background-color", "#" + randomColor);

    panels.push($(id).html());
    console.log(panels);
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
    // $(".code").text(test);

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
            $("#item-1").html(panels[index]);
            $("#item-2").html(panels[index + 1]);
        }
        if(atMax){
            generateScroll();

            index++;

            $("#item-1").html(panels[index]);
            if(index + 1 >= panels.length){
                newPanel("#item-2");
            }else{
                $("#item-2").html(panels[index + 1]);
            }
        }
        return false;
    });
});

