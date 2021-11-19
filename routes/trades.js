const express = require('express')
const router = express.Router()

const controller = require('../controllers/trades')


router.post('/', async function(req, res, next) {
  
  const newTrade = await controller.create({
    type: req.body.type,
    user_id: req.body.user_id,
    symbol: req.body.symbol,
    shares: req.body.shares,
    price: req.body.price,
    timestamp: req.body.timestamp
  })
  res.status(201).send(newTrade.get({ plain: true }))
  next()
})

router.get('/', async function(_, res, next) {
  console.log(await controller.findAll())
  res.status(200).send(await controller.findAll())
  next()
})

router.get('/:id', async function(req, res, next) {
  try {
    res.status(200).send(await controller.findByPk(req.params.id))
  } catch (e) {
    res.status(404).send('ID not found')
  } finally {
    next()
  }
})

router.route('/:id').put(nope).patch(nope).delete(nope)

async function nope(_, res, next) {
  res.status(405).end()
  next()
}
module.exports = router
