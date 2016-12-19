import express from 'express';
import cardRoutes from './card';
import listRoutes from './list';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/cards', cardRoutes);
router.use('/lists', listRoutes);

export default router;
