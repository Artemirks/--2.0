function deleteExtraSpaces(params) {
    params.parentNode.addButtons(({
        "value": "Удалить лишние пробелы",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": params.name,
        'isUsingInMulty': true
    }));

    this.action = function (params) {
        s = params.str.replace(/&nbsp;/gi, '');
        s = s.replace(/(\n|)<p>&nbsp;<\/p>(\n\n|)|<p><o>&nbsp;<\/o><\/p>\n\n|<p><o>&nbsp;<\/o:p><\/p>\n\n/g, '');
        s = s.replace(/<\w[^>]*>(?!<\/\w>)(&nbsp;)+(<[^>]+[^>]*>)/g, '');
        return s;
    };
}
