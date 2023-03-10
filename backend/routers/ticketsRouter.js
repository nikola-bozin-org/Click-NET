const router = require('express').Router();
const controller = require('../controllers/ticketsController')

router.post('/tickets',controller.createTicket);
router.delete('/tickets',controller.deleteTicket);
router.get('/tickets',controller.getTickets);


module.exports = router;