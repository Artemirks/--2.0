function deleteAtributes(params) {

    params.parentNode.addButtons(({
        "value": "Отчистить все атрибуты",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": params.name
    }));

    this.action = function (params) {
        re = /<([a-z][a-z0-9]*)(?:[^>]*((\s(row|col)span="\d+")|\shref=['\"][^'\"]*['\"]))?[^>]*?(\/?)>/gis;
        s = params.str.replace(re, '<$1$2$3>');
        return s;
    };
}
