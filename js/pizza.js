const emojiCodes = {
    1: "😃",
    2: "😐",
    3: "😡"
}

function doubleClickHabdlerCreator(pizza){
    // pizza.datetime used as id

    return function (e) {
        const form = document.getElementById('pizza_form_id');

        form.type.value = pizza.type;
        form.taste.value = pizza.taste;
        form.mood.value = pizza.mood;
        form.datetime.value = pizza.datetime;

        $('#dialog_form_id').dialog('open');
    }
}


function createPizzaTimeLineElem(pizza){
    const div = document.createElement('div');
    div.classList.add('timeline-item');

    const heading = document.createElement('h3');
    heading.setAttribute('title', 'Double click to edit')
    heading.innerText = pizza.type;
    heading.addEventListener('dblclick', doubleClickHabdlerCreator(pizza));
    $(heading).bind('taphold', doubleClickHabdlerCreator(pizza));

    const rate = document.createElement('span');
    rate.classList.add('rate')
    rate.innerText = "★".repeat(4 - parseInt(pizza.taste)) + "☆".repeat(parseInt(pizza.taste) - 1);

    const emoji = document.createElement('p');
    emoji.classList.add('emoji');
    emoji.innerText = 'Mood: ' + emojiCodes[pizza.mood];

    div.appendChild(heading);
    div.appendChild(emoji);
    div.appendChild(rate);

    return div;
}

function createDateTimeLineElem(date){
    const dateElem = document.createElement('div');
    dateElem.innerText = date;
    dateElem.classList.add('timeline-date-item');
    dateElem.classList.add('font-robotic');
    return dateElem
}


function renderPizzaList(pizzas){

    pizzas = pizzas.reverse(); // reversing array so that newly added were first

    const content = document.getElementById('content');
    content.innerHTML = '';
    let lastDate = new Date(0).toLocaleDateString('pl');
    pizzas.forEach((pizza) => {
        const pizzaDate = new Date(pizza.datetime).toLocaleDateString('pl')
        if (pizzaDate !== lastDate){
            const dateElem = createDateTimeLineElem(pizzaDate);
            lastDate = pizzaDate;
            content.appendChild(dateElem);
        }
        const pizzaElem = createPizzaTimeLineElem(pizza, lastDate);
        content.appendChild(pizzaElem);
    })

}

function deletePizza(){
    const form = document.getElementById('pizza_form_id');
    const datetime = form.datetime.value - 0;
    const pizzas = getPizzaListFromLocalStorage();
    setPizzaListToLocalStorage(pizzas.filter(p => p.datetime !== datetime));
    renderPizzaList(getPizzaListFromLocalStorage());
}

function editPizza(){
    const form = document.getElementById('pizza_form_id');
    const datetime = form.datetime.value - 0;
    const pizzas = getPizzaListFromLocalStorage();
    let i;
    for (i = 0; i < pizzas.length; i++){
        if (pizzas[i].datetime === datetime){
            break;
        }
    }
    pizzas[i] = {
        ...pizzas[i],
        type: form.type.value,
        taste: form.taste.value,
        mood: form.mood.value
    };
    setPizzaListToLocalStorage(pizzas);
    renderPizzaList(getPizzaListFromLocalStorage());
}

document.addEventListener('DOMContentLoaded', function() {
    $( document ).tooltip();
    const form = document.getElementById('pizza_form_id');
    const dialog = $('#dialog_form_id').dialog({
        resizable: false,
        draggable: false,
        autoOpen: false,
        width: window.innerWidth > 800 ? window.innerWidth / 2 : window.innerWidth - 20,
        buttons: {
            'Save Changes': function() {
                editPizza();
                form.reset();
                dialog.dialog('close');
            },
            Cancel: function() {
                form.reset();
                dialog.dialog('close');
            },
            'Delete': function () {
                deletePizza();
                form.reset();
                dialog.dialog('close');
            },
        },
    });

    window.onresize = function() {
        dialog.dialog({
            width: window.innerWidth > 800 ? window.innerWidth / 2 : window.innerWidth - 20,
        })
    }
    const pizzas = getPizzaListFromLocalStorage();
    renderPizzaList(pizzas);
});