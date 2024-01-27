import template from './standings-footer.html';

const StandingsFooterComponent = {
  bindings: {
    penalties: '<'
  },
  templateUrl: template,
  controller: class StandingsFooterController {
    /* @ngInject */
    constructor() {
    }
  }
};

export default StandingsFooterComponent;
