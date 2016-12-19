import List from '../models/list';
import trelloPlugin from '../plugins/trello';

/**
 * Load list and append to req.
 */
function load(req, res, next, id) {
  List.get(id)
    .then((list) => {
      req.list = list; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get list
 * @returns {List}
 */
function get(req, res) {
  return res.json(req.list);
}

/**
 * Create new list
 * @property {string} req.body.name - The name of list.
 * @property {number} req.body.index - The index of list.
 * @returns {List}
 */
function create(req, res, next) {
  const list = new List({
    name: req.body.name,
    index: req.body.index,
  });

  list.save()
    .then(savedList => res.json(savedList))
    .catch(e => next(e));
}

/**
 * Update existing list
 * @property {string} req.body.name - The name of list.
 * @property {number} req.body.index - The index of list.
 * @returns {List}
 */
function update(req, res, next) {
  const list = req.list;
  list.name = req.body.name;
  list.index = req.body.index;

  list.save()
    .then(savedList => res.json(savedList))
    .catch(e => next(e));
}

/**
 * Get list list.
 * @property {number} req.query.limit - Limit number of lists to be returned.
 * @returns {List[]}
 */
function list(req, res, next) {
  trelloPlugin.synchronizeList()
    .then(() => List.find())
    .then(lists => res.json(lists))
    .catch(e => next(e));
}

/**
 * Delete list.
 * @returns {List}
 */
function remove(req, res, next) {
  const list = req.list;
  list.remove()
    .then(deletedList => res.json(deletedList))
    .catch(e => next(e));
  trelloPlugin.removeList(list.id);
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove
};
