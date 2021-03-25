function makeH1(params) {
    params.parentNode.addButtons(({
        "value": "h1",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('formatBlock', false, 'h1');
    };
}

function makeH2(params) {
    params.parentNode.addButtons(({
        "value": "h2",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('formatBlock', false, 'h2');
    };
}

function makeH3(params) {
    params.parentNode.addButtons(({
        "value": "h3",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('formatBlock', false, 'h3');
    };
}