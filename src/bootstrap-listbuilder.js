(function (factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
} (function ($) {
    "use strict";

    /* LIST BUILDER CLASS DEFINITION
    * =================================== */
    var ListBuilder = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, ListBuilder.DEFAULTS, options, this.$element.data());
    };

    ListBuilder.DEFAULTS = {
        placeholder: '',
        prompt: 'Add Item',
        type: 'text'
    };

    ListBuilder.prototype.init = function () {
        var self = this;
        this.$element.find('.list-group-item').each(function (index, element) {
            self.addRemoveButton($(element));
        });

        this.$prompt = $('<li class="list-group-item list-builder-prompt" style="cursor: pointer;">' +
            '<span class="text-muted">' + this.options.prompt + '</span>' +
            '<a href="#" class="btn btn-link btn-xs pull-right btn-prompt">' +
			    '<span class="glyphicon glyphicon-plus"></span>' +
		    '</a>' +
        '</li>');
        this.$element.append(this.$prompt);

        this.$input = $('<li class="list-group-item list-builder-input hidden">' +
            '<form>' +
                '<input class="form-control pull-left input-sm" type="' + this.options.type + '" placeholder="' + this.options.placeholder + '">' +
            '</form>' +
            '<a href="#" class="btn btn-success-muted btn-xs btn-save pull-right">' +
                '<span class="glyphicon glyphicon-ok"></span>' +
            '</a>' +
            '<a href="#" class="btn btn-link btn-xs btn-cancel pull-right">' +
                '<span class="glyphicon glyphicon-remove"></span>' +
            '</a>' +
            '<div class="clearfix"></div>' +
        '</li>');
        this.$element.append(this.$input);

        this.$prompt
            .click(function (e) {
                e.preventDefault();
                self.toggle();
            });
        this.$input
            .find('.btn-save')
            .click(function (e) {
                e.preventDefault();
                self.add();
                self.toggle();
            });
        this.$input
            .find('input')
            .keypress(function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    self.add();
                    self.toggle();
                }
            });
        this.$input
            .find('.btn-cancel')
            .click(function (e) {
                e.preventDefault();
                self.toggle();
            });
    };

    ListBuilder.prototype.getItems = function () {
        return this.$element
            .find('.list-group-item')
            .not('.list-builder-input')
            .not('.list-builder-prompt');
    };

    ListBuilder.prototype.value = function () {
        var value = [];

        this.getItems().each(function () {
            value.push($(this).text());
        });

        return value;
    };

    ListBuilder.prototype.addRemoveButton = function ($item) {
        var $remove = $('<a href="#" class="btn btn-danger-muted btn-xs pull-right btn-remove"><span class="glyphicon glyphicon-remove"></span></a>');
        var self = this;
        $remove.click(function (e) {
            e.preventDefault();
            self.remove($item);
        });

        $item.append($remove);
    };

    ListBuilder.prototype.toggle = function () {
        this.$prompt.toggleClass('hidden');
        this.$input.toggleClass('hidden');

        if (!this.$input.is('.hidden')) {
            this.$input.find('input').focus();
        } else {
            this.$input.find('input').val('');
            this.$prompt.find('.btn-prompt').focus();
        }
    };

    ListBuilder.prototype.remove = function ($item) {
        $item.remove();
        this.$element.trigger('change');
    };

    ListBuilder.prototype.add = function () {
        var value = this.$input.find('input').val().trim();
        this.$input.find('input').val('');

        if (!value) {
            return;
        }

        var $item = $('<li class="list-group-item">' + value + '</li>');
        var $items = this.getItems();

        this.addRemoveButton($item);

        if ($items.length) {
            $item.insertAfter(this.getItems().last());
        } else {
            this.$element.prepend($item);
        }

        this.$element.trigger('change');
    };


    /* LIST BUILDER PLUGIN DEFINITION
    * ============================== */

    $.fn.listBuilder = function (option) {
        var result;

        var $elements = this.each(function () {
            var $this = $(this);
            var data = $this.data('list-builder');
            if (!data) {
                $this.data('list-builder', (data = new ListBuilder(this)));
            }

            if (typeof option == 'string') {
                result = data[option]();
            } else {
                data.init();
            }
        });

        if (result !== undefined) {
            return result;
        } else {
            return $elements;
        }
    };

    $.fn.listBuilder.Constructor = ListBuilder;


    /* LIST BUILDER DATA-API
    * =========================== */

    $('.list-builder').each(function () {
        $(this).listBuilder();
    });
}));