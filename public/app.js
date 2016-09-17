(function() {
    var app = angular.module('app', ['ngRoute']);

    app.controller('HomeController', function($http, $scope) {
        var vm = this;
        vm.jobs = [];

        vm.jobDetail = function(job){
            vm.details = true;
            vm.selectedJob = job;
            vm.selectedId = job._id.slice(0,5);
        };

        vm.saveJob = function(job) {
            console.log(job);
            if (job) {
                $http.put('/api/jobs', job).then(function(res) {
                    console.log(res);
                    vm.getCurrentJobs();
                })
            }
        }

        vm.deleteJob = function(job) {
            $http.delete('/api/jobs/' + job._id).then(function(response) {
                console.log('has been deelted');
                vm.getCurrentJobs();
            })
        }

        vm.addJob = function(job) {
            $http.post('/api/jobs', job).then(function(res) {
                vm.model = '';
                console.log(res);

            })
            vm.getCurrentJobs();
        }

        vm.getCurrentJobs = function() {
            $http.get('/api/jobs').then(function(response) {
                vm.jobs = response.data;
            })
        }
        vm.getCurrentJobs();
        vm.title = "Angular Scheduler Authored By Theodore Anderson";
    });

    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeController',
            controllerAs: 'vm',
            templateUrl: './home.html'
        });
        $routeProvider.otherwise('/');
    })
}())