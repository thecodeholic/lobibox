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
                class   : 'fade'
            },
            buttons : {
                close   : {
                    class   : 'btn btn-default',
                    attrs   : {},
                    text    : 'Close'
                },
                ok      : {
                    class   : 'btn btn-success',
                    attrs   : {},
                    text    : 'Ok'
                },
                cancel  : {
                    class   : 'btn btn-danger',
                    attrs   : {},
                    text    : 'Cancel'
                }
            }
        };
    //        $(document.body).append(alert);
        var tpl = ['<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
            '<div class="modal-dialog">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
            '<h4 class="modal-title" id="myModalLabel">$title$</h4>',
            '</div>',
            '<div class="modal-body">',
            '$msg$',
            '</div>',
            '<div class="modal-footer">',
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
            '<button type="button" class="btn btn-primary">Save changes</button>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'].join("");
        var opts = {
            title       : '',
            titleTag    : 'h2',
            titleClass  : '',
            titleAttrs  : {},
            msg         : '',
            closeButton : false,
            closeAction : 'hide',
//            closeAction : 'destroy',
            buttons     : ['close'],
//            buttons     : {
//                close   : {
//                    class: 'btn btn-default',
//                    attrs: {}
//                },
//                ok      : {
//                    class: 'btn btn-success',
//                    attrs: {}
//                },
//                cancel  : {
//                    class: 'btn btn-danger',
//                    attrs: {}
//                }
//            },
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
                attrs   : {}
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
                    window.console.log("aa");
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
                    title.html(options.title);
                    header.append(title);
                }else{
                    header.html(options.title);
                }
            }
        };
        var addCloseButton = function(options){
            if (options.closeButton){
                var button = $('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
                header.append(button);
            }
        };
        var addAttrsAndClasses = function(options, object){
            if (options.class && typeof options.class === 'string'){
                object.addClass(options.class);
            }
            if (options.attrs && typeof options.attrs === 'object'){
                object.attr(options.attrs);
            }
            return object;
        };
        var generateButtons = function(options){
            var buttons = options.buttons;
            if (buttons.length !== undefined && buttons.length >=0){
                var buts = {};
                for (var i = 0; i<buttons.length; i++){
                    buts[buttons[i]] = defaults.buttons[buttons[i]];
                }
                buttons = buts;
            }
            if (buttons && typeof buttons === 'object' && !$.isEmptyObject(buttons)){
                for (var i in buttons){
                    footer.append(createButton(i, buttons[i]));
                }
            }
        };
        var createButton = function(type, options){
            var b = $('<button></button>');
            if (type === 'close'){
                b.attr('data-dismiss', 'modal');
            }
            b.html(options.text);
            return addAttrsAndClasses(options, b);
        };
        var generateHeader = function(options){
            header.empty();
            addTitle(options);
            addCloseButton(opts);
            addAttrsAndClasses(opts.header, header);
        };
        var generateFooter = function(options){
            footer.empty();
            generateButtons(options);
        };
        var generatePopup = function(options, type){
            
            $.extend(true, opts, options);
            if (!opts)
                return;
            for (var i in popupClasses){
                alert.removeClass(popupClasses[i]);
            }
            alert.addClass(popupClasses[type]);
            generateHeader(options);
            generateFooter(opts);
            if (opts.msg){
                body.html(opts.msg);
            }
            $(document.body).append(alert);
            alert.on('hidden.bs.modal', function(){
                if (options.closeAction === 'destroy'){
                    alert.remove();
                }
            });
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
});
