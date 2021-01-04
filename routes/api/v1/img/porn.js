const {Router} = require('express');
const axios = require('axios');
let route = Router();

route.get('/', (req, res, next) => {
    let baseUrl = "http://cdn.api.teamtritan.wtf/nsfw/porn/";
    axios.get("http://cdn.api.teamtritan.wtf/nsfw/porn/map.json").then((res_) => {
       let randomImg = res_.data.max;
       let randomTitle = Math.floor((Math.random() * randomImg) + 1) + ".jpg";
        res.json({img: baseUrl + randomTitle});
    });
});

module.exports = route; 