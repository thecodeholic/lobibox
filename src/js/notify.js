/**
 * Author     : @arboshiki
 */
/**
 * Generates random string of n length. 
 * String contains only letters and numbers
 * 
 * @param {int} n
 * @returns {String}
 */
Math.randomString = function(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};
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
            // Create notification
            var notify = _createNotify();
            var wrapper = _createNotifyWrapper();
            _appendInWrapper(notify, wrapper);
            
            me.$el = notify;
            var snd = new Audio(me.$options.sound); // buffers automatically when created
            snd.play();
        };
        var _appendInWrapper = function($el, $wrapper){
            if (me.$options.size === 'normal'){
                $wrapper.append($el);
            }else if (me.$options.size === 'large'){
                var tabPane = _createTabPane();
                tabPane.append($el);
                var tabControl = _createTabControl(tabPane.attr('id'));
                $wrapper.find('.tab-content').append(tabPane);
                $wrapper.find('.nav-tabs').append(tabControl);
                tabControl.find('>a').tab('show');
            }
        };
        var _createTabControl = function(tabPaneId){
            var $li = $('<li></li>');
            $('<a href="#'+tabPaneId+'"></a>')
                    .attr('data-toggle', 'tab')
                    .attr('role', 'tab')
                    .append('<i class="' + me.$options.icon + '"></i>')
                    .appendTo($li);
            return $li;
        };
        var _createTabPane = function(){
            var $pane = $('<div></div>')
                    .addClass('tab-pane')
                    .attr('id', Math.randomString(10));
            return $pane;
        };
        var _createNotifyWrapper = function(size){
            
            var selector;
            if (me.$options.size === 'large'){
                selector = '.lobibox-notify-wrapper-large';
            }else if (me.$options.size === 'normal'){
                selector = '.lobibox-notify-wrapper';
            }
            
            var classes = me.$options.position.split(" ");
            selector += "."+classes.join('.');
            window.console.log(selector);
            var wrapper = $(selector);
            window.console.log(selector.replace(/\./g, ' ').trim());
            if (wrapper.length === 0){
                wrapper = $('<div></div>')
                        .addClass(selector.replace(/\./g, ' ').trim())
                        .appendTo($('body'));
                if (me.$options.size === 'large'){
                    wrapper.append($('<ul class="nav nav-tabs"></ul>'))
                            .append($('<div class="tab-content"></div>'));
                }
            }
            return wrapper;
        };
        var _createNotify = function(){
            var notify = $('<div class="lobibox-notify"></div>')
            // Add color class
                    .addClass(DEFAULTS[me.$type]['class'])
            // Add default animation class
                    .addClass(DEFAULTS['class'])
            // Add specific animation class
                    .addClass(me.$options.showClass);
            
            // Create icon wrapper class
            var iconWrapper = $('<div class="lobibox-notify-icon"></div>').appendTo(notify);

            // Add image or icon depending on given parameters
            if (me.$options.img) {
                var img = iconWrapper.append('<img src="' + me.$options.img + '"/>');
                iconWrapper.append(img);
            } else if (me.$options.icon) {
                var icon = iconWrapper.append('<i class="' + me.$options.icon + '"></i>');
                iconWrapper.append(icon);
            }
            // Create body, append title and message in body and append body in notification
            $('<div></div>')
                    .addClass('lobibox-notify-body')
                    .append('<div class="lobibox-notify-title">' + me.$options.title + '<div>')
                    .append('<div class="lobibox-notify-msg">' + me.$options.msg + '</div>')
                    .appendTo(notify);
            
            _addCloseButton(notify);
            if (me.$options.size === 'normal'){
                _addCloseOnClick(notify);
                _addDelay(notify);
            }
            
            // Give width to notification
            if (me.$options.width){
                notify.css('width', me.$options.width);
            }
            
            return notify;
        };
        var _addCloseButton = function($el){
            if ( ! me.$options.closable){
                return;
            }
            var close = $('<span class="lobibox-close">&times;</span>');
            $el.append(close);
            close.click(function(ev){
                me.remove();
            });
        };
        var _addCloseOnClick = function($el){
            if ( ! me.$options.closeOnClick){
                return;
            }
            $el.click(function(){
                me.remove();
            });
        };
        var _addDelay = function($el){
            if ( ! me.$options.delay){
                return;
            }
            if (me.$options.delayIndicator){
                var delay = $('<div class="lobibox-delay-indicator"><div></div></div>');
                $el.append(delay);
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
                if (me.$options.size === 'normal'){
                    me.$el.remove();
                }else if (me.$options.size === 'large'){
                    var parent = me.$el.parent();
                    var wrapper = parent.closest('.lobibox-notify-wrapper-large');
                    
                    var href = '#'+parent.attr('id');
                    wrapper.find('>.nav-tabs>li:has(a[href="'+href+'"])').remove();
                    parent.remove();
                    
                }
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
        size: 'normal', //normal, mini, large
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


