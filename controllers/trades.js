
const Trades = require('../models/trades')

async function create(input) {
  return await Trades.create({
    ...input
  })
}

async function update(id, input) {

  const validStages = [ 1, 2, 3 ]
  if (!validStages.includes(stage)) throw new Error(`Invalid : ${stage}`)

  const targetTrade = await Trades.findByPk(id)
  if (!targetTrade) {
    throw new Error(`Could not find Board with id: ${id}`)
  }
  await targetTrade.update({
    stage
  })
  return targetTrade
}


async function findByPk(id) {

  const targetTrade = await Trades.findByPk(id)

  if (!targetTrade) {
    throw new Error('Trade not found')
  }

  return targetTrade
}

async function findAll() {
  return Trades.findAll({ order: [ [ 'id', 'ASC' ] ], raw: true })
}

module.exports = {
  create,
  update,
  findByPk,
  findAll
}
