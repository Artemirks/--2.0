function makeH1(params) {
    params.parentNode.addButtons(({
        "directory": params.directory,
        "value": "h1",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }));

    this.action = function (params) {
        s = params.str.replace(/:(?=<|\n|↵|&nbsp;)/g, '');
        console.log(s);
        s = s.replace(/<[^>]+[^>]*>\n*(.+)\n*<[^>]+[^>]*>/g, '<h1>$1</h1>');
        console.log(s);
        s = s.replace(/<b>\n*|<\/b>\n*/g, '');
        console.log(s);
        return s;
        //document.execCommand('formatBlock', false, 'h1');
    };
}

function makeH2(params) {
    params.parentNode.addButtons(({
        "directory": params.directory,
        "value": "h2",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }))

    this.action = function (params) {
        s = params.str.replace(/:(?=<|\n|↵|&nbsp;)/g, '');
        s = s.replace(/<[^>]+[^>]*>\n*(.+)\n*<[^>]+[^>]*>/g, '<h2>$1</h2>');
        s = s.replace(/<b>\n*|<\/b>\n*/g, '');
        return s;
        //document.execCommand('formatBlock', false, 'h2');
    };
}

function makeH3(params) {
    params.parentNode.addButtons(({
        "directory": params.directory,
        "value": "h3",
        "parent": 'workWithText',
        "parentName": "Работа с текстом",
        "name": params.name
    }));

    this.action = function (params) {
        s = params.str.replace(/:(?=<|\n|↵|&nbsp;)/g, '');
        s = s.replace(/<[^>]+[^>]*>\n*(.+)\n*<[^>]+[^>]*>/g, '<h3>$1</h3>');
        s = s.replace(/<b>\n*|<\/b>\n*/g, '');
        return s;
        //document.execCommand('formatBlock', false, 'h3');
    };
}