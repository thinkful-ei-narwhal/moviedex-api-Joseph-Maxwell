'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movieDataSmall = require('./movie-data-small');

app.use(cors());
app.use(morgan("common"));
app.use(helmet());

app.use(validateBearerToken);

const API_TOKEN = process.env.API_TOKEN;

function validateBearerToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({error: "You have to include your Auth token"})
    }
    if (authorization) {
        let validAuth = authorization.split(' ')[1];
        if (validAuth !== API_TOKEN) {
            res.status(400).json({error: "You provided the wrong Auth token"})
        }
        if (validAuth === API_TOKEN) {
            next(); 
        }
    }
    
}




app.get('/movies', (request, response) => {
    const {genre, country, averageVote} = request.query;

    let correctGenres = [];
    if(genre){
        correctGenres = movieDataSmall.filter(movie => {
            return movie.genre.toLowerCase().includes(genre.toLowerCase());
        });
    }

    let correctCountry = [];
    if(country){
        correctCountry = movieDataSmall.filter(movie => {
            return movie.country.toLowerCase().includes(country.toLowerCase());
        });
    }

    let correctVote = [];
    parseFloat(averageVote);
    if(averageVote){
        correctVote = movieDataSmall.filter(movie => {
            return movie.avg_vote > averageVote;
        });
    }

    let masterArray = [ ...correctGenres, ...correctCountry, ...correctVote ];

    response.json({masterArray});
});


app.listen(8080, () => console.log('Server listening on port 8080...'));