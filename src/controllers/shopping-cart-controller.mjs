import { fetchPizza, deletePizza, putQuantity, postCart } from "../models/shopping-cart-model.mjs";

const getPizzas = async (req, res) => {
    console.log('fetched pizza', req.params);
    console.log(req.params.id);
    const id = req.params.id;
    console.log(id);
    const result = await fetchPizza(id);
    if (result) {
        res.status(201).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
};

const removePizza = async (req, res) => {
    const id = req.params.id;
    const result = await deletePizza(id);
    if (result) {
        res.status(204).json({message: 'deleted'});
    } else {
        res.status(404).json({error: 'not found'});
    }
};

const changeQuantity = async (req, res) => {
    const id = req.params.id;
    const quantity = req.body.quantity;
    const result = await putQuantity(quantity, id);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
};

const createCart = async (req, res) => {
    const price = req.body.price;
    const user_id = req.body.user_id;
    const pizzaIds = req.body.pizzaIds;
    const quantity = req.body.quantity;
    const result = await postCart(price, user_id, pizzaIds, quantity);
    if (result) {
        res.status(201).json(result);
    } else {
        res.status(404).json({error: 'not found'});
    }
};


export {getPizzas, removePizza, changeQuantity, createCart};