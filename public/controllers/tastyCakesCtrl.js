angular.module("tastyCakes")
    .constant("dataUrl", "http://dev.cakeiteasy.no/api/search?bakery=4934&count=100&type=1")
    .controller("tastyCakesCtrl", function ($scope, $http, dataUrl, cart, $location) {
	       $scope.cakesList = {};
	
        $http.get(dataUrl)
            .success(function (data) {
                $scope.cakesList = data;
            })
            .error(function (error) {
                $scope.cakesList.error = error;
            });
	
	       $scope.addCakeToCart = function (cake) {
            cart.addProduct(cake.id, cake.name, cake.price, cake.picture);
        }
							// hide cart-summary when cart is open				
			   	 $scope.checkCartOpen = function(){

									   return $location.path() == "/cart" ? true : false;
				};
});