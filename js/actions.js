$(document).ready(function(){
    Lobibox.alert.DEFAULT_OPTIONS = {
        width: 700
    };
    Lobibox.info.DEFAULT_OPTIONS = {
        iconClass: 'glyphicon glyphicon-info-sign'
    };
    Lobibox.error.DEFAULT_OPTIONS = {
        iconClass: 'glyphicon glyphicon-remove-sign'
    };
    Lobibox.progress.DEFAULT_OPTIONS = {
        width: 500
    };
    Lobibox.confirm.DEFAULT_OPTIONS = {
        width: 500
    };
    Lobibox.prompt.DEFAULT_OPTIONS = {
        width: 500,
        lines: 5
    };
    Lobibox.notify.DEFAULT_OPTIONS = {
        warning: {
            'title': 'jandaba',
            'icon': 'fa fa-exclamation-circle',
        }
    };
    $('#error').click(function(){
        Lobibox.alert('error',{
            title   : "შეცდომა",
            msg     : "რაღაც არ გამოვიდა!!!",
            buttons: ['ok', 'yes', 'no', 'cancel'],
//            buttons: {
//                ok : {
//                    'class' : 'btn btn-default btn-sm',
//                    closeMessagebox: true
//                }
//            },
//            width: 400,
            modal: false,
//            iconClass   : 'glyphicon glyphicon-remove-sign',
            footer: {
                buttonsAlign: 'center'
            },
            callback: function(exert, type, event){
                if (type === 'ok'){
                    Lobibox.notify('success', {
                        title: "OKOK",
                        msg: "You clicked OK button",
                        delay: 5000,
                        closeOnClick: false,
                        position: 'top left'
                    });
                }else if (type === 'cancel'){
                    Lobibox.notify('error', {
                        title: 'My Title',
                        msg: "Lorem Iecently with desktop versions of Lorem versions of Lorem versions of Lorem Ipsum.",
                        delay: 0,
                        closeOnClick: true,
                        imgUrl: 'DSC00118.JPG'
                    });
                }else if (type === 'yes'){
                    Lobibox.notify('warning', {
                        msg: "You clicked Yes button",
                        delay: 0,
                        closeOnClick: true
                    });
                }else if (type === 'no'){
                    Lobibox.notify('info', {
                        title: 'This is Info',
                        msg: "You clicked No button",
                        delay: 0,
                        closeOnClick: true
                    });
                }
            }
        });
    });
    $('#success').click(function(){
        Lobibox.alert('success',{
            title       : 'Success Popup',
            msg         : "Lorem ipsum dolor sit amet paradise variety yonder neque sweep porches general, bagdat buried flows granted.",
            iconClass   : 'glyphicon glyphicon-ok-sign',
//            buttons     : ['yes', 'no']
        });
    });
    $('#progress').click(function(){
        Lobibox.progress({
            title       : 'Please wait',
            label       : 'Uploading files...',
//            progressBarHTML : '<div class="progress lobibox-progress-outer">\n\
//                                <div class="progress-bar progress-bar-danger progress-bar-striped lobibox-progress-element" data-role="progress-text" role="progressbar"></div>\n\
//                                </div>',
            progressCompleted: function(){
                window.console.log("completed");
            },
            onShow      : function(exert){
                var i = 0;
                var inter = setInterval(function(){
                    window.console.log(i);
                    if (i > 50){
                        inter = clearInterval(inter);
                    }
                    i = i+0.1;
                    exert.setProgress(i);
                },10);
            }
        });
    });
    $('#info').click(function(){
        Lobibox.alert('info',{
            title       : 'Info Popup',
            msg         : "Lorem ipsum dolor sit amet paradise variety yonder neque sweep porches general, bagdat buried flows granted. Linden grudge plunge, float metus libraries mind feet ribald reports for callow fare every. ",
//            iconClass   : 'glyphicon glyphicon-info-sign'
        });
    });
    $('#warning').click(function(){
        Lobibox.alert('warning',{
            title       : 'Warning Popup',
            msg         : "Lorem ipsum dolor sit amet paradise variety yonder neque sweep porches general, bagdat buried flows granted. Linden grudge plunge, float metus libraries mind feet ribald reports for callow fare every. Blessed suffices linden fled, receipt brink region, lured wrath dew neutral",
            closeButton : true,
            modal       : false,
            iconClass   : 'glyphicon glyphicon-exclamation-sign'
        });
    });
    $('#yesNo').click(function(){
        Lobibox.confirm({
//            title       : 'Question',
            msg         : "Are you sure you want to delete this user?",
            closeButton : true,
            draggable   : true,
//            modal       : false,
            iconClass   : 'glyphicon glyphicon-question-sign',
            callback    : function(exert, type, ev){
                window.console.log(exert);
                exert.destroy();
                window.console.log(type);
            }
        });
    });
    
    $('#prompt').click(function(){
        Lobibox.prompt({
            title       : 'Please enter you email',
            closeButton : true,
            draggable   : true,
            placeholder : "Please enter your email",
            closeOnEsc  : true,
            callback    : function(exert, type, ev){
                exert.destroy();
                if (type === 'ok'){
                    window.console.log(exert.getValue());
                }
            }
        });
    });
    $('#promptColor').click(function(){
        Lobibox.prompt({
            title       : 'Please Choose color',
            type        : 'color',
            label       : 'Please Choose color',
            closeOnEsc  : true,
            callback    : function(exert, type, ev){
                exert.destroy();
                if (type === 'ok'){
                    window.console.log(exert.getValue());
                }
            }
        });
    });
    $('#promptNumber').click(function(){
        Lobibox.prompt({
            title       : 'How old are you?',
            placeholder : 'Age',
            type        : 'number',
            callback    : function(exert, type, ev){
                exert.destroy();
                if (type === 'ok'){
                    window.console.log(exert.getValue());
                }
            }
        });
    });
    
    $('#multilinePrompt').click(function(){
        Lobibox.prompt({
            title       : 'Comment',
            closeButton : true,
            draggable   : true,
            placeholder : "Please tell us your oppinion",
            multiline   : true,
            width       : 400,
            callback    : function(exert, type, ev){
                exert.destroy();
                if (type === 'ok'){
                    window.console.log(exert.getValue());
                }
            }
        });
    });
    Lobibox.window.DEFAULT_OPTIONS = {
        loadMethod: 'POST',
        width: 600
    };
    $('#window').click(function(){
        var v = Lobibox.window({
            title       : 'Window title',
            content     : function(){
                return $('#windowContent').clone().removeAttr('style');
            },
//            width       : 480,
            height      : 640,
            url         : 'content.html',
            autoload    : false,
//            modal       : false,
//            beforeCreate: function(){
//                window.console.log("before create");
//            },
//            beforeShow  : function(){
//                window.console.log("before show");
//            },
            onShow      : function(exert){
               setTimeout(function(){
                   exert.setTitle("gamarjoba");
               },2000);
            },
//            beforePosition: function(){
//                window.console.log("before position");
//            },
//            afterPosition: function(){
//                window.console.log("after position");
//            },
//            params      : {
//                name    : 'zura'
//            },
            buttons: {
                print: {
                    text: 'print'
                },
                save: {
                    text: 'Save'
                },
                cancel: {}
            },
            callback    : function(exert, type, ev){
                if (type === 'print'){
                    exert.setParams({
                        name: 'mari'
                    });
                    exert.load();
                }
                window.console.log(exert);
                window.console.log(type);
            }
        });
    });
    $('#notifyInfo').click(function(){
        Lobibox.notify('info', {
            msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes. Slight fallen one opportunity dyspepsia, puzzled quickening throbbing row worm numerous sagittis wreaths.'
        });
    });
    $('#notifyWarning').click(function(){
        Lobibox.notify('warning', {
            title: "გაფრთხილება",
            closeOnClick: false,
            delay: 300000,
            width: 500,
            position: 'top right',
            msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
        });
    });
    $('#notifyError').click(function(){
        Lobibox.notify('error', {
            delayIndicator: false,
            showClass: 'flipInX',
            hideClass: 'bounceOut',
            title: 'Without loading indicator',
            msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes. Slight fallen one opportunity dyspepsia, puzzled quickening throbbing row worm numerous sagittis wreaths.'
        });
    });
    $('#notifySuccess').click(function(){
        Lobibox.notify('success', {
            title: 'Static',
            delay: false,
            msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
        });
    });
});