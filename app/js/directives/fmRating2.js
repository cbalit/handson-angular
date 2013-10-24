'use strict';

foodMeApp.directive('fmRating', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/fmRating.html',
        scope: {
            symbol: '@',
            max: '@',
            readonly: '@'
        },
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

            var styles= [];
            scope.styles = styles;

            //Utilities

            var setWatcher = function () {
                scope.$watch('max', function (value) {
                    setStyles();
                    udpateSelectedStyles(ngModel.$viewValue - 1);
                });

                //for default values
                attrs.$observe('max',function (value){
                    scope.max= value || 5;
                });

                attrs.$observe('symbol',function (value){
                    scope.symbol= value || '\u2605';
                });
            };


            var setStyles = function () {
                styles= [];
                for (var i = 0; i < scope.max; i++) {
                    styles.push({ 'fm-selected': false, 'fm-hover': false });
                }
                scope.styles = styles;
            };

            var udpateSelectedStyles = function (index) {
                if (index == null) index = -1;

                angular.forEach(styles, function (style, i) {
                    style['fm-selected'] = i <= index;
                });
            };


            //init
            var init = function () {
                setWatcher();
                setStyles();
            };


            //Scope methods

            scope.enter = function (index) {
                if (scope.readonly) return;
                angular.forEach(styles, function (style, i) {
                    style['fm-hover'] = i <= index;
                });
            };

            scope.leave = function (index) {
                if (scope.readonly) return;
                angular.forEach(styles, function (style, i) {
                    style['fm-hover'] = false;
                });
            };

            //Update process

            // view -> model
            scope.select = function (index) {
                if (scope.readonly) return;

                ngModel.$setViewValue((index == null) ? null : index + 1);
                udpateSelectedStyles(index);
            };


            // model -> view
            ngModel.$render = function () {
                udpateSelectedStyles(ngModel.$viewValue - 1);
            };


            //init
            init();

        }
    };
});
