import template from './standings-table.html';

const StandingsTableComponent = {
  bindings: {
    loading: '<',
    standings: '='
  },
  templateUrl: template,
  controller: class StandingsTableController {
    /* @ngInject */
    constructor() {
      this.sort = {
        property: 'average',
        asc: false
      };
    }
    
    orderBy(prop) {
      if (!this.sort || this.sort.property !== prop) {
        this.sort = {
          property: prop,
          asc: false
        };
        if (this.sort.property === 'name') {
          this.sort.asc = true;
        }
      } else {
        this.sort.asc = !this.sort.asc;
      }

      if (this.sort.property === 'average') {
        this.standings.sort(this.sort.asc ? this.compareByAverageAsc : this.compareByAverageDesc);
      } else if (this.sort.property === 'points') {
        this.standings.sort(this.sort.asc ? this.compareByPointsAsc : this.compareByPointsDesc);
      } else if (this.sort.property === 'played') {
        this.standings.sort(this.sort.asc ? this.compareByPlayedAsc : this.compareByPlayedDesc);
      } else if (this.sort.property === 'won') {
        this.standings.sort(this.sort.asc ? this.compareByWonAsc : this.compareByWonDesc);
      } else if (this.sort.property === 'name') {
        this.standings.sort(this.sort.asc ? this.compareByNameAsc : this.compareByNameDesc);
      }
    }

    compareByAverageDesc(a, b) {
      if (a.average !== b.average) {
        return b.average - a.average; // biggest values first
      }

      if (a.played !== b.played) {
        return a.played - b.played; // smallest values first
      }

      return a.name.localeCompare(b.name); // alphabetic order
    }

    compareByAverageAsc(a, b) {
      if (a.average !== b.average) {
        return a.average - b.average; // smallest values first
      }

      if (a.played !== b.played) {
        return b.played - a.played; // biggest values first
      }

      return b.name.localeCompare(a.name); // reverse alphabetic order
    }

    compareByPointsDesc(a, b) {
      if (a.points !== b.points) {
        return b.points - a.points; // biggest values first
      }

      if (a.played !== b.played) {
        return a.played - b.played; // smallest values first
      }

      return a.name.localeCompare(b.name); // alphabetic order
    }

    compareByPointsAsc(a, b) {
      if (a.points !== b.points) {
        return a.points - b.points; // smallest values first
      }

      if (a.played !== b.played) {
        return b.played - a.played; // biggest values first
      }

      return b.name.localeCompare(a.name); // reverse alphabetic order
    }

    compareByPlayedDesc(a, b) {
      if (a.played !== b.played) {
        return b.played - a.played; // biggest values first
      }

      return a.name.localeCompare(b.name); // alphabetic order
    }

    compareByPlayedAsc(a, b) {
      if (a.played !== b.played) {
        return a.played - b.played; // smallest values first
      }

      return b.name.localeCompare(a.name); // reverse alphabetic order
    }

    compareByWonDesc(a, b) {
      if (a.won !== b.won) {
        return b.won - a.won; // biggest values first
      }

      if (a.drawn !== b.drawn) {
        return b.drawn - a.drawn; // biggest values first
      }

      if (a.lost !== b.lost) {
        return a.lost - b.lost; // smallest values first
      }

      return a.name.localeCompare(b.name); // alphabetic order
    }

    compareByWonAsc(a, b) {
      if (a.won !== b.won) {
        return a.won - b.won; // smallest values first
      }

      if (a.drawn !== b.drawn) {
        return a.drawn - b.drawn; // smallest values first
      }
      
      if (a.lost !== b.lost) {
        return b.lost - a.lost; // biggest values first
      }

      return b.name.localeCompare(a.name); // reverse alphabetic order
    }

    compareByNameAsc(a, b) {
      return a.name.localeCompare(b.name); // alphabetic order
    }

    compareByNameDesc(a, b) {
      return b.name.localeCompare(a.name); // reverse alphabetic order
    }
  }
};

export default StandingsTableComponent;
