boundaryURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-boundary.geojson"
quadrantURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-quadrants.geojson"
neighborhoodsURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/neighborhood-clusters.geojson"
sportsURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/sports-arenas.json"
theatreURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/theatres.geojson"
museumsURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/museums-in-dc.geojson"
memorialsURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/memorials-in-dc.geojson"
RestaurantURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/restaurants.geojson"
barsURL =  "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/taverns-and-nightclubs.geojson"
metroURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/metro-stations-dc.geojson"

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicmllaGxlYSIsImEiOiJjamlhdWlzcnkxMndiM3FsbWl1aXE0MXJtIn0.g7oyFuzbGAh1O0SXpGI8nw");

var baseMaps = {
  "Street Map": streetmap,
};

function chooseColor(quadrant) {
  switch (quadrant) {
  case "SW":
    return "yellow";
  case "SE":
    return "red";
  case "NE":
    return "orange";
  case "NW":
    return "green";
  default:
    return "black";
  }
}

d3.json(boundaryURL, function(boundaryData) {
  var boundary = L.geoJSON(boundaryData, {
        onEachFeature: function (feature, layer) {
    var marker1 = layer.bindPopup('<h1>Washington, DC</h1><h3>Mayor: Muriel Bowser</h3><h3>Population: 693,972</h3><h3>Area: '+feature.properties.AREAMILES+' Square Miles</h3><h3><a href='+feature.properties.WEB_URL+' target="_blank">Discover DC</a></h3>');
    marker1.on('click', function (event) {
  this.openPopup();
});
  }
})

  var myMap = L.map("map", {
    center: [
      38.9, -77
    ],
    zoom: 11,
    layers: [streetmap, boundary]
  });

d3.json(quadrantURL, function(quadrantData) {
  var quad = L.geoJSON(quadrantData, {
        onEachFeature: function (feature, layer) {
    layer.on('click', function (event) {
myMap.fitBounds(event.target.getBounds());
});
    var marker1 = layer.bindPopup('<h3>'+feature.properties.QUADRANT+'</h3>');
    marker1.on('mouseover', function (event) {
      this.openPopup()
    })
    marker1.on('mouseout', function (event) {
      this.closePopup()
    })
  },
    style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.QUADRANT),
        fillOpacity: 0.5,
        weight: 1.5
      };
    }
})
  d3.json(neighborhoodsURL, function(neighborhoodData) {
  var neighborhood = L.geoJSON(neighborhoodData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        color: "purple"
      };
    },
  onEachFeature: function (feature, layer) {
    var marker4 = layer.bindPopup('<h3>'+feature.properties.SHORT_NAME+'</h3>');
    marker4.on('mouseover', function (event) {
  this.openPopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.8
  })
});
marker4.on('mouseout', function (event) {
  this.closePopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.2
  })
});
        marker4.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })
  d3.json(sportsURL, function(response) {
  var sportsArenas = L.markerClusterGroup();
  for (var i = 0; i < response.length; i++) {
    sportsArenas.addLayer(L.marker([response[i]['LAT'], response[i]['LON']], {icon: sportsIcon})
        .bindPopup('<h3>'+response[i].STADIUM+'</h3><h4>Seats: '+response[i].CAPACITY+'</h4><h4>Home To: '+response[i].TEAMS+'</h4>'));
  }
  d3.json(theatreURL, function(theatreData) {
  var theatres = L.geoJSON(theatreData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: theatreIcon})
    },
    onEachFeature: function (feature, layer) {
    layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4>');
    }
    })  
  var theatresGroup = L.markerClusterGroup();
  theatresGroup.addLayer(theatres)

    d3.json(metroURL, function(metroData) {
  var metroStops = L.geoJSON(metroData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: metroIcon})
    },
    onEachFeature: function (feature, layer) {
    layer.bindPopup('<h3>'+feature.properties.NAME+'</h3><h3>Line: '+feature.properties.LINE+'</h3><h4>'+feature.properties.ADDRESS+'</h4>');
    }
    })  
  var metroGroup = L.markerClusterGroup();
  metroGroup.addLayer(metroStops)

      d3.json(museumsURL, function(museumData) {
  var museums = L.geoJSON(museumData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: museumIcon})
    },
    onEachFeature: function (feature, layer) {
    layer.bindPopup('<h3>'+feature.properties.NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4>');
    }
    })  
  var museumGroup = L.markerClusterGroup();
  museumGroup.addLayer(museums)

        d3.json(memorialsURL, function(memorialsData) {
  var memorials = L.geoJSON(memorialsData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: memorialsIcon})
    },
    onEachFeature: function (feature, layer) {
    layer.bindPopup('<h3>'+feature.properties.NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4>');
    }
    })  
  var memorialsGroup = L.markerClusterGroup();
  memorialsGroup.addLayer(memorials)
 
        d3.json(RestaurantURL, function(RestaurantData) {
  var restaurants = L.geoJSON(RestaurantData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: restaurantsIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var RestaurantGroup = L.markerClusterGroup();
  RestaurantGroup.addLayer(restaurants)

      d3.json(barsURL, function(barsData) {
  var bars = L.geoJSON(barsData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: nightclubsIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var barsGroup = L.markerClusterGroup();
  barsGroup.addLayer(bars)

  var overlayMaps = {
    "DC Boundary": boundary,
    "DC Quadrants": quad,
    "DC Neighborhoods": neighborhood,
    "Sports Arenas": sportsArenas,
    "Theatres": theatresGroup,
    "Museums": museumGroup,
    "Monuments and Memorials": memorialsGroup,
    "Metro Stations": metroGroup,
    "Restaurants": RestaurantGroup,
    "Taverns, Bars, and Nightclubs": barsGroup
  }

  L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(myMap);
})
})
})
})
})
})
})
})
})
})