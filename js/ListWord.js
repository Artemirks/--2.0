function ListWord(params) {
    params.parentNode.addButtons(({
        "value": "Список из Word",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": params.name
    }));

    this.action = function (params) {
        this.newArr = this.splitString(params);
        this.nak = '';
        this.countUL = 0;
        this.list = this.numberListWord({
            "n": 0,
            "level": 0,
            "marker": "",
            "newArr": this.newArr,
            "nak": this.nak,
            "countUL": this.countUL
        });
        if (this.list != 0) {
            params.str = this.list;
        }
        return params.str;
    };

    this.splitString = function (params) {
        this.arr = params.str.split(/<\/p>|<br>|<div>/gsi);
        this.resultArray = this.arr.filter(item => {
            return item != "";
        });
        params.arr = this.resultArray; //создание массива, состоящего из строк
        this.detectLevel(params); //определения уровня списка
        for (let i = 0; i < this.resultArray.length; i++) {
             /* this.resultArray[i] = params.parentNode.multyCleaning({
                "str": resultArray[i]
            });  */
            this.resultArray[i] = this.resultArray[i].replace(/<[^\/>]*>/is, '');
            if (params.level.length < this.resultArray.length) { //если уровень не определен, то уровень равен одному
                params.level[i] = params.level[0];
            }
            if (this.resultArray[i].match(/\d+\.\d+\.\d+|\d+\.\d+|\d+\.|\d+\s+\.|\d\)|\w\.|\w\)|\w\s\.|·|o|§|–|	|∙|•|-|—/is)) {
                this.resultArray[i] = { //присваивание свойств каждому элементу массива 
                    marker: this.resultArray[i].match(/\d+\.\d+\.\d+|\d+\.\d+|\d+\.|\d+\s+\.|\d\)|\w\.|\w\)|\w\s\.|·|o|§|–|	|∙|•|-|—/is)[0], //маркер
                    s: this.resultArray[i].replace(/\d+\.\d+\.\d+|\d+\.\d+|\d+\.|\d+\s+\.|\d\)|\w\.|\w\)|\w\s\.|·|o|§|–|    |∙|•|-|—/is, ''), //значение
                    level: params.level[i].match(/\d+/is)[0] //уровень
                }
            } else {
                this.resultArray.splice(i, 1); //если элемент не часть списка, то удаление его из массива
            }
        }
        this.resultArray.forEach((item, i, arr) => {
            if (item.marker == undefined) {
                arr.splice(i, 1); //если элемент не часть списка, то удаление его из массива
            }
        });
        return this.resultArray;
    };

    this.detectLevel = function(params) { //определение уровня
        params.level = [];
        countSpaces = [];
        countSpaces[0] = 0;
        countLeft = [];
        countLeft[0] = 0;
        j = 0;
        k = 0;
        previousLevel = 1;
        params.arr.forEach((item, i) => {
            if (item.match(/level\d+/is)) {
                params.level[i] = item.match(/level\d+/is)[0];
            } else if (item.match(/&nbsp;.+;[ |\n]/gi)) {
                j++;
                countSpaces[j] = (item.match(/&nbsp;/gi) || []).length;
                if (countSpaces[j] > countSpaces[j - 1]) {
                    params.level[i] = `${previousLevel+1}`;
                    previousLevel++;
                } else if (countSpaces[j] < countSpaces[j - 1]) {
                    params.level[i] = `${previousLevel-1}`;
                    previousLevel--;
                } else {
                    params.level[i] = `${previousLevel}`;
                }
            } else if (item.match(/left:(\d+\.\d+)pt/i)) {
                k++;
                countLeft[k] = item.match(/left:(\d+\.\d+)pt/i)[1];
                if (countLeft[k] > countLeft[k - 1]) {
                    params.level[i] = `${previousLevel+1}`;
                    previousLevel++;
                } else if (countLeft[k] < countLeft[k - 1]) {
                    params.level[i] = `${previousLevel-1}`;
                    previousLevel--;
                } else {
                    params.level[i] = `${previousLevel}`;
                }
            } else {
                params.level[i] = "1";
            }
        });
    };

    this.numberListWord = function(params) { //функция создания списка
        a = 1;
        markers = params.marker;
        level = params.level;
        let i = 1;
    
        if (params.newArr[params.n] == undefined || params.newArr[params.n].level == undefined && params.newArr[params.n].marker == undefined) {
            return 0;
        }
        if (params.newArr[params.n].level != level) {
            if (+params.newArr[params.n].level <= level - 1) {
                while (+params.newArr[params.n].level < level) {
                    if (params.newArr[params.n - i].marker.match(/\d+\.\d+\.\d+|\d+\.\d+|\d+\.|\d+\s+\.|\d\)|\w\.|\w\)|\w\s\./is)) {
                        params.nak += "</ol>"
                    } else {
                        params.nak += "</ul>"
                    }
                    level--;
                    while (+params.newArr[params.n - i].level != level) {
                        i++;
                        if (params.newArr[params.n - i] == undefined) {
                            return 0;
                        }
                    }
                    params.countUL--;
                }
            } else {
                if (params.newArr[params.n].marker.match(/\d+\.\d+\.\d+|\d+\.\d+|\d+\.|\d+\s+\.|\d\)|\w\.|\w\)|\w\s\./is)) {
                    params.nak += "<ol>"
                } else {
                    params.nak += "<ul>"
                }
                params.countUL++;
            }
        }
        params.level = +params.newArr[params.n].level;
        params.marker = params.newArr[params.n].marker;
        params.nak += "<li>" + params.newArr[params.n].s + "</li>";
        params.n++;
        if (params.n >= params.newArr.length) {
            if (params.marker.match(/\d+\.\d+\.\d+|\d+\.\d+|\d+\.|\d+\s+\.|\d\)|\w\.|\w\)|\w\s\./is)) {
                params.nak += "</ol>".repeat(params.countUL);
            } else {
                params.nak += "</ul>".repeat(params.countUL);
            }
    
        } else {
            this.numberListWord(params);
        }
        return params.nak;
    }
    
}