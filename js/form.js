function handleFormSubmit(e){
    e.preventDefault();
    const type = e.target.type.value;
    const taste = e.target.taste.value;
    const mood = e.target.mood.value;
    const pizza = pizzaObjectCreator(type, taste, mood);
    appendPizzaToLocalStorage(pizza);
    document.getElementById('form_dialog_text_id').innerText = "New pizza added. There are " + getPizzaListFromLocalStorage().length + " pizzas now"; 
    $("#form_dialog_id").dialog('open');
    e.target.reset();

}

document.addEventListener('DOMContentLoaded', function(){
    const pizzaForm = document.getElementById('pizza_form_id');
    const dialog = $("#form_dialog_id").dialog({
        resizable: false,
        draggable: false,
        autoOpen: false,
        buttons: {
            'OK': function() {
                dialog.dialog('close');
            }
        }
    });

    pizzaForm.onsubmit = handleFormSubmit;
})