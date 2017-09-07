function sort() {
    let medias = [];
    let articles = document.getElementsByTagName('article');
    let parent = articles[0].parentElement;
    let i = 0;
    let iMax = articles.length;
    for (; i < iMax; i++) {
        let node = articles[i];
        let time = node.getElementsByTagName('time')[0].getAttribute('datetime');
        medias.push({node, time});
    }
    let lastItem = articles[iMax - 1];
    lastItem.style.display = 'none';
    medias = medias.sort((a, b) => {
        return b.time.localeCompare(a.time);
    });
    parent.innerHTML = '';
    medias.forEach((e) => parent.appendChild(e.node));
    parent.appendChild(lastItem);
    alert('Sort done');
}

function isInstagram() {
    return window.location.host === 'www.instagram.com' && window.location.pathname === '/';
}

function isMainFeed(){
    return document.getElementById('mainFeed') !== null;
}

function buttonIsCreated(){
    return document.getElementById('sort-button') !== null;
}

function addButton() {

    if (isInstagram() && isMainFeed()) {
        let button = document.createElement('button');
        button.id = 'sort-button';
        button.style.zIndex = 12;
        button.innerHTML = 'Sort';
        button.style.position = 'fixed';
        button.style.top = '7px';
        button.style.left = '5px';
        button.onclick = sort;
        document.body.appendChild(button);
    } else if(buttonIsCreated()){
        let button = document.getElementById('sort-button');
        button.parent.removeChild(button);
    }
}

addButton();
