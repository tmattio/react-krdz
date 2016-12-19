import express from 'express';
import validate from 'express-validation';
import { paramValidation } from '../models/list';
import controller from '../controllers/list';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

/** GET /api/lists - Get list of lists */
.get(controller.list)

/** POST /api/lists - Create new list */
.post(validate(paramValidation.createList), controller.create);

router.route('/:listId')

/** GET /api/lists/:listId - Get list */
.get(controller.get)

/** PUT /api/lists/:listId - Update list */
.put(validate(paramValidation.updateList), controller.update)

/** DELETE /api/lists/:listId - Delete list */
.delete(controller.remove);

/** Load list when API with listId route parameter is hit */
router.param('listId', controller.load);

export default router;
