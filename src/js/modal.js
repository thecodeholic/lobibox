(function(){
    
    /**
     * Base prototype for all messageboxes and window
     */
    LobiBoxBase = {
        $type       : null,
        $el         : null,
        $options    : null,
        debug       : function(){
            if (this.$options.debug){
                window.console.info.apply(window.console, arguments);
            }
        },
        _processInput: function(options){
            var me = this;
            if ( ! options.title){
                options.title = Exert.locales.titles[me.$type];
            }
            if ($.isArray(options.buttons)){
                var btns = {};
                for (var i=0; i<options.buttons.length; i++){
                    var btn = LobiBoxBase.OPTIONS.buttons[options.buttons[i]];
                    
                    btns[options.buttons[i]] = btn;
                }
                options.buttons = btns;
            }
            options.customBtnClass = options.customBtnClass ? options.customBtnClass : LobiBoxBase.DEFAULT_OPTIONS.customBtnClass;
            for (var i in options.buttons){
                var btn = options.buttons[i];
                if (options.buttons.hasOwnProperty(i)){
                    if (LobiBoxBase.OPTIONS.buttons[i]){
                        btn = $.extend({}, LobiBoxBase.OPTIONS.buttons[i], btn);
                        options.buttons[i] = btn;
                    }else{
                        btn['class'] = options.customBtnClass;
                    }
                }
                 
            }
            options = $.extend({}, LobiBoxBase.DEFAULT_OPTIONS, options);
            return options;
        },
        _init: function(){
            var me = this;
            
            me._triggerEvent('beforeCreate');
            
            me._createMarkup();
            me.setTitle(me.$options.title);
            if (me.$options.draggable){
                me.$el.addClass('draggable');
                me.enableDrag();
            }
            if (me.$options.closeButton){
                me.addCloseButton();
            }
        },
        addCloseButton: function(){
            var me = this;
            var closeBtn = $('<span class="btn-close">&times;</span>');
            me.$el.find('.lobibox-header').append(closeBtn);
            closeBtn.on('click', function(ev){
                me.destroy();
            });
        },
        hide: function(){
            this.$el.hide();
            $('.lobibox-backdrop').remove();
        },
        destroy: function(){
            this.$el.remove();
            if ($('.lobibox[data-is-modal=true]').length === 0){
                $('.lobibox-backdrop').remove();
                $('body').removeClass(LobiBoxBase.OPTIONS.bodyClass);
            }
        },
        enableDrag: function(){
            var el = this.$el;
            var heading = el.find('.lobibox-header');
            heading.on('mousedown', function(ev) {
                var offset = el.offset();
                el.attr('offset-left', ev.clientX - offset.left);
                el.attr('offset-top', ev.clientY - offset.top);
                el.attr('allow-drag', 'true');
            });
            heading.on('mouseup', function(ev) {
                el.attr('allow-drag', 'false');
            });
            $(document).on('mousemove.exert', function(ev) {
                if (el.attr('allow-drag') === 'true') {
                    var left = ev.clientX - parseInt(el.attr('offset-left'), 10);
                    var top = ev.clientY - parseInt(el.attr('offset-top'), 10);
                    el.css({
                        left: left,
                        top: top
                    });
                    el.css({
                        right: $(document).width() - (left + el.width() + 2),
                        bottom: $(document).height() - (top + el.height() + 2)
                    });
                }
            });
        },
        _calculatePosition: function(){
            var me = this;
            var left = ($(window).width() - me.$el.width())/2;
            var top  = ($(window).height() - me.$el.height())/2;
            return {
                left: left,
                top: top
            };
        },
        _createButton: function(type, op){
            var me = this;
            var btn = $('<button></button>')
                    .addClass(LobiBoxBase.DEFAULT_OPTIONS.btnClass)
                    .addClass(op['class'])
                    .attr('data-type', type)
                    .html(op.text);
            if (me.$options.callback && typeof me.$options.callback === 'function') {
                btn.on('click', function(ev){
                    var bt = $(this);
                    me.$options.callback(me, bt.data('type'), ev);
                            if (op.closeMessagebox){
                                me.destroy();
                            }
                });
            } else if (op.closeMessagebox){
                btn.click(function() {
                    me.destroy();
                });
            }
            return btn;
        },
        _generateButtons: function(){
            var me = this;
            var btns = [];
            for (var i in me.$options.buttons){
                if (me.$options.buttons.hasOwnProperty(i)){
                    var op = me.$options.buttons[i];
                    var btn = me._createButton(i, op);
                    btns.push(btn);
                }
            }
            return btns;
        },
        _createMarkup: function(){
            var me = this;
            var exert = $('<div class="lobibox"></div>');
            exert.attr('data-is-modal', me.$options.modal);
            var header = $('<div class="lobibox-header"></div>')
                    .append('<span class="lobibox-title"></span>')
                    ;
            var body = $('<div class="lobibox-body"></div>');
            exert.append(header);
            exert.append(body);
            if (me.$options.buttons && ! $.isEmptyObject(me.$options.buttons)){
                var footer = $('<div class="lobibox-footer"></div>');
                footer.append(me._generateButtons());
                exert.append(footer);
                if (LobiBoxBase.OPTIONS.buttonsAlign.indexOf(me.$options.buttonsAlign) > -1){
                    footer.addClass('text-'+me.$options.buttonsAlign);
                }
            }
            me.$el = exert
                    .addClass(LobiBoxBase.OPTIONS.modalClasses[me.$type])
                    ;
        },
        _setSize: function(){
            var me = this;
            me.setWidth(me.$options.width);
            if (me.$options.height === 'auto'){
                me.setHeight(me.$el.height());
            }else{
                me.setHeight(me.$options.height);
            }
        },
        setWidth: function(width){
            this.$el.css('width', width);
        },
        setHeight: function(height){
            var me = this;
            var headerHeight = me.$el.find('.lobibox-header').outerHeight();
            var footerHeight = me.$el.find('.lobibox-footer').outerHeight();
            var h = height - (headerHeight ? headerHeight : 0) - (footerHeight ? footerHeight : 0);
            me.$el.css('height', height);
            me.$el.find('.lobibox-body').css('height', h);
        },
        setSize: function(width, height){
            var me = this;
            me.$el.css({
                width   : width,
                height  : height
            });
        },
        setPosition: function(left, top){
            var me = this;
            me.$el.css({
                left: left,
                top: top
            });
        },
        setTitle: function(title){
            var me = this;
            me.$el.find('.lobibox-title').html(title);
        },
        setMessage: function(msg){
            var me = this;
            me.$el.find('.lobibox-body').html(msg);
        },
        /**
         * Add backdrop in case if backdrop does not exist
         * 
         * @returns {void}
         */
        _addBackdrop: function(){
            if ($('.lobibox-backdrop').length === 0){
                $('body').append('<div class="lobibox-backdrop"></div>');
            }
        },
        /**
         * This method shows messagebox, trigger corresponding events 
         * and adds backdrop if backdrop option is true
         * 
         * @returns {void}
         */
        show: function(){
            var me = this;
            
            me._triggerEvent('beforeShow');
            $('body').append(me.$el).addClass(LobiBoxBase.OPTIONS.bodyClass);
            if (me.$options.modal){
                me._addBackdrop();
            }
            me._triggerEvent('onShow');
        },
        position: function(){
            var me = this;
            
            me._triggerEvent('beforePosition');
            me._setSize();
            var pos = me._calculatePosition();
            me.setPosition(pos.left, pos.top);
            me._triggerEvent('afterPosition');
        },
        _triggerEvent: function(type){
            var me = this;
            if (me.$options[type] && typeof me.$options[type] === 'function'){
                me.$options[type](me);
            }
        }
        
    };
    
    LobiBoxBase.OPTIONS = {
        bodyClass       : 'lobibox-open',
        modalClasses : {
            'error'     : 'lobibox-error',
            'success'   : 'lobibox-success',
            'info'      : 'lobibox-info',
            'warning'   : 'lobibox-warning',
            'confirm'   : 'lobibox-confirm',
            'progress'  : 'lobibox-progress',
            'prompt'    : 'lobibox-prompt',
            'window'    : 'lobibox-window'
        },
        buttonsAlign: ['left', 'center', 'right'],
        buttons: {
            ok: {
                'class': 'lobibox-btn-default',
                attrs: {},
                text: Exert.locales.buttons.ok,
                closeMessagebox: false
            },
            cancel: {
                'class': 'lobibox-btn-cancel',
                attrs: {},
                text: Exert.locales.buttons.cancel,
                closeMessagebox: true
            },
            yes: {
                'class': 'lobibox-btn-yes',
                text: Exert.locales.buttons.yes,
                closeMessagebox: false
            },
            no: {
                'class': 'lobibox-btn-no',
                attrs: {},
                text: Exert.locales.buttons.no,
                closeMessagebox: true
            }
        }
    };

    LobiBoxBase.DEFAULT_OPTIONS = {
        width           : 340,
        height          : 'auto',
        closeButton     : true,
        draggable       : true,
        btnClass        : 'lobibox-btn',
        customBtnClass  : 'lobibox-btn-default',
        modal           : true,
        debug           : true,
        buttonsAlign    : 'center',
        
        //events
        beforeCreate    : null,
        beforeShow      : null,
        onShow          : null,
        beforePosition  : null,
        afterPosition   : null
    };
//------------------------------------------------------------------------------
////-------------------------LobiboxPrompt------------------------------------------
//------------------------------------------------------------------------------
    function LobiboxPrompt (type, options){
        this.$input         = null;
        this.$type          = type;
        this.$options = this._processInput(options);
        
        this._init(type);
        this.debug(this);
    };
    
    LobiboxPrompt.prototype = $.extend({}, LobiBoxBase, {
        constructor: LobiboxPrompt,
        
        _processInput: function(options){
            var me = this;
            
            options = LobiBoxBase._processInput.call(me, options);
            options.buttons = {
                ok: LobiBoxBase.OPTIONS.buttons.ok,
                cancel: LobiBoxBase.OPTIONS.buttons.cancel
            };
            options = $.extend({}, LobiboxPrompt.DEFAULT_OPTIONS, options);
            return options;
        },
        _init: function(){
            var me = this;
            
            LobiBoxBase._init.call(me);
            
            me.show();
            me.setMessage(me._createInput());
//            me.$input.focus();
            me.position();
            me.$input.focus();
        },
        _createInput: function(){
             var me = this;
             if (me.$options.multiline){
                 me.$input = $('<textarea></textarea>');
                 me.$input.attr('rows' , me.$options.lines);
             }else{
                 me.$input = $('<input type="'+me.$options.type+'"/>');
             }
             me.$input.addClass('lobibox-input');
             if (me.$options.placeholder){
                 me.$input.attr('placeholder', me.$options.placeholder);
             }
            return me.$input;
        },
        setValue: function(val){
            this.$input.val(val);
        },
        getValue: function(){
            return this.$input.val();
        }
    });
    
    LobiboxPrompt.DEFAULT_OPTIONS = {
        placeholder : '',
        value       : '',
        multiline   : false,
        lines       : 3,
        type        : 'text'
    };
//------------------------------------------------------------------------------
////-------------------------LobiboxConfirm-------------------------------------
//------------------------------------------------------------------------------
    function LobiBoxConfirm (type, options){
        this.$type      = type;
        this.$options   = this._processInput(options);
        this._init();
        this.debug(this);
    };
    
    LobiBoxConfirm.prototype = $.extend({}, LobiBoxBase, {
        constructor: LobiBoxConfirm,
        
        _processInput: function(options){
            var me = this;
            
            options = LobiBoxBase._processInput.call(me, options); 
            options.buttons = {
                yes: LobiBoxBase.OPTIONS.buttons.yes,
                no: LobiBoxBase.OPTIONS.buttons.no
            };
            options = $.extend({}, LobiBoxConfirm.DEFAULT_OPTIONS, options);
            return options;
        },
        
        _init: function(){
            var me = this;
            
            LobiBoxBase._init.call(me);
            me.show();
            me.setMessage(me.$options.msg);
            
            me.position();
        }
    });
    
    LobiBoxConfirm.DEFAULT_OPTIONS = {
        
    };
//------------------------------------------------------------------------------
//-------------------------LobiboxInfo------------------------------------------
//------------------------------------------------------------------------------
    function LobiBoxInfo (type, options){
        this.$type      = type;
        this.$options   = this._processInput(options);
        
        this._init();
        this.debug(this);
    };
    
    LobiBoxInfo.prototype = $.extend({}, LobiBoxBase, {
        constructor: LobiBoxInfo,
        
        _processInput: function(options){
            var me = this;
            options = LobiBoxBase._processInput.call(me, options); 
             
            options = $.extend({}, LobiBoxInfo.DEFAULT_OPTIONS, options);
            return options;
        },
        
        _init: function(){
            var me = this;
            
            LobiBoxBase._init.call(me);
            me.show();
            me.setMessage(me.$options.msg);
            
            me.position();
            
        }
    });
    
    LobiBoxInfo.DEFAULT_OPTIONS = {
        
    };
//------------------------------------------------------------------------------
////-------------------------LobiboxWindow------------------------------------------
//------------------------------------------------------------------------------
    function LobiBoxWindow(type, options) {
        this.$type = type;
        this.$options = this._processInput(options);

        this._init();
        this.debug(this);
    }
    ;

    LobiBoxWindow.prototype = $.extend({}, LobiBoxBase, {
        constructor: LobiBoxInfo,
        _processInput: function(options) {
            var me = this;
            options = LobiBoxBase._processInput.call(me, options);
            
            if (options.content && typeof options.content === 'function'){
                options.content = options.content();
            }
            if (options.content instanceof jQuery){
                options.content = options.content.clone();
            }
            options = $.extend({}, LobiBoxWindow.DEFAULT_OPTIONS, options);
            return options;
        },
        _init: function() {
            var me = this;

            LobiBoxBase._init.call(me);
            me.setContent(me.$options.content);
            if (me.$options.url && me.$options.autoload){
                if ( ! me.$options.showAfterLoad){
                    me.show();
                    me.position();
                }
                me.load(function(){
                    if (me.$options.showAfterLoad) {
                        me.show();
                        me.position();
                    }
                });
            }else{
                me.show();
                me.position();
            }
        },
        setParams: function(p){
            var me = this;
            me.$options.params = p;
            return me;
        },
        getParams: function(){
            var me = this;
            return me.$options.params;
        },
        setLoadMethod: function(m){
            var me = this;
            me.$options.loadMethod = m;
            return me;
        },
        getLoadMethod: function(){
            var me = this;
            return me.$options.loadMethod;
        },
        setContent: function(content){
            var me = this;
            me.$options.content = content;
            me.$el.find('.lobibox-body').html('').append(content);
            return me;
        },
        getContent: function(){
            var me = this;
            return me.$options.content;
        },
        load: function(callback){
            var me = this;
            if ( ! me.$options.url){
                return me;
            }
            $.ajax(me.$options.url, {
                method: me.$options.loadMethod,
                data: me.$options.params
            }).done(function(res) {
                me.setContent(res);
                if (callback && typeof callback === 'function'){
                    callback(res);
                }
            });
        }
    });

    LobiBoxWindow.DEFAULT_OPTIONS = {
        content         : '',
        url             : false,
        autoload        : true,
        loadMethod      : 'GET',
        showAfterLoad   : true,
        params          : {}
    };
    
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
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
        if (type === 'prompt'){
            return new LobiboxPrompt(type, options);
        }else if (type === 'confirm'){
            return new LobiBoxConfirm(type, options);
        }
        else if (["success", "error", "warning", "info"].indexOf(type) > -1){
            return new LobiBoxInfo(type, options);
        }else{
            return new LobiBoxBase(type, options);
        }
    };
    
    window.Exert.window = function(options){
        return new LobiBoxWindow('window', options);
    };

})();


