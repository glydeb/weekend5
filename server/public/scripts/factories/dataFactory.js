myApp.factory('DataFactory', ['$http', function ($http) {
  console.log('dataFactory running');

  // PRIVATE
  var favorites = undefined;

  function getFaveData() {
    var promise = $http.get('/pets').then(function (response) {
      console.log('Async data returned: ', response.data);
      favorites = response.data;
    });

    return promise;
  }

  function saveFave(newFav) {
    var promise = $http.post('/pets', newFav).then(function (response) {
      if (response.status == 201) {
        console.log('Hooray! Fave Saved!');
        return getFaveData();
      } else {
        console.log('Boo!', response.data);
      }
    });

    return promise;
  }

  function deleteFave(id) {
    var promise = $http.delete('/pets/' + id).then(function (response) {
      if (response.status == 201) {
        console.log('Hooray! Fave Saved!');
        return getFaveData();
      } else {
        console.log('Boo!', response.data);
      }
    });

    return promise;
  }

  // PUBLIC
  var publicApi = {
    factorySaveFave: function (newFave) {
      return saveFave(newFave);
    },

    factoryRefreshFaveData: function () {
      return getFaveData();
    },

    factoryGetFaves: function () {
      // return our array
      return favorites;
    }
  };

  return publicApi;

}]);
