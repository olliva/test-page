$(function(){

    /*for selects*/
    $( "#citySelect" ).selectmenu();
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
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
            'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $( "#form_data" ).datepicker();
    /*//datapicker*/

    /*dropdown menu*/
    $('.nav .blockContainer').mouseenter(function(){
        if ($(this).closest('li').hasClass('dot')){
            return;
        }
        var menuWidth = 0;
        var thisVar = $(this);
        thisVar.find('.hiddenMenu').show();
        var menuPositionLeft = thisVar.find('.hiddenMenu').offset().left + thisVar.find('.hiddenMenu').width();
        var navPositionLeft = $('.nav').offset().left + $('.nav').width();
        if(navPositionLeft < menuPositionLeft){
            thisVar.find('.hiddenMenu').css({
                left: navPositionLeft - menuPositionLeft - 40 + 'px'
            })
        }
    }).mouseleave(function(){
            $(this).find('.hiddenMenu').hide();
        });
    /*//dropdown menu*/


    /*placeholder*/
    $('input').on('focus', function(){
        $(this).siblings().filter('.textLabel').hide();
    }).on('blur change', function(){
            if ($(this).val() == 0){
                $(this).val('').siblings().filter('.textLabel').show();
            }
            else{
                $(this).siblings().filter('.textLabel').hide();
            }
        });
    /*//placeholder*/


    /*radio buttons*/
    var labelId;
    $('input[type="radio"]').each(function(index,element){
        if ($(element).is(':checked')) {
            labelId = $(element).attr('id');
            $('label[for='+labelId+']').addClass('active');
        }
    }).on('change', function(){
            if ($(this).is(':checked')) {
                $(this).closest('.formLine').find('label').removeClass('active');
                labelId = $(this).attr('id');
                $('label[for='+labelId+']').addClass('active');
            }

        });
    /*//radio buttons*/

    /*reg ex*/
    function validateName(name) {
        var re = /^[A-Za-zа-яА-ЯёЁ-]{3,30}$/;
        return re.test(name);
    }
    /*//reg ex*/

    /*formValidation*/
    $('button[type="submit"]').on('click', function(e){
        var hasError = 0;
        $(this).closest('form').find('input[type="text"]').each(function(index,element){
            if ($(element).val()==0){
                $(element).addClass('errorInput').closest('.formLine').find('.error').hide().filter('.empty').show();
                hasError = 1;
            }
            else if ($(element).hasClass('nameInput')){
                if (!validateName($(element).val())){
                    $(element).addClass('errorInput').closest('.formLine').find('.error').hide().filter('.fieldError').show();
                    hasError = 1;
                }
                else{
                    $(element).removeClass('errorInput').closest('.formLine').find('.error').hide();
                }
            }
            else{
                $(element).removeClass('errorInput').closest('.formLine').find('.error').hide();
            }
        });
        if (hasError){
            e.preventDefault();
        }
    });
    /*//formValidation*/


    /*cards height*/
    var maxHeight = 0;
    var productCards = $('.cards li');
    productCards.each(function(index, element){
        /*if (index%3 == 0){
            maxHeight = 0;
            for (var i = index/3 * 3; i< index/3 * 3 + 3; i ++){
                if(productCards.eq(i).find('table').height() > maxHeight){
                    maxHeight = productCards.eq(i).find('table').height();
                }
            }
            for (var j = index/3 * 3; j< index/3 * 3 + 3; j ++){
                productCards.eq(j).find('table').css('height', maxHeight + 'px');
            }
        }*/

        if ($(element).find('table').height() > maxHeight){
            maxHeight = $(element).find('table').height();
        }
    });
    productCards.each(function(index, element){
        $(element).find('table').css('height', maxHeight + 'px');
    });
    /*//cards height*/

});