'use strict';

app.service('ContactService', function ($http, AppSettings) {
    var svc = this;
    var urlBase = AppSettings.ApiUrl + '/Contacts';

    svc.Get = function () {
        return $http.get(urlBase)
            .then(function success(response) {
                return response.data;
            });
    }
});