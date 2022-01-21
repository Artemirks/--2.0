var editorsArr = [];
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".editor").forEach((item, i) => {
        editorsArr[i] = new Editor({
            obj: item,
        });
    });
});

function Editor(params) {

    this.obj = params.obj;
    this.placeForButtons = document.querySelector('.wrapperAcc');
    this.editonArea = document.createElement("div");
    this.splitter = document.createElement('div');
    this.HTMLArea = document.createElement("textarea");
    this.placeForObligButtons = document.createElement('div');
    this.editonArea.contentEditable = "true";
    this.editonArea.classList.add("textArea");
    this.splitter.classList.add("splitter");
    this.HTMLArea.classList.add("textPlace");
    this.placeForObligButtons.classList.add("editorButtons");

    this.str = "";
    this.oldVal = "";

    this.obj.style.height = `${0.9*document.documentElement.clientHeight}px`;
    this.obj.append(this.editonArea);
    this.obj.append(this.splitter);
    this.obj.append(this.HTMLArea);
    this.placeForButtons.append(this.placeForObligButtons);

    this.indexOfAcc = undefined;
    this.previousItem = null;
    this.btnArr = [];
    this.countBtn = 0;
    this.plg = [];

    this.widthOfEditor = this.editonArea.offsetWidth + this.HTMLArea.offsetWidth + this.splitter.offsetWidth - 50;
    console.log(this.editonArea.offsetWidth, this.HTMLArea.offsetWidth, this.splitter.offsetWidth);

    this.moveAcc = function (el) {
        el.addEventListener("click", () => {
            el.classList.toggle("active");
            let panel = el.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                if (this.previousItem != null && !this.previousItem.nextElementSibling.isEqualNode(panel) && this.previousItem.classList.contains("active")) {
                    this.previousItem.classList.toggle("active");
                    this.previousItem.nextElementSibling.style.maxHeight = null;
                }
            }
            this.previousItem = el;
        });
    };

    this.btnFunc = function (params) {
        if (params.el.classList.contains('notSelectionEditors')) {
            params.el.addEventListener("click", () => {
                if (params.el.classList.contains('heading')) {
                    this.changeEdit({
                        "func": params.name,
                        "str": this.str
                    });
                } else {
                    this.plg[params.name].action();
                }
            });
        } else {
            params.el.addEventListener("click", () => {
                this.changeEdit({
                    "func": params.name,
                    "str": this.str
                });
            });
        }
    }
    this.resizeDivs = function (e) {
        e.preventDefault();
        if (e.movementX >= 0 && this.editonArea.offsetWidth < 0.8 * 0.79 * document.documentElement.clientWidth) {
            this.editonArea.style.width = `${this.editonArea.offsetWidth + 0.8*e.movementX}px`;
            this.HTMLArea.style.width = `${this.widthOfEditor - this.editonArea.offsetWidth - e.movementX}px`;
        } else if (this.editonArea.offsetWidth > 0.3 * 0.79 * document.documentElement.clientWidth && e.movementX < 0) {
            this.editonArea.style.width = `${this.editonArea.offsetWidth + 0.8*e.movementX}px`;
            this.HTMLArea.style.width = `${this.widthOfEditor - this.editonArea.offsetWidth - e.movementX}px`;
        }
    };

    this.findSelection = function (event) {
        if (event.target.closest('.textArea') != null || event.target.id == "selectAll") {
            //выбор, если нажали на "Выделить все"
            if (event.target.id == "selectAll") {
                this.selection1 = window.getSelection();
                let r = document.createRange();
                r.selectNodeContents(this.editonArea);
                this.selection1.removeAllRanges();
                this.selection1.addRange(r);
            }
            if (window.getSelection && window.getSelection().focusOffset - window.getSelection().anchorOffset != 0) {
                this.selection = window.getSelection().getRangeAt(0);
                if (window.getSelection().toString()) { //обнуление выделения, чтобы выделения не копились, если не было нажато действия
                    this.str = "";
                }
                if (typeof this.selection1 != "undefined") { //для выделить все
                    this.str = this.selection1.getRangeAt(0).commonAncestorContainer.innerHTML;
                    this.selection1 = undefined;
                    console.log(this.str);
                } else { //для обычного выделения
                    let arrayNodes = this.getNodesInRange(this.selection);
                    arrayNodes.forEach(item => {
                        if (item.nodeName == 'P') {
                            this.str += item.outerHTML;
                        }
                    });
                }
            }
        } else if (typeof (this.HTMLArea.selectionEnd) != "undefined" && this.HTMLArea.selectionStart - this.HTMLArea.selectionEnd != 0) {
            this.str = this.HTMLArea.value.substring(this.HTMLArea.selectionStart, this.HTMLArea.selectionEnd);
        }
    };
    this.getNextNode = function (node) { //функция для получения следующего узла
        if (node.firstChild) {
            return node.firstChild;
        }
        while (node) {
            if (node.nextSibling) {
                return node.nextSibling;
            }
            node = node.parentNode;
        }
    };

    this.getNodesInRange = function (range) { //фукнция для получения узлов в выделении
        var start = range.startContainer;
        var end = range.endContainer;
        var commonAncestor = range.commonAncestorContainer;
        var nodes = [];
        var node;

        for (node = start.parentNode; node; node = node.parentNode) {
            nodes.push(node);
            if (node == commonAncestor) {
                break;
            }
        }
        nodes.reverse();

        for (node = start; node; node = this.getNextNode(node)) {
            nodes.push(node);
            if (node == end) {
                break;
            }
        }
        return nodes;
    };

    this.changeEdit = function (params) { //получение изменненой строки и замена старой на нее
        if (typeof this.str != "undefined") {
            if (this.str.length > 0) {
                if (params.func === 'multyCleaning' || params.func === 'formatHTML') {
                    this[params.func](params);
                } else {
                    this.newstr = this.plg[params.func].action(({
                        "str": this.str,
                        "newstr": this.newstr,
                        "oldstr": this.oldstr,
                        "selection": this.selection,
                        "iteration": 0,
                        "parentNode": this
                    }));
                }
                if (this.newstr != false) {
                    let s = this.str.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&'); //преобразование строки для создания из нее регулярного выражения для поиска старой строки во всем тексте
                    let re = new RegExp(s, "g");
                    if (this.editonArea.innerHTML.match(re) == null) {
                        s = this.str.replace(/(?<=(<\/p>))(?=(<p>))/g, "\n*");
                        s = s.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
                        re = new RegExp(s, "g");
                    }
                    this.oldstr = this.editonArea.innerHTML; //сохранение старой строки для действия "Отменить"
                    this.editonArea.innerHTML = this.editonArea.innerHTML.replace(re, this.newstr); //замена старой строки на новую
                    this.editonArea.innerHTML = this.formatHTML({
                        "str": this.editonArea.innerHTML
                    });
                    this.HTMLArea.value = this.editonArea.innerHTML;
                    this.oldVal = this.HTMLArea.value;
                    window.getSelection().removeAllRanges(); //обнуление выделения
                    this.newstr = '';
                    this.str = '';
                }
            }
        }
    };


    this.cancelNew = function () {
        if (this.selection != undefined) {
            if (this.str == '') {
                if (this.newstr == '') {
                    // n = this.editonArea.innerHTML;
                    this.editonArea.innerHTML = this.oldstr;
                    this.HTMLArea.value = this.oldstr;
                } else {
                    this.newstr = this.editonArea.innerHTML;
                    if (this.oldstr != undefined) {
                        this.selection.commonAncestorContainer.innerHTML = this.oldstr;
                        this.HTMLArea.value = this.oldstr;
                    }
                }
            }
        } else {
            document.execCommand('undo');
        }
    };

    this.clearAll = function () {
        this.oldstr = this.editonArea.innerHTML;
        this.newstr = '';
        this.HTMLArea.value = this.newstr;
        this.editonArea.innerHTML = this.newstr;
    };

    this.copyContent = function () {
        navigator.clipboard.writeText(window.getSelection().toString())
            .then(() => {
                console.log("Скопировано");
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    };

    this.multyCleaning = function () {
        this.btnArr.forEach(item => {
            if (item.classList.contains("usingInMulty")) {
                this.newstr = this.plg[item.name].action(({
                    "str": this.newstr || this.str,
                    "newstr": this.newstr,
                    "oldstr": this.oldstr,
                    "selection": this.selection,
                    "iteration": 0
                }));
            }
        });
        this.newstr = this.formatText({
            "str": this.newstr
        });
        this.newstr = this.newstr.replace(/(?<=(?<!\/)table)(?=>)/g, ' class="table"');
        this.newstr = this.newstr.replace(/\s*<(colgroup|col)>/g, '');
    };

    this.formatHTML = function (params) {
        this.btnArr.forEach(item => {
            if (item.name == "deleteEmptyTags") {
                params.str = this.plg[item.name].action(params);
            }
        });
        let re = /(<\/(p|div)>|<(p|div|ul|ol)>)(\n|)/g;
        params.str = params.str.replace(re, '\n$1\n');
        params.str = params.str.replace(/<li>\n/g, '<li>');
        params.str = params.str.replace(/<\/li>/g, '</li>\n');
        params.str = params.str.replace(/\n\s+/g, '\n');
        params.str = params.str.replace(/^\n|\n$/gis, '');
        this.newstr = params.str
        return this.newstr;
    };

    this.formatText = function (params) {
        let re1 = /([а-яА-Я]+\.)[\W]?([А-Я])/g;
        let re2 = /["|']([^https|\d]+)["|']/g;
        let re3 = /(?<=\d+|[XCDMLVI])(?=мил|тыс|млрд|млн|в\.|г|%|руб)|(?<=гл\.|пп\.|рис\.|№|§)(?=\d+|[XCDMLVI])/g;
        s = params.str.replace(re1, "$1&nbsp;$2"); //создание неразрывного пробела между инициалами
        //s = s.replace(re2, "&laquo;$1&raquo;"); //замена "программистких" кавычек на "елочки"
        s = s.replace(/\s-\s|-\s|\s-/g, " — "); //замена дефисов на тире
        s = s.replace(/\([С|C]\)/g, "&#169;"); //замена знака авторства
        s = s.replace(/(?<!\d)(8|\+?7)[\-|\s]?\(?(\d{3})\)?\s?(\d{3})[\-|\s]?([\d\- ]{2})[\-|\s]?([\d\- ]{2})/g, "$1($2)$3-$4-$5") //преобразование телефонных номеров в шаблон типа 8(555)555-55-55
        s = s.replace(re3, "&nbsp;"); //отделение числа и соотвествующего ему счетного слова неразрвыным пробелом
        s = s.replace(/(?<=\d+)(\s+,|,\s+|\s+,)(?=\d+)/g, ","); //правильное написание дробных чисел
        //s = s.replace(/(?<!^|ГОСТ\s*|№\s*|,\d*|\(|\)|-)(?=(\d{3})+(?!\d|\s*г|&nbsp;г\.))/g, "&thinsp;"); //разделение чисел на разряды
        s = s.replace(/(?<=2)(&thinsp;)(?=(\d{3}(\n|\s|<|\/)))/g, '');
        return s;
    }

    this.include = function (params) {
        /* let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = params.url;
        parent = document.getElementsByTagName('head')[0];
        jsScript = parent.querySelector('script');
        script.onload = () => params.callback;
        jsScript.insertAdjacentElement('afterend', script); */
        console.log(params);
        import(`${params.name}.js`)
            .then(
                console.log('!')
            )
            .catch(err => {
                console.log(err);
            });
    };

    this.addButtons = function (params) {
        this.indexOfAcc = undefined;
        this.btnArr[this.countBtn] = document.createElement("button");
        this.btnArr[this.countBtn].classList.add("elemsEditors");
        if (params.value != undefined) {
            this.btnArr[this.countBtn].innerHTML = params.value;
        }
        if (params.id != undefined) {
            this.btnArr[this.countBtn].id = params.id;
        }
        if (params.title != undefined) {
            this.btnArr[this.countBtn].title = params.title;
        }
        if (params.func != undefined) {
            this.btnArr[this.countBtn].addEventListener("click", () => {
                this[params.func]();
            });
        }
        if (params.isUsingInMulty) {
            this.btnArr[this.countBtn].classList.add("usingInMulty");
        }
        if (params.name != undefined) {
            this.btnArr[this.countBtn].name = params.name;
        }
        if (params.parent != this.placeForObligButtons) {
            if (params.parent == 'workWithCode') {
                this.btnArr[this.countBtn].classList.add('editHTML');
            } else {
                this.btnArr[this.countBtn].classList.add('notSelectionEditors');
                if (params.directory == 'headings') {
                    this.btnArr[this.countBtn].classList.add('heading')
                }
            }
            this.btnFunc({
                "el": this.btnArr[this.countBtn],
                "name": params.name
            });
            this.btnArr.forEach((item, i) => {
                if (item.classList.contains(`${params.parent}`)) {
                    this.indexOfAcc = i;
                }
            });
            if (this.indexOfAcc == undefined) {
                this.countBtn++;
                this.btnArr[this.countBtn] = document.createElement('button');
                this.btnArr[this.countBtn].innerHTML = `${params.parentName}`;
                let newPanel = document.createElement('div');
                newPanel.classList.add('panel');
                newPanel.append(this.btnArr[this.countBtn - 1]);
                this.btnArr[this.countBtn].classList.add(`accordion`, `${params.parent}`);
                document.querySelector('.wrapperAcc').append(this.btnArr[this.countBtn]);
                this.btnArr[this.countBtn].insertAdjacentElement("afterEnd", newPanel);
                this.moveAcc(this.btnArr[this.countBtn]);
            } else {
                this.btnArr[this.indexOfAcc].nextElementSibling.append(this.btnArr[this.countBtn]);
            }
        } else {
            params.parent.append(this.btnArr[this.countBtn]);
        }
        this.countBtn++;
    };

    this.bindResizeDivs = this.resizeDivs.bind(this);

    this.splitter.addEventListener("mousedown", (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", this.bindResizeDivs);
    });
    document.addEventListener("mouseup", (e) => {
        document.removeEventListener("mousemove", this.bindResizeDivs);
        this.findSelection(e);
    });
    window.addEventListener("input", () => {
        if (this.HTMLArea.value != this.oldVal) {
            this.editonArea.innerHTML = this.HTMLArea.value;
        } else {
            this.HTMLArea.value = this.editonArea.innerHTML;
        }
        this.oldVal = this.HTMLArea.value;
    });
    this.addPlg = function (params) {
        if (params.directory != undefined) {
            
            this.include(/* `js/${params.directory}.js`, () => {
                params.name.forEach(item => {
                    this.plg[item] = new window[item]({
                        "directory": params.directory,
                        "name": item,
                        "parentNode": this
                    });
                })
            }, */ {
                "name": params.name,
                "url":  `js/${params.directory}.js`,
                "callback":  () => {
                    params.name.forEach(item => {
                        this.plg[item] = new window[item]({
                            "directory": params.directory,
                            "name": item,
                            "parentNode": this
                        });
                    })
                }
            });
        } else {
            this.include({
                    "name":     params.name,
                    "url":  `   js/${params.directory}.js`,
                    "callback": () => {
                                    params.name.forEach(item => {
                                        this.plg[item] = new window[item]({
                                            "directory": params.directory,
                                            "name": item,
                                            "parentNode": this
                                        });
                                        })
                                    }
                     });
        }
    };
   /*  this.addPlg({
        "name": "deleteAtributes"
    });
    this.addPlg({
        "name": "deleteTags"
    });
    this.addPlg({
        "name": "deleteSpans"
    }); */
    this.addPlg({
        "name": "deleteFonts"
    });
/*     this.addPlg({
        "name": "deleteComments"
    });
    this.addPlg({
        "name": "deleteExtraSpaces"
    });
    this.addPlg({
        "name": "changeBRtoP"
    });
    this.addPlg({
        "name": "deleteEmptyTags"
    }); */
    /* this.addPlg({
        "name": "ListWord"
    });
    this.addPlg({
        "directory": "fntStyle",
        "name": ["makeBold", "makeItalic", "makeSubline", "makePereline"]
    });
    this.addPlg({
        "directory": "ownLists",
        "name": ["makeBulletList", "makeNumberList"]
    });
    this.addPlg({
        "directory": "headings",
        "name": ["makeH1", "makeH2", "makeH3"]
    });
    this.addPlg({
        "directory": "blocks",
        "name": ["makeP", "makeBlockquote", "makeDiv"]
    })
    this.addPlg({
        "directory": "justify",
        "name": ["justLeft", "justCenter", "justRight", "justFull"]
    }); */
    this.addButtons({
        "id": "selectAll",
        "value": "Выделить все",
        "parent": this.placeForObligButtons
    });
    this.addButtons({
        "func": "cancelNew",
        "value": "Отменить",
        "parent": this.placeForObligButtons
    });
    this.addButtons({
        "func": "clearAll",
        "value": "Отчистить все",
        "parent": this.placeForObligButtons
    });
    this.addButtons({
        "func": "copyContent",
        "value": "Копировать",
        "parent": this.placeForObligButtons
    });
    this.addButtons({
        "value": "Множественная отчистка",
        "parent": 'workWithCode',
        "parentName": "Работа с кодом",
        "name": "multyCleaning"
    });
}