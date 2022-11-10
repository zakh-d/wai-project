function handleFormSubmit(e){
    e.preventDefault();
    const type = e.target.type.value;
    const taste = e.target.taste.value;
    const mood = e.target.mood.value;
    const pizza = pizzaObjectCreator(type, taste, mood);
    appendPizzaToLocalStorage(pizza);
    e.target.submit();

}

document.addEventListener('DOMContentLoaded', function(){
    const pizzaForm = document.getElementById('pizza_form_id');
    pizzaForm.onsubmit = handleFormSubmit;
})