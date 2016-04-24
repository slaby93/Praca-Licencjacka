/**
 * Created by Tomek on 01.04.16.
 */

/**
 * @description Konfiguracja interceptora dodajacego tokeny do zapytan REST.
 * @param {type} $httpProvider
 * @param {type} jwtInterceptorProvider
 * @returns {undefined}
 */
function intercepting($httpProvider, jwtInterceptorProvider) {
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	jwtInterceptorProvider.tokenGetter = function(UserService, jwtHelper, $http) {
		var token = UserService.token;
		if (token && jwtHelper.isTokenExpired(token)) {
			return $http.post("/user/refresh", {"token": token}, {skipAuthorization: true}).then(
				function (data) {
					var newToken = data.data.token;
					UserService.token = newToken;
					return newToken;
				}, function (err) {
					UserService.token = undefined;
					return undefined;
				});
		} else {
			return token;
		}
	}
	$httpProvider.interceptors.push('jwtInterceptor');
}

export default intercepting;