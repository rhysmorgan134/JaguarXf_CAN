class Kodi {
    constructor() {
        this.data = {
            films: {}
        };
        this.request = require('request');
        this.updateFilms();
    }

    getFilms() {
        console.log("RETURNING FILMS", this.data.films)
        return this.data.films
    }

    setFilms(data) {
        var tempData = JSON.parse(data);
        console.log(tempData)
        this.data.films = tempData.result;
    }

    updateFilms() {
        console.log(this.data)
        this.request('http://192.168.0.1/jsonrpc?request={"jsonrpc": "2.0", "method": "VideoLibrary.GetMovies", "params": {"limits": { "start" : 0, "end": 75 }, "properties" : ["art", "rating", "thumbnail", "playcount", "file"], "sort": { "order": "ascending", "method": "label", "ignorearticle": true } }, "id": "libMovies"}', function(err, res, body) {
            if(err) {
                console.log('error')
            } else {
                var tempData = JSON.parse(body);
                this.data.films = tempData.result;
                console.log(this.data)
            }

        }.bind(this))
    }

    play (film) {
        console.log("playing film")
        this.request.post('http://192.168.0.1/jsonrpc', {
            json: {
                "jsonrpc": "2.0",
                "method": "Player.Open",
                "id": 1,
                "params": {
                    "item": {
                        "file": `${film}`
                    }
                }
            }
        }, (err, res2, body) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res2)
            }
        })
    }
}

module.exports = Kodi;