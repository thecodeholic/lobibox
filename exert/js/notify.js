(function(){
        
    var ExertNotify = function(type, options) {
        //if messagebox type was not is available types we do not do anything
        if ( ! OPTIONS.hasOwnProperty(type)){
            return null;
        }
        this.$type   = type;
        
        if (options){
            this.$options = {};
        }
        
        this.$options = $.extend({}, ExertNotify.DEFAULT_OPTIONS, options);
        this.$options = this._processInput(this.$options);
        this._init();
    };

    ExertNotify.prototype = {
        constructor: ExertNotify,
        
        _processInput: function(options){
            if ( options.title === undefined){
                for (var i in OPTIONS){
                    if (this.$type === i){
                        options.title = OPTIONS[i].title;
                        break;
                    }
                }
            }
            if (options.icon === undefined){
                for (var i in OPTIONS){
                    if (this.$type === i){
                        options.icon = OPTIONS[i].icon;
                        break;
                    }
                }
            }
            
            options = this._processPosition(options);
            options = this._processClass(options);
            return options;
        },
        
        _processClass : function(options){
            if ( ! options.showClass || 
                    OPTIONS.showAnimations.indexOf(options.showClass) === -1) {
                options.showClass = ExertNotify.DEFAULT_OPTIONS.showClass;
            }
            if ( ! options.hideClass || 
                    OPTIONS.hideAnimations.indexOf(options.hideClass) === -1) {
                options.hideClass = ExertNotify.DEFAULT_OPTIONS.hideClass;
            }
            options['class']  = this.$type + " " + OPTIONS['class'] + " "+options.showClass;
            return options;
        },
        
        _processPosition: function(options){
            var pos = {};
            if (typeof options.position === 'string'){
                 if (OPTIONS.positions.indexOf(options.position) > -1){
                    var s = options.position.split(" ");
                    if (s.length !== 2){
                        throw { name: 'ExertNotifyError', message: "Incorrect position was provided" };
                    }
                    if (s[1] === 'left'){
                        pos.left = OPTIONS.offsetLeft;
                    }else if (s[1] === 'right'){
                        pos.right = OPTIONS.offsetRight;
                    }else if (s[1] === 'middle'){
                        pos.left = ($(window).width() - options.width) / 2;
                    }
                    if (s[0] === 'top'){
                        pos.top = OPTIONS.offsetTop;
                    }else if (s[0] === 'bottom'){
                        pos.bottom =  OPTIONS.offsetBottom;
                    }
                    options.position = pos;
                }else{
                    throw { name: 'ExertNotifyError', message: "Incorrect position was provided" };
                }
            }
            return options;
        },
        _init: function(){
            var notify = $('<div class="exert-notify"></div>');
            //Add class to notify box
            notify.addClass(this.$options['class']);
            
            if (this.$options.icon){
                var icon = $('<div class="exert-notify-icon"><i class="'+this.$options.icon+'"></i></div>');
                notify.append(icon);
            }
            if (this.$options.title){
                var title = $('<div class="exert-notify-title">'+this.$options.title+'<div>');
                notify.append(title);
            }
            if (this.$options.msg){
                var msg = $('<div class="exert-notify-msg">'+this.$options.msg+'</div>');
                notify.append(msg);
            }
            if (this.$options.width){
                notify.css('width', this.$options.width);
            }
            
            this.$notify = notify;
            this._appendInWrapper();
            this._addCloseButton();
            this._addCloseOnClick();
            this._givePosition();
            this._addClass();
            this._addDelay();
            
        },
        
        _appendInWrapper: function(){
            var selector = '.exert-notify-wrapper';
            var classes = [];
            for (var i in this.$options.position){
                if (this.$options.position.hasOwnProperty(i)){
                    classes.push(i);
                }
            }
            selector += "."+classes[0];
            for (var i = 1; i<classes.length; i++){
                selector +="."+classes[i];
            }
            var wr = $(selector);
            if (wr.length === 0){
                wr = $('<div class="exert-notify-wrapper '+classes.join(" ")+'"></div>');
                $('body').append(wr);
            }
            wr.prepend(this.$notify);
        },
        _addCloseButton: function(){
            var close = $('<span class="exert-close">&times;</span>');
            var me = this;
            close.click(function(ev){
                me.remove();
            });
            this.$notify.append(close);
        },
        _addCloseOnClick: function(){
            var me = this;
            if (me.$options.closeOnClick){
                me.$notify.click(function(){
                    me.remove();
                });
            }
        },
        _addClass: function(){
            this.$notify.addClass(this.$options['class']);
        },
        _givePosition: function(){
            this.$notify.css(this.$options.position);
        },
        _addDelay: function(){
            if ( ! this.$options.delay){
                return;
            }
            var me = this;
            var delay = $('<div class="exert-delay-indicator"><div></div></div>');
            me.$notify.append(delay);
            var time = 0;
            var interval = 1000/30;
            var timer = setInterval(function(){
                time += interval;
                var width = 100 * time / me.$options.delay;
                if (width >= 100){
                    timer = clearInterval(timer);
                }
                delay.find('div').css('width', width+"%");
            },interval);
            setTimeout(function(){
                me.remove(); 
            },this.$options.delay);
        },
        remove: function(){
            var me = this;
            me.$notify.removeClass(this.$options.showClass).addClass(this.$options.hideClass);
            setTimeout(function(){
                me.$notify.remove();
            },500);
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
    window.Exert.notify = function(type, options) {
        return new ExertNotify(type, options);
    };


    ExertNotify.DEFAULT_OPTIONS = {
        title       : undefined,
        showClass   : 'jumpUp',
        hideClass   : 'zoomOutDown',
        msg         : '',
        img         : null, //This is only for large notifications
        closable    : true,
        delay       : 5000,
        closeOnClick: true,
        width       : 300,
        //This property may also be object with available keys ["left", "top", "right", "bottom"]where value is css value
        position: "bottom right" //values "top left", "top right", "top middle", "bottom left", "bottom right", "bottom middle"
    };

    var LOCALES = window.Exert.locales;
    var TITLE_LOCALES = LOCALES.titles;
    
    var OPTIONS = {
        'class'         : 'exert-animated',
        success: {
            'title'     : TITLE_LOCALES.success,
            'icon'      : 'glyphicon glyphicon-ok-sign'
        },
        error: {
            'title'     : TITLE_LOCALES.error,
            'icon'      : 'glyphicon glyphicon-remove-sign'
        },
        warning: {
            'title'     : TITLE_LOCALES.warning,
            'icon'      : 'glyphicon glyphicon-warning-sign'
        },
        info: {
            'title'     : TITLE_LOCALES.info,
            'icon'      : 'glyphicon glyphicon-info-sign'
        },
        confirm: {
            'title'     : TITLE_LOCALES.success,
            'icon'      : 'glyphicon glyphicon-question-sign'
        },
        offsetLeft      : 10,
        offsetRight     : 10,
        offsetTop       : 10,
        offsetBottom    : 10,
        positions: ["top left", "top right", "top middle", "bottom left", "bottom right", "bottom middle"],
        showAnimations : ['jumpUp'],
        hideAnimations : ['zoomOutDown']
    };
    
})();


