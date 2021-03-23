function deleteSpans(params) {
    params.parentNode.addButtons(({
        "value": "Удалить Span",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": params.name,
        'isUsingInMulty': true
    }));

    this.action = function (params) {
        let re = /<span[^>]+?[^>]+>|<\/span>/gis;
        let re1 = /<span>/gis;
        s = params.str.replace(re, '');
        s = s.replace(re1, '');
        return s;
    };
}