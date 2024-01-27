import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import restangular from 'restangular';

import RootComponent from './root.component';
import StandingsModule from './standings/standings.module';

import '../sass/main.scss';

const RootModule = angular
  .module('root', [
    uiRouter,
    restangular,
    StandingsModule.name
  ])
  .config(/*@ngInject*/($urlRouterProvider, RestangularProvider) => {
    $urlRouterProvider.otherwise('/standings');

    RestangularProvider.setBaseUrl('https://api-football-v1.p.mashape.com');
    RestangularProvider.setDefaultHeaders({
        'X-Mashape-Key': 'abcdefghijklmnopqrstuvwxyz'
    });
    RestangularProvider.setDefaultHttpFields({
      timeout: 10000 // ms
    });
    RestangularProvider.setFullResponse(true);
  })
  .component('root', RootComponent);

export default RootModule;
