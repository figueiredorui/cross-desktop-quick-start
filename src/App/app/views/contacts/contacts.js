'use strict';

app.controller('ContactsCtrl', function (ContactService) {
        var ctrl = this;

        ContactService.Get()
                .then(function (contacts) {
                        ctrl.Contacts = contacts
                })

});