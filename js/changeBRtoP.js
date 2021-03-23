function changeBRtoP(params) {
    params.parentNode.addButtons(({
        "value": "Заменить br на P",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": params.name,
        'isUsingInMulty': true
    }));

    this.action = function (params) {
        s = params.str.replace(/<br>/gis, "</p><p>");
        return s;
    };
}
