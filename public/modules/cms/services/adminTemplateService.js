/**
 * Created by Slaby on 02.12.2015.
 */
angular.module("cmsModule").service("adminTemplateService", ["$http", adminTemplateService]);

function adminTemplateService($http) {
    /**
     * @description Pobiera z bazy danych liste zakladek dla side menu templatki Admina
     */

    var cmsConfig = {
            "tabList": [
                {
                    "name": "Zarzadzanie CMS",
                    "urlList": [
                        {
                            "name": "Zakladki",
                            "url": "cms.test"
                        },
                        {
                            "name": "Upload Zdjec",
                            "url": "cms.imageUpload"
                        }
                    ]
                },
                {
                    "name": "Zarządzanie użytkownikami",
                    "url": "cms.userManagement"
                }



                //{
                //    "name": "nazwa3",
                //    "url": "url3"
                //}
            ],
        }
        ;
    /**
     * @description Zwraca plik konfiguracyjny. Jezeli nie zostal jeszcze pobrany to pobiera go z bazy, w innym przypadku zwraca zapiasny plik.
     * @param callback
     */
    this.getCmsConfig = function (callback) {
        if (cmsConfig === null) {
            // pobiera config z bazy danych
            downloadConfigJson(function () {
                if (callback) {
                    callback(cmsConfig);
                }
            });
        } else {
            if (callback) {
                callback(cmsConfig);
            }
        }
    };

    function downloadConfigJson(callback) {
        $http.get("/cms").success(function (data) {
            cmsConfig = data;
            if (callback) {
                callback();
            }
        });
    }
}