/* @ngInject */
export default function StandingsDataService($log, $timeout, Restangular) {
  
  const totalRounds = 36;

  const penalties = [{
    name: "Foggia",
    points: 8,
    average: 8 / totalRounds
  }];

  const sampleData = {
    "api": {
      "results": 19,
      "standings": {
        "1": {
          "league_id": "95",
          "team_id": "525",
          "teamName": "Pescara",
          "play": "5",
          "win": "3",
          "draw": "2",
          "lose": "0",
          "goalsFor": "7",
          "goalsAgainst": "4",
          "goalsDiff": "3",
          "points": "11"
        },
        "2": {
          "league_id": "95",
          "team_id": "506",
          "teamName": "Benevento",
          "play": "4",
          "win": "3",
          "draw": "1",
          "lose": "0",
          "goalsFor": "11",
          "goalsAgainst": "5",
          "goalsDiff": "6",
          "points": "10"
        },
        "3": {
          "league_id": "95",
          "team_id": "504",
          "teamName": "Verona",
          "play": "4",
          "win": "3",
          "draw": "1",
          "lose": "0",
          "goalsFor": "9",
          "goalsAgainst": "4",
          "goalsDiff": "5",
          "points": "10"
        },
        "4": {
          "league_id": "95",
          "team_id": "520",
          "teamName": "Cremonese",
          "play": "5",
          "win": "2",
          "draw": "3",
          "lose": "0",
          "goalsFor": "8",
          "goalsAgainst": "4",
          "goalsDiff": "4",
          "points": "9"
        },
        "5": {
          "league_id": "95",
          "team_id": "510",
          "teamName": "Cittadella",
          "play": "5",
          "win": "3",
          "draw": "0",
          "lose": "2",
          "goalsFor": "6",
          "goalsAgainst": "2",
          "goalsDiff": "4",
          "points": "9"
        },
        "6": {
          "league_id": "95",
          "team_id": "867",
          "teamName": "Lecce",
          "play": "5",
          "win": "2",
          "draw": "2",
          "lose": "1",
          "goalsFor": "10",
          "goalsAgainst": "7",
          "goalsDiff": "3",
          "points": "8"
        },
        "7": {
          "league_id": "95",
          "team_id": "522",
          "teamName": "Palermo",
          "play": "5",
          "win": "2",
          "draw": "2",
          "lose": "1",
          "goalsFor": "9",
          "goalsAgainst": "6",
          "goalsDiff": "3",
          "points": "8"
        },
        "8": {
          "league_id": "95",
          "team_id": "518",
          "teamName": "Brescia",
          "play": "5",
          "win": "1",
          "draw": "3",
          "lose": "1",
          "goalsFor": "7",
          "goalsAgainst": "7",
          "goalsDiff": "0",
          "points": "6"
        },
        "9": {
          "league_id": "95",
          "team_id": "501",
          "teamName": "Crotone",
          "play": "5",
          "win": "2",
          "draw": "0",
          "lose": "3",
          "goalsFor": "7",
          "goalsAgainst": "8",
          "goalsDiff": "-1",
          "points": "6"
        },
        "10": {
          "league_id": "95",
          "team_id": "514",
          "teamName": "Salernitana",
          "play": "5",
          "win": "1",
          "draw": "3",
          "lose": "1",
          "goalsFor": "6",
          "goalsAgainst": "7",
          "goalsDiff": "-1",
          "points": "6"
        },
        "11": {
          "league_id": "95",
          "team_id": "521",
          "teamName": "Foggia",
          "play": "5",
          "win": "2",
          "draw": "0",
          "lose": "3",
          "goalsFor": "8",
          "goalsAgainst": "10",
          "goalsDiff": "-2",
          "points": "6"
        },
        "12": {
          "league_id": "95",
          "team_id": "515",
          "teamName": "Spezia",
          "play": "5",
          "win": "2",
          "draw": "0",
          "lose": "3",
          "goalsFor": "5",
          "goalsAgainst": "7",
          "goalsDiff": "-2",
          "points": "6"
        },
        "13": {
          "league_id": "95",
          "team_id": "507",
          "teamName": "Ascoli",
          "play": "4",
          "win": "1",
          "draw": "2",
          "lose": "1",
          "goalsFor": "3",
          "goalsAgainst": "4",
          "goalsDiff": "-1",
          "points": "5"
        },
        "14": {
          "league_id": "95",
          "team_id": "870",
          "teamName": "Padova",
          "play": "5",
          "win": "1",
          "draw": "2",
          "lose": "2",
          "goalsFor": "4",
          "goalsAgainst": "7",
          "goalsDiff": "-3",
          "points": "5"
        },
        "15": {
          "league_id": "95",
          "team_id": "524",
          "teamName": "Perugia",
          "play": "4",
          "win": "1",
          "draw": "1",
          "lose": "2",
          "goalsFor": "4",
          "goalsAgainst": "6",
          "goalsDiff": "-2",
          "points": "4"
        },
        "16": {
          "league_id": "95",
          "team_id": "519",
          "teamName": "Carpi",
          "play": "5",
          "win": "1",
          "draw": "1",
          "lose": "3",
          "goalsFor": "5",
          "goalsAgainst": "10",
          "goalsDiff": "-5",
          "points": "4"
        },
        "17": {
          "league_id": "95",
          "team_id": "517",
          "teamName": "Venezia",
          "play": "4",
          "win": "1",
          "draw": "0",
          "lose": "3",
          "goalsFor": "4",
          "goalsAgainst": "6",
          "goalsDiff": "-2",
          "points": "3"
        },
        "18": {
          "league_id": "95",
          "team_id": "864",
          "teamName": "Cosenza",
          "play": "4",
          "win": "0",
          "draw": "2",
          "lose": "2",
          "goalsFor": "2",
          "goalsAgainst": "6",
          "goalsDiff": "-4",
          "points": "2"
        },
        "19": {
          "league_id": "95",
          "team_id": "868",
          "teamName": "Livorno",
          "play": "4",
          "win": "0",
          "draw": "1",
          "lose": "3",
          "goalsFor": "2",
          "goalsAgainst": "7",
          "goalsDiff": "-5",
          "points": "1"
        }
      }
    }
  };

  let loadSampleData = () => new Promise(function(resolve, reject) {
    if (true) {
      $timeout(() => { // TODO: simula la comunicazione di rete
        $log.log('Load data ok');
        let standings = [];
        for (let pos in sampleData.api.standings) {
          let obj = sampleData.api.standings[pos];
          let penalty = penalties.find( x => x.name.toUpperCase() === obj.teamName.toUpperCase() );
          standings.push({
            id: obj.team_id,
            name: obj.teamName,
            played: obj.play,
            won: obj.win,
            drawn: obj.draw,
            lost: obj.lose,
            points: penalty ? obj.points - penalty.points : obj.points,
            average: penalty ? (obj.points / obj.play) - penalty.average : obj.points / obj.play,
            penalty: penalty
          });
        }
        resolve(standings);
      }, 1000);
    } else {
      $log.log('Load data error');
      reject(Error("It broke"));
    }
  });

  let apiStats = {
    limit: 50,
    remaining: 49
  };

  let loadFromApis = () => new Promise(function(resolve, reject) {
    Restangular.one('standings', 95).get().then(function(res) {
      $log.log('API remaining requests', res.headers('X-RateLimit-requests-Remaining'));
      apiStats.limit = res.headers('X-RateLimit-requests-Limit');
      apiStats.remaining = res.headers('X-RateLimit-requests-Remaining');

      let standings = [];
      if (res.data) {
        for (let pos in res.data.api.standings) {
          let obj = res.data.api.standings[pos];
          let penalty = penalties.find( x => x.name.toUpperCase() === obj.teamName.toUpperCase() );
          standings.push({
            id: obj.team_id,
            name: obj.teamName,
            played: obj.play,
            won: obj.win,
            drawn: obj.draw,
            lost: obj.lose,
            points: penalty ? obj.points - penalty.points : obj.points,
            average: penalty ? (obj.points / obj.play) - penalty.average : obj.points / obj.play,
            penalty: penalty
          });
        }
      }
      resolve(standings);
    }, function(err) {
      $log.log('Load data error');
      reject(err);
    });
  });
  
  return {
    penalties: penalties,
    stats: apiStats,
    //loadStandings: loadSampleData
    loadStandings: loadFromApis
  };
};
