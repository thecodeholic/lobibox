//create lobibox object
var Lobibox = Lobibox || {};
(function(){
    /**
     * Base prototype for all messageboxes and window
     */
    var LobiboxBase = {
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
            if (me.$options.draggable && ! me.isMobileScreen()){
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
                        right: $(document).outerWidth() - (left + el.outerWidth() + 2),
                        bottom: $(document).outerHeight() - (top + el.outerHeight() + 2)
                    });
                }
            });
        },
        _calculatePosition: function(){
            var me = this;
            var left = ($(window).outerWidth() - me.$el.outerWidth())/2;
            var top  = ($(window).outerHeight() - me.$el.outerHeight())/2;
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
                    me.destroy();
                    me.$options.callback(me, bt.data('type'), ev);
                });
            }
            btn.click(function() {
                me.destroy();
            });
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
                me.setHeight(me.$el.outerHeight());
            }else{
                me.setHeight(me.$options.height);
            }
        },
        setWidth: function(width){
            width = this._calculateWidth(width);
            this.$el.css('width', width);
        },
        setHeight: function(height){
            var me = this;
            height = me._calculateHeight(height);
            me.$el.css('height', height);
            var bHeight = me._calculateBodyHeight(me.$el.innerHeight());
            
            me.$el.find('.lobibox-body').css('height', bHeight);
        },
        _calculateBodyHeight: function(height){
            var me = this;
            var headerHeight = me.$el.find('.lobibox-header').outerHeight();
            var footerHeight = me.$el.find('.lobibox-footer').outerHeight();
            return height - (headerHeight ? headerHeight : 0) - (footerHeight ? footerHeight : 0);
            
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
            
            me._setSize();
            var pos = me._calculatePosition();
            me.setPosition(pos.left, pos.top);
        },
        _triggerEvent: function(type){
            var me = this;
            if (me.$options[type] && typeof me.$options[type] === 'function'){
                me.$options[type](me);
            }
        },
        isMobileScreen: function(){
            if ($(window).outerWidth() < 768){
                return true;
            }
            return false;
        },
        _calculateWidth: function(width){
            width = Math.min($(window).outerWidth(), width);
            if (width === $(window).outerWidth()){
                width -= 2 * LobiboxBase.OPTIONS.horizontalOffset;
            }
            return width;
        },
        _calculateHeight: function(height){
            return Math.min($(window).outerHeight(), height);
        }
        
    };
    
    LobiboxBase.OPTIONS = {
        horizontalOffset: 5,
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
            },
            cancel: {
                'class': 'lobibox-btn-cancel',
                attrs: {},
                text: Lobibox.locales.buttons.cancel,
            },
            yes: {
                'class': 'lobibox-btn-yes',
                text: Lobibox.locales.buttons.yes,
            },
            no: {
                'class': 'lobibox-btn-no',
                attrs: {},
                text: Lobibox.locales.buttons.no,
            }
        }
    };

    LobiboxBase.DEFAULT_OPTIONS = {
        width           : 600,
        height          : 'auto',
        closeButton     : true,
        draggable       : false,
        btnClass        : 'lobibox-btn',
        customBtnClass  : 'lobibox-btn-default',
        modal           : true,
        debug           : true,
        buttonsAlign    : 'center',
        closeOnEsc      : true,
        
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
        
        options = $.extend({}, Lobibox.prompt.DEFAULT_OPTIONS, options);
        
        this.$options = this._processInput(options);
        
        this._init(this.$type);
        this.debug(this);
    };
    
    LobiboxPrompt.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxPrompt,
        
        _processInput: function(options){
            var me = this;
            
            var mergedOptions = LobiboxBase._processInput.call(me, options);
            window.console.log(mergedOptions, options);
            mergedOptions.buttons = {
                ok: LobiboxBase.OPTIONS.buttons.ok,
                cancel: LobiboxBase.OPTIONS.buttons.cancel
            };
            options = $.extend({}, mergedOptions, LobiboxPrompt.DEFAULT_OPTIONS, options);
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
        width       : 400,
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
        
        options = $.extend({}, Lobibox.confirm.DEFAULT_OPTIONS, options);
        
        this.$options   = this._processInput(options);
        this._init();
        this.debug(this);
    };
    
    LobiboxConfirm.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxConfirm,
        
        _processInput: function(options){
            var me = this;
            
            var mergedOptions = LobiboxBase._processInput.call(me, options); 
            mergedOptions.buttons = {
                yes: LobiboxBase.OPTIONS.buttons.yes,
                no: LobiboxBase.OPTIONS.buttons.no
            };
            options = $.extend({}, mergedOptions, LobiboxConfirm.DEFAULT_OPTIONS, options);
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
        width : 500,
        iconClass : 'glyphicon glyphicon-question-sign'
    };
//------------------------------------------------------------------------------
//-------------------------LobiboxAlert------------------------------------------
//------------------------------------------------------------------------------
    function LobiboxAlert (type, options){
        this.$type      = type;
        
        options = $.extend({}, Lobibox.alert.DEFAULT_OPTIONS, Lobibox[type].DEFAULT_OPTIONS, options);
        
        this.$options   = this._processInput(options);
        
        this._init();
        this.debug(this);
    };
    
    LobiboxAlert.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxAlert,
        
        _processInput: function(options){
            var me = this;
            var mergedOptions = LobiboxBase._processInput.call(me, options);
            mergedOptions.buttons = {
                ok: LobiboxBase.OPTIONS.buttons.ok
            };
            options = $.extend({}, mergedOptions, LobiboxAlert.DEFAULT_OPTIONS, options);
            
            if (options.iconClass === true){
                options.iconClass = LobiboxAlert.OPTIONS[me.$type].iconClass;
            }
            
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
    LobiboxAlert.OPTIONS = {
        warning: {
            iconClass: 'glyphicon glyphicon-question-sign'
        },
        info:{
            iconClass: 'glyphicon glyphicon-info-sign'
        },
        success: {
            iconClass: 'glyphicon glyphicon-ok-sign'
        },
        error: {
            iconClass: 'glyphicon glyphicon-remove-sign'
        }
    };
    LobiboxAlert.DEFAULT_OPTIONS = {
        iconClass       : true
    };
//------------------------------------------------------------------------------
//-------------------------LobiboxProgress--------------------------------------
//------------------------------------------------------------------------------
    function LobiboxProgress (options){
        this.$type      = 'progress';
        this.$progressBarElement = null,
        options = $.extend({}, Lobibox.progress.DEFAULT_OPTIONS, options);
        
        this.$options   = this._processInput(options);
        this.$progress  = 0;
        
        this._init();
        this.debug(this);
    };
    
    LobiboxProgress.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxProgress,
        
        _processInput: function(options){
            var me = this;
            var mergedOptions = LobiboxBase._processInput.call(me, options); 
             
            options = $.extend({}, mergedOptions, LobiboxProgress.DEFAULT_OPTIONS, options);
            return options;
        },
        _init: function(){
            var me = this;
            
            LobiboxBase._init.call(me);
            me.show();
            if (me.$options.progressBarHTML){
                me.$progressBarElement = $(me.$options.progressBarHTML);
            }else{
                me.$progressBarElement = me._createProgressbar();
            }
            var label;
            if (me.$options.label){
                label = $('<label>'+me.$options.label+'</label>');
            }
            var innerHTML = $('<div></div>').append(label, me.$progressBarElement);
            me.setMessage(innerHTML);
            me.position();
        },
        _createProgressbar: function(){
            var me = this;
            var outer = $('<div class="lobibox-progress-bar-wrapper lobibox-progress-outer"></div>')
                    .append('<div class="lobibox-progress-bar lobibox-progress-element"></div>')
                    ;
            if (me.$options.showProgressLabel){
                outer.append('<span class="lobibox-progress-text" data-role="progress-text"></span>');
            }
           
            return outer;
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
            me.$el.find('.lobibox-progress-element').css('width', progress+"%");
            me.$el.find('[data-role="progress-text"]').html(progress+"%");
        },
        getProgress: function(){
            return this.$progress;
        },
        destroy: function () {
            this.$el.remove();
            if ($('.lobibox[data-is-modal=true]').length === 0) {
                $('.lobibox-backdrop').remove();
                $('body').removeClass(LobiboxBase.OPTIONS.bodyClass);
            }
        }
    });
    
    LobiboxProgress.DEFAULT_OPTIONS = {
        width               : 500,
        showProgressLabel   : true,
        label               : false,
        progressBarHTML     : false, 
        //Events
        progressUpdated     : null,
        progressCompleted   : null
    };
//------------------------------------------------------------------------------
//-------------------------LobiboxWindow----------------------------------------
//------------------------------------------------------------------------------
    function LobiboxWindow(type, options) {
        this.$type = type;
        
        options = $.extend({}, Lobibox.window.DEFAULT_OPTIONS, options);
        
        this.$options = this._processInput(options);

        this._init();
        this.debug(this);
    }
    ;

    LobiboxWindow.prototype = $.extend({}, LobiboxBase, {
        constructor: LobiboxWindow,
        _processInput: function(options) {
            var me = this;
            var mergedOptions = LobiboxBase._processInput.call(me, options);
            
            if (options.content && typeof options.content === 'function'){
                options.content = options.content();
            }
            if (options.content instanceof jQuery){
                options.content = options.content.clone();
            }
            options = $.extend({}, mergedOptions, LobiboxWindow.DEFAULT_OPTIONS, options);
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
        setTitle: function(title){
            var me = this;
            me.$el.find('.lobibox-title').html(title);
            return me;
        },
        getTitle: function(){
            var me = this;
            return me.$el.find('.lobibox-title').html();
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
        width           : 480,
        height          : 600,
        content         : '',
        url             : false,
        draggable       : true,
        autoload        : true,
        loadMethod      : 'GET',
        showAfterLoad   : true,
        params          : {}
    };
    
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
    
    //User can set default options for messageboxes
    Lobibox.DEFAULT_OPTIONS = {
        window: LobiboxWindow.DEFAULT_OPTIONS
    };
    //User can set default properties for prompt in the following way
    //Lobibox.prompt.DEFAULT_OPTIONS = object;
    Lobibox.prompt = function(options){
        return new LobiboxPrompt(options);
    };
    //User can set default properties for confirm in the following way
    //Lobibox.confirm.DEFAULT_OPTIONS = object;
    Lobibox.confirm = function(options){
        return new LobiboxConfirm(options);
    };
    //User can set default properties for progress in the following way
    //Lobibox.progress.DEFAULT_OPTIONS = object;
    Lobibox.progress = function(options){
        return new LobiboxProgress(options);
    };
    //Create empty objects in order user to be able to set default options in the following way
    //Lobibox.error.DEFAULT_OPTIONS = object;
    //Lobibox.success.DEFAULT_OPTIONS = object;
    //Lobibox.warning.DEFAULT_OPTIONS = object;
    //Lobibox.info.DEFAULT_OPTIONS = object;
    
    Lobibox.error = {};
    Lobibox.success = {};
    Lobibox.warning = {};
    Lobibox.info = {};
    
    //User can set default properties for alert in the following way
    //Lobibox.alert.DEFAULT_OPTIONS = object;
    Lobibox.alert = function(type, options) {
       if (["success", "error", "warning", "info"].indexOf(type) > -1){
            return new LobiboxAlert(type, options);
        }
    };
    //User can set default properties for window in the following way
    //Lobibox.window.DEFAULT_OPTIONS = object;
    Lobibox.window = function(options){
        return new LobiboxWindow('window', options);
    };

})();


