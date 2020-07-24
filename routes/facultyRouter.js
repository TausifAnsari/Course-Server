const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Faculties = require('../models/faculties');
var authenticate = require('../authenticate');
const cors = require('./cors');

const facultyRouter = express.Router();

facultyRouter.use(bodyParser.json());

facultyRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Faculties.find(req.query)
    .then((faculties) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(faculties);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Faculties.create(req.body)
    .then((faculty) => {
        console.log('Faculty Created ', faculty);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(faculty);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /faculties');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Faculties.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

facultyRouter.route('/:facultyId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Faculties.findById(req.params.facultyId)
    .then((faculty) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(faculty);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /faculties/'+ req.params.facultyId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Faculties.findByIdAndUpdate(req.params.facultyId, {
        $set: req.body
    }, { new: true })
    .then((faculty) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(faculty);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Faculties.findByIdAndRemove(req.params.facultyId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = facultyRouter;