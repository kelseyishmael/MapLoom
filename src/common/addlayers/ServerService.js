var SERVER_SERVICE_USE_PORT = false;
var SERVER_SERVICE_USE_PROXY = true;

(function() {
  var module = angular.module('loom_server_service', []);

  // Private Variables
  var servers = [];

  var rootScope_ = null;
  var service_ = null;
  var dialogService_ = null;
  var translate_ = null;
  var http_ = null;
  var location_ = null;
  var configService_ = null;
  var q_ = null;
  var serverCount = 0;

  module.provider('serverService', function() {
    this.$get = function($rootScope, $http, $q, $location, $translate, dialogService, configService) {
      service_ = this;
      rootScope_ = $rootScope;
      dialogService_ = dialogService;
      translate_ = $translate;
      http_ = $http;
      location_ = $location;
      configService_ = configService;
      configService_.serverList = servers;
      q_ = $q;

      return this;
    };

    this.getServers = function() {
      return servers;
    };

    this.getServerById = function(id) {
      var server = null;

      if (!goog.isDefAndNotNull(id)) {
        throw ({
          name: 'serverService',
          level: 'High',
          message: 'undefined server id.',
          toString: function() {
            return this.name + ': ' + this.message;
          }
        });
      }

      for (var index = 0; index < servers.length; index += 1) {
        if (servers[index].id === id) {
          server = servers[index];
          break;
        }
      }

      //console.log('----[ returning server id: ', id, ', server: ', server);
      return server;
    };

    this.getServerIndex = function(id) {

      if (!goog.isDefAndNotNull(id)) {
        throw ({
          name: 'serverService',
          level: 'High',
          message: 'undefined server id.',
          toString: function() {
            return this.name + ': ' + this.message;
          }
        });
      }

      for (var index = 0; index < servers.length; index += 1) {
        if (servers[index].id === id) {
          return index;
        }
      }

      return -1;
    };

    this.getServerByPtype = function(ptype) {
      var server = null;

      if (!goog.isDefAndNotNull(ptype)) {
        throw ({
          name: 'serverService',
          level: 'High',
          message: 'undefined server ptype.',
          toString: function() {
            return this.name + ': ' + this.message;
          }
        });
      }

      for (var index = 0; index < servers.length; index += 1) {
        if (servers[index].ptype === ptype) {
          server = servers[index];
          break;
        }
      }

      //console.log('----[ returning server ptype: ', ptype, ', server: ', server);
      return server;
    };

    this.getServerByName = function(name) {
      var server = null;

      if (!goog.isDefAndNotNull(name)) {
        throw ({
          name: 'serverService',
          level: 'High',
          message: 'undefined server name.',
          toString: function() {
            return this.name + ': ' + this.message;
          }
        });
      }

      for (var index = 0; index < servers.length; index += 1) {
        if (servers[index].name.toLocaleLowerCase() === name.toLowerCase()) {
          server = servers[index];
          break;
        }
      }

      //console.log('----[ returning server with name: ', name, ', server: ', server);
      return server;
    };

    this.getServerLocalGeoserver = function() {
      var server = null;
      for (var index = 0; index < servers.length; index += 1) {
        if (servers[index].isLocal === true) {
          server = servers[index];
          break;
        }
      }
      return server;
    };

    this.changeCredentials = function(server) {
      var deferredResponse = q_.defer();
      var doWork = function() {
        service_.populateLayersConfig(server, true)
            .then(function(response) {
              deferredResponse.resolve(server);
            }, function(reject) {
              deferredResponse.reject(server, reject);
            });
      };

      if (goog.isDefAndNotNull(server.url)) {
        if (server.url.indexOf(location_.host()) === -1) {
          dialogService_.promptCredentials(server.url, true).then(function(credentials) {
            server.username = credentials.username;
            server.authentication = $.base64.encode(credentials.username + ':' + credentials.password);

            var subURL = server.url.replace('/wms', '/rest');
            subURL = subURL.replace('http://', 'http://null:null@');
            $.ajax({
              url: subURL,
              type: 'GET',
              dataType: 'jsonp',
              jsonp: 'callback',
              complete: doWork
            });
          }, function(reject) {
            if (goog.isDefAndNotNull(reject) && reject.anonymous) {
              server.username = translate_('anonymous');
              server.authentication = undefined;
              doWork();
            }
          });
        } else {
          server.username = configService_.username;
          server.isLocal = true;
          doWork();
        }
      } else {
        doWork();
      }
      return deferredResponse.promise;
    };

    this.addServer = function(serverInfo, loaded) {
      var deferredResponse = q_.defer();

      // save the config object on the server object so that when we save the server, we only pass the config as opposed
      // to anything else that the app ads to the server objects.
      var server = {id: null, ptype: 'gxp_olsource', config: serverInfo, populatingLayersConfig: false};

      goog.object.extend(server, serverInfo, {});

      if (goog.isDefAndNotNull(loaded)) {
        loaded = false;
      }

      var doWork = function() {
        console.log('---- MapService.layerInfo. trying to add server: ', server);
        service_.populateLayersConfig(server)
            .then(function(response) {
              // set the id. it should always resolve to the length
              if (server.layersConfig.length === 0 && !loaded) {
                dialogService_.warn(translate_('add_server'), translate_('server_connect_failed'),
                    [translate_('yes_btn'), translate_('no_btn')], false).then(function(button) {
                  switch (button) {
                    case 0:
                      server.id = serverCount++;
                      servers.push(server);
                      rootScope_.$broadcast('server-added', server.id);
                      deferredResponse.resolve(server);
                      break;
                    case 1:
                      deferredResponse.reject(server);
                      break;
                  }
                });
              } else {
                server.id = serverCount++;
                servers.push(server);
                rootScope_.$broadcast('server-added', server.id);
                deferredResponse.resolve(server);
              }
            }, function(reject) {
              deferredResponse.reject(reject);
            });
      };

      if (goog.isDefAndNotNull(server.url)) {
        if (server.url.indexOf(location_.host()) === -1) {
          dialogService_.promptCredentials(server.url, false).then(function(credentials) {
            server.username = credentials.username;
            server.authentication = $.base64.encode(credentials.username + ':' + credentials.password);

            var subURL = server.url.replace('/wms', '/rest');
            subURL = subURL.replace('http://', 'http://null:null@');
            $.ajax({
              url: subURL,
              type: 'GET',
              dataType: 'jsonp',
              jsonp: 'callback',
              complete: doWork
            });
          }, function(reject) {
            server.username = translate_('anonymous');
            server.authentication = undefined;
            doWork();
          });
        } else {
          server.username = configService_.username;
          server.isLocal = true;
          server.name = translate_('local_geoserver');
          doWork();
        }
      } else {
        doWork();
      }

      return deferredResponse.promise;
    };

    this.removeServer = function(id) {
      var serverIndex = -1;
      for (var index = 0; index < servers.length; index += 1) {
        if (servers[index].id === id) {
          serverIndex = index;
          break;
        }
      }
      if (serverIndex > -1) {
        var server = servers.splice(serverIndex, 1)[0];
        rootScope_.$broadcast('server-removed', server);
      }
    };

    this.configDefaultServers = function() {
      var config = null;
      console.log('----- Configuring default servers.');

      if (!goog.isDefAndNotNull(service_.getServerByPtype('gxp_bingsource'))) {
        config = {ptype: 'gxp_bingsource', name: 'Bing', defaultServer: true};
        service_.addServer(config);
      } else {
        service_.getServerByPtype('gxp_bingsource').defaultServer = true;
      }

      if (!goog.isDefAndNotNull(service_.getServerByPtype('gxp_mapquestsource'))) {
        config = {ptype: 'gxp_mapquestsource', name: 'MapQuest', defaultServer: true};
        service_.addServer(config);
      } else {
        service_.getServerByPtype('gxp_mapquestsource').defaultServer = true;
      }

      if (!goog.isDefAndNotNull(service_.getServerByPtype('gxp_osmsource'))) {
        config = {ptype: 'gxp_osmsource', name: 'OpenStreetMap', defaultServer: true};
        service_.addServer(config);
      } else {
        service_.getServerByPtype('gxp_osmsource').defaultServer = true;
      }
      if (goog.isDefAndNotNull(service_.getServerLocalGeoserver())) {
        service_.getServerLocalGeoserver().defaultServer = true;
      }
    };

    this.getLayersConfig = function(serverId) {
      var server = service_.getServerById(serverId);
      if (goog.isDefAndNotNull(server)) {
        return server.layersConfig;
      }
    };

    this.getLayerConfig = function(serverId, layerName) {
      var layersConfig = service_.getLayersConfig(serverId);
      var layerConfig = null;

      for (var index = 0; index < layersConfig.length; index += 1) {
        if (layersConfig[index].Name === layerName) {
          layerConfig = layersConfig[index];
          break;
        }
      }

      console.log('---- ServerService.getLayerConfig: ', layerConfig);
      return layerConfig;
    };

    this.populateLayersConfig = function(server, force) {
      var deferredResponse = q_.defer();
      console.log('---- ServerService.populateLayersConfig. server', server);

      if (!goog.isDefAndNotNull(server)) {
        //TODO: make sure it is okay to reject and then return the promise
        deferredResponse.reject();
        return deferredResponse.promise;
      }

      if (!goog.isDefAndNotNull(server.layersConfig) ||
          (goog.isDefAndNotNull(force) && force)) {

        // clear out layers config
        server.layersConfig = [];

        if (server.ptype === 'gxp_bingsource') {
          server.layersConfig = [
            {Title: 'BingRoad', Name: 'BingRoad', sourceParams: {imagerySet: 'Road'}},
            {Title: 'BingAerial', Name: 'BingAerial', sourceParams: {imagerySet: 'Aerial'}},
            {Title: 'BingAerialWithLabels', Name: 'BingAerialWithLabels',
              sourceParams: {imagerySet: 'AerialWithLabels'}},
            {Title: 'BingCollinsBart', Name: 'BingCollinsBart', sourceParams: {imagerySet: 'collinsBart'}},
            {Title: 'BingSurvey', Name: 'BingSurvey', sourceParams: {imagerySet: 'ordnanceSurvey'}}
          ];
          deferredResponse.resolve(server);
        } else if (server.ptype === 'gxp_mapquestsource') {
          server.layersConfig = [
            {Title: 'MapQuestSat', Name: 'MapQuestSat', sourceParams: {layer: 'sat'}},
            {Title: 'MapQuestHybrid', Name: 'MapQuestHybrid', sourceParams: {layer: 'hyb'}},
            {Title: 'MapQuestOSM', Name: 'MapQuestOSM', sourceParams: {layer: 'osm'}}
          ];
          deferredResponse.resolve(server);
        } else if (server.ptype === 'gxp_osmsource') {
          server.layersConfig = [
            {Title: 'OpenStreetMap', Name: 'mapnik'}
          ];
          deferredResponse.resolve(server);
        } else if (server.ptype === 'gxp_wmscsource' ||
            server.ptype === 'gxp_tmssource') { // currently, if it is a tms endpoint, assume it has wmsgetcapabilities
          console.log('---- ServerService.Sending GetCapabilities.server: ', server);
          if (!goog.isDefAndNotNull(server.url)) {
            dialogService_.error(translate_('error'), translate_('server_url_not_specified'));
            deferredResponse.reject(server);
          } else {
            var parser = new ol.format.WMSCapabilities();
            var url = server.url + '?SERVICE=WMS&REQUEST=GetCapabilities';
            server.populatingLayersConfig = true;
            var config = {};
            config.headers = {};
            if (goog.isDefAndNotNull(server.authentication)) {
              config.headers['Authorization'] = 'Basic ' + server.authentication;
            } else {
              config.headers['Authorization'] = '';
            }
            // server hasn't been added yet, so specify the auth headers here
            http_.get(url, config).then(function(xhr) {
              if (xhr.status === 200) {
                var response = parser.read(xhr.data);
                if (goog.isDefAndNotNull(response.Capability) &&
                    goog.isDefAndNotNull(response.Capability.Layer)) {
                  server.layersConfig = response.Capability.Layer.Layer;
                  console.log('---- populateLayersConfig.populateLayersConfig server', server);
                  rootScope_.$broadcast('layers-loaded', server.id);
                  deferredResponse.resolve(server);
                } else {
                  deferredResponse.resolve(server);
                }
                server.populatingLayersConfig = false;
              } else {
                deferredResponse.resolve(server);
                server.populatingLayersConfig = false;
              }
            }, function(xhr) {
              deferredResponse.resolve(server);
              server.populatingLayersConfig = false;
            });
          }
        }
      }

      return deferredResponse.promise;
    };

  });
}());
