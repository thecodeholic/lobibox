$(document).ready(function(){
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
            closeButton: true,
            width: 400,
            modal: false,
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
            closeButton : true,
            modal       : false
        });
    });
    $('#progress').click(function(){
        Lobibox.progress({
            title       : 'Please wait',
            closeButton : true,
            label       : 'Uploading files...',
            progressCompleted: function(){
                window.console.log("completed");
            },
            onShow      : function(exert){
                var i = 1;
                setInterval(function(){
                    exert.setProgress(i);
                    i = i+0.1;
                },300);
            }
        });
    });
    $('#info').click(function(){
        Lobibox.alert('info',{
            title       : 'Info Popup',
            msg         : "Lorem ipsum dolor sit amet paradise variety yonder neque sweep porches general, bagdat buried flows granted. Linden grudge plunge, float metus libraries mind feet ribald reports for callow fare every. Blessed suffices linden fled, receipt brink region, lured wrath dew neutral",
            closeButton : true,
            modal       : false
        });
    });
    $('#warning').click(function(){
        Lobibox.alert('warning',{
            title       : 'Warning Popup',
            msg         : "Lorem ipsum dolor sit amet paradise variety yonder neque sweep porches general, bagdat buried flows granted. Linden grudge plunge, float metus libraries mind feet ribald reports for callow fare every. Blessed suffices linden fled, receipt brink region, lured wrath dew neutral",
            closeButton : true,
            modal       : false
        });
    });
    $('#yesNo').click(function(){
        Lobibox.confirm({
//            title       : 'Question',
            msg         : "Are you sure you want to delete this user?",
            closeButton : true,
            draggable   : true,
//            modal       : false,
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
            lines       : 6,
            width       : 400,
            callback    : function(exert, type, ev){
                exert.destroy();
                if (type === 'ok'){
                    window.console.log(exert.getValue());
                }
            }
        });
    });
    
    $('#window').click(function(){
        var v = Lobibox.window({
            title       : 'Window title',
            content     : function(){
                return $('#windowContent').clone().removeAttr('style');
            },
            width       : 480,
            height      : 640,
            url         : 'content.html',
            autoload    : false,
//            beforeCreate: function(){
//                window.console.log("before create");
//            },
//            beforeShow  : function(){
//                window.console.log("before show");
//            },
//            onShow      : function(exert){
//               window.console.log("on show", exert); 
//            },
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
    
});