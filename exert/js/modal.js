(function(){
        
    var ExertMessageBox = function(type, options) {
        //if messagebox type was not is available types we do not do anything
        if (OPTIONS.modalClasses.indexOf(type) === -1){
            return null;
        }
        this.$type   = type;
        
        if (options){
            this.$options = {};
        }
        options = this._processInput(options);
        this.$options = $.extend({}, ExertMessageBox.DEFAULT_OPTIONS, options);
        window.console.log(this.$options);
        this._init();
    };

    ExertMessageBox.prototype = {
        constructor: ExertMessageBox,
        
        _processInput : function(options) {
            
            if (this.$type === 'confirm'){
                options.buttons = ['yes', 'no'];
                options.width = OPTIONS.modalSmallWidth;
                if ( ! options.footer){
                    options.footer = {};
                }
                options.footer.buttonsAlign = 'center';
            }
            window.console.log(options.buttons);
            if (options.buttons){
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
            }
            
            return options;
        },
        _init : function() {
            var me = this;
            var exert = $('.modal.exert-modal');
            //if messagebox exists we show it, if it does not exist we create and than show it
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
            if ( ! me.$options.backDrop){
                exert.attr('data-backdrop', 'static');
            }
            
            this._givePosition();
            this._giveWidth();
            exert.modal();
            this._removeAfterHide();
        },
        _removeAfterHide: function(){
            //We remove messagebo from DOM after it was hidden
            var me = this;
            me.$referer.on('hidden.bs.modal', function() {
                me.$referer.remove();
            });
        },
        hide   : function(){
            this.$referer.modal('hide');
        },
        _giveWidth: function(){
            var s = this.$options.width;
            if (!s)
                return;
            var d = this.$referer.find('.modal-dialog');
            if (isNaN(parseFloat(s, 10))){
                if (s === 'small')
                    d.addClass('modal-sm');
                else if (s === 'large')
                    d.addClass('modal-lg');
            }else{
                var px = parseFloat(s, 10);
                d.css('width', px);
            }
        },
        _givePosition: function(){
            var me = this;
            var p = this.$options.position;
            var pp = p.split(' ');
            var c = this.$referer.find('.modal-dialog');
            if (pp[1] === 'middle'){
                this.$referer.on('shown.bs.modal', function() {
                    var top = ($(window).height() - c.height()) / 2;
                    c.css('top', top);
                });
            }else if (pp[1] === 'bottom'){
                this.$referer.on('shown.bs.modal', function() {
                    var top = ($(window).height() - c.height()) - me.$options.topBottomOffset;
                    c.css('top', top);
                });
            }else{
                c.css('top', me.$options.topBottomOffset);
            }
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
            if (! title)
                return;
            if (typeof title === 'string'){
                header.append(title);
            }else if (typeof title === 'object' &&  title.text) {
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
            if (options.closeMessagebox) {
                b.attr('data-dismiss', 'modal');
            }
            if (this.$options.callback && typeof this.$options.callback === 'function') {
                b.on('click', function(e) {
                    me.$options.callback(me, type, e);
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
     * This method shows message with type and with give options
     * 
     * @param string type of the messageBox
     * @param Object options
     * @returns void
     */
    window.Exert.messageBox = function(type, options) {
        return new ExertMessageBox(type, options);
    };



    ExertMessageBox.DEFAULT_OPTIONS = {
        //title may also be string withour any tag or class. If title is string html is true
        title: {
            text: '',                   //any string
            html: true,                 //if this option is set to true header title will show as HTML
            tag: '',                    //any valid html tag. Most likely you need to set only headings. h1,h2,h3,h4,h5,h6
            class: '',                  //any valid css class
            attrs: {}                   //title tag attributes {key1: value1, key2: value2, ... ,keyN: valueN}
        },
        msg: '',
        closeButton: true,              //This will add close button in header
//        closeAction: 'hide',            //options: ['hide', 'destroy']
        //Position where the messagebox must be shown
        //avaibale options: ['center middle', 'center top', 'center bottom']
        position:    'center middle',
        //Size of the messagebox. Options: ['default', 'small', 'large']
        //You can also give number which is evaluated as in px
        width: 'default',
        topBottomOffset: 30,
        backDrop: false,                //This will prevent messagebox from hiding when you click outside
        //By default if you do not provide buttons message box will contain only close button
        /**
         *  buttons may be object  where key is button type and value is object like this
         *  cancel   : {
         *      class   : 'btn btn-default',
         *      attrs   : {},
         *      text    : 'Close'
         *  }
         */
        //it may be array also ['ok', 'calcel', 'yes', 'no'] 
//        buttons: ['cancel'],
        //modal corresponds to alert object
        modal: {
            class: 'blur',
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
        modalSmallWidth: 250,
        modalClasses : ['error', 'success', 'info', 'warning', 'confirm', 'progress'],
        buttons: {
            ok: {
                class: 'btn btn-primary btn-sm',
                attrs: {},
                text: BUTTON_LOCALES.ok,
                closeMessagebox: false
            },
            cancel: {
                class: 'btn btn-danger btn-sm',
                attrs: {},
                text: BUTTON_LOCALES.cancel,
                closeMessagebox: true
            },
            yes: {
                class: 'btn btn-success btn-sm',
                attrs: {},
                text: BUTTON_LOCALES.yes,
                closeMessagebox: false
            },
            no: {
                class: 'btn btn-default btn-sm',
                attrs: {},
                text: BUTTON_LOCALES.no,
                closeMessagebox: true
            }
        }
    };
})();


