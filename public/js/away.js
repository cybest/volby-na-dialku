$(document).ready(function() {

    var shiresLISelected = '';
    var countiesLISelected = '';
    var townsLISelected = '';

    createShireList('');

    function createShireList(shireName)
    {
        var shiresLIs = '';

        if (shireName == '')
            shiresLISelected = Object.keys(townsJSON)[0];
        else
            shiresLISelected = shireName;

        for (var shire in townsJSON) {
            if (shire == shiresLISelected)
                shiresLIs += '<li class="active">';
            else
                shiresLIs += '<li>';
            shiresLIs += '<a href="#" class="shire-list-links"><span class="shire-name-text">' + shire + '</span> kraj</a></li>\n';
        }

        $('#shiresMenu').html(shiresLISelected + ' kraj <span class="caret"></span>');
        $('#shiresMenuList').html(shiresLIs);

        createCountyList('');
    }

    function createCountyList(countyName)
    {
        var countiesLIs = '';

        if (countyName == '')
            countiesLISelected = Object.keys(townsJSON[shiresLISelected])[0];
        else
            countiesLISelected = countyName;


        for (var county in townsJSON[shiresLISelected]) {
            if (county == countiesLISelected)
                countiesLIs += '<li class="active">';
            else
                countiesLIs += '<li>';
            countiesLIs += '<a href="#" class="county-list-links">Okres <span class="county-name-text">' + county + '</span></a></li>\n';
        }

        $('#countiesMenu').html('Okres ' +
            ((countiesLISelected.length < 10) ? countiesLISelected : countiesLISelected.substr(0,10) + '...') +
            ' <span class="caret"></span>');
        $('#countiesMenuList').html(countiesLIs);

        createTownList('');
    }

    function createTownList(townName)
    {
        var townsLIs = '';

        if (townName == '')
            townsLISelected = Object.keys(townsJSON[shiresLISelected][countiesLISelected])[0];
        else
            townsLISelected = townName;

        for (var town in townsJSON[shiresLISelected][countiesLISelected]) {
            if (town == townsLISelected)
                townsLIs += '<li class="active">';
            else
                townsLIs += '<li>';
            townsLIs += '<a href="#" class="town-list-links">Obec <span class="town-name-text">' + town + '</span></a></li>\n';
        }

            $('#townsMenu').html('Obec ' +
                ((townsLISelected.length < 10) ? townsLISelected : townsLISelected.substr(0,10) + '...') +
                ' <span class="caret"></span>');
        $('#townsMenuList').html(townsLIs);

        fillTownData();
    }

    function fillTownData() {
        // Fill the town's form data
        var townData = townsJSON[shiresLISelected][countiesLISelected][townsLISelected];

        $('#council-title').text(townsLISelected);
        $('#council-street').val(townData.address.street);
        $('#council-streetnumber').val(townData.address.streetnumber);
        $('#council-zip').val(townData.address.zip);
        $('#council-city').val(townsLISelected);
        $('#council-email').val(townData.email);
    }

    $('#shiresMenuList').on('click', '.shire-list-links', function (event) {
        var shireNameText = $(this).find('span.shire-name-text').html();

        pickShire(shireNameText);

        event.preventDefault();
    });

    $('#countiesMenuList').on('click', '.county-list-links', function (event) {
        var countyNameText = $(this).find('span.county-name-text').html();

        pickCounty(countyNameText);

        event.preventDefault();
    });

    $('#townsMenuList').on('click', '.town-list-links', function (event) {
        var townNameText = $(this).find('span.town-name-text').html();

        pickTown(townNameText);

        event.preventDefault();
    });

    function pickShire(shireName) {

        if ( shireName != shiresLISelected) {
            shiresLISelected = shireName;
            createShireList(shireName);
        }
    }

    function pickCounty(countyName) {
        if (countyName != countiesLISelected) {
            countiesLISelected = countyName;
            createCountyList(countyName);
        }
    }

    function pickTown(townName) {
        if (townName != townsLISelected) {
            townsLISelected = townName;
            createTownList(townName);
        }
    }

    $('#dropdown-menu-delivery').on('click', 'a', function (event) {
        var parentLI = $(this).parent();
        if (! parentLI.hasClass('active')) {
            var otherLIs = $(parentLI).siblings();

            otherLIs.each(function () {
                if ($(this).hasClass('active')) $(this).removeClass('active');
            });

            $(parentLI).addClass('active');

            $('#dropdown-delivery').html($(this).html() + ' <span class="caret"></span>');

            var fieldsetTemporary = $('#panel-delivery-temporary').find('fieldset');
            var fieldsetProxy = $('#panel-delivery-proxy').find('fieldset');

            switch (this.id) {
                case 'select-delivery-permanent' :
                    if (! $('#panel-delivery-temporary').hasClass('hide')) {
                        $('#panel-delivery-temporary').addClass('hide');
                        $(fieldsetTemporary).prop('disabled', true);
                    }

                    if (! $('#panel-delivery-proxy').hasClass('hide')) {
                        $('#panel-delivery-proxy').addClass('hide');
                        $(fieldsetProxy).prop('disabled', true);
                    }
                    break;
                case 'select-delivery-temporary' :
                    $('#panel-delivery-temporary').removeClass('hide');
                    $(fieldsetTemporary).prop('disabled', false);

                    if (! $('#panel-delivery-proxy').hasClass('hide')) {
                        $('#panel-delivery-proxy').addClass('hide');
                        $(fieldsetProxy).prop('disabled', true);
                    }
                    break;
                case 'select-delivery-proxy' :
                    $('#panel-delivery-proxy').removeClass('hide');
                    $(fieldsetProxy).prop('disabled', false);

                    if (! $('#panel-delivery-temporary').hasClass('hide')) {
                        $('#panel-delivery-temporary').addClass('hide');
                        $(fieldsetTemporary).prop('disabled', true);
                    }
                    break;
            }
        }

        event.preventDefault();
    });

    $("#signature").jSignature();

    $('#signature-parent button').click(function (event) {
        $('#signature').jSignature('reset');
        event.preventDefault();
    });

    $('#form-panel').submit(createApplicationPDF);

    function createApplicationPDF(event) {
        var sigImage = $('#signature').jSignature('getData');

        var deliveryTarget;

        if ($('#select-delivery-temporary').parent().hasClass('active'))
            deliveryTarget = 'temporary';
        else if ($('#select-delivery-proxy').parent().hasClass('active'))
            deliveryTarget = 'proxy';
        else deliveryTarget = 'permanent';

        var deliveryText;

        switch (deliveryTarget) {
            case 'temporary':
                deliveryText = [
                    {text: [
                        'Hlasovací preukaz žiadam ',
                        {text: 'doručiť na korešpondenčnú adresu',
                            bold: true},
                        ':'],
                        absolutePosition: {x: 40, y: 470}},
                    {text: $('#delivery-street').val().toUpperCase() + ' ' + $('#delivery-streetnumber').val().toUpperCase(),
                        absolutePosition: {x: 260, y: 500}},
                    {text: $('#delivery-zip').val() + ' ' + $('#delivery-city').val().toUpperCase(),
                        absolutePosition: {x: 260, y: 520}},
                    {text: $('#delivery-state').val().toUpperCase(),
                        absolutePosition: {x: 260, y: 540}}
                ];
                break;
            case 'proxy':
                deliveryText = [
                    {text: [
                        {text: 'Na prevzatie ',
                            bold: true},
                        'hlasovacieho preukazu podľa § 46 ods. 6 zákona ',
                        {text: 'splnomocňujem',
                            bold: true},
                        ':'],
                        absolutePosition: {x: 40, y: 470}},
                    {text: 'Meno: ' + $('#proxy-name').val().toUpperCase(),
                        absolutePosition: {x: 80, y: 500}},
                    {text: 'Priezvisko: ' + $('#proxy-surname').val().toUpperCase(),
                        absolutePosition: {x: 80, y: 520}},
                    {text: 'Číslo občianskeho preukazu: ' + $('#proxy-id').val().toUpperCase(),
                        absolutePosition: {x: 80, y: 540}}
                ];
                break;
            case 'permanent':
            default:
                deliveryText = {text: [
                    'Hlasovací preukaz žiadam ',
                    {text: 'doručiť na adresu miesta môjho trvalého pobytu',
                        bold: true},
                    '.'],
                    absolutePosition: {x: 40, y: 470}};
        }

        var docDefinition = {
            info: {
                title: 'Žiadosť o vydanie hlasovacieho preukazu',
                author: $('#voter-name').val() + ' ' + $('#voter-surname').val(),
                subject: 'Žiadosť o vydanie hlasovacieho preukazu',
                keywords: 'voľby, Národná rada SR, 5.3.2016, žiadosť, hlasovací preukaz'
            },
            pageSize: 'A4',
            pageOrientation: 'portrait',
            content: [
                {text: 'Obecný (mestský, miestny) úrad',
                    absolutePosition: {x: 300, y: 60}},
                {text: townsLISelected.toUpperCase(),
                    bold: true,
                    absolutePosition: {x: 300, y: 80}},
                {text: $('#council-street').val() + ' ' + $('#council-streetnumber').val(),
                    absolutePosition: {x: 300, y: 100}},
                {text: $('#council-zip').val() + ' ' + townsLISelected,
                    absolutePosition: {x: 300, y: 116}},
                {text: $('#council-email').val(),
                    absolutePosition: {x: 300, y: 136}},
                {text: 'Žiadosť o vydanie hlasovacieho preukazu' + (deliveryTarget == 'proxy' ? ' a splnomocnenie na jeho prevzatie' : ''),
                    fontSize: 14,
                    bold: true,
                    absolutePosition: {x: ((deliveryTarget == 'proxy') ? 60 : 170), y: 190}},
                {text: 'Meno: ' + $('#voter-name').val().toUpperCase(),
                    absolutePosition: {x: 80, y: 240}},
                {text: 'Priezvisko: ' + $('#voter-surname').val().toUpperCase(),
                    absolutePosition: {x: 300, y: 240}},
                {text: 'Rodné číslo: ' + $('#voter-number').val(),
                    absolutePosition: {x: 80, y: 260}},
                {text: 'Rodné priezvisko: ' + ($('#voter-birthname').val() != '' ? $('#voter-birthname').val().toUpperCase() : $('#voter-surname').val().toUpperCase()),
                    absolutePosition: {x: 300, y: 260}},
                {text: 'Štátna príslušnosť: ' + $('#voter-citizenship').val().toUpperCase(),
                    absolutePosition: {x: 80, y: 280}},
                {text: 'Adresa miesta trvalého pobytu:',
                    absolutePosition: {x: 80, y: 310}},
                {text: $('#voter-street').val().toUpperCase() + ' ' +$('#voter-streetnumber').val().toUpperCase(),
                    absolutePosition: {x: 260, y: 310}},
                {text: $('#voter-zip').val() + ' ' + $('#voter-city').val().toUpperCase(),
                    absolutePosition:  {x: 260, y: 330}},
                {text: 'ž i a d a m',
                    fontSize: 14,
                    bold: true,
                    absolutePosition: {x: 260, y: 370}},
                {text: ['podľa § 46 zákona č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov (ďalej len „zákon“) ',
                    {text: 'o vydanie hlasovacieho preukazu', bold: true},
                    ' pre voľby do Národnej rady Slovenskej republiky v roku 2016.'],
                    absolutePosition: {x: 40, y: 410}},
                deliveryText,
                {text: 'V ' + $('#doc-where').val().toUpperCase(),
                    absolutePosition: {x: 120, y: 700}},
                {text: 'Dátum ' + $('#doc-date').val(),
                    absolutePosition: {x: 360, y: 700}},
                {image: sigImage,
                    width: 200,
                    absolutePosition: {x: 200, y: 730}},
                {text: 'vlastnoručný podpis žiadateľa',
                    absolutePosition: {x: 220, y: 780}}
            ]
        };

        pdfMake.createPdf(docDefinition).open();

        event.preventDefault();
    }

});