const express = require('express');
const {getTicketNotes, addTicketNote} = require('../controllers/noteController')
const router = express.Router({
    mergeParams: true,
});

const {protect} = require('../middleware/authMiddleware');
router.route('/').get(protect, getTicketNotes).post(protect, addTicketNote)

module.exports = router;