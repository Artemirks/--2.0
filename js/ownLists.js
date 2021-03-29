function makeBulletList(params) {
    params.parentNode.addButtons(({
        "value": "&bull;",
        "parent": 'workWithStyle',
        "parentName": "Работа с внешним видом текста",
        "title": "Маркированный список",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('insertUnorderedList', false);
    };
}

function makeNumberList(params) {
    params.parentNode.addButtons(({
        "value": "1.",
        "parent": 'workWithStyle',
        "parentName": "Работа с внешним видом текста",
        "title": "Нумерованный список",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('insertOrderedList', false);
    };
}