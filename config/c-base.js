var app = require('../server/app');

// Configure EVA unit 1
var crew = new app.Dictionary('Crew', 'crewtracker');
crew.addMeasurement('members', 'crew.members', [
  {
    units: 'members',
    format: 'integer',
    min: 0,
    max: 1000
  }
], {
  topic: 'c-base/crew/members'
});
crew.addMeasurement('passive', 'crew.passive', [
  {
    units: 'members',
    format: 'integer',
    min: 0,
    max: 1000
  }
], {
  topic: 'c-base/crew/passive'
});
crew.addMeasurement('online', 'crew.online', [
  {
    units: 'members',
    format: 'integer',
    min: 0,
    max: 100
  }
], {
  topic: 'CrewOnline.OUT'
}, function (online) {
  return online.length
});
var bar = new app.Dictionary('Bar', 'bartracker');
bar.addMeasurement('open', 'bar.open', [
  {
    units: 'barbot',
    format: 'boolean',
    min: 0,
    max: 1
  }
], {
  topic: 'bar/stateful'
}, function (state) {
  return state == 'opening' || state == 'open' || state == 'closing';
});
var replicatorValue = function (dict, key, name) {
  dict.addMeasurement('replicator_' + name, 'bar.replicator.' + key, [
    {
      units: 'available',
      format: 'boolean',
      min: 0,
      max: 1
    }
  ], {
    topic: 'Replicator.OUT'
  }, function (state) {
    var keys = Object.keys(state).sort();
    var stateKey = keys[key - 1];
    return state[stateKey];
  });
};
replicatorValue(bar, 1, 'clubmate');
replicatorValue(bar, 2, 'berliner1');
replicatorValue(bar, 3, 'berliner2');
replicatorValue(bar, 4, 'flora');
replicatorValue(bar, 5, 'premiumcola');
replicatorValue(bar, 6, 'spezi');
replicatorValue(bar, 7, 'kraftmalz');

var station = new app.Dictionary('Station', 'stationtracker');
station.addMeasurement('load', 'powermon.load', [
  {
    units: 'Watts',
    format: 'integer',
    min: 0,
    max: 15000
  }
], {
  topic: 'system/powermon/load'
});
station.addMeasurement('load_low', 'powermon.load_low', [
  {
    units: 'Watts',
    format: 'integer',
    min: 0,
    max: 15000
  }
], {
  topic: 'system/powermon/load_low'
});
station.addMeasurement('load_high', 'powermon.load_high', [
  {
    units: 'Watts',
    format: 'integer',
    min: 0,
    max: 15000
  }
], {
  topic: 'system/powermon/load_high'
});
station.addMeasurement('kdg_rx', 'echelon.kdg.rx', [
  {
    units: 'bytes',
    format: 'integer',
    min: 0,
    max: 2000000
  }
], {
  topic: 'system/echelon/traffic'
}, function (traffic) {
  return traffic.interfaces[0].rx;
});
station.addMeasurement('kdg_tx', 'echelon.kdg.tx', [
  {
    units: 'bytes',
    format: 'integer',
    min: 0,
    max: 2000000
  }
], {
  topic: 'system/echelon/traffic'
}, function (traffic) {
  return traffic.interfaces[0].tx;
});
station.addMeasurement('ipb_rx', 'echelon.ipb.rx', [
  {
    units: 'bytes',
    format: 'integer',
    min: 0,
    max: 2000000
  }
], {
  topic: 'system/echelon/traffic'
}, function (traffic) {
  return traffic.interfaces[1].rx;
});
station.addMeasurement('ipb_tx', 'echelon.ipb.tx', [
  {
    units: 'bytes',
    format: 'integer',
    min: 0,
    max: 2000000
  }
], {
  topic: 'system/echelon/traffic'
}, function (traffic) {
  return traffic.interfaces[1].tx;
});
station.addMeasurement('vacuum', 'device.vacuum', [
  {
    units: 'on',
    format: 'boolean',
    min: 0,
    max: 1
  }
], {
  topic: 'c-base/vacuum/on'
});
station.addMeasurement('mainhall_motion', 'motion.mainhall', [
  {
    units: 'motion',
    format: 'float',
    min: 0,
    max: 1
  }
], {
  topic: 'sensor/mainhallsensor/motion'
});
station.addMeasurement('workshop_motion', 'motion.workshop', [
  {
    units: 'motion',
    format: 'boolean',
    min: 0,
    max: 1
  }
], {
  topic: 'sensor/workshop/motion'
});
station.addMeasurement('weltenbau_motion', 'motion.weltenbaulab', [
  {
    units: 'motion',
    format: 'float',
    min: 0,
    max: 1
  }
], {
  topic: 'sensor/weltenbausensor/motion'
});
station.addMeasurement('announcement', 'c_out.announcement', [
  {
    units: 'Message',
    format: 'string'
  }
], {
  topic: 'c_out/announce_en'
});
var microclimate = new app.Dictionary('Microclimate', 'climatetracker');
microclimate.addMeasurement('mainhall_temperature', 'clima.temperature.mainhall', [
  {
    units: 'degrees',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'sensor/mainhallsensor/temperature'
});
microclimate.addMeasurement('mainhall_humidity', 'clima.humidity.mainhall', [
  {
    units: 'percentage',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'sensor/mainhallsensor/humidity'
});
microclimate.addMeasurement('workshop_temperature', 'clima.temperature.workshop', [
  {
    units: 'degrees',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'sensor/workshop/temperature'
});
microclimate.addMeasurement('workshop_humidity', 'clima.humidity.workshop', [
  {
    units: 'percentage',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'sensor/workshop/humidity'
});
microclimate.addMeasurement('workshop_sound', 'clima.sound.workshop', [
  {
    units: 'degrees',
    format: 'int',
    min: 0,
    max: 255
  }
], {
  topic: 'sensor/workshop/sound'
});
microclimate.addMeasurement('weltenbau_temperature', 'clima.temperature.weltenbaulab', [
  {
    units: 'degrees',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'sensor/weltenbausensor/temperature'
});
microclimate.addMeasurement('weltenbau_humidity', 'clima.humidity.weltenbaulab', [
  {
    units: 'percentage',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'sensor/weltenbausensor/humidity'
});
microclimate.addMeasurement('c_lab_light', 'clima.light.c_lab', [
  {
    units: 'lumens',
    format: 'int',
    min: 0,
    max: 255
  }
], {
  topic: 'sensor/c-lab/light'
});

var arboretum = new app.Dictionary('Arboretum', 'arboretumtracker');
arboretum.addMeasurement('leftdoor', 'arboretum.leftdoor', [
  {
    units: 'opened',
    format: 'boolean',
    min: 0,
    max: 1
  }
], {
  topic: 'arboretum/door/leftdooropen'
});
arboretum.addMeasurement('rightdoor', 'arboretum.rightdoor', [
  {
    units: 'opened',
    format: 'boolean',
    min: 0,
    max: 1
  }
], {
  topic: 'arboretum/door/rightdooropen'
});
arboretum.addMeasurement('arboretum_temperature', 'clima.temperature.arboretum', [
  {
    units: 'degrees',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'sensor/arboretum/temperature'
});
arboretum.addMeasurement('arboretum_humidity', 'clima.humidity.arboretum', [
  {
    units: 'percentage',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'sensor/arboretum/humidity'
});
microclimate.addMeasurement('arboretum_sound', 'clima.sound.arboretum', [
  {
    units: 'degrees',
    format: 'int',
    min: 0,
    max: 255
  }
], {
  topic: 'sensor/arboretum/sound'
});
arboretum.addMeasurement('txl_temperature', 'clima.temperature.txl', [
  {
    units: 'degrees',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'airportweather.TEMPERATURE'
});
arboretum.addMeasurement('txl_humidity', 'clima.humidity.txl', [
  {
    units: 'percentage',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'airportweather.HUMIDITY'
});
arboretum.addMeasurement('spree_temperature', 'clima.temperature.spree', [
  {
    units: 'degrees',
    format: 'float',
    min: 0,
    max: 100
  }
], {
  topic: 'c-base/spreesensor/temperature'
});
var ingress = new app.Dictionary('Ingress', 'ingresstracker');
ingress.addMeasurement('cbase', 'ingress.cbase.portal', [
  {
    units: 'Level',
    format: 'integer',
    min: -8,
    max: 8
  }
], {
  topic: 'ingress/status/a6301120831b46f1be00fa2cb0bce195.16'
}, function (state) {
  var level = state.level;
  if (state.team !== 'RESISTANCE') {
    level = level * -1;
  }
  return level;
});
ingress.addMeasurement('winning', 'ingress.winning', [
  {
    units: 'Blue',
    format: 'boolean',
    min: 0,
    max: 1
  }
], {
  topic: 'ingress-data.FLOOR'
}, function (state) {
  if (state[2] > 0) {
    return true;
  }
  return false;
});

// Start the server
var server = new app.Server({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  wss_port: process.env.WSS_PORT || 8082,
  broker: process.env.MSGFLO_BROKER || 'mqtt://c-beam.cbrp3.c-base.org',
  dictionaries: [
    bar,
    station,
    microclimate,
    arboretum,
    crew,
    ingress
  ],
  history: {
    host: process.env.INFLUX_HOST || 'localhost',
    db: process.env.INFLUX_DB || 'cbeam'
  },
  persistence: 'openmct.plugins.CouchDB("http://openmct.cbrp3.c-base.org:5984/openmct")'
});
server.start(function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server listening in ' + server.config.port);
});