function makeBold(params) {

    params.parentNode.addButtons(({
        "value": "B",
        "parent": 'workWithStyle',
        "parentName": "Работа с внешним видом текста",
        "title": 'Полужирный',
        "name": params.name
    }));

    this.action = function (params) {
        document.execCommand('bold', false, null);
        return false;
    };
}