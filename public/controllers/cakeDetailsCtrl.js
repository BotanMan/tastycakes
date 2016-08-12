angular.module("tastyCakes")
    .constant("cakeDetailsUrl", "http://dev.cakeiteasy.no/api/search/get-cake?id")
    .constant("loadedCakesIDs", [])
    .controller("cakeDetailsCtrl", function($scope, $http, cakeDetailsUrl, loadedCakesIDs ){
	        var allowShow = false;
	        $scope.cakeData = {};
	        //show load gliph icon when data is loading
	        $scope.loadIndicator = false; 
	
         function checkLoaded(id) {
										   if (!loadedCakesIDs.length) return true;
										   
										   for (var i = 0; i < loadedCakesIDs.length; i++ ) {
														   if (loadedCakesIDs[i] == id) return false;
													}
										   return true;
									}
	
	        $scope.showDetails = function(id){
																				
													if (checkLoaded(id))	{
														   $scope.loadIndicator = true;
																	$http.get(cakeDetailsUrl + "=" + id)
																					.success(function (data) {
																		       $scope.loadIndicator = false;
																		       loadedCakesIDs.push(id);
																		       $scope.cakeData = data;
																					})
																					.error(function (error) {
																		       $scope.loadIndicator = false;
																									$scope.cakeData.error = error;
																					});
													}
										   allowShow == false ?  allowShow = true : allowShow = false;
									};
	        $scope.toggleShow = function(){
             // allow show only after cakeData loaded 
										   if (Object.keys($scope.cakeData).length !== 0 && !$scope.cakeData.error) {
														   return allowShow;
													}
									}
});