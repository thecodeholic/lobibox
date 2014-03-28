$(document).ready(function(){
    (function(){
        window.Exert  = window.Exert || {};
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
        
        var popupClasses = {
            error   : 'modal-error',
            success : 'modal-success'
        };
        
        var defaults = {
            modal   : {
                //we need to add this class to div with modal class by default
                class   : 'fade'
            },
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
        var opts = {
            title       : '',           //any string
            titleHtml   : true,         //if this option is set to true header title will show HTML properly
            titleTag    : 'h2',         //any valid html tag
            titleClass  : '',           //any valid css class
            titleAttrs  : {},           //title tag attributes {key1: value1, key2: value2, ... ,keyN: valueN}
            msg         : '',
            closeButton : true,
            closeAction : 'hide',       //options: ['hide', 'destroy']
            buttons     : ['close'],    //array with options ['close', 'ok', 'calcel', 'yes', 'no'] or object with template described in default.button object
            modal       : {
                class   : '',
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
                attrs   : {}
            }
        };
        
        
        var addCloseButton = function(options){
            if (options.closeButton){
                var button = $('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
                header.append(button);
            }
        };
        var addTitle = function(options){
            if (options.title){
                var openTag     = "";
                var closeTag    = "";
                if (options.titleTag){
                    openTag     = '<' + options.titleTag + '>';
                    closeTag    = '</' + options.titleTag + '>';
                }else if (!options.titleTag && (options.titleClass || typeof options.titleAttrs === 'object' && !$.isEmptyObject(options.titleAttrs))){
                    openTag     = '<span>';
                    closeTag    = '</span>';
                }
                if (openTag !== ""){
                    var title = $(openTag + closeTag);
                    if (options.titleClass){
                        title.addClass(options.titleClass);
                    }
                    if (!$.isEmptyObject(options.titleAttrs)){
                        title.attr(options.titleAttrs);
                    }
                    if (options.titleHtml){
                        title.html(options.title);
                    }else{
                        title.text(options.title);
                    }
                    header.append(title);
                }else{
                    if (options.titleHtml){
                        header.html(options.title);
                    }else{
                        window.console.log(options.title);
                        header.text(options.title);
                    }
                }
            }
        };
        var generateHeader = function(options){
            header.empty();
            addCloseButton(options);
            addTitle(options);
            addAttrsAndClasses(options.header.class, options.header.attrs, header);
        };
        var generateFooter = function(options){
            footer.empty();
            generateButtons(options);
        };
        
        var addAttrsAndClasses = function(cl, attrs, object){
            if (cl && typeof cl === 'string'){
                object.addClass(cl);
            }
            if (attrs && typeof attrs === 'object'){
                object.attr(attrs);
            }
            return object;
        };
        
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
            if (buttons && typeof buttons === 'object' && !$.isEmptyObject(buttons)){
                //here i is button type and buttons[i] is options for button
                for (var i in buttons){
                    footer.append(createButton(i, buttons[i]));
                }
            }
            
        };
        
        
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
        window.Exert.error = function(options) {
            generatePopup(options, 'error');
            alert.modal();
        };
        window.Exert.success = function(options) {
            generatePopup(options, 'success');
            alert.modal();
        };
//        alert.on('hidden.bs.modal', function(){
//           console.log("hidden"); 
//        });
    })();
    
    (function(){
        var outerBoxCreated = false;
        var createOuterBox = function(){
            if ($('.exert.notify-outer').length == 0){
                var box = $('<div class="exert notify-outer"></div>');
                $(document.body).append(box);
                box.css({
                   width: '200px',
                   position: 'absolute',
                   backgroundColor: 'lightblue',
                   left: ($(window).width() - 210) + 'px',
                   top: '0px',
                   zIndex: '100'
                });
                
                return box;
            }else{
                return $('div.exert.notify-outer');
            }
        }
        var createNotify = function(type, options){
            window.console.log("ddd");
            var outerBox = createOuterBox();
            var box = $('<div class="notify notify-error"></div>');
            if (options && typeof options === 'object'){
                if (options.msg){
                    box.html(options.msg);
                }
            }
            box.css({
                positions: 'relative'
            });
            outerBox.prepend(box);
            outerBox.css({
                top: ($(window).height() - $(outerBox).height() - 20) + 'px'
            });
        };
        window.Exert.notify = {
            error: function(options){
                createNotify('error', options);
            }
        };
        
        
    })();
});
