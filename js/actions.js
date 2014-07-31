




$(document).ready(function(){
    $('#error').click(function(){
        Exert.error({
            title   : {
                text: "<span style=\"color: black\">შეცდომა</span>",
            },
            msg     : "რაღაც არ გამოვიდა!!!",
        //        buttons : {
        //            close: {
        //                text: 'დახურვა'
        //            }
        //        },
            buttons: ['ok','close', 'yes', 'no', 'cancel'],
            size: 400,
        //        position: 'center bottom',
        //        modal: {
        //            class: 'slide-from-right'
        //        },
            footer: {
                buttonsAlign: 'right'
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
                        title: 'My Title',
                        msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        delay: 0,
                        closeOnClick: true,
                        imgUrl: 'DSC00118.JPG'
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
        Exert.confirm({
            title       : 'Question',
            msg         : "Are you sure you want to delete this user?",
            closeButton : true
        });
    });
});