(function(){
    
    /**
     * Base prototype for all messageboxes and window
     */
    LobiboxBase = {
        $type       : null,
        $el         : null,
        $options    : null,
        debug       : function(){
            if (this.$options.debug){
                window.console.debug.apply(window.console, arguments);
            }
        },
        _processInput: function(options){
            var me = this;
            if ( ! options.title){
                options.title = Lobibox.locales.titles[me.$type];
            }
            if ($.isArray(options.buttons)){
                var btns = {};
                for (var i=0; i<options.buttons.length; i++){
                    var btn = LobiboxBase.OPTIONS.buttons[options.buttons[i]];
                    
                    btns[options.buttons[i]] = btn;
                }
                options.buttons = btns;
            }
            options.customBtnClass = options.customBtnClass ? options.customBtnClass : LobiboxBase.DEFAULT_OPTIONS.customBtnClass;
            for (var i in options.buttons){
                var btn = options.buttons[i];
                if (options.buttons.hasOwnProperty(i)){
                    if (LobiboxBase.OPTIONS.buttons[i]){
                        btn = $.extend({}, LobiboxBase.OPTIONS.buttons[i], btn);
                        options.buttons[i] = btn;
                    }else{
                        btn['class'] = options.customBtnClass;
                    }
                }
                 
            }
            options = $.extend({}, LobiboxBase.DEFAULT_OPTIONS, options);
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
            if (me.$options.closeOnEsc){
                $(document).on('keyup.lobibox', function(ev){
                    if (ev.which === 27){
                        me.destroy();
                    }
                });
            }
        },
        addCloseButton: function(){
            var me = this;
            var closeBtn = $('<span class="btn-close">&times;</span>');
            me.$el.find('.lobibox-header').append(closeBtn);
            closeBtn.on('click.lobibox', function(ev){
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
                $('body').removeClass(LobiboxBase.OPTIONS.bodyClass);
            }
        },
//        detachEvents: function(){
//            $(document).off('mousemove.lobibox');
//            $(document).off('keyup.lobibox');
//        },
        enableDrag: function(){
            var el = this.$el;
            var heading = el.find('.lobibox-header');
            heading.on('mousedown.lobibox', function(ev) {
                var offset = el.offset();
                el.attr('offset-left', ev.clientX - offset.left);
                el.attr('offset-top', ev.clientY - offset.top);
                el.attr('allow-drag', 'true');
            });
            heading.on('mouseup.lobibox', function(ev) {
                el.attr('allow-drag', 'false');
            });
            $(document).on('mousemove.lobibox', function(ev) {
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
                    .addClass(LobiboxBase.DEFAULT_OPTIONS.btnClass)
                    .addClass(op['class'])
                    .attr('data-type', type)
                    .html(op.text);
            if (me.$options.callback && typeof me.$options.callback === 'function') {
                btn.on('click.lobibox', function(ev){
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
            var lobibox = $('<div class="lobibox"></div>');
            lobibox.attr('data-is-modal', me.$options.modal);
            var header = $('<div class="lobibox-header"></div>')
                    .append('<span class="lobibox-title"></span>')
                    ;
            var body = $('<div class="lobibox-body"></div>');
            lobibox.append(header);
            lobibox.append(body);
            if (me.$options.buttons && ! $.isEmptyObject(me.$options.buttons)){
                var footer = $('<div class="lobibox-footer"></div>');
                footer.append(me._generateButtons());
                lobibox.append(footer);
                if (LobiboxBase.OPTIONS.buttonsAlign.indexOf(me.$options.buttonsAlign) > -1){
                    footer.addClass('text-'+me.$options.buttonsAlign);
                }
            }
            me.$el = lobibox
                    .addClass(LobiboxBase.OPTIONS.modalClasses[me.$type])
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
            $('body').append(me.$el).addClass(LobiboxBase.OPTIONS.bodyClass);
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
    
    LobiboxBase.OPTIONS = {
        bodyClass       : 'lobibox-open',
        modalClasses : {
            'error'     : 'lobibox-error',
            'success'   : 'lobibox-success',
            'info'      : 'lobibox-info',
            'warning'   : 'lobibox-warning',
            'confirm'   : 'lobibox-confirm',
            'progress'  : 'lobibox-progress',
            'prompt'    : 'lobibox-prompt',
            'default'   : 'lobibox-default',
            'window'    : 'lobibox-window'
        },
        buttonsAlign: ['left', 'center', 'right'],
        buttons: {
            ok: {
                'class': 'lobibox-btn-default',
                attrs: {},
                text: Lobibox.locales.buttons.ok,
                closeMessagebox: false
            },
            cancel: {
                'class': 'lobibox-btn-cancel',
                attrs: {},
                text: Lobibox.locales.buttons.cancel,
                closeMessagebox: true
            },
            yes: {
                'class': 'lobibox-btn-yes',
                text: Lobibox.locales.buttons.yes,
                closeMessagebox: false
            },
            no: {
                'class': 'lobibox-btn-no',
                attrs: {},
                text: Lobibox.locales.buttons.no,
                closeMessagebox: true
            }
        }
    };

    LobiboxBase.DEFAULT_OPTIONS = {
        width           : 400,
        height          : 'auto',
        closeButton     : true,
        draggable       : true,
        btnClass        : 'lobibox-btn',
        customBtnClass  : 'lobibox-btn-default',
        modal           : true,
        debug           : true,
        buttonsAlign    : 'center',
        closeOnEsc      : false,
//        infoIconClass   : false,
//        errorIconClass  : false,
//        successIconClass: false,
//        warningIconClass: false
        
        //events
        beforeCreate    : null,
        beforeShow      : null,
        onShow          : null,
        beforePosition  : null,
        afterPosition   : null
    };
//------------------------------------------------------------------------------
//-------------------------LobiboxPrompt----------------------------------------
//------------------------------------------------------------------------------
    function LobiboxPrompt (options){
        this.$input         = null;
        this.$type          = 'prompt';
        this.$options = this._processInput(options);
        
        this._init(this.$type);
        this.debug(this);
    };
    
    LobiboxPrompt.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxPrompt,
        
        _processInput: function(options){
            var me = this;
            
            options = LobiboxBase._processInput.call(me, options);
            options.buttons = {
                ok: LobiboxBase.OPTIONS.buttons.ok,
                cancel: LobiboxBase.OPTIONS.buttons.cancel
            };
            options = $.extend({}, LobiboxPrompt.DEFAULT_OPTIONS, options);
            return options;
        },
        _init: function(){
            var me = this;
            
            LobiboxBase._init.call(me);
            
            me.show();
            me.setMessage(me._createInput());
//            me.$input.focus();
            me.position();
            me.$input.focus();
        },
        _createInput: function(){
            var me = this;
            var label;
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
            if (me.$options.label){
                label = $('<label>'+me.$options.label+'</label>');
            }
            var innerHTML = $('<div></div>').append(label, me.$input);
            return innerHTML;
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
        type        : 'text',
        label       : false
    };
//------------------------------------------------------------------------------
//-------------------------LobiboxConfirm---------------------------------------
//------------------------------------------------------------------------------
    function LobiboxConfirm (options){
        this.$type      = 'confirm';
        this.$options   = this._processInput(options);
        this._init();
        this.debug(this);
    };
    
    LobiboxConfirm.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxConfirm,
        
        _processInput: function(options){
            var me = this;
            
            options = LobiboxBase._processInput.call(me, options); 
            options.buttons = {
                yes: LobiboxBase.OPTIONS.buttons.yes,
                no: LobiboxBase.OPTIONS.buttons.no
            };
            options = $.extend({}, LobiboxConfirm.DEFAULT_OPTIONS, options);
            return options;
        },
        
        _init: function(){
            var me = this;
            
            LobiboxBase._init.call(me);
            me.show();
            var d = $('<div></div>');
            if (me.$options.iconClass){
                d.append($('<div class="lobibox-icon-wrapper"></div>')
                    .append('<i class="lobibox-icon '+me.$options.iconClass+'"></i>'))
                    ;
            }
            d.append('<div class="lobibox-body-text-wrapper"><span class="lobibox-body-text">'+me.$options.msg+'</span></div>');
            me.setMessage(d.html());
            
            me.position();
        }
    });
    
    LobiboxConfirm.DEFAULT_OPTIONS = {
        
    };
//------------------------------------------------------------------------------
//-------------------------LobiboxInfo------------------------------------------
//------------------------------------------------------------------------------
    function LobiboxInfo (type, options){
        this.$type      = type;
        this.$options   = this._processInput(options);
        
        this._init();
        this.debug(this);
    };
    
    LobiboxInfo.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxInfo,
        
        _processInput: function(options){
            var me = this;
            options = LobiboxBase._processInput.call(me, options); 
             
            options = $.extend({}, LobiboxInfo.DEFAULT_OPTIONS, options);
            return options;
        },
        
        _init: function(){
            var me = this;
            LobiboxBase._init.call(me);
            me.show();
            
            var d = $('<div></div>');
            if (me.$options.iconClass){
                d.append($('<div class="lobibox-icon-wrapper"></div>')
                    .append('<i class="lobibox-icon '+me.$options.iconClass+'"></i>'))
                    ;
            }
            d.append('<div class="lobibox-body-text-wrapper"><span class="lobibox-body-text">'+me.$options.msg+'</span></div>');
            
            me.setMessage(d.html());
            me.position();
        }
    });
    
    LobiboxInfo.DEFAULT_OPTIONS = {
        iconClass       : false
    };
//------------------------------------------------------------------------------
//-------------------------LobiboxProgress------------------------------------------
//------------------------------------------------------------------------------
    function LobiboxProgress (options){
        this.$type      = 'progress';
        this.$options   = this._processInput(options);
        this.$progress  = 0;
        
        this._init();
        this.debug(this);
    };
    
    LobiboxProgress.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxProgress,
        
        _processInput: function(options){
            var me = this;
            options = LobiboxBase._processInput.call(me, options); 
             
            options = $.extend({}, LobiboxProgress.DEFAULT_OPTIONS, options);
            return options;
        },
        _init: function(){
            var me = this;
            
            LobiboxBase._init.call(me);
            me.show();
            me.setMessage(me._createProgressbar());
            
            me.position();
        },
        _createProgressbar: function(){
            var me = this;
            var outer = $('<div class="lobibox-progress-bar-wrapper"></div>')
                    .append('<div class="lobibox-progress-bar"></div>')
                    ;
            if (me.$options.showProgressLabel){
                outer.append('<span class="lobibox-progress-text"></span>');
            }
            var label;
            if (me.$options.label){
                label = $('<label>'+me.$options.label+'</label>');
            }
            var innerHTML = $('<div></div>').append(label, outer);
            return innerHTML;
        },
        setProgress: function(progress){
            var me = this;
            if (me.$progress === 100){
                return;
            }
            progress = Math.min(100, Math.max(0, progress)).toFixed(1);
            me.$progress = progress;
            me._triggerEvent('progressUpdated');
            if (me.$progress === 100){
                me._triggerEvent('progressCompleted');
            }
            me.$el.find('.lobibox-progress-bar').css('width', progress+"%");
            if (me.$options.showProgressLabel){
                me.$el.find('.lobibox-progress-text').html(progress+"%");
            }
        },
        getProgress: function(){
            return this.$progress;
        }
    });
    
    LobiboxProgress.DEFAULT_OPTIONS = {
        showProgressLabel   : true,
        label               : false,
        progressUpdated     : null,
        progressCompleted   : null
    };
//------------------------------------------------------------------------------
//-------------------------LobiboxWindow----------------------------------------
//------------------------------------------------------------------------------
    function LobiboxWindow(type, options) {
        this.$type = type;
        this.$options = this._processInput(options);

        this._init();
        this.debug(this);
    }
    ;

    LobiboxWindow.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxInfo,
        _processInput: function(options) {
            var me = this;
            options = LobiboxBase._processInput.call(me, options);
            
            if (options.content && typeof options.content === 'function'){
                options.content = options.content();
            }
            if (options.content instanceof jQuery){
                options.content = options.content.clone();
            }
            options = $.extend({}, LobiboxWindow.DEFAULT_OPTIONS, options);
            return options;
        },
        _init: function() {
            var me = this;

            LobiboxBase._init.call(me);
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

    LobiboxWindow.DEFAULT_OPTIONS = {
        content         : '',
        url             : false,
        autoload        : true,
        loadMethod      : 'GET',
        showAfterLoad   : true,
        params          : {}
    };
    
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
    //create lobibox object
    window.Lobibox = window.Lobibox || {};
    
    window.Lobibox.prompt = function(options){
        return new LobiboxPrompt(options);
    };
    window.Lobibox.confirm = function(options){
        return new LobiboxConfirm(options);
    };
    window.Lobibox.progress = function(options){
        return new LobiboxProgress(options);
    };
    window.Lobibox.alert = function(type, options) {
       if (["success", "error", "warning", "info"].indexOf(type) > -1){
            return new LobiboxInfo(type, options);
        }
    };
    
    window.Lobibox.window = function(options){
        return new LobiboxWindow('window', options);
    };

})();


