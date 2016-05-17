/**
 * Created by Dammic on 14.03.16.
 */
var app = angular.module("MyApp", []);



function errSrc() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
}

export default errSrc;