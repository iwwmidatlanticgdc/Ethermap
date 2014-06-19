'use strict';

var io = {
  connect: function() {
    return {
      emit: function() {},
      on: function() {}
    };
  }
};

describe('MapHandler', function() {
  var mapHandlerService, map, drawnItems;

  beforeEach(module('CollaborativeMap'));

  beforeEach(inject(function(MapHandler) {
    mapHandlerService = MapHandler;
  }));

  beforeEach(function() {
    var element = document.createElement('div');
    /*global L:false */
    map = L.mapbox.map(element);
    drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
  });


  it('L is defined', function() {
    expect(L).toBeDefined();
  });

  it('map & drawnItems is defined', function() {
    expect(map).toBeDefined();
    expect(drawnItems).toBeDefined();
  });

  it('addGeoJSONFeature adds new layer', function() {
    var event = {
      'action': 'created feature',
      'feature': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'Point',
          'coordinates': [13.705015182495117, 51.064539870065275]
        },
        'lastAction': 'created feature'
      },
      'fid': '140317650070370229',
      'user': 'tes234fdsf'
    };
    mapHandlerService.addGeoJSONFeature(map, event, drawnItems, false, '#FFFFFF');
    expect(drawnItems._layers[event.fid]).toBeDefined();
  });

});
