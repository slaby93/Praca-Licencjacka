/**
 * Created by danielslaby on 23/04/16.
 */

function WojewodztwaMapDirective() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/wojewodztwaMap/wojewodztwaMap.html',
        controller: WojewodztwaMapController,
        controllerAs: "wojewodztwaCtrl"
    };
}

class WojewodztwaMapController {
    constructor($log) {
        let self = this;
        self.$l = $log;
        self.initAmCharts();

    }

    initAmCharts() {
        let self = this;
        AmCharts.makeChart("mapdiv", {
            /**
             * this tells amCharts it's a map
             */
            "type": "map",

            /**
             * create data provider object
             * map property is usually the same as the name of the map file.
             * getAreasFromMap indicates that amMap should read all the areas available
             * in the map data and treat them as they are included in your data provider.
             * in case you don't set it to true, all the areas except listed in data
             * provider will be treated as unlisted.
             */
            "dataProvider": {
                mapURL: "resources/maps/polandHigh.svg",
                "getAreasFromMap": true
            },

            /**
             * create areas settings
             * autoZoom set to true means that the map will zoom-in when clicked on the area
             * selectedColor indicates color of the clicked area.
             */
            "areasSettings": {
                "autoZoom": true,
                "selectedColor": "#B3B3B3",
                "color":"#676767",
                "rollOverColor":"#808080",
                "outlineColor":"white"
            },

            /**
             * let's say we want a small map to be displayed, so let's create it
             */
            "smallMap": {}
        });
    }


}

export default WojewodztwaMapDirective;