function deleteTags(params) {
    params.parentNode.addButtons(({
        "value": "Отчистить все тэги",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": params.name
    }));

    this.action = function (params) {
        let re = /<[^>]+[^>]*>/gis;
        let stroka = params.str.replace(re, '');
        return stroka;
    };
}
