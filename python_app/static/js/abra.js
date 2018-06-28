boundaryURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-boundary.geojson"
quadrantURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-quadrants.geojson"
neighborhoodsURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/neighborhood-clusters.geojson"
manufacturerURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/abra-manufacturer.geojson"
wholesaleURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/abra-wholesaler.geojson"
liquorStoreURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/retail-liquor-store.geojson"
groceryURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/retail-grocery-and-class-b.geojson"
MarineVesselURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/marine-vessel.geojson"
HotelsURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/hotels.geojson"
MultipurposeURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/abra-multipurpose.geojson"
NightclubURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/nightclubs.geojson"
PrivateClubURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/private-club.geojson"
TavernURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/taverns.geojson"
RestaurantURL = "https://raw.githubusercontent.com/AMRiehle/DC_Dashboard/master/auxiliary/dc-maps/local-datasets/restaurants.geojson"

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
  d3.json(manufacturerURL, function(manufacturerData) {
  var manufacturers = L.geoJSON(manufacturerData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: manufacturerIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var manufacturersGroup = L.markerClusterGroup();
  manufacturersGroup.addLayer(manufacturers)

    d3.json(wholesaleURL, function(wholesaleData) {
  var wholesalers = L.geoJSON(wholesaleData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: wholesaleIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var wholesaleGroup = L.markerClusterGroup();
  wholesaleGroup.addLayer(wholesalers)

    d3.json(liquorStoreURL, function(liquorStoreData) {
  var liquorStores = L.geoJSON(liquorStoreData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: liquorStoreIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var liquorStoreGroup = L.markerClusterGroup();
  liquorStoreGroup.addLayer(liquorStores)

    d3.json(groceryURL, function(groceryStoreData) {
  var groceryStores = L.geoJSON(groceryStoreData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: groceryStoreIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var groceryStoreGroup = L.markerClusterGroup();
  groceryStoreGroup.addLayer(groceryStores)

      d3.json(MarineVesselURL, function(MarineVesselData) {
  var MarineVessels = L.geoJSON(MarineVesselData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: MarineVesselIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var MarineVesselGroup = L.markerClusterGroup();
  MarineVesselGroup.addLayer(MarineVessels)

  d3.json(HotelsURL, function(HotelData) {
  var hotels = L.geoJSON(HotelData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: HotelIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var HotelsGroup = L.markerClusterGroup();
  HotelsGroup.addLayer(hotels)

  d3.json(HotelsURL, function(HotelData) {
  var hotels = L.geoJSON(HotelData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: HotelIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var HotelsGroup = L.markerClusterGroup();
  HotelsGroup.addLayer(hotels)

    d3.json(MultipurposeURL, function(MultipurposeData) {
  var multipurpose = L.geoJSON(MultipurposeData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: artsIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var MultipurposeGroup = L.markerClusterGroup();
  MultipurposeGroup.addLayer(multipurpose)

      d3.json(NightclubURL, function(NightclubData) {
  var nightclubs = L.geoJSON(NightclubData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: nightclubsIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var NightclubGroup = L.markerClusterGroup();
  NightclubGroup.addLayer(nightclubs)

      d3.json(PrivateClubURL, function(PrivateClubData) {
  var PrivateClubs = L.geoJSON(PrivateClubData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: nightclubsIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var PrivateClubGroup = L.markerClusterGroup();
  PrivateClubGroup.addLayer(PrivateClubs)
 
      d3.json(TavernURL, function(TavernData) {
  var taverns = L.geoJSON(TavernData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: beerIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var TavernGroup = L.markerClusterGroup();
  TavernGroup.addLayer(taverns)

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

  var overlayMaps = {
    "DC Boundary": boundary,
    "DC Quadrants": quad,
    "DC Neighborhoods": neighborhood,
    "DC Alcohol Manufacturers": manufacturersGroup,
    "DC Alcohol Wholesale": wholesaleGroup,
    "DC Liquor Stores": liquorStoreGroup,
    "DC Grocery Stores and Markets": groceryStoreGroup,
    "DC Marine Vessels": MarineVesselGroup,
    "DC Hotels": HotelsGroup,
    "DC Multipurpose License Holders": MultipurposeGroup,
    "DC Nightclubs": NightclubGroup,
    "DC Private Clubs": PrivateClubGroup,
    "DC Taverns": TavernGroup,
    "DC Restaurants": RestaurantGroup
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
})
})
})
})
})