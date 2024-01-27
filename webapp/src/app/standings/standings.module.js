import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import StandingsDataService from './shared/data/standings-data.service';

import StandingsPageComponent from './containers/standings-page/standings-page.component';
import StandingsHeaderComponent from './components/standings-header/standings-header.component';
import StandingsTableComponent from './components/standings-table/standings-table.component';
import StandingsFooterComponent from './components/standings-footer/standings-footer.component';

const StandingsModule = angular
  .module('components.standings', [
    uiRouter
  ])
  .config(/*@ngInject*/($stateProvider) => {
    $stateProvider
      .state('standings', {
        url: '/standings',
        component: 'standingsPage'
      });
  })
  .factory('standingsDataService', StandingsDataService)
  .component('standingsPage', StandingsPageComponent)
  .component('standingsHeader', StandingsHeaderComponent)
  .component('standingsTable', StandingsTableComponent)
  .component('standingsFooter', StandingsFooterComponent);

export default StandingsModule;
