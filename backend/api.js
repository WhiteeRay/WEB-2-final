require('dotenv').config();
const axios = require('axios');

const getMusicData = async (query) => {
    try {
        const apiKey = process.env.LASTFM_API_KEY;
        const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(query)}&api_key=${apiKey}&format=json&limit=1`;
        
        const response = await axios.get(url);
        const track = response.data.results.trackmatches.track[0];

        if (!track) throw new Error('Track not found');

        return {
            name: track.name,
            artist: track.artist,
            image: "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
            url: track.url
        };
    } catch (error) {
        throw new Error('Music API error: ' + error.message);
    }
};

module.exports = { getMusicData };