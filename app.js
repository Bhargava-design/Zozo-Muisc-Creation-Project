// app.js

// Define your AngularJS module
angular.module('myApp', [])
  .controller('MusicController', ['$scope', function($scope) {
    // Initialize Azure Storage client
    const accountName = '<your-account-name>';
    const containerName = '<your-container-name>';
    const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};EndpointSuffix=core.windows.net`;
    const blobService = AzureStorage.Blob.createBlobService(connectionString);

    // Retrieve the music playlist from Azure Storage
    blobService.listBlobsSegmented(containerName, null, (error, results) => {
      if (error) {
        console.error('Error retrieving playlist:', error);
      } else {
        $scope.playlist = results.entries.map(entry => {
          return {
            title: entry.name,
            artist: entry.metadata.artist
          };
        });
        $scope.$apply();
      }
    });

    // Function to play a song
    $scope.playSong = function(song) {
      // Perform the necessary actions to play the song
      console.log('Playing:', song.title);
    };
  }]);
            
