const router = require('express').Router();
const controller = require('../controllers/ticketsController')

router.post('/tickets',controller.createTicket);
router.delete('/tickets',controller.deleteTicket);
router.get('/tickets',controller.getTickets);
router.put('/cost',controller.updateTicketCost)
router.put('/balance',controller.updateTicketBalance)
router.put('/zone',controller.updateTicketZone)


module.exports = router;