const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes/
// @access  Private
const getTicketNotes = asyncHandler(async (req, res) => {

    //get user from token
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401);
        throw new Error('User not authenticated or not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if(!ticket){
        res.status(404);
        throw new Error('Ticket was not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const notes = await Note.find({ ticket: req.params.ticketId });

    res.status(200).json(notes);
})

// @desc    Create notes for a ticket
// @route   POST /api/tickets/:ticketId/notes/
// @access  Private
const addTicketNote = asyncHandler(async (req, res) => {

    //get user from token
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401);
        throw new Error('User not authenticated or not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if(!ticket){
        res.status(404);
        throw new Error('Ticket was not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const note = await Note.create({
        text: req.body.text,
        isAdmin: false,
        user: req.user._id,
        ticket: req.params.ticketId
    });

    res.status(200).json(note);
})

module.exports = {
    getTicketNotes,
    addTicketNote,
}