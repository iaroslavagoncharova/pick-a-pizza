import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { removePizza, changeQuantity, createCart, getOrders } from '../controllers/shopping-cart-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/shopping-cart/shopping-cart.html'));
});

cartRouter.route('/')
  .post(createCart);

cartRouter.route('/:id')
  .get(getOrders)
  .put(changeQuantity)
  .delete(removePizza);

export default cartRouter;