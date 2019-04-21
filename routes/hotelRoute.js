const express = require('express');
const route = express.Router();
const sentiment = require('../logic');
route.get('/:name', (req,res)=>{
    var file = require('F:/Work/College/Major Project/opinionMining/demo.json');
    var hotelObj = {};
    var name = req.params.name.toLowerCase();
    file.forEach(hotelChunk=>{
       if(hotelChunk.hotel==name){
           console.log(hotelChunk.hotel);
           hotelObj.hotel = hotelChunk.hotel;
           hotelObj.reviews = hotelChunk.reviews;
       }
    });
    var reviewObjects = [];
    hotelObj.reviews.forEach(review=>{
        var reviewObj = {};
        reviewObj.reviewText = review;
        reviewObj.reviewAnalysis = sentiment.analyze(review);
        reviewObj.reviewAnalysis.myComp = reviewObj.reviewAnalysis.score/reviewObj.reviewAnalysis.words.length;
        reviewObjects.push(reviewObj);
    });
    res.render('hotelPage',{hotelName: req.params.name, reviewObjects: reviewObjects});
});

/* route.get('/show',(req,res)=>{
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

route.get('/hotel/:name',(req,res)=>{
    console.log('inside /hotel/'+req.params.name);
    res.send('Hello there');
});

function calcAvgScore(reviews){
    var avgScore = 0;
    reviews.forEach(review=>{
        var reviewScore = sentiment.analyze(review).score;
        avgScore += reviewScore;
    })
    avgScore = avgScore/reviews.length;
    return avgScore.toFixed(3);
}

function calcAvgComparative(reviews){
    var avgScore = 0;
    reviews.forEach(review=>{
        var reviewScore = sentiment.analyze(review).comparative;
        avgScore += reviewScore;
    })
    avgScore = avgScore/reviews.length;
    return avgScore.toFixed(3);
} */

module.exports = route;