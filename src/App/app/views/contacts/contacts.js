'use strict';

app.controller('ContactsCtrl', function (ContactService) {
        var ctrl = this;

        ctrl.Contacts = [];
        ctrl.Contact = null;

        Init();

        function Init(){
                LoadContacts();
        }

        function LoadContacts(){
        ContactService.Get()
                .then(function (contacts) {
                        ctrl.Contacts = contacts
                });
        }

        function AddContact(){
                ContactService.Add(ctrl.Contact)
                .then(function (contact) {
                        
                });
        }

        function DeleteContact(contactID){
                ContactService.Delete(contactID)
                .then(function (contact) {
                        
                });
        }

});