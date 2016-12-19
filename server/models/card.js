import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Joi from 'joi';
import APIError from '../helpers/APIError';

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId, ref: 'List',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CardSchema.statics = {
  /**
   * Get card
   * @param {ObjectId} id - The objectId of card.
   * @returns {Promise<Card, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((card) => {
        if (card) {
          return card;
        }
        const err = new APIError('No such card exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Card cards in descending order of 'createdAt' timestamp.
   * @param {number} limit - Limit number of cards to be returned.
   * @returns {Promise<Card[]>}
   */
  list({ listId, limit = 50 } = {}) {
    return this.find({ listId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
};

export const paramValidation = {
  // POST /api/cards
  createCard: {
    body: {
      name: Joi.string().required(),
      listId: Joi.string().required(),
    }
  },

  // UPDATE /api/cards/:cardId
  updateCard: {
    params: {
      cardId: Joi.string().hex().required()
    }
  },
};

export default mongoose.model('Card', CardSchema);
