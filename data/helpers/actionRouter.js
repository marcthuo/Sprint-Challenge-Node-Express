const express = require('express');

const db = require('./actionModel.js');

const router = express.Router();

//check
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

//check
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
        const newAct = req.body;
    try {    
        const action = await db.insert(newAct);
        console.log(action);
            res.status(201).json({
                message: 'New action created'
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'There was an error saving action.'
    });
    }
});

// check
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const update = req.body;
    try {
        const hub = await db.get(id);
        await db.update(id, update).then(hub => { 
            if (hub) {
            res.status(200).json(hub);
            } else { 
                res.status(404).json({
                message: 'The action does not exist',
                });
            }
        }) 
    } catch (err) {
        console.log(err);
        res.status(500).json({
             message: 'error has occurred'
        });    
    }
});
//check
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const del = await db.get(id);
        await db.remove(id).then(del => {
            if (del) {
            res.status(200).json(del)
        } else {
            res.status(404).end({
            message: `The action does not exist.`,
            })
        }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'The action could not be removed'
        });
    }
});

module.exports = router;