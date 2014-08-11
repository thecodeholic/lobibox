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
        options = this._processInput(options);
        this.$options = $.extend({}, ExertNotify.DEFAULT_OPTIONS, options);
        this.$options = this._processInput(this.$options);
        window.console.log(this.$options);
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
            if ( ! options.class){
                options.class = this.$type;
            }
            
            options = this._processPosition(options);
            
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
        _getWrapper: function(){
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
            }
            return wr;
        },
        _init: function(){
            var notify = $('<div class="exert-notify"></div>');
            //Add class to notify box
            notify.addClass(this.$options.class);
            
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
            var wr = this._getWrapper();
            wr.append(notify);
            this.$notify = notify;
            this._givePosition();
            this._addClass();
            
            $('body').append(wr);
        },
        _addClass: function(){
            this.$notify.addClass(this.$options.class);
        },
        _givePosition: function(){
            this.$notify.css(this.$options.position);
        }
        
        //This is small version of notify it just shows title and small message
//        var createNotify = function(type, options){
//            var opts = {}; 
//            //we merge given object to our defaults object
//            $.extend(true, opts, defaults, options);
//            //we create outerBox
//            var outerBox = createOuterBox();
//            //we create message box
//            var box = $('<div class="notify alert"></div>');
//            //if message box type exists, if it's valid string and it has corresponding class in our
//            //types object we add this class
//            if (type && typeof type === 'string' && types[type]){
//                if (types[type]["class"]){
//                    box.addClass(types[type]["class"]);
//                }
//            }
//            //we check if merged object is valid object
//            if (opts && typeof opts === 'object'){
//                //if in parameters we have that this box must be closable we add close button to it
//                if (opts.closable){
//                    box.append('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');
//                }
//                //if inside options parameter we have title we add it
//                if (opts.title){
//                    box.append('<h4>' + opts.title + '</h4>');
//                }
//                //if inside options parameter we have message we add it
//                if (opts.msg){
//                    box.append('<p>' + opts.msg + '</p>');
//                }
//            }
//            //we add created box inside outer box
//            outerBox.prepend(box);
//            //we add close event to box
//            //if all boxes are closed we need to hide outer box
//            //this method does this action
//            addCloseEvent(box);
//            if (opts.closeOnClick){
//                addClickEvent(box);
//            }
//            /*
//             * we show slideDown animation and if delay was provided we hide the message after delay
//             * We hide the message using slideUp and when slideUp is finished we actially remove the element
//             * we check if there are no more elements in outerBox we hide the outer box
//             */
//            box.slideDown(400, function(){
//                if (opts.delay){
//                    setTimeout(function(){
//                       box.slideUp(300, function(){
//                           box.remove();
//                           if (outerBox.children().length === 0){
//                               outerBox.hide();
//                           }
//                       }); 
//                       
//                    }, opts.delay);
//                }
//            });
//            
//            showOuterBox(outerBox);
//        };
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
        title       : false,
        msg         : '',
        img         : null, //This is only for large notifications
        closable    : true,
        delay       : 5000,
        closeOnClick: false,
        width       : 300,
        //This property may also be object with available keys ["left", "top", "right", "bottom"]where value is css value
        position: "bottom right" //values "top left", "top right", "top middle", "bottom left", "bottom right", "bottom middle"
    };

    var LOCALES = window.Exert.locales;
    var TITLE_LOCALES = LOCALES.titles;
    
    var OPTIONS = {
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
        positions: ["top left", "top right", "top middle", "bottom left", "bottom right", "bottom middle"]
    };
    
})();


