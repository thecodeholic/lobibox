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
//        titleHtml : false
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