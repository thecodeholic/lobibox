$(function(){
    var $codes = $('.highlight code');
    $codes.each(function(index, el){
        hljs.highlightBlock(el);
    });
    
    (function () {
        (function () {
            $('#basicInfo').click(function () {
                Lobibox.notify('info', {
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarning').click(function () {
                Lobibox.notify('warning', {
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicError').click(function () {
                Lobibox.notify('error', {
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccess').click(function () {
                Lobibox.notify('success', {
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#basicInfoImage').click(function () {
                Lobibox.notify('info', {
                    img: window.location.origin + '/ASSETS/IMG/users/1.jpg',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningImage').click(function () {
                Lobibox.notify('warning', {
                    img: window.location.origin + '/ASSETS/IMG/users/2.jpg',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorImage').click(function () {
                Lobibox.notify('error', {
                    img: window.location.origin + '/ASSETS/IMG/users/3.jpg',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessImage').click(function () {
                Lobibox.notify('success', {
                    img: window.location.origin + '/ASSETS/IMG/users/4.jpg',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#basicInfoNoSound').click(function () {
                Lobibox.notify('info', {
                    sound: false,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningNoSound').click(function () {
                Lobibox.notify('warning', {
                    sound: false,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorNoSound').click(function () {
                Lobibox.notify('error', {
                    sound: false,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessNoSound').click(function () {
                Lobibox.notify('success', {
                    sound: false,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#basicInfoCustomTitle').click(function () {
                Lobibox.notify('info', {
                    title: 'Info title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningCustomTitle').click(function () {
                Lobibox.notify('warning', {
                    title: 'Warning title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorCustomTitle').click(function () {
                Lobibox.notify('error', {
                    title: 'Error title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessCustomTitle').click(function () {
                Lobibox.notify('success', {
                    title: 'Success title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#basicInfoNoIcon').click(function () {
                Lobibox.notify('info', {
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningNoIcon').click(function () {
                Lobibox.notify('warning', {
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorNoIcon').click(function () {
                Lobibox.notify('error', {
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessNoIcon').click(function () {
                Lobibox.notify('success', {
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#basicInfoCustomDelay').click(function () {
                Lobibox.notify('info', {
                    delay: 15000,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningCustomDelay').click(function () {
                Lobibox.notify('warning', {
                    delay: 15000,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorCustomDelay').click(function () {
                Lobibox.notify('error', {
                    delay: 15000,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessCustomDelay').click(function () {
                Lobibox.notify('success', {
                    delay: 15000,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#basicInfoNoDelay').click(function () {
                Lobibox.notify('info', {
                    delay: false,
                    title: 'Info title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningNoDelay').click(function () {
                Lobibox.notify('warning', {
                    delay: false,
                    title: 'Warning title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorNoDelay').click(function () {
                Lobibox.notify('error', {
                    delay: false,
                    title: 'Error title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessNoDelay').click(function () {
                Lobibox.notify('success', {
                    delay: false,
                    title: 'Success title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#basicInfoPosition').click(function () {
                Lobibox.notify('info', {
                    position: 'top left',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningPosition').click(function () {
                Lobibox.notify('warning', {
                    position: 'top right',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorPosition').click(function () {
                Lobibox.notify('error', {
                    position: 'bottom left',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessPosition').click(function () {
                Lobibox.notify('success', {
                    position: 'bottom right',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#basicInfoWidth').click(function () {
                Lobibox.notify('info', {
                    width: 300,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningWidth').click(function () {
                Lobibox.notify('warning', {
                    width: 500,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorWidth').click(function () {
                Lobibox.notify('error', {
                    width: $(window).width() - 20,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessWidth').click(function () {
                Lobibox.notify('success', {
                    width: 600,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#basicInfoAnimation').click(function () {
                Lobibox.notify('info', {
                    showClass: 'fadeInDown',
                    hideClass: 'fadeUpDown',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningAnimation').click(function () {
                Lobibox.notify('warning', {
                    showClass: 'zoomIn',
                    hideClass: 'zoomOut',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorAnimation').click(function () {
                Lobibox.notify('error', {
                    showClass: 'zoomInUp',
                    hideClass: 'zoomOutDown',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessAnimation').click(function () {
                Lobibox.notify('success', {
                    showClass: 'rollIn',
                    hideClass: 'rollOut',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
    })();
//------------------------------------------------------------------------------
    (function () {
        (function () {
            $('#largeInfoBasic').click(function () {
                Lobibox.notify('info', {
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeWarningBasic').click(function () {
                Lobibox.notify('warning', {
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeErrorBasic').click(function () {
                Lobibox.notify('error', {
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeSuccessBasic').click(function () {
                Lobibox.notify('success', {
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#largeInfoImage').click(function () {
                Lobibox.notify('info', {
                    img: window.location.origin + '/ASSETS/IMG/users/1.jpg',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeWarningImage').click(function () {
                Lobibox.notify('warning', {
                    img: window.location.origin + '/ASSETS/IMG/users/2.jpg',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeErrorImage').click(function () {
                Lobibox.notify('error', {
                    img: window.location.origin + '/ASSETS/IMG/users/3.jpg',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeSuccessImage').click(function () {
                Lobibox.notify('success', {
                    img: window.location.origin + '/ASSETS/IMG/users/4.jpg',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#largeInfoPosition').click(function () {
                Lobibox.notify('info', {
                    size: 'large',
                    position: 'bottom left',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeWarningPosition').click(function () {
                Lobibox.notify('warning', {
                    size: 'large',
                    position: 'bottom right',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeErrorPosition').click(function () {
                Lobibox.notify('error', {
                    size: 'large',
                    position: 'top left',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeSuccessPosition').click(function () {
                Lobibox.notify('success', {
                    size: 'large',
                    position: 'top right',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#largeInfoAnimation').click(function () {
                Lobibox.notify('info', {
                    showClass: 'fadeInDown',
                    hideClass: 'fadeUpDown',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeWarningAnimation').click(function () {
                Lobibox.notify('warning', {
                    showClass: 'zoomIn',
                    hideClass: 'zoomOut',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeErrorAnimation').click(function () {
                Lobibox.notify('error', {
                    showClass: 'zoomInUp',
                    hideClass: 'zoomOutDown',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeSuccessAnimation').click(function () {
                Lobibox.notify('success', {
                    showClass: 'rollIn',
                    hideClass: 'rollOut',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
        })();
    })();
//------------------------------------------------------------------------------
    (function () {
        (function () {
            $('#miniInfoAnimation').click(function () {
                Lobibox.notify('info', {
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniWarningAnimation').click(function () {
                Lobibox.notify('warning', {
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniErrorAnimation').click(function () {
                Lobibox.notify('error', {
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniSuccessAnimation').click(function () {
                Lobibox.notify('success', {
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#miniInfoImage').click(function () {
                Lobibox.notify('info', {
                    img: window.location.origin + '/ASSETS/IMG/users/1.jpg',
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniWarningImage').click(function () {
                Lobibox.notify('warning', {
                    img: window.location.origin + '/ASSETS/IMG/users/2.jpg',
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniErrorImage').click(function () {
                Lobibox.notify('error', {
                    img: window.location.origin + '/ASSETS/IMG/users/3.jpg',
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniSuccessImage').click(function () {
                Lobibox.notify('success', {
                    img: window.location.origin + '/ASSETS/IMG/users/4.jpg',
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#miniInfoNoIcon').click(function () {
                Lobibox.notify('info', {
                    size: 'mini',
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniWarningNoIcon').click(function () {
                Lobibox.notify('warning', {
                    size: 'mini',
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniErrorNoIcon').click(function () {
                Lobibox.notify('error', {
                    size: 'mini',
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniSuccessNoIcon').click(function () {
                Lobibox.notify('success', {
                    size: 'mini',
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
        })();
//------------------------------------------------------------------------------
        (function () {
            $('#miniInfoTitle').click(function () {
                Lobibox.notify('info', {
                    size: 'mini',
                    title: 'Lorem ipsum',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniWarningTitle').click(function () {
                Lobibox.notify('warning', {
                    size: 'mini',
                    title: 'Lorem ipsum',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniErrorTitle').click(function () {
                Lobibox.notify('error', {
                    size: 'mini',
                    title: 'Lorem ipsum',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniSuccessTitle').click(function () {
                Lobibox.notify('success', {
                    size: 'mini',
                    title: 'Lorem ipsum',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
        })();
    })();
});