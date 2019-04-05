const express = require('express');

const db = require('./projectModel.js');

const router = express.Router();

//check
router.get('/', async (req, res) => {
    try {
        const pro = await db.get();
        res.status(200).json(pro);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'The project could not be retrieved'
        });
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const hub = await db.get(id).then(db => {
            if (db) {
                res.status(200).json(hub);
            } else {
                res.status(404).json({
                    message: 'The project ID does not exist'
                });
            } 
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'The project could not be retrieved'
        });
    }
});

router.get('/:id/actions', async (req, res) => {
    try {
        const {id} = req.params;
        const pros = await db.get(id);
        const action = await db.getProjectActions(id);
        if (!project) {
            res.status(404).json(action);
        } else {
            res.status(404).json({
                message: 'No action made',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'error getting action',
        });
    }
});

router.post('/', async (req, res) => {
    try {
        if (!name || !description) {
            res.status(404).json({
                message: 'provide details'
            })
        } 
        const {id} = await db.insert(req.body).then(newDb => {
             res.status(200).json(newDb);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'There was an error saving post.'
    });
    }
});

router.put('/', async (req, res) => {
    try {
        const hubs = await db.update(req.params.id, req.body).then(hubs => { 
            res.status(200).json(hubs);
        });
        { res.status(200).json(db);
        if (!id) {
            res.status(404).json({
                message: `The project id ${id} does not exist`,
            })
        }} res.json(hubs);
    } catch (err) {
        console.log(err);
        if( count = project.length > 0 ) {
            
        }
        res.status(500).json({
            message: 'error has occurred'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const led = await db.remove(req.param.id).then(led => {
            res.status(200).json(led)
        });
        {
            res.status(404).end({
                message: `The project id ${id} does not exist.`,
            })
        }   res.json(led);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'The project could not be removed'
        });
    }
});

module.exports = router;