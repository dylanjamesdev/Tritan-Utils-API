const {Router} = require('express');
const axios = require('axios');
let route = Router();

route.get('/', (req, res, next) => {
    res.render("index");
});

module.exports = route; 