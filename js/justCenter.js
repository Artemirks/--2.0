function justCenter(params) {

    params.parentNode.addButtons(({
        "value": "По центру",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }));

    this.action = function (params) {
        document.execCommand('justifyCenter', false, null);
        return false;
    };
}