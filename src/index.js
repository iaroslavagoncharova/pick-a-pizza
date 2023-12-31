import express from 'express';
import path from 'path';
import mainRouter from './routers/mainpage-router.mjs';
import accRouter from './routers/account-router.mjs';
import mapPageRouter from './routers/map-page-router.mjs';
import joinPageRouter from './routers/join-router.mjs';
import pizzaRouter from './routers/make-pizza-router.mjs';
import cartRouter from './routers/shopping-cart-router.mjs';
import jobApplicationRouter from './routers/jobs-router.mjs';
import signinPageRouter from './routers/login-register-router.mjs';
import { fileURLToPath } from 'url';
import loginRouter from './routers/login-router.mjs';
import registRouter from './routers/register-router.mjs';
import ingredientsRouter from './routers/ingredients-router.mjs';
import pizzasRouter from './routers/pizzas-router.mjs';
import promptRouter from './routers/prompts-router.mjs';
import checkoutRouter from './routers/checkout-router.mjs';
import setRouter from './routers/set-router.mjs';
import { errorHandler, notFoundHandler } from './middlewares/handlers.mjs';
import ratingRouter from './routers/reviews-router.mjs';
import orderRouter from './routers/order-router.mjs';
import userRouter from './routers/user-router.mjs';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like HTML, CSS, and JavaScript)
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// page navigation routers
app.use('/', mainRouter);
app.use('/sign-in', signinPageRouter);
app.use('/my-account', accRouter);
app.use('/directions', mapPageRouter);
app.use('/pick-a-pizza-club', joinPageRouter);
app.use('/make-your-pizza', pizzaRouter);
app.use('/shopping-cart', cartRouter);
app.use('/join-us', jobApplicationRouter);
app.use('/checkout',checkoutRouter);

// routers for database interaction
app.use('/login', loginRouter);
app.use('/register', registRouter);
app.use('/users', userRouter);

app.use('/ingredients', ingredientsRouter);
app.use('/pizzas', pizzasRouter);
app.use('/prompts', promptRouter);
app.use('/sets', setRouter);
app.use('/ratings', ratingRouter)
app.use('/order-data', orderRouter);

app.use('/docs', express.static(path.join(__dirname, '../docs')));

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });