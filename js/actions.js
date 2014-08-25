




$(document).ready(function(){
    $('#error').click(function(){
        Exert.messageBox('error',{
            title   : {
                text: "შეცდომა",
            },
            msg     : "რაღაც არ გამოვიდა!!!",
//            buttons: ['ok', 'yes', 'no', 'cancel'],
            buttons: {
                ok : {
                    'class' : 'btn btn-default btn-sm',
                    closeMessagebox: true
                }
            },
            closeButton: true,
            width: 400,
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
            title   : {
                text    : "title",
                tag     : 'h2',
                class   : 'cl',
                attrs   : {
                    attr1: "some", 
                    attr2: "ggg", 
                    attr3: "sdsdsd"
                }
            },
            msg         : "msg",
            closeButton : true
        });
    });
    $('#yesNo').click(function(){
        Exert.messageBox('confirm',{
            title       : 'Question',
            msg         : "Are you sure you want to delete this user?",
            closeButton : true,
            callback    : function(exert, type, ev){
                if (type === 'no')
                    exert.hide();
                window.console.log(type);
            }
        });
    });
});