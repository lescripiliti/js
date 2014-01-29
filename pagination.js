var infrashop = {
    pagination: {
        enable: true,
        isWait: true,
        isViewList: true,
        classViewList: '',
		classViewGrid: '',
        classShowCase: '',
        clickedPage: false,
        clickedPerPage: false,
        isScrollTop: true,
        HeigthScrollTop: 0,
        timeScrollTop: 200,
        timeoutGetPage: 300,
        order: '',
        page: 0,
        url: '',
        dir: '',
        perPage: 0,
        filters: '',

        getPage: function () {

            infrashop.pagination.page = $('.paginas a.selected').attr('data-page');
            infrashop.pagination.order = $('.sort .order a.selected').attr('data-order');
            infrashop.pagination.dir = $('.sort .order a.selected').attr('data-dir');
            infrashop.pagination.filters = $('#udaFilters').val();
            infrashop.pagination.perPage = $('.sort .per-page a.selected').attr('data-per-page');

            if (infrashop.pagination.page === undefined)
                infrashop.pagination.page = 1;

            if (infrashop.pagination.order === undefined)
                infrashop.pagination.order = $('.sort .order select option:selected').attr('data-order');

            if (infrashop.pagination.order === undefined)
                infrashop.pagination.order = '';

            if (infrashop.pagination.dir === undefined)
                infrashop.pagination.dir = $('.sort .order select option:selected').attr('data-dir');

            if (infrashop.pagination.dir === undefined)
                infrashop.pagination.dir = '';

            if (infrashop.pagination.filters === undefined)
                infrashop.pagination.filters = '';

            if (infrashop.pagination.perPage === undefined)
                infrashop.pagination.perPage = $('.sort .per-page select option:selected').attr('data-per-page');
            else
                if (infrashop.pagination.clickedPerPage == false)
                    infrashop.pagination.perPage = $('.sort .per-page a.selected').attr('data-per-page-aux');

            if (infrashop.pagination.perPage === undefined)
                infrashop.pagination.perPage = '';
            else
                if (infrashop.pagination.clickedPage == false)
                    infrashop.pagination.page = 1;


            infrashop.pagination.url = '?page=' + infrashop.pagination.page;

            if (infrashop.pagination.order != '')
                infrashop.pagination.url += '&order=' + infrashop.pagination.order;

            if (infrashop.pagination.dir != '')
                infrashop.pagination.url += '&dir=' + infrashop.pagination.dir;

            if (infrashop.pagination.filters != '')
                infrashop.pagination.url += '&filters=' + infrashop.pagination.filters;

            if (infrashop.pagination.perPage != '')
                infrashop.pagination.url += '&perPage=' + infrashop.pagination.perPage;
				
			if (CAT_ENABLE_FILTER_VARIANT_GRID && infrashop.pagination.filters.indexOf('cor-') > -1)
                infrashop.pagination.url += '&fvg=1';

            window.history.replaceState('', '', infrashop.pagination.url);

            if (infrashop.pagination.isViewList) {
                infrashop.pagination.classShowCase = $('.show-case-box').attr('class');
                infrashop.pagination.classViewList = $('.viewList').attr('class');
				infrashop.pagination.classViewGrid = $('.viewGrid').attr('class');
            }

            infrashop.pagination.executeAJAX();
        },

        executeAJAX: function () {
            $.get(infrashop.pagination.url, null, function (data) {

                if ($(data).find('.showCase').size() == 0) {
                    infrashop.pagination.url = location.protocol + '//' + location.hostname + location.pathname;
                    window.history.replaceState('', '', infrashop.pagination.url);
                    infrashop.pagination.executeAJAX();
                    return false;
                }

                $('.mainColumn').html($(data).find('.mainColumn').html());
                $('.asideLeft').html($(data).find('.asideLeft').html());

                if (infrashop.pagination.isViewList) {
                    $('.show-case-box').attr('class', infrashop.pagination.classShowCase);
                    $('.viewList').attr('class', infrashop.pagination.classViewList);
					$('.viewGrid').attr('class', infrashop.pagination.classViewGrid);
                }

                if (infrashop.pagination.isWait) {
                    $('.pg-wait').removeClass('show');
                }

                startLazyLoad();
                infrashop.pagination.init();
				setClassUdas();
                ACEC.filter.init();
            });
        },

        startPage: function (e) {
            if (infrashop.pagination.isScrollTop) {
                $('body,html').animate({ scrollTop: infrashop.pagination.HeigthScrollTop }, infrashop.pagination.timeScrollTop);
            }

            if (infrashop.pagination.isWait) {
                $('.pg-wait').addClass('show');
            }

            setTimeout(function () {
                infrashop.pagination.getPage();
            }, infrashop.pagination.timeoutGetPage);

            e.preventDefault();
        },

        setEventsPagination: function () {
            $('.paginas a').click(function (e) {
                $(this).parent().parent().find('a').removeClass('selected');
                $(this).addClass('selected');
                infrashop.pagination.clickedPerPage = false;
                infrashop.pagination.clickedPage = true;
                infrashop.pagination.startPage(e);
            });
        },

        setEventsOrder: function () {
            $('.sort .order a').click(function (e) {
                $(this).parent().parent().find('a').removeClass('selected');
                $(this).addClass('selected');
                infrashop.pagination.clickedPerPage = false;
                infrashop.pagination.clickedPage = true;
                infrashop.pagination.startPage(e);
            });
            $('.sort .order select').change(function (e) {
                $(this).parent().parent().find('option').removeClass('selected');
                $(this).find('option').addClass('selected');
                infrashop.pagination.clickedPerPage = false;
                infrashop.pagination.clickedPage = true;
                infrashop.pagination.startPage(e);
            });
        },

        setEventsPerPage: function () {
            $('.sort .per-page a').click(function (e) {
                $(this).parent().find('a').removeClass('selected');
                $(this).addClass('selected');
                infrashop.pagination.clickedPerPage = true;
                infrashop.pagination.clickedPage = false;
                infrashop.pagination.startPage(e);
            });
            $('.sort .per-page select').change(function (e) {
                $(this).parent().find('option').removeClass('selected');
                $(this).find('option').addClass('selected');
                infrashop.pagination.clickedPerPage = false;
                infrashop.pagination.clickedPage = false;
                infrashop.pagination.startPage(e);
            });
        },

        init: function () {
            infrashop.pagination.setEventsOrder();
            infrashop.pagination.setEventsPagination();
            infrashop.pagination.setEventsPerPage();
        }
    }
}

$(document).ready(function () {
    infrashop.pagination.init();
});
