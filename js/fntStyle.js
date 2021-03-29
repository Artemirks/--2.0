function makeBold(params) {
    params.parentNode.addButtons(({
        "value": "&Beta;",
        "parent": 'workWithStyle',
        "parentName": "Работа с внешним видом текста",
        "title": 'Полужирный',
        "name": params.name
    }));

    this.action = function () {;
        document.execCommand('bold');
    };
}

function makeItalic(params) {
    params.parentNode.addButtons(({
        "value": "&Iota;",
        "parent": 'workWithStyle',
        "parentName": "Работа с внешним видом текста",
        "title": 'Курсив',
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('italic');
    };
}

function makeSubline(params) {
    params.parentNode.addButtons(({
        "value": "&#8838;",
        "parent": 'workWithStyle',
        "parentName": "Работа с внешним видом текста",
        "title": 'Подчеркнутый',
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('underline');
    };
}

function makePereline(params) {
    params.parentNode.addButtons(({
        "value": "Перечеркнутый текст",
        "parent": 'workWithStyle',
        "parentName": "Работа с внешним видом текста",
        "name": params.name
    }));

    this.action = function () {
        document.execCommand('strikethrough');
    };
}