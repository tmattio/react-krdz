import list from './list';
import card from './card';

export default {
  synchronizeList: list.synchronize,
  createList: list.create,
  removeList: list.remove,
  updateList: list.update,

  synchronizeCard: card.synchronize,
  createCard: card.create,
  removeCard: card.remove,
  updateCard: card.update,
}
