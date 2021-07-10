$(document).ready(function () {
    let textarea = document.querySelector('.textarea');
    let regExp = /^\d{1,}$/;
    let regExpLogin = /^admin$/;
    let regExpPassword = /^password$/;
    let inputsTable = document.forms.tableMenuForm.elements;
    let checkTable = 0;
    let inputsList = document.forms.listMenuForm.elements;
    let checkList = 0;
    let olValue;
    let ulValue;

    // Очищення полів форм
function resetForm(formClass) {
    $(`.${formClass}`).trigger("reset");
}

// Призначення активної вкладки в меню вибору фону
function activeTab() {
    $('.uni-picker-menu__item').each(function () {
        $(this).removeClass('active-tab');
    });
    $('.tab-colors').addClass('active-tab');
}

// Призначення тексту в шапці модального вікна
function setPopUpTitle(title = '') {
    $('.pop-up__title').text(title);
}

// Валідація таблиці
function validateTable() {
    for (const item of $('.table-menu__input')) {
        if (item.name == 'colorBd' || item.name == 'styleBd') {
            if (item.value == '') {
                $(item).addClass('table-menu__input_style_error');
                $('.table-menu__error').show();
                $('.table-menu__error').text('Empty or invalid value');
                checkTable = 0;
            } else {
                $(item).removeClass('table-menu__input_style_error');
                $('.table-menu__error').hide();
                checkTable++;
            }
        } else {
            if (!regExp.test(item.value) || item.value == '') {
                $(item).addClass('table-menu__input_style_error');
                $('.table-menu__error').show();
                $('.table-menu__error').text('Empty or invalid value');
                checkTable = 0;
            } else {
                $(item).removeClass('table-menu__input_style_error');
                $('.table-menu__error').hide();
                checkTable++;
            }
        }
    }
}

// Створення таблиці
function createTable() {
    let crtTable = document.createElement('table');

    for (let i = 0; i < inputsTable.countTr.value; i++) {

        let crtTr = document.createElement('tr');

        for (let j = 0; j < inputsTable.countTd.value; j++) {

            let crtTd = document.createElement('td');

            crtTd.setAttribute('style', `width: ${inputsTable.widthTd.value}px; height: ${inputsTable.heigthTd.value}px; border: ${inputsTable.widthBd.value}px ${inputsTable.styleBd.value} ${inputsTable.colorBd.value};`);

            crtTr.append(crtTd);
        }
        crtTable.append(crtTr);
    }
    textarea.value += crtTable.outerHTML;
    checkTable = 0;
}

// Валідація списку
function validateList(inputType, selectName) {
    for (const item of $(inputType)) {
        if (item.name == selectName) {
            if (item.value == '') {
                $(item).addClass('list-menu__input_style_error');
                $('.list-menu__error').show();
                $('.list-menu__error').text('Empty or invalid value');
                checkList = 0;
            } else {
                $(item).removeClass('list-menu__input_style_error');
                checkList++;
            }
        } else {
            if (!regExp.test(item.value) || item.value == '') {
                $(item).addClass('list-menu__input_style_error');
                $('.list-menu__error').show();
                $('.list-menu__error').text('Empty or invalid value');
                checkList = 0;
            } else {
                $(item).removeClass('list-menu__input_style_error');
                $('.list-menu__error').hide();
                checkList++;
            }
        }
    }
    olValue = inputsList.typeOl.value;
    ulValue = inputsList.typeUl.value;
}

// Створення списку
function createList(listType, selectValue) {
    let crtList = document.createElement(listType);
    crtList.setAttribute('style', `list-style-type: ${selectValue};`)
    for (let i = 0; i < inputsList.countLi.value; i++) {
        let crtLi = document.createElement('li');
        crtLi.innerText = `item ${i}`;
        crtList.append(crtLi);
    }
    textarea.value += crtList.outerHTML;
    checkList = 0;
}

// Валідація логіну
function validateLogin() {
    for (const item of $('.login-form__input')) {
        if (item.value == '') {
            $('.login-form__error').show();
            $('.login-form__error').text('Value is empty');
            $(item).addClass('login-form__input_style_error');
        } else {
            switch (item.name) {
                case 'login':
                    if (!regExpLogin.test(item.value)) {
                        $(item).addClass('login-form__input_style_error');
                        $('.login-form__error').show();
                        $('.login-form__error').text('Please check your login or password');
                    } else if (regExpLogin.test(item.value)) {
                        $(item).removeClass('login-form__input_style_error');
                        $('.login-form__error').hide();
                    }
                    break;

                case 'password':
                    if (!regExpPassword.test(item.value)) {
                        $(item).addClass('login-form__input_style_error');
                        $('.login-form__error').show();
                        $('.login-form__error').text('Please check your login or password');
                    } else if (regExpPassword.test(item.value)) {
                        $(item).removeClass('login-form__input_style_error');
                    }
                    break;
            }
        }
    }
}

    // Функціонал кнопок
    $('.button').click(function () {
        switch ($(this).val()) {
            case 'bold':
                $('.main__result').toggleClass('bold');
                break;

            case 'italic':
                $('.main__result').toggleClass('italic');
                break;

            case 'underline':
                $('.main__result').removeClass('line-through');
                $('.main__result').toggleClass('underline');
                break;

            case 'line-through':
                $('.main__result').removeClass('underline');
                $('.main__result').toggleClass('line-through');
                break;

            case 'left':
                $('.main__result').css('align-items', 'flex-start');
                break;

            case 'center':
                $('.main__result').css('align-items', 'center');
                break;

            case 'right':
                $('.main__result').css('align-items', 'flex-end');
                break;

            case 'fontFamily':
                $('.size-menu__submenu').hide();
                $('.font-menu__submenu').slideToggle(200);
                break;

            case 'fontSize':
                $('.font-menu__submenu').hide();
                $('.size-menu__submenu').slideToggle(200);
                break;

            case 'palette':
                $('.pop-up-fade').fadeIn();
                $('.uni-picker').show();
                $('.uni-picker__colors').removeClass('hidden tab-colors');
                $('.uni-picker-menu').addClass('hidden');
                setPopUpTitle('Choose text color');
                break;

            case 'chooser':
                $('.pop-up-fade').fadeIn();
                $('.uni-picker').show();
                activeTab();
                $('.uni-picker__colors').removeClass('hidden');
                $('.uni-picker__colors').addClass('tab-colors');
                $('.uni-picker__images').addClass('hidden');
                $('.uni-picker__files').addClass('hidden');
                $('.uni-picker-menu').removeClass('hidden');
                setPopUpTitle('Choose background color or image');
                break;

            case 'login':
                if ($('#lockButton').hasClass('unlock')) {
                    $('.pop-up').css('top', '40%');
                    $('.pop-up-fade').fadeIn();
                    $('.pop-up__header').addClass('hidden');
                    $('.login-confirm').removeClass('hidden');
                } else {
                    $('.pop-up-fade').fadeIn();
                    $('.login').removeClass('hidden');
                    $('i.uil-times').addClass('hidden');
                    $('.pop-up__header').css('justify-content', 'center');
                }
                setPopUpTitle('Sign In');
                break;

            case 'edit':
                $('.header__main-section, .main__result').addClass('hidden');
                $('.header__edit-section, .main__edit').removeClass('hidden');
                $('.textarea').val($('.main__result').html());
                break;

            case 'save':
                $('.header__main-section, .main__result').removeClass('hidden');
                $('.header__edit-section, .main__edit').addClass('hidden');
                $('.main__result').html($('.textarea').val());
                break;

            case 'table':
                $('.pop-up-fade').fadeIn();
                $('.table-menu').show();
                setPopUpTitle('Create table');
                break;

            case 'ul-list':
                $('.pop-up-fade').fadeIn();
                $('.list-menu').show();
                $('#typeOl').hide();
                $('#typeUl').show();
                $('#countLi').val('');
                $('.menu-button').removeClass('buttonOl');
                $('.menu-button').addClass('buttonUl');
                setPopUpTitle('Create UL');
                break;

            case 'ol-list':
                $('.pop-up-fade').fadeIn();
                $('.list-menu').show();
                $('#typeUl').hide();
                $('#typeOl').show();
                $('#countLi').val('');
                $('.menu-button').removeClass('buttonUl');
                $('.menu-button').addClass('buttonOl');
                setPopUpTitle('Create OL');
                break;
        }
    });

    // Функціонал кнопок редагування
    $('.menu-button').click(function () {
        switch ($(this).val()) {
            case 'cancel':
                $('.pop-up-fade').fadeOut();
                setTimeout(() => {
                    $('.pop-up').css('top', '5%');
                    $('.pop-up__header').removeClass('hidden');
                    $('.login-confirm').addClass('hidden');
                }, 400);
                break;

            case 'signOut':
                $('.pop-up-fade').fadeOut();
                $('#editButton').attr("disabled", true);
                $('#editButton').addClass('button_disabled');
                $('.uis-lock').show();
                $('.uis-unlock').hide();
                ($('#lockButton').removeClass('unlock'))
                setTimeout(() => {
                    $('.pop-up').css('top', '5%');
                    $('.pop-up__header').removeClass('hidden');
                    $('.login-confirm').addClass('hidden');
                }, 400);
                break;

            case 'resetTable':
                resetForm('table-menu-form');
                break;

            case 'crtTable':
                validateTable();
                if (checkTable == 7) {
                    createTable();
                }
                break;

            case 'resetList':
                resetForm('list-menu-form');
                break;

            case 'crtList':
                if ($('.menu-button').hasClass('buttonOl')) {
                    validateList('.list-menu__input_ol', 'typeOl');
                } else if ($('.menu-button').hasClass('buttonUl')) {
                    validateList('.list-menu__input_ul', 'typeUl');
                }

                if (checkList == 2) {
                    if ($(this).hasClass('buttonOl')) {
                        createList('ol', olValue)
                    } else if ($(this).hasClass('buttonUl')) {
                        createList('ul', ulValue)
                    }
                }
                break;
        }
    });

    // Випадаюче меню
    $('.submenu>li').click(function () {
        if ($(this).parent().hasClass('font-menu__submenu')) {
            $('.main__result').css('font-family', $(this).text());
        } else if ($(this).parent().hasClass('size-menu__submenu')) {
            $('.main__result').css('font-size', $(this).text());
        }
    });

    // Кнопка закриття модального вікна
    $('i.uil-times').click(function () {
        // Закриття модального вікна
        $('.pop-up-fade').fadeOut();

        setTimeout(() => {
            // Приховування uni-picker ==============================
            $('.uni-picker').hide();
            $('.uni-picker-menu').addClass('hidden');
            $('.uni-picker__colors').addClass('hidden');
            $('.uni-picker__images').addClass('hidden');
            $('.uni-picker__files').addClass('hidden');

            // Приховування table-menu ==============================
            $('.table-menu').hide();

            // Приховування list-menu ====================================
            $('.list-menu').hide();
            $('#typeOl').hide();
            $('#typeUl').hide();
            $('.menu-button').removeClass('buttonOl');
            $('.menu-button').removeClass('buttonUl');
        }, 400);
    });

    // Вибір кольору
    $('.uni-picker__colors-item').click(function () {
        if ($('.uni-picker__colors').hasClass('tab-colors') == false) {
            $('.main__result').css('color', $(this).css('background-color'));
        } else if ($('.uni-picker__colors').hasClass('tab-colors')) {
            $('.main__result').css('background', $(this).css('background-color'));
        }
    });

    // Вибір картинки фону
    $('.uni-picker__images-item').click(function () {
        $('.main__result').css('background-image', $(this).css('background-image'));
    });

    // Вкладки в меню фону
    $('.uni-picker-menu__item').click(function () {
        $('.uni-picker-menu__item').each(function () {
            $(this).removeClass('active-tab');
        });
        $(this).addClass('active-tab');

        if ($(this).hasClass('tab-colors')) {
            $('.uni-picker__colors').removeClass('hidden');
            $('.uni-picker__images').addClass('hidden');
            $('.uni-picker__files').addClass('hidden');
        } else if ($(this).hasClass('tab-images')) {
            $('.uni-picker__images').removeClass('hidden');
            $('.uni-picker__colors').addClass('hidden');
            $('.uni-picker__files').addClass('hidden');
        } else if ($(this).hasClass('tab-files')) {
            $('.uni-picker__files').removeClass('hidden');
            $('.uni-picker__images').addClass('hidden');
            $('.uni-picker__colors').addClass('hidden');
        }
    });

    // Картинка на фон
    $('.custom-file-input').change(function (event) {
        let img = event.target.files[0];
        let urlImg = URL.createObjectURL(img);
        $('.main__result').css('background-image', `url(${urlImg})`);
    });

    // Логінування
    $('.login-form').submit(function (event) {
        event.preventDefault();
        validateLogin();

        if (regExpLogin.test($('#inputLogin').val()) && regExpPassword.test($('#inputPassword').val())) {
            $('.pop-up-fade').fadeOut(100);
            $('.login').addClass('hidden');
            $('i.uil-times').removeClass('hidden');
            $('.pop-up__header').css('justify-content', 'space-between');


            setPopUpTitle();
            resetForm('login-form');
            $('#editButton').removeAttr('disabled');
            $('#editButton').removeClass('button_disabled');

            $('.uis-lock').hide();
            $('.uis-unlock').show();
            $('#lockButton').addClass('unlock');
        }
    });
});