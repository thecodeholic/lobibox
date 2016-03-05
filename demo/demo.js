$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function () {
    var IMG_PREFIX = 'demo/img/';
    (function () {
        Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
            iconSource: 'fontAwesome'
        });
        Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
            iconSource: 'fontAwesome'
        });

        (function () {
            $('#popupYesNoBasic').click(function () {
                Lobibox.confirm({
                    msg: "Are you sure you want to delete this user?"
                });
            });
            $('#popupErrorBasic').click(function () {
                Lobibox.alert('error', {
                    msg: "Lorem ipsum dolor sit amet byron frown tumult minstrel wicked clouded bows columbine full"
                });
            });
            $('#popupSuccessBasic').click(function () {
                Lobibox.alert('success', {
                    msg: "Lorem ipsum dolor sit amet byron frown tumult minstrel wicked clouded bows columbine full"
                });
            });
            $('#popupInfoBasic').click(function () {
                Lobibox.alert('info', {
                    msg: "Lorem ipsum dolor sit amet byron frown tumult minstrel wicked clouded bows columbine full"
                });
            });
            $('#popupWarningBasic').click(function () {
                Lobibox.alert('warning', {
                    msg: "Lorem ipsum dolor sit amet byron frown tumult minstrel wicked clouded bows columbine full"
                });
            });
            $('#popupPromptBasic').click(function () {
                Lobibox.prompt('text', {
                    title: 'Please enter username',
                    shown: function(box){
                        console.log(box.$input[0]);
                    },
                    attrs: {
                        placeholder: "Username"
                    }
                });
            });
            $('#popupProgressBasic').click(function () {
                var inter;
                Lobibox.progress({
                    title: 'Please wait',
                    label: 'Uploading files...',
                    onShow: function ($this) {
                        var i = 0;
                        inter = setInterval(function () {
                            window.console.log(i);
                            if (i > 100) {
                                inter = clearInterval(inter);
                            }
                            i = i + 0.1;
                            $this.setProgress(i);
                        }, 10);
                    },
                    closed: function () {
                        inter = clearInterval(inter);
                    }
                });
            });
            $('#popupProgressBootstrap').click(function () {
                var inter;
                Lobibox.progress({
                    title: 'Please wait',
                    label: 'Uploading files...',
                    progressTpl: '<div class="progress lobibox-progress-outer">\n\
                    <div class="progress-bar progress-bar-danger progress-bar-striped lobibox-progress-element" data-role="progress-text" role="progressbar"></div>\n\
                    </div>',
                    progressCompleted: function () {
                        Lobibox.notify('success', {
                            msg: 'Files were successfully uploaded'
                        });
                    },
                    onShow: function ($this) {
                        var i = 0;
                        inter = setInterval(function () {
                            window.console.log(i);
                            if (i > 100) {
                                clearInterval(inter);
                            }
                            i = i + 0.2;
                            $this.setProgress(i);
                        }, 1000 / 30);
                    },
                    closed: function () {
                        inter = clearInterval(inter);
                    }
                });
            });
            $('#popupWindowBasic').click(function () {
                Lobibox.window({
                    title: 'Window title',
                    content: [
                        '<p>Lorem ipsum dolor sit amet byron frown tumult minstrel wicked clouded bows columbine full. Panther nascetur estimation, croaked translations brood sharply federal basket. Yet virtues replies pans croaked org feelest, redden chicadeedee wipe, columbine humanity flood mood. Stayed frown ponderous shares bubbles skilled mood federal, shamed robe roll feathered life. Notifies life bows joys bubbles, clouded frown. Skilled wished sportive moved, shamed, year frown sank, universe, wove within. Infirm dames croaked sharply estimation wipe ponderous climb, shamed once basket oracle, smite frown stayed. Sharply bows basket minstrel skilled virtues, panther life. Dames notifies laid, willow listened frankincense croaked potenti. Minstrel since rowed frown, wipe shares, dames wished heaving potenti estimation panther columbine mighty flood.</p>',
                        '<p>Lorem ipsum dolor sit amet byron frown tumult minstrel wicked clouded bows columbine full. Panther nascetur estimation, croaked translations brood sharply federal basket. Yet virtues replies pans croaked org feelest, redden chicadeedee wipe, columbine humanity flood mood. Stayed frown ponderous shares bubbles skilled mood federal, shamed robe roll feathered life. Notifies life bows joys bubbles, clouded frown. Skilled wished sportive moved, shamed, year frown sank, universe, wove within. Infirm dames croaked sharply estimation wipe ponderous climb, shamed once basket oracle, smite frown stayed. Sharply bows basket minstrel skilled virtues, panther life. Dames notifies laid, willow listened frankincense croaked potenti. Minstrel since rowed frown, wipe shares, dames wished heaving potenti estimation panther columbine mighty flood.</p>',
                        '<p>Lorem ipsum dolor sit amet byron frown tumult minstrel wicked clouded bows columbine full. Panther nascetur estimation, croaked translations brood sharply federal basket. Yet virtues replies pans croaked org feelest, redden chicadeedee wipe, columbine humanity flood mood. Stayed frown ponderous shares bubbles skilled mood federal, shamed robe roll feathered life. Notifies life bows joys bubbles, clouded frown. Skilled wished sportive moved, shamed, year frown sank, universe, wove within. Infirm dames croaked sharply estimation wipe ponderous climb, shamed once basket oracle, smite frown stayed. Sharply bows basket minstrel skilled virtues, panther life. Dames notifies laid, willow listened frankincense croaked potenti. Minstrel since rowed frown, wipe shares, dames wished heaving potenti estimation panther columbine mighty flood.</p>'
                    ].join("")
                });
            });
        })();
        (function () {
            $('#popupYesNoCallback').click(function () {
                Lobibox.confirm({
                    msg: "Are you sure you want to delete this user?",
                    callback: function ($this, type) {
                        if (type === 'yes') {
                            Lobibox.notify('success', {
                                msg: 'You have clicked "Yes" button.'
                            });
                        } else if (type === 'no') {
                            Lobibox.notify('info', {
                                msg: 'You have clicked "No" button.'
                            });
                        }
                    }
                });
            });
        })();
        (function () {
            function processData(params) {
                if (params.width === "") {
                    delete params.width;
                }
                if (params.title === "") {
                    delete params.title;
                }
                if (params.iconClass === "") {
                    delete params.iconClass;
                }
                var checks = ['closeButton', 'draggable', 'modal', 'closeOnEsc', 'showProgressLabel'];
                for (var i in checks) {
                    params[checks[i]] = !!params[checks[i]];
                }
                if (params.placeholder) {
                    params.attrs = {
                        placeholder: params.placeholder
                    };
                }
                return params;
            }

            var $form = $('#lobibox-popup-demo-form');

            var $popupType = $form.find('[name="popupType"]');
            $popupType.change(function () {
                var $this = $(this);
                $form.find('.alert-fieldset').attr('disabled', true);
                $form.find('.prompt-fieldset').attr('disabled', true);
                $form.find('.confirm-fieldset').attr('disabled', true);
                $form.find('.progress-fieldset').attr('disabled', true);

                if ($this.val() === 'alert') {
                    $form.find('.alert-fieldset').removeAttr('disabled');
                    $form.find('[href="#alert-options"]').trigger('click');
                } else if ($this.val() === 'prompt') {
                    $form.find('.prompt-fieldset').removeAttr('disabled');
                    $form.find('[href="#prompt-options"]').trigger('click');
                } else if ($this.val() === 'confirm') {
                    $form.find('.confirm-fieldset').removeAttr('disabled');
                    $form.find('[href="#confirm-options"]').trigger('click');
                } else if ($this.val() === 'progress') {
                    $form.find('.progress-fieldset').removeAttr('disabled');
                    $form.find('[href="#progress-options"]').trigger('click');
                }
            });
            $form.submit(function (ev) {
                ev.preventDefault();
                var inter;
                var params = $form.serializeObject();
                params = processData(params);
                if (params.popupType === 'confirm') {
                    Lobibox.confirm(params);
                } else if (params.popupType === 'progress') {
                    params.onShow = function ($this) {
                        var i = 0;
                        inter = setInterval(function () {
                            if (i > 100) {
                                inter = clearInterval(inter);
                            }
                            i = i + 0.1;
                            $this.setProgress(i);
                        }, 10);
                    };
                    params.closed = function () {
                        inter = clearInterval(inter);
                    };
                    Lobibox.progress(params);
                } else {
                    Lobibox[params.popupType](params.type, params);
                }
            });
        })();
        (function () {
            $('#popupProgressErrorButtons').click(function () {
                Lobibox.alert('error', {
                    msg: 'This is an error message',
                    //                    buttons: ['ok', 'cancel', 'yes', 'no'],
                    //Or more powerfull way
                    buttons: {
                        ok: {
                            'class': 'btn btn-info',
                            closeOnClick: false
                        },
                        cancel: {
                            'class': 'btn btn-danger',
                            closeOnClick: false
                        },
                        yes: {
                            'class': 'btn btn-success',
                            closeOnClick: false
                        },
                        no: {
                            'class': 'btn btn-warning',
                            closeOnClick: false
                        },
                        custom: {
                            'class': 'btn btn-default',
                            text: 'Custom'
                        }
                    },
                    callback: function (lobibox, type) {
                        var btnType;
                        if (type === 'no') {
                            btnType = 'warning';
                        } else if (type === 'yes') {
                            btnType = 'success';
                        } else if (type === 'ok') {
                            btnType = 'info';
                        } else if (type === 'cancel') {
                            btnType = 'error';
                        }
                        Lobibox.notify(btnType, {
                            size: 'mini',
                            msg: 'This is ' + btnType + ' message'
                        });
                    }
                });
            });
            $('#popupConfirmNoIcon').click(function () {
                Lobibox.confirm({
                    iconClass: false,
                    msg: 'Are you sure?'
                });
            });
        })();
        (function () {
            $('#popupWindowExample').click(function () {
                Lobibox.window({
                    title: 'Window title',
                    //Available types: string, jquery object, function
                    content: function () {
                        return $('.container');
                    },
                    url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.css',
                    autoload: false,
                    loadMethod: 'GET',
                    //Load parameters
                    params: {
                        param1: 'Lorem',
                        param2: 'Ipsum'
                    },
                    buttons: {
                        load: {
                            text: 'Load from url'
                        },
                        close: {
                            text: 'Close',
                            closeOnClick: true
                        }
                    },
                    callback: function ($this, type) {
                        if (type === 'load') {
                            $this.load(function () {
                                var $body = $this.$el.find('.lobibox-body');
                                $body.html('<div class="highlight"><pre><code>' + $body.html() + '</code></pre></div>');
                                hljs.highlightBlock($body.find('code')[0]);
                            });
                        }
                    }
                });
            });
        })();
    })();

    (function () {
        //            Notification basic example
        (function () {
            $('#basicDefault').click(function () {
                Lobibox.notify('default', {
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
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
        //                Notification with image
        (function () {
            $('#basicDefaultImage').click(function () {
                Lobibox.notify('default', {
                    img: IMG_PREFIX + '1.jpg',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicInfoImage').click(function () {
                Lobibox.notify('info', {
                    img: IMG_PREFIX + '1.jpg',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicWarningImage').click(function () {
                Lobibox.notify('warning', {
                    img: IMG_PREFIX + '2.jpg',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicErrorImage').click(function () {
                Lobibox.notify('error', {
                    img: IMG_PREFIX + '3.jpg',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
            $('#basicSuccessImage').click(function () {
                Lobibox.notify('success', {
                    img: IMG_PREFIX + '4.jpg',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
        })();
        //------------------------------------------------------------------------------
        //                Notification Without sound
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
        //                Notification custom title
        (function () {
            $('#basicDefaultCustomTitle').click(function () {
                Lobibox.notify('default', {
                    title: 'Info title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
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
        //                Notification without icon
        (function () {
            $('#basicDefaultNoIcon').click(function () {
                Lobibox.notify('default', {
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
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
        //                Notification custom delay
        (function () {
            $('#basicDefaultCustomDelay').click(function () {
                Lobibox.notify('default', {
                    delay: 15000,
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
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
        //                Notification no delay
        (function () {
            $('#basicDefaultNoDelay').click(function () {
                Lobibox.notify('default', {
                    delay: false,
                    title: 'Info title',
                    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
                });
            });
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
        //                Notification positioning
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
        //                Notification custom width
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
                    width: $(window).width(),
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
        //                Notification custom animation
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
                    showClass: 'bounceIn',
                    hideClass: 'bounceOut',
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
        //------------------------------------------------------------------------------
        //                Notification Large
        (function () {
            $('#largeDefaultBasic').click(function () {
                Lobibox.notify('default', {
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
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
        //                Notification large with image
        (function () {
            $('#largeDefaultImage').click(function () {
                Lobibox.notify('default', {
                    img: IMG_PREFIX + '1.jpg',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeInfoImage').click(function () {
                Lobibox.notify('info', {
                    img: IMG_PREFIX + '1.jpg',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeWarningImage').click(function () {
                Lobibox.notify('warning', {
                    img: IMG_PREFIX + '2.jpg',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeErrorImage').click(function () {
                Lobibox.notify('error', {
                    img: IMG_PREFIX + '3.jpg',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
            $('#largeSuccessImage').click(function () {
                Lobibox.notify('success', {
                    img: IMG_PREFIX + '4.jpg',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
        })();
        //------------------------------------------------------------------------------
        //                Notification large positioning
        (function () {
            $('#largeDefaultPosition').click(function () {
                Lobibox.notify('default', {
                    size: 'large',
                    position: 'bottom left',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
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
        //                Notification large animation
        (function () {
            $('#largeDefaultAnimation').click(function () {
                Lobibox.notify('default', {
                    showClass: 'fadeInDown',
                    hideClass: 'fadeUpDown',
                    size: 'large',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent, youngest nestor serene horse, already, ipsum unplanted trace line. Making queries worketh game unplanted trace how erring poles.'
                });
            });
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
                    showClass: 'bounceIn',
                    hideClass: 'bounceOut',
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
        //------------------------------------------------------------------------------
        //                Notification mini basic
        (function () {
            $('#miniDefaultAnimation').click(function () {
                Lobibox.notify('default', {
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
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
        //                Notification mini with image
        (function () {
            $('#miniDefaultImage').click(function () {
                Lobibox.notify('default', {
                    img: IMG_PREFIX + '1.jpg',
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniInfoImage').click(function () {
                Lobibox.notify('info', {
                    img: IMG_PREFIX + '1.jpg',
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniWarningImage').click(function () {
                Lobibox.notify('warning', {
                    img: IMG_PREFIX + '2.jpg',
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniErrorImage').click(function () {
                Lobibox.notify('error', {
                    img: IMG_PREFIX + '3.jpg',
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
            $('#miniSuccessImage').click(function () {
                Lobibox.notify('success', {
                    img: IMG_PREFIX + '4.jpg',
                    size: 'mini',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
        })();
        //------------------------------------------------------------------------------
        //                Notification mini without icon
        (function () {
            $('#miniDefaultNoIcon').click(function () {
                Lobibox.notify('default', {
                    size: 'mini',
                    icon: false,
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
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
        //                Notification mini with title
        (function () {
            $('#miniDefaultTitle').click(function () {
                Lobibox.notify('default', {
                    size: 'mini',
                    title: 'Lorem ipsum',
                    msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
                });
            });
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