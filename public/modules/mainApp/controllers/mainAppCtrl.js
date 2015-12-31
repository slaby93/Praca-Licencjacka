angular.module("mainApp").controller("mainAppCtrl", ["$scope","socketService", mainAppCtrl]);
/**
 * @description Glowny, najbardziej zewnetrzny kontroler. Kod z tego pliku wykona sie na kazdej podstronie.
 * @param {type} $scope
 * @returns {undefined}
 */
function mainAppCtrl($scope, socketService) {

    //socketService.init();
	
	
	/********************<Obsluga slidera>********************/

    //responsive code begin
    //you can remove responsive code if you don't want the slider scales while window resizes
    var ScaleSlider = function() {
        var windowWidth = $(window).width();

        if (windowWidth) {
            var windowHeight = $(window).height();
            var originalWidth = jssor_1_slider.$OriginalWidth();
            var originalHeight = jssor_1_slider.$OriginalHeight();

            var scaleWidth = windowWidth;
            if (originalWidth / windowWidth > originalHeight / windowHeight) {
                scaleWidth = Math.ceil(windowHeight / originalHeight * originalWidth);
            }

            jssor_1_slider.$ScaleWidth(scaleWidth);
        }
        else
            window.setTimeout(ScaleSlider, 30);
    }
    //responsive code end
	//WARNING: still not responsive enough (sometimes it needs refresh)
	
	var MouseWheelHandler = function() {
        return function (e){
            // cross-browser wheel delta
            var e = window.event || e;
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

            if (delta < 0)  $scope.jssor_1_slider.$Next()              //scrolling down
             else $scope.jssor_1_slider.$Prev()                        //scrolling up
            return false;
        }
    }

    //BUG: SOMETIMES IT SCROLLS TWICE  --> repeating:  scroll up, scroll up, scroll down <- only with scrolling
    //only if it's scrolling while it's already scrolling, blocking scrolling while scrolling could solve this issue
    //reason: while it's scrolling, the page is still the same (???).
    ///////////////////////////
    

	function init(){
		$scope.jssor_1_slider = new $JssorSlider$("jssor_1", 
			{
				$AutoPlay: false,
				$DragOrientation: 2,
				$PlayOrientation: 2,
				$ArrowNavigatorOptions: {
					$Class: $JssorArrowNavigator$
				}
			}
		);
		
		$(window).bind("load", ScaleSlider);
		$(window).bind("resize", ScaleSlider);
		$(window).bind("orientationchange", ScaleSlider);
		
		if (document.addEventListener) {
			document.addEventListener("mousewheel", MouseWheelHandler(), false);
			document.addEventListener("DOMMouseScroll", MouseWheelHandler(), false);
		}else{
			sq.attachEvent("onmousewheel", MouseWheelHandler());   //czy sq sie nie wykrzaczy bo unknown?
		}
	}
	init();
	
	/********************</Obsluga slidera>********************/

}