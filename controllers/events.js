const { response } = require('express');
const Event = require('../models/Event');

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {
        
        event.user = req.uid;

        await event.save();

        res.json({
            ok: true,
            event
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the administrator'
        })
    }
};

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate("user", "name")
    res.json({
        ok: true,
        events
    })
};

const deleteEvent = async (req, res = response) => {
    
    const eventId = req.params.id;
    const uid = req.uid

    try {
        
        const event = await Event.findById( eventId );
        
        if( !event ) {
            return res.status(400).json({
                ok: false,
                msg: 'Event does not exist'
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You did not create this event so you can not delete it'
            })
        }

        await Event.findByIdAndDelete( eventId, event );

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the administrator'
        })
    }
};

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {
        
        const event = await Event.findById( eventId );
        
        if( !event ) {
            return res.status(400).json({
                ok: false,
                msg: 'Event does not exist'
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You did not create this event so you can not edit it'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the administrator'
        })
    }
};


module.exports = {
    createEvent,
    getEvents,
    deleteEvent,
    updateEvent
}