var Lobibox = Lobibox || {};
(function(){
        
    var LobiboxNotify = function(type, options) {
//------------------------------------------------------------------------------
//----------------PROTOTYPE VARIABLES-------------------------------------------
//------------------------------------------------------------------------------
        this.$type;
        this.$options;
        this.$el;
        this.$sound;
//------------------------------------------------------------------------------
//-----------------PRIVATE VARIABLES--------------------------------------------
//------------------------------------------------------------------------------        
        var me = this;
//------------------------------------------------------------------------------
//-----------------PRIVATE FUNCTIONS--------------------------------------------
//------------------------------------------------------------------------------
        var _processInput = function(options){
            options = $.extend({}, LobiboxNotify.DEFAULT_OPTIONS, options);
            $.extend(true, DEFAULTS, PRIVATE_OPTIONS, Lobibox.notify.DEFAULT_OPTIONS);
            
            if ( ! options.title){
                options.title = DEFAULTS[me.$type].title;
            }
            if ( ! options.icon){
                options.icon = DEFAULTS[me.$type].icon;
            }
            if ( ! options.sound){
                options.sound = DEFAULTS[me.$type].sound;
            }
            return options;
        };
        var _init = function(){
            
            var notify = _createNotify();
            var iconWrapper = $('<div class="lobibox-notify-icon"></div>').appendTo(notify);
            
            if (me.$options.img){
                var img = iconWrapper.append('<img src="'+me.$options.img+'"/>');
                iconWrapper.append(img);
            }else if (me.$options.icon){
                var icon = iconWrapper.append('<i class="'+me.$options.icon+'"></i>');
                iconWrapper.append(icon);
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
            _addDelay();
            _appendInWrapper();
            var snd = new Audio(me.$options.sound); // buffers automatically when created
            snd.play();
        };
        var _createNotify = function(){
            var notify = $('<div class="lobibox-notify"></div>');
            //Add class to notify box
            notify.addClass(DEFAULTS[me.$type]['class']);
            notify.addClass(DEFAULTS['class']);
            notify.addClass(me.$options.showClass);
            return notify;
        };
        var _appendInWrapper = function(){
            var selector = '.lobibox-notify-wrapper';
            var classes = me.$options.position.split(" ");
            selector += "."+classes.join('.');
            var wr = $(selector);
            if (wr.length === 0){
                wr = $('<div class="lobibox-notify-wrapper '+me.$options.position+'"></div>');
                $('body').append(wr);
            }
            wr.css(me.$options.position);
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
            if ( ! me.$options.closeOnClick){
                return;
            }
            me.$el.click(function(){
                me.remove();
            });
        };
        var _addDelay = function(){
            if ( ! me.$options.delay){
                return;
            }
            if (me.$options.delayIndicator){
                var delay = $('<div class="lobibox-delay-indicator"><div></div></div>');
                me.$el.append(delay);
            }
            var time = 0;
            var interval = 1000/30;
            var timer = setInterval(function(){
                time += interval;
                var width = 100 * time / me.$options.delay;
                if (width >= 100){
                    width = 100;
                    me.remove();
                    timer = clearInterval(timer);
                }
                if (me.$options.delayIndicator){
                    delay.find('div').css('width', width+"%");
                }
               
            }, interval);
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
        showClass: 'flipInX',
        hideClass: 'zoomOutDown',
        msg: '',
        img: null, //This is only for large notifications
        closable: true,
        delay: 5000,
        delayIndicator: true,
        closeOnClick: true,
        width: 400,
        sound: null,
        position: "bottom right" //values "top left", "top right", "bottom left", "bottom right"
    };
    //User can set default options to this variable
    Lobibox.notify.DEFAULT_OPTIONS = {};
    var LOCALES = window.Lobibox.locales;
    var TITLE_LOCALES = LOCALES.titles;
    //This variable is necessary.
    var PRIVATE_OPTIONS = {
        'class': 'lobibox-animated',
        success: {
            'class': 'lobibox-notify-success',
            'title': TITLE_LOCALES.success,
            'icon': 'glyphicon glyphicon-ok-sign',
            sound: 'sounds/sound2.wav'
        },
        error: {
            'class': 'lobibox-notify-error',
            'title': TITLE_LOCALES.error,
            'icon': 'glyphicon glyphicon-remove-sign',
            sound: 'sounds/sound4.wav'
        },
        warning: {
            'class': 'lobibox-notify-warning',
            'title': TITLE_LOCALES.warning,
            'icon': 'glyphicon glyphicon-exclamation-sign',
            sound: 'sounds/sound5.mp3'
        },
        info: {
            'class': 'lobibox-notify-info',
            'title': TITLE_LOCALES.info,
            'icon': 'glyphicon glyphicon-info-sign',
            sound: 'sounds/sound6.wav'
        }
    };
    var DEFAULTS = $.extend({}, PRIVATE_OPTIONS);
})();


