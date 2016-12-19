import mongoose from 'mongoose';
import Card from '../../models/card';
import trello from './api';
import listPlugin from './list';

const TrelloCardSchema = new mongoose.Schema({
  _id: String,
  trelloList: {
    type: mongoose.Schema.Types.ObjectId, ref: 'TrelloList',
    required: true,
  },
  card: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Card',
    required: true,
  },
});

TrelloCardSchema.index({ _id: 1, card: 1 }, { unique: true });

TrelloCardSchema.statics = {
  findTrelloCard(cardDescription) {
    return this.findOne({ _id: cardDescription.id }).populate('card').then(nestedQuery);
    function nestedQuery(linkedCard) {
      if (linkedCard) {
        return linkedCard.card;
      } else {
        return undefined;
      }
    }
  },

  createTrelloCard(cardDescription) {
    return listPlugin.TrelloList.findTrelloList({id: cardDescription.idList})
      .then(list => Card.create({ name: cardDescription.name, list: list._id }))
      .then(createLinkDocument);

    function createLinkDocument(card) {
      return TrelloCard.create({
        _id: cardDescription.id,
        trelloList: cardDescription.idList,
        card: card.id,
      });
    }
  },

  removeTrelloCard(cardDescription) {
    return this.findOne({ _id: cardDescription.id }).then(nestedQuery).populate('card');
    function nestedQuery(linkedCard) {
      if (linkedCard) {
        return linkedCard.card.remove().then(() => linkedCard.remove());
      }
    }
  },

  updateTrelloCard(cardDescription) {
    this.findById(cardDescription.id).populate('card').then(nestedQuery);

    function nestedQuery(card) {
      if (card) {
        card.trelloList = cardDescription.idList;

        card.card.name = cardDescription.name;
        listPlugin.TrelloList.findTrelloList({id: cardDescription.idList})
          .then((list) => card.card.list = list._id)
          .then(() => card.card.save());
        return card.save();
      }
    }
  },
};

export const TrelloCard = mongoose.model('TrelloCard', TrelloCardSchema);

function synchronize() {
  return listPlugin.synchronize()
    .then(() => trello.getBoardCards('F4sP3vRt'))
    .then(populateJsonResponse)
    .then(removeNotFoundCards);

  /// @returns Promise<TrelloCard[]>
  function populateJsonResponse(jsonResponse) {
    var cardPromise = Promise.resolve();
    jsonResponse.map((trelloCard) => {
      cardPromise = cardPromise.then(() =>
        TrelloCard.findTrelloCard(trelloCard).then(updateOrCreateCard));
      function updateOrCreateCard(cardInstance) {
        if (cardInstance) {
          return TrelloCard.updateTrelloCard(trelloCard);
        } else {
          return TrelloCard.createTrelloCard(trelloCard);
        }
      }
    });
    return cardPromise.then(() => jsonResponse);
  }

  // Remove a card in the model if it is not found in the jsonResponse
  function removeNotFoundCards(jsonResponse) {
    TrelloCard.find().populate('card').then(cardCallback);
    function cardCallback(cards) {
      var promises = Promise.resolve();
      cards.forEach((card) => {
        const found = jsonResponse.some(entry => entry.id === card.id);
        if (!found) {
          promises = promises.then(() =>
            Card.remove(card.card.id).then(() => TrelloCard.remove(card.id)));
        }
        return promises;
      });
    }
  }
}

function create(card) {
  return trello.addCard('F4sP3vRt').then(nestedQuery);
  function nestedQuery(trelloResponse) {
    return TrelloCard.create({
      _id: trelloResponse.id,
      card: card.id,
    });
  }
}

function remove(cardId) {
  return TrelloCard.findOne({card : cardId}).then(nestedQuery);
  function nestedQuery(linkCard) {
    if (linkCard) {
      trello.updateCard(linkCard.id, { closed: 'true' });
      return linkCard.remove();
    }
  }
}

function update(card) {
  return TrelloCard.findOne({card : card.id}).then(nestedQuery);
  function nestedQuery(card) {
    return trello.updateCard(card.id, {name: card.name});
  }
}

export default {
  synchronize,
  create,
  remove,
  update,
};
