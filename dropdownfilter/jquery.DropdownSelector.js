/* A DropdownSelector Plugin
* A plugin for dropdown single and multi checkbox.
* v1.0.0
* License: MIT <http://opensource.org/licenses/mit-license.php> - see LICENSE file
* by Mirza shareque
* shareque@outlook.com
*/
(function ($) {
    jQuery.fn.DropdownSelector = function () {
        var $elem = $(this), getdimensions = {}, getdimensionids = {},
             dimensions = {}, dimensionids = {};

        $elem.find('ul').each(function (index) {
            console.log(index + ": " + $(this).data('filter-type'));
            //variable declaration
            var $filterlist = $(this),
             $filters = $filterlist.find('li'),
             $filtertype = $filterlist.data('filter-type');

            // ddl selector for filter type radio
            if ($filtertype == 'single') {

                //binding filters event to items
                $filters.on('click', function () {
                    var $t = $(this),
           dimension = $t.attr('data-dimension'),
           filter = $t.attr('data-filter'),
           filterId = $t.attr('data-dimension-id'),
           filterIds = dimensionids[dimension],
           filterString = dimensions[dimension];

                    if (typeof filterString == 'undefined')
                        filterString = 'all';
                    if (typeof filterString == 'undefined')
                        filterIds = '-1';

                    // Check checkbox
                    $t.addClass('active').siblings().removeClass('active');
                    // Append filter to string                     
                    filterString = filter;
                    // our code 
                    filterIds = filterId;
                    // Set demension with filterString
                    dimensions[dimension] = filterString;
                    // our code
                    dimensionids[dimension] = filterIds;
                    getdimensions = dimensions;
                    getdimensionids = dimensionids;
                    $.each(dimensions, function (i, d) {
                        // We now have two strings containing the filter arguments for each dimension:	
                        console.info('dimension ' + i + ': ' + d);
                    });
                    $.each(dimensionids, function (i, d) {
                        // our code
                        console.info('dimension id: ' + d);
                    });
                });
            }
            if ($filtertype == 'multi') {

                $filters.on('click', function () {
                    var $t = $(this),
						dimension = $t.attr('data-dimension'),
						filter = $t.attr('data-filter'),
                        filterId = $t.attr('data-dimension-id'),
                        filterIds = dimensionids[dimension],
                        filterString = dimensions[dimension];

                    if (typeof filterString == 'undefined')
                        filterString = 'all';
                    if (typeof filterIds == 'undefined')
                        filterIds = '-1';

                    if (filter == 'all') {
                        // If "all"
                        if (!$t.hasClass('active')) {
                            // if unchecked, check "all" and uncheck all other active filters
                            $t.addClass('active').siblings().removeClass('active');
                            // Replace entire string with "all"
                            filterString = 'all';

                            // our code 

                            filterIds = '-1';
                        } else {
                            // Uncheck
                            $t.removeClass('active');
                            // Emtpy string
                            filterString = '';

                            // our code 
                            filterIds = '';
                        }
                    } else {
                        // Else, uncheck "all"
                        $t.siblings('[data-filter="all"]').removeClass('active');
                        // Remove "all" from string
                        filterString = filterString.replace('all', '');

                        // our code 
                        filterIds = filterIds.replace('-1', '');

                        if (!$t.hasClass('active')) {
                            // Check checkbox
                            $t.addClass('active');
                            // Append filter to string
                            filterString = filterString == '' ? filter : filterString + ',' + filter;

                            // our code 
                            filterIds = filterIds == '' ? filterId : filterIds + ',' + filterId;
                        } else {
                            // Uncheck
                            $t.removeClass('active');
                            // Remove filter and preceeding space from string with RegEx
                            var re = new RegExp('(\\s|^)' + filter);
                            filterString = filterString.replace(re, '');

                            // our code 
                            var fids = new RegExp('(\\s|^)' + filterId);
                            filterIds = filterIds.replace(fids, '');
                        };
                    };

                    // Set demension with filterString
                    dimensions[dimension] = filterString;
                    // our code
                    dimensionids[dimension] = filterIds;

                    $.each(dimensions, function (i, d) {
                        // We now have two strings containing the filter arguments for each dimension:	
                        console.info('dimension ' + i + ': ' + d);
                    });
                    $.each(dimensionids, function (i, d) {
                        // our code
                        console.info('dimension id: ' + d);
                    });
                }); //click event end

            } //if multi end

        });
        //
        jQuery.fn.DropdownSelector.GetDimensions = function () { return dimensions; }
        jQuery.fn.DropdownSelector.GetDimensionIds = function () { return dimensionids; }

    };
    return this;

})(jQuery);