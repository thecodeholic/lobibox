var Lobibox = Lobibox || {};
(function(){
        
    var LobiboxNotify = function(type, options) {
//------------------------------------------------------------------------------
//----------------PROTOTYPE VARIABLES-------------------------------------------
//------------------------------------------------------------------------------
        this.$type;
        this.$options;
        this.$el;
//------------------------------------------------------------------------------
//-----------------PRIVATE VARIABLES--------------------------------------------
//------------------------------------------------------------------------------        
        var me = this;
//------------------------------------------------------------------------------
//-----------------PRIVATE FUNCTIONS--------------------------------------------
//------------------------------------------------------------------------------
        var _processInput = function(options){
            options = $.extend({}, LobiboxNotify.DEFAULT_OPTIONS, options);
            if ( ! options.title){
                options.title = DEFAULTS[me.$type].title;
            }
            if ( ! options.icon){
                options.icon = DEFAULTS[me.$type].icon;
            }
            
            options = _processPosition(options);
            return options;
        };
        var _processPosition = function(options){
            var pos = {};
            if (typeof options.position === 'string'){
                 if (["top left", "top right", "top middle", "bottom left", "bottom right", "bottom middle"].indexOf(options.position) > -1){
                    var s = options.position.split(" ");
                    if (s.length !== 2){
                        throw { name: 'ExertNotifyError', message: "Incorrect position was provided" };
                    }
                    if (s[1] === 'left'){
                        pos.left = DEFAULTS.offsetLeft;
                    }else if (s[1] === 'right'){
                        pos.right = DEFAULTS.offsetRight;
                    }else if (s[1] === 'middle'){
                        pos.left = ($(window).width() - options.width) / 2;
                    }
                    if (s[0] === 'top'){
                        pos.top = DEFAULTS.offsetTop;
                    }else if (s[0] === 'bottom'){
                        pos.bottom =  DEFAULTS.offsetBottom;
                    }
                    options.position = pos;
                }else{
                    throw { name: 'ExertNotifyError', message: "Incorrect position was provided" };
                }
            }
            return options;
        };
        var _init = function(){
            var notify = $('<div class="lobibox-notify"></div>');
            //Add class to notify box
            notify.addClass(DEFAULTS[me.$type]['class']);
            notify.addClass(me.$options.showClass);
            
            if (me.$options.icon){
                var icon = $('<div class="lobibox-notify-icon"><i class="'+me.$options.icon+'"></i></div>');
                notify.append(icon);
            }
            var title = $('<div class="lobibox-notify-title">'+me.$options.title+'<div>');
            var msg = $('<div class="lobibox-notify-msg">'+me.$options.msg+'</div>');
            $('<div></div>')
                    .addClass('lobibox-notify-body')
                    .append(title)
                    .append(msg)
                    .appendTo(notify);
            if (me.$options.width){
                notify.css('width', me.$options.width);
            }
            
            me.$el = notify;
            _addCloseButton();
            _addCloseOnClick();
//            _givePosition();
            _addDelay();
            _appendInWrapper();
            
        };
        var _appendInWrapper = function(){
            var selector = '.lobibox-notify-wrapper';
            var classes = [];
            for (var i in me.$options.position){
                if (me.$options.position.hasOwnProperty(i)){
                    classes.push(i);
                }
            }
            selector += "."+classes[0];
            for (var i = 1; i<classes.length; i++){
                selector +="."+classes[i];
            }
            var wr = $(selector);
            if (wr.length === 0){
                wr = $('<div class="lobibox-notify-wrapper '+classes.join(" ")+'"></div>');
                $('body').append(wr);
            }
            wr.prepend(me.$el);
        };
        var _addCloseButton = function(){
            if ( ! me.$options.closable){
                return;
            }
            var close = $('<span class="lobibox-close">&times;</span>');
            me.$el.append(close);
            close.click(function(ev){
                me.remove();
            });
        };
        var _addCloseOnClick = function(){
            if (me.$options.closeOnClick){
                me.$el.click(function(){
                    me.remove();
                });
            }
        };
        var _givePosition = function(){
            me.$el.css(me.$options.position);
        };
        var _addDelay = function(){
            if ( ! me.$options.delay){
                return;
            }
            var delay = $('<div class="lobibox-delay-indicator"><div></div></div>');
            me.$el.append(delay);
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
            }, me.$options.delay);
        };
//------------------------------------------------------------------------------
//----------------PROTOTYPE FUNCTIONS-------------------------------------------
//------------------------------------------------------------------------------
        this.remove = function(){
            me.$el.removeClass(me.$options.showClass).addClass(me.$options.hideClass);
            setTimeout(function(){
                me.$el.remove();
            }, 500);
        };
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
        this.$type = type;
        this.$options = _processInput(options);
        window.console.log(me);
        _init();
    };
    
    Lobibox.notify = function(type, options){
        if (["info", "warning", "error", "success"].indexOf(type) > -1){
            return new LobiboxNotify(type, options);
        }
    };
    LobiboxNotify.DEFAULT_OPTIONS = {
        title: null,
        showClass: 'jumpUp',
        hideClass: 'zoomOutDown',
        msg: '',
        img: null, //This is only for large notifications
        closable: true,
        delay: false,
        closeOnClick: true,
        width: 400,
        //This property may also be object with available keys ["left", "top", "right", "bottom"]where value is css value
        position: "bottom right" //values "top left", "top right", "top middle", "bottom left", "bottom right", "bottom middle"
    };
    var LOCALES = window.Lobibox.locales;
    var TITLE_LOCALES = LOCALES.titles;
    var DEFAULTS = {
        'class'         : 'lobibox-animated',
        success: {
            'class'     : 'lobibox-notify-success',
            'title'     : TITLE_LOCALES.success,
            'icon'      : 'glyphicon glyphicon-ok-sign'
        },
        error: {
            'class'     : 'lobibox-notify-error',
            'title'     : TITLE_LOCALES.error,
            'icon'      : 'glyphicon glyphicon-remove-sign'
        },
        warning: {
            'class'     : 'lobibox-notify-warning',
            'title'     : TITLE_LOCALES.warning,
            'icon'      : 'glyphicon glyphicon-exclamation-sign'
        },
        info: {
            'class'     : 'lobibox-notify-info',
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
        showAnimations : ['jumpUp'],
        hideAnimations : ['zoomOutDown']
    };

})();


