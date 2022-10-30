function getPizzaListFromLocalStorage(){
    if (localStorage.getItem('pizzas')) return JSON.parse(localStorage.getItem('pizzas'));
    return [];
}

function setPizzaListToLocalStorage(pizzas){
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
}

function appendPizzaToLocalStorage(pizza){
    const pizzas = getPizzaListFromLocalStorage();
    pizzas.push(pizza);
    setPizzaListToLocalStorage(pizzas);
}

function pizzaObjectCreator(type, taste, mood){
    const now = Date.now()
    return {type, taste, mood, datetime: now};
}
