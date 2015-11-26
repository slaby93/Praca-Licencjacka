/**
 * Created by Slaby on 25.11.2015.
 */
describe('Przyklad poprawnego podlaczenie testow kontrolera', function () {

    // we need to register our alternative version of ProductService, before we call inject.
    beforeEach(angular.mock.module("mainApp"));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
        $scope = {};
    }));

    it('should return "2"', function () {
        var testCtrl = $controller('testCtrl', { $scope: $scope });
        expect($scope.testUnit()).toEqual(2); 
    });

});