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
                    buttons[i] = OPTIONS.buttons[i];
                }
            }
            return options;
        },
        _init : function() {
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
            }
            //remove any alert type classes (such as "error", "success") from alert 
            for (var i=0; i<OPTIONS.modalClasses.length; i++){
                exert.removeClass(OPTIONS.modalClasses[i]);
            }
            //add corresponding class(es) to type
            exert.addClass(this.$type);
            this._addAttrsAndClasses(this.$options.modal.class, this.$options.modal.attrs, this.$referer);
            this.$referer = exert;
        },
        _addAttrsAndClasses : function(cl, attrs, object){
            if (cl && typeof cl === 'string'){
                object.addClass(cl);
            }
            if (attrs && typeof attrs === 'object'){
                object.attr(attrs);
            }
            return object;
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


