define(function (require) {
    require('jquery');
    require('bootstrap-listbuilder');

    return describe('ListBuilder', function () {
        var $el, changed;

        beforeEach(function () {
            changed = false;

            $el = $('<ul><li class="list-group-item">ABC</li></ul>');
            $el.on('change', function () {
                changed = true;
            });
            $el.listBuilder();
        });

        it('should add a remove button to each item', function () {
            expect($el.find('.list-group-item a.btn-remove').size()).toBe(1);
        });

        it('should add an option for adding a new item', function () {
            expect($el.find('.list-builder-prompt').size()).toBe(1);
        });

        describe('when the add button is clicked', function () {
            beforeEach(function () {
                $el.find('.list-builder-prompt .btn-prompt').click();
            });

            it('should hide the prompt for adding a new item', function () {
                expect($el.find('.list-builder-prompt').hasClass('hidden')).toBe(true);
            });

            it('should show an input for entering the item', function () {
                var $input = $el.find('.list-builder-input');

                expect($input.size()).toBe(1);
                expect($input.hasClass('hidden')).toBe(false);
            });

            describe('when an item is added', function () {
                beforeEach(function () {
                    $el.find('.list-builder-input input').val('an item');
                    $el.find('.list-builder-input .btn-save').click();
                });

                it('should add an item to the list', function () {
                    expect($el.find('.list-group-item:contains(an item)').size()).toBe(1);
                });

                it('should trigger a change event', function () {
                    expect(changed).toBe(true);
                });

                it('should return the correct value', function () {
                    expect($el.listBuilder('value')).toEqual(['ABC', 'an item']);
                });
            });

            describe('when an item is added by pressing enter', function () {
                beforeEach(function () {
                    $el.find('.list-builder-input input').val('an item');

                    var e = jQuery.Event("keypress");
                    e.which = 13;
                    e.keyCode = 13;

                    $el.find('.list-builder-input input').trigger(e);
                });

                it('should add an item to the list', function () {
                    expect($el.find('.list-group-item:contains(an item)').size()).toBe(1);
                });
            });

            describe('when attempting to add an empty item', function () {
                beforeEach(function () {
                    $el.find('.list-builder-input input').val(' ');
                    $el.find('.list-builder-input .btn-save').click();
                });

                it('should not add an item to the list', function () {
                    expect($el.find('.list-group-item').size()).toBe(3);
                });

                it('should not trigger a change event', function () {
                    expect(changed).toBe(false);
                });

                it('should return the correct value', function () {
                    expect($el.listBuilder('value')).toEqual(['ABC']);
                });
            });

            describe('when the cancel button is clicked', function () {
                beforeEach(function () {
                    $el.find('.list-builder-input input').val('blah');
                    $el.find('.list-builder-input .btn-cancel').click();
                });

                it('should show the prompt for adding a new item', function () {
                    expect($el.find('.list-builder-prompt').hasClass('hidden')).toBe(false);
                });

                it('should hide the input for entering the item', function () {
                    var $input = $el.find('.list-builder-input');

                    expect($input.size()).toBe(1);
                    expect($input.hasClass('hidden')).toBe(true);
                });

                it('should clear the input', function () {
                    var $input = $el.find('.list-builder-input input');

                    expect($input.val()).toBe('');
                });
            });
        });

        describe('when an item is removed', function () {
            beforeEach(function () {
                $el.find('.list-group-item .btn-remove').eq(0).click();
            });

            it('should remove the item from the list', function () {
                expect($el.find('.list-group-item:contains(ABC)').size()).toBe(0);
            });

            it('should trigger a change event', function () {
                expect(changed).toBe(true);
            });

            it('should return the correct value', function () {
                expect($el.listBuilder('value')).toEqual([]);
            });
        });
    });
});