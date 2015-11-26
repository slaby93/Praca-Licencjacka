describe('string alias arg', function () {
    it('should load module with string alias', function () {
        angular.mock.module('mainApp');


        var testing;

        // Get the service from the injector
        angular.mock.inject(function GetDependencies(testService) {
            testing= testService;
        });

        var wartoscZwrocona = testing.test();

        expect(wartoscZwrocona).toBe(2);
    });
});