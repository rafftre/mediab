import template from './standings-page.html';

const StandingsPageComponent = {
  bindings: {
  },
  templateUrl: template,
  controller: class StandingsPageController {
    /* @ngInject */
    constructor($timeout, $window, standingsDataService) {
      this.$timeout = $timeout;
      this.$window = $window;

      this.debugStatus = { // TODO: provvisorio
        width: this.$window.innerWidth,
        limit: standingsDataService.stats.limit,
        remaining: standingsDataService.stats.remaining
      };

      this.waitingData = true;
      this.standings = null;
      this.penalties = null;

      standingsDataService.loadStandings().then(function(res) {
        $timeout(() => {
          this.waitingData = false;
          this.standings = res;
          this.penalties = standingsDataService.penalties;
          this.debugStatus.limit = standingsDataService.stats.limit;
          this.debugStatus.remaining = standingsDataService.stats.remaining;
        });
      }.bind(this), function(err) {
        $timeout(() => this.waitingData = false );
      }.bind(this));
    }
  }
};

export default StandingsPageComponent;
