function justLeft(params) {

    params.parentNode.addButtons(({
        "value": "К левому краю",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "title": "Выравнивание по левому краю",
        "name": params.name
    }));

    this.action = function (params) {
        document.execCommand('justifyLeft', false, null);
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

    this.action = function (params) {
        document.execCommand('justifyCenter', false, null);
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

    this.action = function (params) {
        document.execCommand('justifyRight', false, null);
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

    this.action = function (params) {
        document.execCommand('justifyCenter', false, null);
    };
}