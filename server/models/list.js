import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Joi from 'joi';
import APIError from '../helpers/APIError';

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ListSchema.statics = {
  /**
   * Get list
   * @param {ObjectId} id - The objectId of list.
   * @returns {Promise<List, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((list) => {
        if (list) {
          return list;
        }
        const err = new APIError('No such list exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
};

export const paramValidation = {
  // POST /api/lists
  createList: {
    body: {
      name: Joi.string().required(),
    }
  },

  // UPDATE /api/lists/:listId
  updateList: {
    params: {
      listId: Joi.string().hex().required()
    }
  },
};

export default mongoose.model('List', ListSchema);
