function justLeft(params) {

    params.parentNode.addButtons(({
        "value": "К левому краю",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "title": "Выравнивание по левому краю",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('justifyLeft');
    };
}

function justCenter(params) {

    params.parentNode.addButtons(({
        "value": "По центру",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "title": "Выравнивание по центру",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('justifyCenter');
    };
}

function justRight(params) {

    params.parentNode.addButtons(({
        "value": "К правому краю",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "title": "Выравнивание по правому краю",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('justifyRight');
    };
}

function justFull(params) {

    params.parentNode.addButtons(({
        "value": "По ширине",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "title": "Выравнивание по ширине",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('justifyCenter');
    };
}