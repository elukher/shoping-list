document.addEventListener('DOMContentLoaded', () => {
    loadItems();
});

function addItem() {
    const newItemValue = document.getElementById('newItem').value.trim();
    if (newItemValue !== '') {
        const list = document.getElementById('itemList');
        const li = document.createElement('li');
        const itemText = document.createElement('span');
        itemText.innerText = newItemValue;
        itemText.onclick = function() { toggleStrikeThrough(this); };
        li.appendChild(itemText);
        li.appendChild(createRemoveButton());
        list.appendChild(li);
        saveItems();
    }
    document.getElementById('newItem').value = '';
}

function createRemoveButton() {
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.onclick = function(event) {
        event.stopPropagation();
        event.target.parentElement.remove();
        saveItems();
    };
    return removeButton;
}

function clearAll() {
    if (confirm('Are you sure you want to clear all items?')) {
        document.getElementById('itemList').innerHTML = '';
        saveItems();
    }
}

function saveItems() {
    const items = [];
    document.querySelectorAll('#itemList li').forEach(item => {
        let itemText = item.childNodes[0].nodeValue.trim();
        items.push(itemText);
    });
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

function loadItems() {
    const items = JSON.parse(localStorage.getItem('shoppingList'));
    if (items) {
        items.forEach(item => {
            const list = document.getElementById('itemList');
            const li = document.createElement('li');
            const itemText = document.createElement('span');
            itemText.innerText = item;
            itemText.onclick = function() { toggleStrikeThrough(this); };
            li.appendChild(itemText);
            li.appendChild(createRemoveButton());
            list.appendChild(li);
        });
    }
}

function toggleStrikeThrough(item) {
    item.classList.toggle('strikethrough');
}
