/**
 * This function checks if string equals (char by char) any of given parameters
 * 
 * @returns {Boolean}
 */
String.prototype.equals = function() {
    if (arguments.length === 0)
        return false;
    for (var i = arguments.length - 1; i >= 0; i--) {
        if (arguments[i].toString() === this.valueOf()) {
            return true;
            break;
        }
    }
};

$(document).ready(function(){
    
    (function() {
        /**
         * Appends jQuery element with text node, with given text
         * 
         * @param {string} text
         * @returns {voic}
         */
        $.fn.appendText = function(text) {
            return this.each(function() {
                var textNode = document.createTextNode(text);
                $(this).append(textNode);
            });
        };
    })();
    
    (function(){
        //create exert object
        window.Exert  = window.Exert || {};
        //We create all necessary div-s and put in each other as it's required
        var alert   = $('<div class="modal exert" role="dialog"></div>');
        var dialog  = $('<div class="modal-dialog"></div>');
        var content = $('<div class="modal-content"></div>');
        var header  = $('<div class="modal-header"></div>');
        var body    = $('<div class="modal-body"></div>');
        var footer  = $('<div class="modal-footer"></div>');
        content.append(header);
        content.append(body);
        content.append(footer);
        dialog.append(content);
        alert.append(dialog);
        
        //This variable contains hash table where key is message type and value is css class
        var popupClasses = {
            error   : 'modal-error',
            success : 'modal-success',
            info    : 'modal-info',
            warning : 'modal-warning'
        };
        //This object contains all default values for Exert message boxes
        var defaults = {
            buttons : {
                close   : {
                    class   : 'btn btn-default',
                    attrs   : {},
                    text    : 'Close'
                },
                ok      : {
                    class   : 'btn btn-primary',
                    attrs   : {},
                    text    : 'Ok'
                },
                cancel  : {
                    class   : 'btn btn-danger',
                    attrs   : {},
                    text    : 'Cancel'
                },
                yes  : {
                    class   : 'btn btn-success',
                    attrs   : {},
                    text    : 'Yes'
                },
                no  : {
                    class   : 'btn btn-default',
                    attrs   : {},
                    text    : 'No'
                }
            }
        };
        //This object is almost the same as "defaults".
        // it contains the structure of options object which is given to function Exert.error or Exert.success
        var opts = {
            title: {
                text    : '',               //any string
                html    : true,             //if this option is set to true header title will show as HTML
                tag     : '',               //any valid html tag. Most likely you need to set only headings. h1,h2,h3,h4,h5,h6
                class   : '',               //any valid css class
                attrs   : {}                //title tag attributes {key1: value1, key2: value2, ... ,keyN: valueN}
            },
            msg         : '',
            closeButton : true,
            closeAction : 'hide',       //options: ['hide', 'destroy']
            buttons     : ['close'],    //array with options ['close', 'ok', 'calcel', 'yes', 'no'] or object with template described in default.button object
            //modal corresponds to alert object
            modal       : {
                class   : 'fade',
                attrs   : {}
            },
            dialog      : {
                class   : '',
                attrs   : {}
            },
            content     : {
                class   : '',
                attrs   : {}
            },
            header      : {
                class   : '',
                attrs   : {}
            },
            body        : {
                class   : '',
                attrs   : {}
            },
            footer      : {
                class   : '',
                attrs   : {},
                buttonsAlign: 'right',           //we have three options 'right', 'center', 'left'
                //The buttons object contain button types which can be give as parameter
//                buttons: {
//                    close: {
//                        class: 'btn btn-default',
//                        attrs: {},
//                        text: 'Close'
//                    },
//                    ok: {
//                        class: 'btn btn-primary',
//                        attrs: {},
//                        text: 'Ok'
//                    },
//                    cancel: {
//                        class: 'btn btn-danger',
//                        attrs: {},
//                        text: 'Cancel'
//                    },
//                    yes: {
//                        class: 'btn btn-success',
//                        attrs: {},
//                        text: 'Yes'
//                    },
//                    no: {
//                        class: 'btn btn-default',
//                        attrs: {},
//                        text: 'No'
//                    }
//                }
            }
        };
        
        /**
         * This method adds close button to modal if it was enabled
         * 
         * @param {DomElement}  el      element which will be appended
         */
        var addCloseButton = function(el){
            el.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
        };
        /*
         * This method adds title to modal with corresponding tags, classes and attributes
         * If class or attributes was given but tag was not given the title text is surrounded by <span></span> tags
         */
        var addTitle = function(title, el){
            if (title.text){
                var openTag = "";
                var closeTag = "";
                if (title.tag){
                    openTag = '<' + title.tag + '>';
                    closeTag = '</' + title.tag + '>';
                }else if (!title.tag && (title.class || typeof title.attrs === 'object' && !$.isEmptyObject(title.attrs))){
                    openTag     = '<span>';
                    closeTag    = '</span>';
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
                    el.append(text);
                } else {
                    if (title.html) {
                        el.html(title.text);
                    } else {
                        el.text(title.text);
                    }
                }
            }
//            if (options.title){
//                var openTag     = "";
//                var closeTag    = "";
//                if (options.titleTag){
//                    openTag     = '<' + options.titleTag + '>';
//                    closeTag    = '</' + options.titleTag + '>';
//                }else if (!options.titleTag && (options.titleClass || typeof options.titleAttrs === 'object' && !$.isEmptyObject(options.titleAttrs))){
//                    openTag     = '<span>';
//                    closeTag    = '</span>';
//                }
//                if (openTag !== ""){
//                    var title = $(openTag + closeTag);
//                    if (options.titleClass){
//                        title.addClass(options.titleClass);
//                    }
//                    if (!$.isEmptyObject(options.titleAttrs)){
//                        title.attr(options.titleAttrs);
//                    }
//                    if (options.titleHtml){
//                        title.html(options.title);
//                    }else{
//                        title.text(options.title);
//                    }
//                    header.append(title);
//                }else{
//                    if (options.titleHtml){
//                        header.html(options.title);
//                    }else{
//                        header.text(options.title);
//                    }
//                }
//            }
        };
        /*
         * This method generates modal header
         */
        var generateHeader = function(options){
            header.empty();
            if (options.closeButton){
                addCloseButton(header);
            }
            addTitle(options.title, header);
            addAttrsAndClasses(options.header.class, options.header.attrs, header);
        };
        /**
         * This method generates modal footer
         */
        var generateFooter = function(options){
            footer.empty();
            if (options.footer.buttonsAlign.equals('left', 'right', 'center')){
                footer.addClass('text-'+options.footer.buttonsAlign);
            }
            var buts = generateButtons(options);
            footer.append(buts);
        };
        
        /**
         * This method adds attribut(es) and class(es) tojQuery object 
         */
        var addAttrsAndClasses = function(cl, attrs, object){
            if (cl && typeof cl === 'string'){
                object.addClass(cl);
            }
            if (attrs && typeof attrs === 'object'){
                object.attr(attrs);
            }
            return object;
        };
        /**
         * This method generates footer buttons with possible classes, attributes and callback method
         * 
         * @param {object}      options 
         * @return {array}                  array of buttons which we need to add in footer
         */
        var generateButtons = function(options){
            var opts = options;
            var createButton = function(type, options){
                var b = $('<button></button>');
                if (type === 'close'){
                    b.attr('data-dismiss', 'modal');
                }
                if (opts.callback && typeof opts.callback === 'function'){
                    b.on('click', function(e){
                        opts.callback(e, type);
                    });
                }
                b.html(options.text);
                return addAttrsAndClasses(options.class, options.attrs, b);
            };
            
            var buttons = options.buttons;
            //if buttons is array iterate in it and create object according to default values
            if (buttons.length !== undefined && buttons.length >=0){
                var buts = {};
                for (var i = 0; i<buttons.length; i++){
                    buts[buttons[i]] = defaults.buttons[buttons[i]];
                }
                buttons = buts;
            }
            var returnButtons = [];
            if (buttons && typeof buttons === 'object' && !$.isEmptyObject(buttons)){
                //here i is button type and buttons[i] is options for button
                for (var i in buttons){
                    returnButtons.push(createButton(i, buttons[i]));
//                    footer.append(createButton(i, buttons[i]));
                }
            }
            return returnButtons;
            
        };
        
        /*
         * This is general method which merges given object to opts object, makes some validation
         * adds general class to alert object and makes calls to smaller methods.
         * It also puts the message in body
         */
        var generatePopup = function(options, type){

            var optss = {};
            
            $.extend(true, optss, opts, options);
            
            if (typeof options.buttons === 'object' && !$.isEmptyObject(options.buttons)){
//                var buts = {};
                for (var i in options.buttons){
                    $.extend(true, optss.buttons[i], defaults.buttons[i], options.buttons[i]);
                }
                
            }
            
            if (!optss || typeof optss !== 'object')
                return;
            //remove any alert type classes (such as "error", "success") from alert 
            for (var i in popupClasses){
                alert.removeClass(popupClasses[i]);
            }
            //add corresponding class(es) to type
            alert.addClass(popupClasses[type]);
            
            //add attributes and class(es) to alert. If they were not given default class(es) and attributes will be used
            if (optss.modal && typeof optss.modal === 'object' && !$.isEmptyObject(optss.modal)){
                var cl = optss.modal.class;
                if (cl === "")
                    cl = defaults.modal.class;
                addAttrsAndClasses(cl, optss.modal.attrs, alert);
            }
            
            generateHeader(optss);
            generateFooter(optss);
            if (optss.msg){
                body.html(optss.msg);
            }
            
            alert.on('hidden.bs.modal', function(){
                if (options.closeAction === 'destroy'){
                    alert.remove();
                }
            });
            
            $(document.body).append(alert);
            
        };
        /*
         * This method shows error message with give options
         * 
         * @param Object options
         * @returns void
         */
        window.Exert.error = function(options) {
            generatePopup(options, 'error');
            alert.modal();
        };
        /*
         * This method shows success message with give options
         * @param Object options
         * @returns void
         */
        window.Exert.success = function(options) {
            generatePopup(options, 'success');
            alert.modal();
        };
//        alert.on('hidden.bs.modal', function(){
//           console.log("hidden"); 
//        });
    })();
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

    (function(){
        //we create notify object if it does not exist
        window.Exert.notify = window.Exert.notify || {};
        //This object contains defaults for notify box
        var defaults = {
            title       : '',
            msg         : '',
            imgUrl      : null, //This is only for large notifications
            closable    : true,
            delay       : 5000,
            closeOnClick: false
        };
        //This object is hash map for notify boxes where key is message type and value is object which contains
        //class and icon for notify box
        var types = {
            'error'     : {
                class   : 'alert-danger',
                icon    : 'glyphicon glyphicon-remove'
            },
            'success'   : {
                class   : 'alert-success',
                icon    : 'glyphicon glyphicon-ok'
            },
            'warning'   : {
                class   : 'alert-warning',
                icon    : 'glyphicon glyphicon-warning-sign'
            },
            'info'      : {
                class   : 'alert-info',
                icon    : 'glyphicon glyphicon-info-sign'
            }
        };
        /*
         * We have two types of notification boxes: mini and large
         */
        //This object is for outer container for mini notification boxes
        //This object is global object and can be set from anywhere before calling Exert.notify.message function
        window.Exert.notify.outerBox = {
            width: 300,
            left: 10, //offset from left when showing outer box
            right: 10, //offset from right when showing outer box
            top: 10,   //offset from top when showing outer box
            bottom: 10, //offset from bottom when showing outer box
            position: "bottom right" //values "top left", "top right", "top middle", "bottom left", "bottom right", "bottom middle"
        };
        //This object is for outer container for large notification boxes
        //This object is global object and can be set from anywhere before calling Exert.notify.message function
        window.Exert.notify.outerBoxLarge = {
            width: 400,
            left: 10, //offset from left when showing outer box
            right: 10, //offset from right when showing outer box
            top: 10,   //offset from top when showing outer box
            bottom: 10, //offset from bottom when showing outer box
            position: "bottom middle" //values "top left", "top right", "top middle", "bottom left", "bottom right", "bottom middle"
        };
        
        /*
         * This method creates outer box for mini alerts
         * If this outer box exists, returns it.
         * @returns void
         */
        var createOuterBox = function(){
            if ($('.exert.notify-outer').length === 0){
                var box = $('<div class="exert notify-outer"></div>');
                $(document.body).append(box);
                return box;
            }else{
                return $('div.exert.notify-outer').show();
            }
        };
        
        /*
         * This method creates outer box (Tab panel)  with tabs container and content container for large alerts
         * If this outer box already exists then returns it
         * @returns void
         */
        var createOuterBoxLarge = function(){
            if ($('.exert.notify-outer-lg').length === 0){
                var box = $('<div class="exert notify-outer-lg" data-count="0"></div>');
                $(document.body).append(box);
                var tabs = $('<ul class="nav nav-tabs"></ul>');
                var content = $('<div class="tab-content"></div>');
                box.append(tabs);
                box.append(content);
                return box;
            }else{
                return $('div.exert.notify-outer-lg').show();
            }
        };
        
        /*
         * This method calculates left and top where to show outer box and positions it.
         * It also sets the box width
         */
        var showOuterBox = function(box){
            var a = window.Exert.notify.outerBox.position.split(" ");
            box.css('width', window.Exert.notify.outerBox.width + 'px' );
            box.css(a[0], window.Exert.notify.outerBox[a[0]] + 'px');
            if (a[1] === 'middle'){
                var left = ($(window).width() - $(box).width()) / 2;
                box.css("left", left);
            }else{
                box.css(a[1], window.Exert.notify.outerBox[a[1]] + 'px');
            }
        };
        
        /*
         * This method calculates left and top where to show outer box and positions it.
         * It also sets the box width
         */
        var showOuterBoxLarge = function(box){
            var a = window.Exert.notify.outerBoxLarge.position.split(" ");
            box.css('width', window.Exert.notify.outerBoxLarge.width + 'px' );
            box.css(a[0], window.Exert.notify.outerBoxLarge[a[0]] + 'px');
            if (a[1] === 'middle'){
                var left = ($(window).width() - $(box).width()) / 2;
                box.css("left", left);
            }else{
                box.css(a[1], window.Exert.notify.outerBoxLarge[a[1]] + 'px');
            }
        };
        /*
         * This function adds close event to notification box and if every box is closed it hides the outer box
         * For mini boxes
         */
        var addCloseEvent = function(box){
            box.bind('closed.bs.alert', function (ev,a) {
                var parent = $(ev.target).closest('.notify-outer');
                if (parent.children().length === 1){
                    parent.hide();
                }
            });
        };
        /*
         * This function adds click event to notification box and removes the notification box on click
         * It also checks if every box was removed, it hides the outer box
         * For mini boxes
         */
        var addClickEvent = function(box){
            box.css('cursor', 'pointer');
            box.on('click', function(ev){
                var parent = $(this).closest('.notify-outer');
                $(this).hide(200, function(){
                    $(this).remove();
                    if (parent.children().length === 0) {
                        parent.hide();
                    }
                });
            });
        };
        
        /*
         * 
         * @param String type repsresents what type od message is this: "error", "info", "success" or "warning"
         * @param Object options
         * @returns void
         */
        var createLargeNotify = function(type, options){
            var opts = {};
            //we merge given object to our defaults object
            $.extend(true, opts, defaults, options);
            //we create outerBox
            var outerBox = createOuterBoxLarge();
            //we create message box
            var box = $('<div class="row tab-pane alert"></div>');
            //the index refers how many children does this tab have
            var count = parseInt(outerBox.data('count'),10)+1;
            var id = 'tabPane' + count;
            box.attr('id', id);
            outerBox.data('count', count);
            var tab = '';
            //we check if merged object is valid object
            if (opts && typeof opts === 'object') {
                var content = $('<div class="notify-content col-xs-9"></div>');
                //if inside options parameter we have title we add it
                tab = $('<li><a href="#' + id + '" data-toggle="tab" class="alert"></a></li>');
                if (opts.title) {
                    content.append('<h4>' + opts.title + '</h4>');
                }
                //if inside options parameter we have message we add it
                if (opts.msg) {
                    content.append('<p>' + opts.msg + '</p>');
                }
                if (opts.imgUrl && typeof opts.imgUrl === 'string'){
                    var img = $('<div class="notify-image col-xs-3"><img src="' + opts.imgUrl + '"/></div>');
                }
                if (img){
                    box.append(img);
                }
                box.append(content);
            }
            //in this variable we save icon content which we need to put in alert;
            var icon = "";
            //if message box type exists, if it's valid string and it has corresponding class in our
            //types object we add this class
            if (type && typeof type === 'string' && types[type]) {
                if (types[type].class) {
                    box.addClass(types[type].class);
                    tab.find('a').addClass(types[type].class);
                }
                if (types[type].icon && typeof types[type].icon === 'string') {
//                    icon += '<div class="icon-notify col-xs-1">';
                    icon += '<span class="' + types[type].icon + '"></span>';
//                    icon += '</div>';
                    tab.find('a').append(icon);
                }
            }
            
            //we add created box inside outer box
            outerBox.find('ul').append(tab);
            outerBox.find('ul>li.active').removeClass('active');
            tab.addClass('active');
            outerBox.find('.tab-content').append(box);
            outerBox.find('.tab-content>.tab-pane.active').removeClass('active');
            box.addClass('active');
            //we add close event to box
            //if all boxes are closed we need to hide outer box
            //this method does this action
//            addCloseEvent(box);
//            if (opts.closeOnClick) {
//                addClickEvent(box);
//            }
            /*
             * we show slideDown animation and if delay was provided we hide the message after delay
             * We hide the message using slideUp and when slideUp is finished we actially remove the element
             * we check if there are no more elements in outerBox we hide the outer box
             */
//            box.slideDown(400, function() {
//                if (opts.delay) {
//                    setTimeout(function() {
//                        box.slideUp(300, function() {
//                            box.remove();
//                            if (outerBox.children().length === 0) {
//                                outerBox.hide();
//                            }
//                        });
//
//                    }, opts.delay);
//                }
//            });

            showOuterBoxLarge(outerBox);
        };
        
        //This is small version of notify it just shows title and small message
        var createNotify = function(type, options){
            var opts = {}; 
            //we merge given object to our defaults object
            $.extend(true, opts, defaults, options);
            //we create outerBox
            var outerBox = createOuterBox();
            //we create message box
            var box = $('<div class="notify alert"></div>');
            //if message box type exists, if it's valid string and it has corresponding class in our
            //types object we add this class
            if (type && typeof type === 'string' && types[type]){
                if (types[type].class){
                    box.addClass(types[type].class);
                }
            }
            //we check if merged object is valid object
            if (opts && typeof opts === 'object'){
                //if in parameters we have that this box must be closable we add close button to it
                if (opts.closable){
                    box.append('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');
                }
                //if inside options parameter we have title we add it
                if (opts.title){
                    box.append('<h4>' + opts.title + '</h4>');
                }
                //if inside options parameter we have message we add it
                if (opts.msg){
                    box.append('<p>' + opts.msg + '</p>');
                }
            }
            //we add created box inside outer box
            outerBox.prepend(box);
            //we add close event to box
            //if all boxes are closed we need to hide outer box
            //this method does this action
            addCloseEvent(box);
            if (opts.closeOnClick){
                addClickEvent(box);
            }
            /*
             * we show slideDown animation and if delay was provided we hide the message after delay
             * We hide the message using slideUp and when slideUp is finished we actially remove the element
             * we check if there are no more elements in outerBox we hide the outer box
             */
            box.slideDown(400, function(){
                if (opts.delay){
                    setTimeout(function(){
                       box.slideUp(300, function(){
                           box.remove();
                           if (outerBox.children().length === 0){
                               outerBox.hide();
                           }
                       }); 
                       
                    }, opts.delay);
                }
            });
            
            showOuterBox(outerBox);
        };
        
        window.Exert.notify.message = function(size, messageType, options){
            if (size === 'mini'){
                createNotify(messageType, options);
            }else if (size === 'large'){
                createLargeNotify(messageType, options);
            }
        };
        
        
    })();
});
