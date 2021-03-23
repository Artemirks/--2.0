function deleteFonts(params) {
    params.parentNode.addButtons(({
        "value": "Удалить Fonts",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": params.name,
        'isUsingInMulty': true
    }));

    this.action = function (params) {
        s = params.str.replace(/<font>(.*)<\/font>/gi, "$1");
        return s;
    };
}