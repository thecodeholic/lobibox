$(document).ready(function(){
  $('#error').click(function(){
    Exert.error({
        title   : "title",
//        titleTag: '',
        titleClass: 'cl',
        titleAttrs: {attr1: "some", attr2: "ggg", attr3: "sdsdsd"},
        msg     : "msg",
        closeButton: true
    });
  });
  $('#success').click(function(){
    Exert.success({
        title   : "title",
//        titleTag: '',
        titleClass: 'cl',
        titleAttrs: {attr1: "some", attr2: "ggg", attr3: "sdsdsd"},
        msg     : "msg",
        closeButton: true
    });
  });
});