$(document).ready(function(){
  $('#error').click(function(){
    Exert.error({
        title   : "title",
//        titleTag: 'h2',
//        titleClass: 'cl',
//        closeAction: 'destroy',
//        titleAttrs: {attr1: "some", attr2: "ggg", attr3: "sdsdsd"},
        msg     : "msg",
        closeButton: true
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