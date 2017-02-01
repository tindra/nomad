// map center
var center = new google.maps.LatLng(55.3796267, 45.7284968);

// marker position
var locations = [
  ['Рига', 56.9713962, 23.9901733, ''],
  ['Москва', 55.7173051, 37.6196804, 'г.&nbsp;Москва, <br> ул.&nbsp;Люсиновская, д.&nbsp;64'],
  ['Екатеринбург', 56.7905638, 60.6273153, 'г.&nbsp;Екатеринбург, <br> ул.&nbsp;Крестинского, 57/128']
];

var markers = [];
var map;

function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: center,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // InfoWindow content
  //var content = '<div class="map__info">г.Москва, <br>ул.Люсиновская, д.64</div>';

  var iconBase = '../dist/i/';
  var defaultIcon = iconBase + 'marker.png';
  var marker, i, address;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: defaultIcon
    });    
    var address =  locations[i][3];

    var content = '<div class="map__info">' +address+  '</div>';  
     
    // A new Info Window is created and set content
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', (function(marker, i, content, infowindow) {
      return function() {
        infowindow.setContent(content);
        infowindow.open(map, marker);
        for (var j = 0; j < markers.length; j++) {
          markers[j].setIcon(defaultIcon);
        }
        marker.setIcon(activeIcon);
      };
    })(marker, i, content,infowindow));
    markers.push(marker);
    
  }
  
  // Event that closes the Info Window with a click on the map
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
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Moves the infowindow to the left.
    iwOuter.parent().css({'margin-top': '104px', 'margin-left': '89px'});

    // Remones the shadow.
    iwBackground.children(':nth-child(1)').css({'display':'none'});

    // Moves the arrow to the right margin.
    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'display: none;'});


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
google.maps.event.addDomListener(window, 'load', initialize);