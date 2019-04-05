const express = require('express');

const db = require('./actionModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const hubs = await db.get();
        res.status(200).json(hubs);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'The action could not be retrieved'
        });
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const dub = await db.get(id).then(dub => {
            if (dub) {
                res.status(200).json(dub);
            } else {
                res.status(404).json({
                    message: 'The action ID does not exist'
                });
            } 
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'The action could not be retrieved'
        });
    }
});

router.post('/', async (req, res) => {
    try {    
        const action = await db.insert(req.body).then(action => {
            res.status(201).json(action);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'There was an error saving action.'
    });
    }
});

router.put('/', async (req, res) => {
    try {
        const hub = await db.update(req.params.id, req.body).then(hub => { 
            res.status(200).json(hub);
        });
        { res.status(200).json(db);
        if (!id) {
            res.status(404).json({
                message: 'The action does not exist',
            })
        }} res.json(hub);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'error has occurred'
        });    
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const del = await db.remove(req.param.id).then(del => {
            res.status(200).json(del)
        });
        {
            res.status(404).end({
                message: `The action does not exist.`,
            })
        }   res.json(del);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'The action could not be removed'
        });
    }
});

module.exports = router;