import Card from '../models/card';
import trelloPlugin from '../plugins/trello';

/**
 * Load card and append to req.
 */
function load(req, res, next, id) {
  Card.get(id)
    .then((card) => {
      req.card = card; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get card
 * @returns {Card}
 */
function get(req, res) {
  return res.json(req.card);
}

/**
 * Create new card
 * @property {string} req.body.name - The name of card.
 * @property {number} req.body.index - The index of card.
 * @returns {Card}
 */
function create(req, res, next) {
  // const card = new Card({
  //   name: req.body.name,
  //   index: req.body.index,
  // });
  // card.save()
  //   .then(savedCard => res.json(savedCard))
  //   .catch(e => next(e));

  console.log("Test it");

  trelloPlugin.create({
    name: req.body.name,
    index: req.body.index,
  }, savedCard => res.json(savedCard));
}

/**
 * Update existing card
 * @property {string} req.body.name - The name of card.
 * @property {number} req.body.index - The index of card.
 * @returns {Card}
 */
function update(req, res, next) {
  const card = req.card;
  card.name = req.body.name;
  card.index = req.body.index;

  card.save()
    .then(savedCard => res.json(savedCard))
    .catch(e => next(e));
}

/**
 * Get card list.
 * @property {number} req.query.limit - Limit number of cards to be returned.
 * @returns {Card[]}
 */
function list(req, res, next) {
  trelloPlugin.synchronizeCard()
    .then(() => Card.find())
    .then(cards => res.json(cards))
    .catch(e => next(e));
}

/**
 * Delete card.
 * @returns {Card}
 */
function remove(req, res, next) {
  const card = req.card;
  card.remove()
    .then(deletedCard => res.json(deletedCard))
    .catch(e => next(e));
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove
};
