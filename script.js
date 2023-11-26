document.addEventListener('DOMContentLoaded', () => {
    loadItemsFromUrl();
    updateItemCount();
});

function addItemFromInput() {
    const newItemValue = document.getElementById('newItem').value.trim();
    if (newItemValue !== '') {
        addItemToList(newItemValue);
        document.getElementById('newItem').value = '';
        updateItemCount();
        saveItems();
    }
}

function addItemToList(itemText) {
    const list = document.getElementById('itemList');
    const li = document.createElement('li');
    const itemSpan = document.createElement('span');
    itemSpan.innerText = itemText;
    itemSpan.onclick = function() { toggleStrikeThrough(this); };
    li.appendChild(itemSpan);
    li.appendChild(createRemoveButton());
    list.appendChild(li);
}
function createRemoveButton() {
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<ion-icon name="close-sharp"></ion-icon>';
    removeButton.classList.add('remove-button');
    removeButton.onclick = function(event) {
        event.stopPropagation();
        // Remove the list item from the DOM
        const li = event.target.closest('li');
        if (li) {
            li.remove();
            updateItemCount();
            saveItems();
        }
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
    document.querySelectorAll('#itemList li span').forEach(itemSpan => {
        items.push(itemSpan.innerText.trim()); // Make sure to trim any extra whitespace
    });
    localStorage.setItem('shoppingList', JSON.stringify(items));
    updateUrl();
}

function loadItemsFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const items = params.get('list') ? params.get('list').split(',').map(decodeURIComponent) : [];
    items.forEach(addItemToList);
}

function loadItems() {
    const list = document.getElementById('itemList');
    const li = document.createElement('li');
    const itemSpan = document.createElement('span');
    itemSpan.innerText = itemText;
    itemSpan.onclick = function() { toggleStrikeThrough(this); };
    li.appendChild(itemSpan);
    li.appendChild(createRemoveButton());
    list.appendChild(li);
}

function toggleStrikeThrough(item) {
    item.classList.toggle('strikethrough');
}

function updateItemCount() {
    const itemCount = document.querySelectorAll('#itemList li').length;
    document.getElementById('item-count').textContent = itemCount;
}

function updateUrl() {
    const items = Array.from(document.querySelectorAll('#itemList li span'))
                        .map(span => encodeURIComponent(span.textContent.trim()));
    const queryParams = new URLSearchParams({ list: items.join(',') });
    window.history.pushState({}, '', '?' + queryParams.toString());
}
