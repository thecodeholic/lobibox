//Author      : @arboshiki
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
            
            if (options.size === 'mini' || options.size === 'large'){
                options.width = options.width || Lobibox.notify.OPTIONS[options.size].width;
            }
            options = $.extend({}, Lobibox.notify.OPTIONS[me.$type], Lobibox.notify.DEFAULTS, options);
            
            
            if (options.size !== 'mini' && options.title === true){
                options.title = Lobibox.notify.OPTIONS[me.$type].title;
            }else if (options.size === 'mini' && options.title === true){
                options.title = false;
            }
            if (options.icon === true){
                options.icon = Lobibox.notify.OPTIONS[me.$type].icon;
            }
            if (options.sound === true){
                options.sound = Lobibox.notify.OPTIONS[me.$type].sound;
            }
            if (options.sound){
                options.sound = options.soundPath + options.sound + options.soundExt;
            }
            
            return options;
        };
        var _init = function(){
            // Create notification
            var notify = _createNotify();
            var wrapper = _createNotifyWrapper();
            _appendInWrapper(notify, wrapper);
            
            me.$el = notify;
            if (me.$options.sound){
                var snd = new Audio(me.$options.sound); // buffers automatically when created
                snd.play();
            }
            me.$el.data('lobibox', me);
        };
        var _appendInWrapper = function($el, $wrapper){
            if (me.$options.size === 'normal'){
                $wrapper.append($el);
            }else if (me.$options.size === 'mini'){
                $el.addClass('notify-mini');
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
                    .append('<i class="tab-control-icon ' + me.$options.icon + '"></i>')
                    .appendTo($li);
            $li.addClass(Lobibox.notify.OPTIONS[me.$type]['class']);
            return $li;
        };
        var _createTabPane = function(){
            var $pane = $('<div></div>')
                    .addClass('tab-pane')
                    .attr('id', Math.randomString(10));
            return $pane;
        };
        var _createNotifyWrapper = function(){
            var selector;
            if (me.$options.size === 'large'){
                selector = '.lobibox-notify-wrapper-large';
            }else{
                selector = '.lobibox-notify-wrapper';
            }
            
            var classes = me.$options.position.split(" ");
            selector += "."+classes.join('.');
            var wrapper = $(selector);
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
                    .addClass(Lobibox.notify.OPTIONS[me.$type]['class'])
            // Add default animation class
                    .addClass(Lobibox.notify.OPTIONS['class'])
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
            }else{
                notify.addClass('without-icon');
            }
            // Create body, append title and message in body and append body in notification
            var $body = $('<div></div>')
                    .addClass('lobibox-notify-body')
                    .append('<div class="lobibox-notify-msg">' + me.$options.msg + '</div>')
                    .appendTo(notify);
            if (me.$options.title){
                $body.prepend('<div class="lobibox-notify-title">' + me.$options.title + '<div>');
            }
            _addCloseButton(notify);
            if (me.$options.size === 'normal' || me.$options.size === 'mini'){
                _addCloseOnClick(notify);
                _addDelay(notify);
            }
            
            // Give width to notification
            if (me.$options.width){
                notify.css('width', _calculateWidth(me.$options.width));
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
        var _findTabToActivate = function($li){
            var $itemToActivate = $li.prev();
            if ($itemToActivate.length === 0){
                $itemToActivate = $li.next();
            }
            if ($itemToActivate.length === 0){
                return null;
            }
            return $itemToActivate.find('>a');
        };
        var _calculateWidth = function(width){
            width = Math.min($(window).outerWidth(), width);
            return width;
        };
//------------------------------------------------------------------------------
//----------------PROTOTYPE FUNCTIONS-------------------------------------------
//------------------------------------------------------------------------------
        /**
         * Delete the notification
         * 
         * @returns {Instance}
         */
        this.remove = function(){
            me.$el.removeClass(me.$options.showClass)
                    .addClass(me.$options.hideClass);
            var parent = me.$el.parent();
            var wrapper = parent.closest('.lobibox-notify-wrapper-large');

            var href = '#' + parent.attr('id');

            var $li = wrapper.find('>.nav-tabs>li:has(a[href="' + href + '"])');
            $li.addClass(Lobibox.notify.OPTIONS['class'])
                    .addClass(me.$options.hideClass);
            setTimeout(function(){
                if (me.$options.size === 'normal' || me.$options.size === 'mini'){
                    me.$el.remove();
                }else if (me.$options.size === 'large'){
                    
                    var $itemToActivate = _findTabToActivate($li);
                    if ($itemToActivate){
                        $itemToActivate.tab('show');
                    }
                    $li.remove();
                    parent.remove();
                }
            }, 500);
            return me;
        };
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
        this.$type = type;
        this.$options = _processInput(options);
//        window.console.log(me);
        _init();
    };
    
    Lobibox.notify = function(type, options){
        if (["info", "warning", "error", "success"].indexOf(type) > -1){
            return new LobiboxNotify(type, options);
        }
    };
    //User can set default options to this variable
    Lobibox.notify.DEFAULTS = {
        title: true,                // Title of notification. If you do not include the title in options it will automatically takes its value 
        //from Lobibox.notify.OPTIONS object depending of the type of the notifications or set custom string. Set this false to disable title
        size: 'normal',             // normal, mini, large
        soundPath: 'src/sounds/',   // The folder path where sounds are located
        soundExt: '.ogg',           // Default extension for all sounds
        showClass: 'zoomIn',        // Show animation class.
        hideClass: 'zoomOut',       // Hide animation class.
        icon: true,                 // Icon of notification. Leave as is for default icon or set custom string
        msg: '',                    // Message of notification
        img: null,                  // Image source string
        closable: true,             // Make notifications closable
        delay: 5000,                // Hide notification after this time (in miliseconds)
        delayIndicator: true,       // Show timer indicator
        closeOnClick: true,         // Close notifications by clicking on them
        width: 400,                 // Width of notification box
        sound: true,                // Sound of notification. Set this false to disable sound. Leave as is for default sound or set custom soud path
        position: "bottom right"    // Place to show notification. Available options: "top left", "top right", "bottom left", "bottom right"
    };
    //This variable is necessary.
    Lobibox.notify.OPTIONS = {
        'class': 'animated-fast',
        large: {
            width: 500
        },
        mini: {
            'class': 'notify-mini'
        },
        success: {
            'class': 'lobibox-notify-success',
            'title': 'Success',
            'icon': 'glyphicon glyphicon-ok-sign',
            sound: 'sound2'
        },
        error: {
            'class': 'lobibox-notify-error',
            'title': 'Error',
            'icon': 'glyphicon glyphicon-remove-sign',
            sound: 'sound4'
        },
        warning: {
            'class': 'lobibox-notify-warning',
            'title': 'Warning',
            'icon': 'glyphicon glyphicon-exclamation-sign',
            sound: 'sound5'
        },
        info: {
            'class': 'lobibox-notify-info',
            'title': 'Information',
            'icon': 'glyphicon glyphicon-info-sign',
            sound: 'sound6'
        }
    };
})();


