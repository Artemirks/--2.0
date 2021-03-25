function makeP(params) {
    params.parentNode.addButtons(({
        "value": "P",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('formatBlock', false, 'p');
    };
}

function makeBlockquote(params) {
    params.parentNode.addButtons(({
        "value": "C",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('formatBlock', false, 'blockquote');
    };
}

function makeDiv(params) {
    params.parentNode.addButtons(({
        "value": "div",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('formatBlock', false, 'div');
    };
}

