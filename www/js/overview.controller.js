(function(){
    angular.module('starter').controller('OverviewController', ['$scope', '$ionicModal', '$ionicPlatform', 'BirthdayService', OverviewController]);

    function OverviewController($scope, $ionicModal, $ionicPlatform, birthdayService) {

        var vm = this;	

        vm.birthday = {};
        vm.action = '';
        vm.isAdd = false;
        vm.modal = {};

        vm.showAddBirthdayModal = showAddBirthdayModal;
        vm.showEditBirthdayModal  = showEditBirthdayModal; 
        vm.saveBirthday = saveBirthday;
        vm.deleteBirthday = deleteBirthday;

        // var thisScope = $rootScope.$new(true);
        // angular.extend(thisScope, vm);

        // Initialize the database.
        $ionicPlatform.ready(function() {
            birthdayService.initDB();

            // Get all birthday records from the database.
            birthdayService.getAllBirthdays().then(function(birthdays) {
                vm.birthdays = birthdays;
            });
        });

        // Initialize the modal view.
        $ionicModal.fromTemplateUrl('add-or-edit-birthday.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            vm.modal = modal;
        });

        function showAddBirthdayModal() {
            vm.birthday = {};
            vm.action = 'Add';
            vm.isAdd = true;
            vm.modal.show();			
        }

        function showEditBirthdayModal(birthday) {
            vm.birthday = birthday;
            vm.action = 'Edit';
            vm.isAdd = false;			
            vm.modal.show();
        }

        function saveBirthday() {
            if (vm.isAdd) {
                birthdayService.addBirthday(vm.birthday);				
            } else {
                birthdayService.updateBirthday(vm.birthday);				
            }						
            vm.modal.hide();
        }

        function deleteBirthday() {
            birthdayService.deleteBirthday(vm.birthday);			
            vm.modal.hide();
        }

        $scope.$on('$destroy', function() {
            vm.modal.remove(); 
        });

    }
})();


