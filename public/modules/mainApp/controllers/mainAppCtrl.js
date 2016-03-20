/**
 * @description Glowny, najbardziej zewnetrzny kontroler. Kod z tego pliku wykona sie na kazdej podstronie.
 * @param {type} $scope
 * @returns {undefined}
 */

class MainAppCtrl {

    constructor($scope, $log) {
        let self = this;
        self.$scope = $scope;
        self.$l = $log;
        self.setWatchers();
    }

    setWatchers() {
        let self = this;
        self.$scope.$on('userObjectChange', (event, newUser)=> {
            self.user = newUser;
        });
    }
}

export default MainAppCtrl;
