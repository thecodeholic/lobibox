$(document).ready(function(){
  $('#error').click(function(){
    Exert.error({
        title   : "<span style=\"color: black\">შეცდომა</span>",
        msg     : "რაღაც არ გამოვიდა!!!",
//        buttons : {
//            close: {
//                text: 'დახურვა'
//            }
//        },
        buttons: ['ok','close'],
//        titleHtml : false,
        modal: {
            class: 'slide-from-right'
//            class: 'zoom-in'
        },
        callback: function(event, type){
            if (type === 'ok'){
                Exert.notify.message('success', {
                   msg: "You clicked OK button" 
                });
            }else if (type === 'cancel'){
                Exert.notify.message('error', {
                   msg: "You clicked Cancel button" 
                });
            }else if (type === 'close'){
                Exert.notify.message('warning', {
                   msg: "You clicked Close button" 
                });
            }else if (type === 'yes'){
                Exert.notify.message('success', {
                   msg: "You clicked Yes button" 
                });
            }else if (type === 'no'){
                Exert.notify.message('info', {
                   msg: "You clicked No button" 
                });
            }
        }
    });
  });
  $('#success').click(function(){
    Exert.success({
        title   : "title",
//        titleTag: '',
        titleClass: 'cl',
        closeAction: 'destroy',
        titleAttrs: {attr1: "some", attr2: "ggg", attr3: "sdsdsd"},
        msg     : "msg",
        closeButton: true
    });
  });
});