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
        buttons: ['ok','close', 'yes', 'no', 'cancel'],
//        titleHtml : false,
        modal: {
            class: 'slide-from-right'
//            class: 'zoom-in'
        },
        callback: function(event, type){
            if (type === 'ok'){
                Exert.notify.message('mini', 'success', {
                    title: "OKOK",
                    msg: "You clicked OK button",
                    delay: 0,
                    closeOnClick: true
                });
            }else if (type === 'cancel'){
                Exert.notify.message('large', 'error', {
                    msg: "You clicked Cancel button",
                    delay: 0,
                    closeOnClick: true
                });
            }else if (type === 'close'){
                Exert.notify.message('large','warning', {
                    msg: "You clicked Close button",
                    title: 'Close Tab',
                    delay: 0,
                    closeOnClick: true
                });
            }else if (type === 'yes'){
                Exert.notify.message('mini', 'success', {
                    msg: "You clicked Yes button",
                    delay: 0,
                    closeOnClick: true
                });
            }else if (type === 'no'){
                Exert.notify.message('large', 'info', {
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