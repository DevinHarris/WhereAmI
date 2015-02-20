angular.module('whereAmI', [])
	.controller('MainCtrl', [function(){

		
		function init() {
			navigator.geolocation ? navigator.geolocation.getCurrentPosition(success, fail) : alert(
				'Geolocation not avalible on this device.');

			/* if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(success, fail);
			} */

			function success(position) {
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;

				var mapOptions = {
					center: {lat: lat, lng: lng},
					zoom: 8
				};


				var map = new google.maps.Map(document.getElementById('map'), mapOptions);

				var currPos = new google.maps.LatLng(lat, lng);

				marker = new google.maps.Marker({
						position: currPos,
						map: map,
						animation: google.maps.Animation.DROP,
						title: "This is your location."
				});

				var infowindow = new google.maps.InfoWindow({
					content: currPos
				});

				google.maps.event.addListener(marker, 'click', function(){
					infowindow.open(marker);
				});

				function toggleBounce() {
					if (marker.getAnimation() !== null) {
						marker.setAnimation(null);
					} else {
						marker.setAnimation(google.maps.Animation.BOUNCE);
					}
				}

			}

			function fail(error) {
				var map = document.getElementById('map');
				var errH2 = document.createElement('h2');
				var errorMsg = 'Error: (' + error.code + '): ' + error.message;
				errH2.textContent = errorMsg;
				errH2.setAttribute('id', 'error');

				map.appendChild(errH2);
			}
	
		}

		google.maps.event.addDomListener(window, 'load', init);

	}]);