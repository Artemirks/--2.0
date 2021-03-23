function deleteEmptyTags(params) {
    params.parentNode.addButtons(({
        "value": "Удалить пустые тэги",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": params.name,
        'isUsingInMulty': true
    }));

    this.action = function (params) {
        let re = /<[^\/>]*>\s*<\/[^>]*>(\n|)/gis;
        s = params.str.replace(re, '');
        return s;
    };
}
