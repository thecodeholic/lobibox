$(document).ready(function(){
    $('#error').click(function(){
        Exert.messageBox('error',{
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
                    Exert.notify('success', {
                        title: "OKOK",
                        msg: "You clicked OK button",
                        delay: 5000,
                        closeOnClick: false,
                        position: 'top left'
                    });
                }else if (type === 'cancel'){
                    Exert.notify('error', {
                        title: 'My Title',
                        msg: "Lorem Iecently with desktop versions of Lorem versions of Lorem versions of Lorem Ipsum.",
                        delay: 0,
                        closeOnClick: true,
                        imgUrl: 'DSC00118.JPG'
                    });
                }else if (type === 'yes'){
                    Exert.notify('warning', {
                        msg: "You clicked Yes button",
                        delay: 0,
                        closeOnClick: true
                    });
                }else if (type === 'no'){
                    Exert.notify('info', {
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
        Exert.messageBox('success',{
            title       : 'Success Popup',
            msg         : "Lorem ipsum dolor sit amet paradise variety yonder neque sweep porches general, bagdat buried flows granted.",
            closeButton : true,
            modal       : false
        });
    });
    $('#info').click(function(){
        Exert.messageBox('info',{
            title       : 'Info Popup',
            msg         : "Lorem ipsum dolor sit amet paradise variety yonder neque sweep porches general, bagdat buried flows granted. Linden grudge plunge, float metus libraries mind feet ribald reports for callow fare every. Blessed suffices linden fled, receipt brink region, lured wrath dew neutral",
            closeButton : true,
            modal       : false
        });
    });
    $('#warning').click(function(){
        Exert.messageBox('warning',{
            title       : 'Warning Popup',
            msg         : "Lorem ipsum dolor sit amet paradise variety yonder neque sweep porches general, bagdat buried flows granted. Linden grudge plunge, float metus libraries mind feet ribald reports for callow fare every. Blessed suffices linden fled, receipt brink region, lured wrath dew neutral",
            closeButton : true,
            modal       : false,
        });
    });
    $('#yesNo').click(function(){
        Exert.messageBox('confirm',{
//            title       : 'Question',
            msg         : "Are you sure you want to delete this user?",
            closeButton : true,
            draggable   : true,
//            modal       : false,
            callback    : function(exert, type, ev){
                window.console.log(type);
            }
        });
    });
    
    $('#prompt').click(function(){
        Exert.messageBox('prompt',{
            title       : 'Please enter you email',
            closeButton : true,
            draggable   : true,
            placeholder : "Please enter your email",
            callback    : function(exert, type, ev){
                if (type === 'ok'){
                    window.console.log(exert.getValue());
                }
                window.console.log(type);
            }
        });
    });
    
});