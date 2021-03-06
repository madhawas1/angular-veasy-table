angular.module('app', [
  'veasyTable',
  'ui.sortable'
])

.controller('appController', ['$scope', '$timeout', 'peopleService', function ($scope, $timeout, peopleService) {

  $scope.people = [];
  $scope.selecteds = [];

  var init = function () {
    $scope.config = {
      id: 'veasy-table',
      columns: [
        { header: 'Id',         value: 'id',          size: 5, show: true },
        { header: 'First Name', value: 'first_name',  size: 40, show: true },
        { header: 'Last Name',  value: 'last_name',   size: 40, show: true },
        { header: 'Email',      value: 'email',       size: 0, show: false },
        { header: 'Country',    value: 'country',     size: 0, show: false },
        { header: 'IP',         value: 'ip_address',  size: 15, show: true }
      ],
      checkbox: {
        enable: true,
        size: 20
      },
      pagination: {
        enable: true,
        currentPage: 0,
        itemsPerPage: 10,
      },
      filter: {
        enable: true,
        conditional: true,
        delay: 500
      },
      columnFilter: {
        enable: true,
        autoOpen: true,
        modalSize: 'md'
      },
      sort: {
        enable: true
      },
      resizable: {
        enable: true,
        minimumSize: 5
      },
      events: {
        onClickRow: function (row) {
          alert('Row Clicked: ' + JSON.stringify(row.id) + '. More details in your console.');
          console.log(JSON.stringify(row, null, 2));
          console.log('---------------------------------');
          console.log('');
        },
        onApplyColumnFilter: function (columns) {
          alert('Applied Columns! More details in your console.');
          console.log(JSON.stringify(columns, null, 2));
          console.log('---------------------------------');
          console.log('');
        },
        onTableStateChange: function (columns) {
          alert('State changed! More details in your console.');
          console.log(JSON.stringify(columns, null, 2));
          console.log('---------------------------------');
          console.log('');
        }
      }
    };

    peopleService.findAll().then(function (data) {
      $scope.people = data;
    });

  };

  $scope.addPerson = function (person) {
    person.id = ($scope.people.length + 1);
    $scope.people.push(person);
    $scope.person = {};
  };

  init();

}])

.factory('peopleService', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {

  return {
    findAll: function (callback) {
      var deferred = $q.defer();

      $timeout(function () {
        $http.get('../people.json').success(function (data) {
          deferred.resolve(data);
        });
      }, 2500);

      return deferred.promise;
    }
  };

}]);
