function deleteComments(params) {
    params.parentNode.addButtons(({
        "value": "Удалить комментарии",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": params.name,
        'isUsingInMulty': true
    }));

    this.action = function (params) {
        let re = /<!--.*?-->/gis;
        s = params.str.replace(re, '');
        return s;
    };
}
