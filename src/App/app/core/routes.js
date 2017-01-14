'use strict';
// ROUTES

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider.state('contacts', {
        url: "/",
        templateUrl: "views/contacts/contacts.html",
    })
});