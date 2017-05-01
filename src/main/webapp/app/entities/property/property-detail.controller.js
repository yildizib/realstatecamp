(function() {
    'use strict';

    angular
        .module('assessoriaTorrellesApp')
        .controller('PropertyDetailController', PropertyDetailController);

    PropertyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', '$translate', 'previousState', 'DataUtils', 'entity','Request', 'AlertService'];

    function PropertyDetailController($scope, $rootScope, $stateParams, $translate, previousState, DataUtils, entity, Request, AlertService) {
        var vm = this;

        vm.property = entity;
        vm.request = null;
        vm.contactForm = null;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        vm.language = function () {
            return $translate.proposedLanguage();
        };

        var unsubscribe = $rootScope.$on('assessoriaTorrellesApp:propertyUpdate', function(event, result) {
            vm.property = result;
        });

        vm.sendRequest = function () {
            vm.request = {
                "comment": vm.contactForm.comment,
                "date": new Date(),
                "email": vm.contactForm.email,
                "name": vm.contactForm.name,
                "phone": vm.contactForm.phone,
                "property": vm.property,
                "state": "open"
            };
            Request.save(vm.request, onSaveSuccess, onSaveError);
            function onSaveSuccess() {
                AlertService.success("Hey!");
            }
            function onSaveError(error) {
                AlertService.error(error);
            }
        };

        $scope.$on('$destroy', unsubscribe);
    }
})();
