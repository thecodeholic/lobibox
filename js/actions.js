$(document).ready(function(){
  $('button').click(function(){
    Exert.error({
        title   : "title",
//        titleTag: '',
        titleClass: 'cl',
        titleAttrs: {attr1: "some", attr2: "ggg", attr3: "sdsdsd"},
        msg     : "msg",
        closeButton: true
    });
  });
});