'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController($scope,$location, customer) {

        if(!customer.address){
             $location.url('/customer');
        }

});
