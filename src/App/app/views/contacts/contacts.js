'use strict';

app.controller('ContactsCtrl', function (ContactService) {
        var ctrl = this;

        ctrl.Contacts = [];
        ctrl.Contact = null;

        ctrl.ErrorMessage = null;

        ctrl.AddContact = AddContact
        ctrl.DeleteContact = DeleteContact

        Init();

        function Init(){
                LoadContacts();
        }

        function LoadContacts(){
        ContactService.Get()
                .then(function (contacts) {
                        ctrl.Contacts = contacts
                }, function (error) {
                        ctrl.ErrorMessage = error;
                });
        }

        function AddContact(){
                ContactService.Add(ctrl.Contact)
                .then(function (contact) {
                        LoadContacts();
                        ctrl.Contact = null;
                }, function (error) {
                        ctrl.ErrorMessage = error;
                });
        }

        function DeleteContact(ContactId){
                ContactService.Delete(ContactId)
                .then(function (contact) {
                        LoadContacts()
                }, function (error) {
                        ctrl.ErrorMessage = error;
                });
        }

});