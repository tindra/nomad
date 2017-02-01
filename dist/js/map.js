// map center
var center = new google.maps.LatLng(56.6587071,48.5198979);

// marker position
var locations = [
  ['Рига', 56.9713962, 23.9901733, 'г.&nbsp;Рига'],
  ['Москва', 55.7173051, 37.6196804, 'г.&nbsp;Москва, <br> ул.&nbsp;Люсиновская, д.&nbsp;64'],
  ['Екатеринбург', 56.7905638, 60.6273153, 'г.&nbsp;Екатеринбург, <br> ул.&nbsp;Крестинского, 57/128']
];

  function initialize() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: center,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    setMarkers(map,locations);
  }


  function setMarkers(map,locations){
      var iconBase = '../dist/i/';
      var defaultIcon = iconBase + 'marker.png';
      var marker, i;
      
      for (i = 0; i < locations.length; i++){  
          var city = locations[i][0];
          var lat = locations[i][1];
          var long = locations[i][2];
          var address =  locations[i][3];
          

          latlngset = new google.maps.LatLng(lat, long);

          var marker = new google.maps.Marker({  
              map: map, title: city , position: latlngset, icon: defaultIcon
          });
          map.setCenter(marker.getPosition());


          var content = '<div class="map__info"><div class="map__info-content">' + address + '</div></div>';    

          var infowindow = new google.maps.InfoWindow();
          
          google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
              return function() {
                  infowindow.setContent(content);
                  infowindow.open(map,marker);
              };
          })(marker,content,infowindow)); 

          google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
          });
 
          google.maps.event.addListener(infowindow, 'domready', function() {

            // Reference to the DIV that wraps the bottom of infowindow
            var iwOuter = $('.gm-style-iw');

            /* Since this div is in a position prior to .gm-div style-iw.
             * We use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
            */
            var iwBackground = iwOuter.prev();

            // Removes background shadow DIV
            iwBackground.children(':nth-child(2)').css({'opacity' : '0'});

            // Removes white background DIV
            iwBackground.children(':nth-child(4)').css({'opacity' : '0'});

            // Moves the infowindow to the left.
            iwOuter.parent().css({});

            // Remones the shadow.
            iwBackground.children(':nth-child(1)').css({'opacity':'0'});

            // Moves the arrow to the right margin.
            iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'opacity: 0;'});


            // Reference to the div that groups the close button elements.
            var iwCloseBtn = iwOuter.next();

            // Apply the desired effect to the close button
            iwCloseBtn.css({display: 'none'});

            // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
            if($('.iw-content').height() < 140){
              $('.iw-bottom-gradient').css({display: 'none'});
            }

            // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
            iwCloseBtn.mouseout(function(){
              $(this).css({opacity: '1'});
            });
          });
      }
  }
google.maps.event.addDomListener(window, 'load', initialize);