// agrega cositas cheveres
angular.module('App').factory('Utils', function($ionicLoading,$ionicPopup,$translate) {

	var Utils = {

    show: function() {
			//console.log("texto:" + $translate.instant('MESSAGES.loading'));
      $ionicLoading.show({
  	    animation: 'fade-in',
  	    showBackdrop: false,
  	    maxWidth: 200,
  	    showDelay: 500,
        template: '<p class="item-icon-left">'+ $translate.instant('MESSAGES.loading')+'<ion-spinner icon="bubbles"/></p>'
      });
    },

    hide: function(){
      $ionicLoading.hide();
    },

		trim: function(str){
			str = str.toString();
			return str.replace(/^\s+|\s+$/g,"");
		},

		isUndefinedOrNull: function(val) {
    return angular.isUndefined(val) || val === null
		},

		alertshow: function(tit,msg){
			var alertPopup = $ionicPopup.alert({
				title: tit,
				template: msg
			});
			alertPopup.then(function(res) {
				//console.log('Registrado correctamente.');
			});
		},

  };

	return Utils;

});
