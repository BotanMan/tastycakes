angular.module("cart", [])
.factory("cart", function () {

    var cartData = [];

    return {

        addProduct: function (id, name, price, picture) {
            var addedToExistingItem = false;
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].id == id) {
                    cartData[i].count++;
                    addedToExistingItem = true;
                    break;
                }
            }
            if (!addedToExistingItem) {
                cartData.push({
                    count: 1, id: id, price: price, name: name, picture: picture
                });
            }
        },

        removeProduct: function (id) {
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].id == id) {
																	   if (cartData[i].count >= 2) {
																					   cartData[i].count -= 1;
																				} else {
																					  cartData.splice(i, 1);
																				}
                    break;
                }
            }
        },

        getProducts: function () {
            return cartData;
        }
    }
})
.directive("cartSummary", function (cart) {
    return {
        restrict: "E",
        templateUrl: "components/cart/cartSummary.html",
        controller: function ($scope) {

            var cartData = cart.getProducts();

            $scope.total = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += (cartData[i].price * cartData[i].count);
                }
                return total;
            }

            $scope.itemCount = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += cartData[i].count;
                }
                return total;
            }
        }
    };
})
.controller("cartCtrl", function($scope, cart){
	    			
    $scope.cakesInCart = cart.getProducts();
	
	   $scope.calcCartTotal = function(){
				     var cakesInCart = cart.getProducts();
									var total = 0;
									for (var i = 0; i < cakesInCart.length; i++){
													 total += cakesInCart[i].price * cakesInCart[i].count;
									}
									return total;
				};
								
				$scope.deleteItem = function(id){
								cart.removeProduct(id);
				};
	   
});


