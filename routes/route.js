const express = require('express');
const route = express.Router();
const sentiment = require('../logic');
route.get('/', (req,res)=>{
    res.render('opinion',{user: 'Rae'});
});

route.get('/show',(req,res)=>{
    console.log('inside /show');
    var hotelData = [];
    var file = require('F:/Work/College/Major Project/opinionMining/demo.json');
    file.forEach(hotelChunk=>{
        var hotelObj = {};
        hotelObj.hotel = hotelChunk.hotel.toUpperCase();
        hotelObj.avgScore = calcAvgScore(hotelChunk.reviews);
        hotelObj.avgComparative = calcAvgComparative(hotelChunk.reviews);
        hotelData.push(hotelObj);
    })
    console.log('sending json back.');
    res.json(hotelData);
});

function calcAvgScore(reviews){
    var avgScore = 0;
    reviews.forEach(review=>{
        var reviewScore = sentiment.analyze(review).score/2;
        avgScore += reviewScore;
    })
    avgScore = avgScore/reviews.length;
    return avgScore.toFixed(3);
}

function calcAvgComparative(reviews){
    var avgScore = 0;
    reviews.forEach(review=>{
        var temp = sentiment.analyze(review);
        var reviewScore = temp.score/temp.words.length;
        avgScore += reviewScore;
    })
    avgScore = avgScore/reviews.length;
    return avgScore.toFixed(3);
}

module.exports = route;