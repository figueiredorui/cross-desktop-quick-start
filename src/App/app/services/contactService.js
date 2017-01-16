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

    svc.Add = function (contact) {
        return $http.post(urlBase, contact)
            .then(function success(response) {
                return response.data;
            });
    }

    svc.Delete = function (contact) {
        return $http.delete(urlBase, contact)
            .then(function success(response) {
                return response.data;
            });
    }
});