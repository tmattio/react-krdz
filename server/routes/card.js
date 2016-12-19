import express from 'express';
import validate from 'express-validation';
import { paramValidation } from '../models/card';
import controller from '../controllers/card';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

/** GET /api/cards - Get list of cards */
.get(controller.list)

/** POST /api/cards - Create new card */
.post(validate(paramValidation.createCard), controller.create);

router.route('/:cardId')

/** GET /api/cards/:cardId - Get card */
.get(controller.get)

/** PUT /api/cards/:cardId - Update card */
.put(validate(paramValidation.updateCard), controller.update)

/** DELETE /api/cards/:cardId - Delete card */
.delete(controller.remove);

/** Load card when API with cardId route parameter is hit */
router.param('cardId', controller.load);

export default router;
