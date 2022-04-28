const express = require('express');
const router = express.Router();
const Professor = require('../models/professor');



//tested = pass
router.post('/createProfessor', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await req.models.professor.createProfessor(body.first_name, body.last_name, body.username, body.password, body.email, body.college_id);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new professor:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

router.get('/authenticateProfessor', async (req, res, next) => {
    try {
        const username = req.params.username;
        const password = req.params.password;
        console.log(username, password);
        const result = await Professor.authenticate(username, password);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current professor:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
})

//tested = pass
router.get('/searchProfessorById', async (req, res, next) => {
    try {
        const prof_id= req.query.prof_id;
        console.log(prof_id);
        const result = await Professor.searchById(prof_id);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current professor:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
})

//tested = pass
router.get('/getInstructorByUsername', async (req, res, next) => {
    try {
        const username = req.query.username;
        console.log(username);
        const result = await Professor.searchByUsername(username);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current professor:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
})

//tested = pass
router.get('/searchProfessorByEmail', async (req, res, next) => {
    try {
        const email = req.query.email;
        console.log(email);
        const result = await Professor.searchByEmail(email);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current professor:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
})

router.get('/searchProfessorByCollege', async (req, res, next) => {
    try {
        const college_id = req.params.college_id;
        console.log(college_id);
        const result = await Professor.searchByCollege(college_id);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current professor:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
})

router.get('/getProfessorName', async (req, res, next) => {
    try {
        const prof_id = req.params.prof_id;
        console.log(prof_id);
        const result = await Professor.getProfessorNamel(prof_id);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current professor:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
})


router.delete('/removeProfessor', async (req, res, next) => {
    try {
        const prof_id = req.params.prof_id;
        console.log(prof_id);
        const result = await req.models.professor.removeProfessor(prof_id);
        res.status(204).json(result);
    } catch (err) {
        console.error('Failed to delete professor:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;