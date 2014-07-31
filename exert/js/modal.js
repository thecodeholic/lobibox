(function(){
        
    var ExertModal = function(type, options) {
        if (OPTIONS.modalClasses.indexOf(type) === -1){
            return null;
        }
        this.$type   = type;
        this.$options = {};
        if (options){
            options = this._processInput(options);
            this.$options = $.extend({}, ExertModal.DEFAULT_OPTIONS, options);
        }
        this._init();
    };

    ExertModal.prototype = {
        constructor: ExertModal,
        _processInput : function(options) {
            var buttons = {};
            if (typeof options.buttons === 'object' && options.buttons.length === 0) {
                for (var i in options.buttons) {
                    buttons[i] = $.extend({}, OPTIONS.buttons[i], options.buttons[i]);
                }
            }else if (options.buttons.length > 0){
                for (var i=0; i<options.buttons.length; i++){
                    buttons[options.buttons[i]] = OPTIONS.buttons[options.buttons[i]];
                }
                options.buttons = buttons;
            }
            return options;
        },
        _init : function() {
            var me = this;
            var exert = $('.modal.exert-modal');
            if (exert.length === 0){
                //We create all necessary div-s and put in each other as it's required
                exert = $('<div class="modal exert-modal" role="dialog"></div>');
                var dialog = $('<div class="modal-dialog"></div>');
                var content = $('<div class="modal-content"></div>');
                var header = $('<div class="modal-header"></div>');
                var body = $('<div class="modal-body"></div>');
                var footer = $('<div class="modal-footer"></div>');
                content.append(header);
                content.append(body);
                content.append(footer);
                dialog.append(content);
                exert.append(dialog);
                $('body').append(exert);
                
                exert.on('hidden.bs.modal', function() {
                    if (me.$options.closeAction === 'destroy') {
                        exert.remove();
                    }
                });
            }
            //remove any alert type classes (such as "error", "success") from alert 
            for (var i=0; i<OPTIONS.modalClasses.length; i++){
                exert.removeClass(OPTIONS.modalClasses[i]);
            }
            //add corresponding class(es) to type
            exert.addClass(this.$type);
            this.$referer = exert;
            
            this._addAttrsAndClasses(this.$options.modal.class, this.$options.modal.attrs, this.$referer);
            this._addHeader();
            this._addFooter();
            
            if (this.$options.msg) {
                if (!body){
                    var body = this.$referer.find('.modal-body');
                }
                body.html(this.$options.msg);
            }
            exert.modal();
        },
        _addAttrsAndClasses : function(cl, attrs, object){
            if (cl && typeof cl === 'string'){
                object.addClass(cl);
            }
            if (attrs && typeof attrs === 'object'){
                object.attr(attrs);
            }
            return object;
        },
        /*
         * This method adds title to modal with corresponding tags, classes and attributes
         * If class or attributes was given but tag was not given the title text is surrounded by <span></span> tags
         */
        _addTitle: function() {
            var header = this.$referer.find('.modal-header');
            var title = this.$options.title;
            if (title.text) {
                var openTag = "";
                var closeTag = "";
                if (title.tag) {
                    openTag = '<' + title.tag + '>';
                    closeTag = '</' + title.tag + '>';
                } else if (!title.tag && (title.class || typeof title.attrs === 'object' && !$.isEmptyObject(title.attrs))) {
                    openTag = '<span>';
                    closeTag = '</span>';
                }
                if (openTag !== "") {
                    var text = $(openTag + closeTag);
                    if (title.class) {
                        text.addClass(title.class);
                    }
                    if (!$.isEmptyObject(title.attrs)) {
                        text.attr(title.attrs);
                    }
                    if (title.html) {
                        text.html(title.text);
                    } else {
                        text.text(title.text);
                    }
                    header.append(text);
                } else {
                    if (title.html) {
                        header.html(title.text);
                    } else {
                        header.text(title.text);
                    }
                }
            }
        },
        _addHeader: function(){
            var header = this.$referer.find('.modal-header');
            header.empty();
            if (this.$options.closeButton) {
                this._addCloseButton();
            }
            this._addTitle();
            this._addAttrsAndClasses(this.$options.header.class, this.$options.header.attrs, header);
        },
        /**
         * This method adds close button to modal if it was enabled
         * 
         * @param {DomElement}  el      element which will be appended
         */
        _addCloseButton : function(){
            var header = this.$referer.find('.modal-header');
            header.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
        },
        /**
         * This method generates modal footer
         */
        _addFooter : function(){
            var footer = this.$referer.find('.modal-footer');
            footer.empty();
            if (['left', 'right', 'center'].indexOf(this.$options.footer.buttonsAlign) > -1){
                footer.addClass('text-'+this.$options.footer.buttonsAlign);
            }
            var buts = this._generateButtons();
            footer.append(buts);
        },
        _createButton : function(type, options){
            var me = this;
            var b = $('<button></button>');
            if (type === 'close') {
                b.attr('data-dismiss', 'modal');
            }
            if (this.$options.callback && typeof this.$options.callback === 'function') {
                b.on('click', function(e) {
                    me.$options.callback(e, type);
                });
            }
            b.html(options.text);
            return this._addAttrsAndClasses(options.class, options.attrs, b);
        },
        /**
         * This method generates footer buttons with possible classes, attributes and callback method
         * 
         * @param {object}      options 
         * @return {array}                  array of buttons which we need to add in footer
         */
        _generateButtons : function(){
            var buttons = this.$options.buttons;
            var returnButtons = [];
            if (buttons && typeof buttons === 'object' && !$.isEmptyObject(buttons)){
                //here i is button type and buttons[i] is options for button
                for (var i in buttons){
                    returnButtons.push(this._createButton(i, buttons[i]));
//                    footer.append(createButton(i, buttons[i]));
                }
            }
            return returnButtons;
        }
    };

    //create exert object
    window.Exert = window.Exert || {};

    /*
     * This method shows error message with give options
     * 
     * @param Object options
     * @returns void
     */
    window.Exert.error = function(options) {
        return new ExertModal('error', options);
    };




    ExertModal.DEFAULT_OPTIONS = {
        //This variable contains hash table where key is message type and value is css class
        title: {
            text: '', //any string
            html: true, //if this option is set to true header title will show as HTML
            tag: '', //any valid html tag. Most likely you need to set only headings. h1,h2,h3,h4,h5,h6
            class: '', //any valid css class
            attrs: {}                   //title tag attributes {key1: value1, key2: value2, ... ,keyN: valueN}
        },
        msg: '',
        closeButton: true,
        closeAction: 'hide', //options: ['hide', 'destroy']
        //By default if you do not provide buttons message box will contain only close button
        /**
         *  buttons may be object also where key is button type and value is object like this
         *  close   : {
         *      class   : 'btn btn-default',
         *      attrs   : {},
         *      text    : 'Close'
         *  }
         */
        buttons: ['close'], //array with options ['close', 'ok', 'calcel', 'yes', 'no'] or object with template described in default.button object
        //modal corresponds to alert object
        modal: {
            class: 'fade',
            attrs: {}
        },
        dialog: {
            class: '',
            attrs: {}
        },
        content: {
            class: '',
            attrs: {}
        },
        header: {
            class: '',
            attrs: {}
        },
        body: {
            class: '',
            attrs: {}
        },
        footer: {
            class: '',
            attrs: {},
            buttonsAlign: 'right'    //we have three options 'right', 'center', 'left'
        }
    };

    var LOCALES = window.Exert.locales;
    var BUTTON_LOCALES = LOCALES.buttons;
    var OPTIONS = {
        modalClasses : ['error', 'success', 'info', 'warning', 'confirm', 'progress'],
        buttons: {
            close: {
                class: 'btn btn-default',
                attrs: {},
                text: BUTTON_LOCALES.close
            },
            ok: {
                class: 'btn btn-primary',
                attrs: {},
                text: BUTTON_LOCALES.ok
            },
            cancel: {
                class: 'btn btn-danger',
                attrs: {},
                text: BUTTON_LOCALES.cancel
            },
            yes: {
                class: 'btn btn-success',
                attrs: {},
                text: BUTTON_LOCALES.yes
            },
            no: {
                class: 'btn btn-default',
                attrs: {},
                text: BUTTON_LOCALES.no
            }
        }
    };
})();


