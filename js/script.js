$(function () {

    /*for selects*/
    $("#citySelect").selectmenu();
    /*//for selects*/

    /*table rows*/
    $('table tbody tr:even').addClass('even');
    $('table tbody tr:odd').addClass('odd');
    /*//table rows*/

    /*datapicker*/

    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;',
        nextText: '&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
            'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $("#form_data").datepicker();
    /*//datapicker*/

    /*dropdown menu*/

    $('.nav .blockContainer').mouseenter(function () {
        if ($(this).closest('li').hasClass('dot')) {
            return;
        }
        var offsetFromRightEdge = 40;
        var thisVar = $(this);
        thisVar.find('.hiddenMenu').show();
        var menuPositionLeft = thisVar.find('.hiddenMenu').offset().left + thisVar.find('.hiddenMenu').width();
        var navPositionLeft = $('.nav').offset().left + $('.nav').width();
        if (navPositionLeft < menuPositionLeft) {
            thisVar.find('.hiddenMenu').css({
                left: navPositionLeft - menuPositionLeft - offsetFromRightEdge + 'px'
            })
        }
    }).mouseleave(function () {
        $(this).find('.hiddenMenu').hide();
    });
    /*//dropdown menu*/


    /*placeholder*/
    $('input').on('focus',function () {
        $(this).siblings().filter('.textLabel').hide();
    }).on('blur change', function () {
        if ($(this).val() == 0) {
            $(this).val('').siblings().filter('.textLabel').show();
        }
        else {
            $(this).siblings().filter('.textLabel').hide();
        }
    });
    /*//placeholder*/


    /*radio buttons*/
    $('input[type="radio"]').each(function (index, element) {
        if ($(element).is(':checked')) {
            var labelId = $(element).attr('id');
            $('label[for=' + labelId + ']').addClass('active');
        }
    }).on('change', function () {
        if ($(this).is(':checked')) {
            $(this).closest('.formLine').find('label').removeClass('active');
            var labelId = $(this).attr('id');
            $('label[for=' + labelId + ']').addClass('active');
        }

    });
    /*//radio buttons*/

    /*reg ex*/
    function validateName(name) {
        var re = /^[A-Za-zа-яА-ЯёЁ-]{2,30}$/;
        return re.test(name);
    }

    /*//reg ex*/

    function showErrorMessage(element, errorMessageSelector){
        $(element).addClass('errorInput').closest('.formLine').find('.error').hide().filter(errorMessageSelector).show();
    }
    function hideErrorMessage(element){
        $(element).removeClass('errorInput').closest('.formLine').find('.error').hide();
    }
    /*formValidation*/
    $('button[type="submit"]').on('click', function (e) {
        var hasError = 0;
        $(this).closest('form').find('input[type="text"]').each(function (index, element) {
            if ($(element).val() == 0) {
                showErrorMessage(element, '.empty');
                hasError = 1;
            }
            else if ($(element).hasClass('nameInput') && !validateName($(element).val())) {
                showErrorMessage(element, '.fieldError');
                hasError = 1;
            }
            else {
                hideErrorMessage(element);
            }
        });
        if (hasError) {
            e.preventDefault();
        }
    });
    /*//formValidation*/

    /*cards height*/
    (function () {
        var maxHeight = 0;
        var productCards = $('.cards li');
        productCards.each(function (index, element) {
            if ($(element).find('table').height() > maxHeight) {
                maxHeight = $(element).find('table').height();
            }
        });
        productCards.each(function (index, element) {
            $(element).find('table').css('height', maxHeight + 'px');
        });
    })();
    /*//cards height*/

});