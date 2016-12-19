import mongoose from 'mongoose';
import List from '../../models/list';
import trello from './api';

const TrelloListSchema = new mongoose.Schema({
  _id: String,
  list: {
    type: mongoose.Schema.Types.ObjectId, ref: 'List',
    required: true,
  },
});

TrelloListSchema.index({ _id: 1, card: 1 }, { unique: true });

TrelloListSchema.statics = {
  findTrelloList(listDescription) {
    return this.findOne({_id: listDescription.id}).populate('list').then(nestedQuery);
    function nestedQuery(linkedList) {
      if (linkedList) {
        return linkedList.list;
      } else {
        return undefined;
      }
    }
  },

  createTrelloList(listDescription) {
    return List.create({ name: listDescription.name }).then(createLinkDocument);
    function createLinkDocument(list) {
      return TrelloList.create({
        _id: listDescription.id,
        list: list.id,
      });
    }
  },

  removeTrelloList(listDescription) {
    return this.findOne({_id: listDescription.id}).then(nestedQuery).populate('list');
    function nestedQuery(linkedList) {
      if (linkedList) {
        return linkedList.list.remove().then(() => linkedList.remove());
      }
    }
  },

  updateTrelloList(listDescription) {
    return this.findTrelloList(listDescription).then(nestedQuery);
    function nestedQuery(list) {
      if (list) {
        list.name = listDescription.name;
        return list.save();
      }
    }
  },
};

const TrelloList = mongoose.model('TrelloList', TrelloListSchema);

function synchronize() {
  return trello.getBoardLists('F4sP3vRt')
    .then(populateJsonResponse)
    .then(removeNotFoundLists);

  /// @returns Promise<TrelloList[]>
  function populateJsonResponse(jsonResponse) {
    var listPromise = Promise.resolve();
    jsonResponse.map((trelloList) => {
      listPromise = listPromise.then(() =>
        TrelloList.findTrelloList(trelloList).then(updateOrCreateList));
      function updateOrCreateList(listInstance) {
        if (listInstance) {
          return TrelloList.updateTrelloList(trelloList);
        } else {
          return TrelloList.createTrelloList(trelloList);
        }
      }
    });
    return listPromise.then(() => jsonResponse);
  }

  // Remove a list in the model if it is not found in the jsonResponse
  function removeNotFoundLists(jsonResponse) {
    TrelloList.find().populate('list').then(listCallback);
    function listCallback(lists) {
      var promises = Promise.resolve();
      lists.forEach((list) => {
        const found = jsonResponse.some(entry => entry.id === list._id);
        if (!found) {
          promises = promises.then(() =>
            List.remove(list.list.id).then(() => TrelloList.remove(list.id)));
        }
        return promises;
      });
    }
  }
}

function create(list) {
  return trello.addList('F4sP3vRt').then(nestedQuery);
  function nestedQuery(trelloResponse) {
    return TrelloList.create({
      _id: trelloResponse.id,
      list: list.id,
    });
  }
}

function remove(listId) {
  return TrelloList.findOne({list : listId}).then(nestedQuery);
  function nestedQuery(linkList) {
    if (linkList) {
      trello.updateList(linkList._id, {closed: 'true'});
      return linkList.remove();
    }
  }
}

function update(list) {
  return TrelloList.findOne({list : list.id}).then(nestedQuery);
  function nestedQuery(list) {
    return trello.updateList(list.id, {name: list.name});
  }
}

export default {
  synchronize,
  create,
  remove,
  update,
  TrelloList,
};
