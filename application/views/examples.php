<div>
    <!--Lobibox Popup examples-->
    <div>
        <h2>Lobibox popup examples</h2>
        <!--Basic examples-->
        <div class="bs-example">
            <h3>Basic examples</h3>
            <!--Confirm-->
            <fieldset>
                <div class="bs-example">
                    <button id="popupYesNoBasic" class="btn btn-primary">Confirm</button>
                </div>
                <div class="highlight">
                    <pre><code>Lobibox.confirm({
    msg: "Are you sure you want to delete this user?",
});     
</code></pre>
                </div>
            </fieldset>
            <!--Alerts-->
            <fieldset>
                <div class="bs-example">
                    <button id="popupErrorBasic" class="btn btn-danger">Show Error</button>
                    <button id="popupSuccessBasic" class="btn btn-success">Show Success</button>
                    <button id="popupInfoBasic" class="btn btn-info">Show info</button>
                    <button id="popupWarningBasic" class="btn btn-warning">Show Warning</button>
                </div>
                <div class="highlight">
<pre><code>Lobibox.alert(type, //AVAILABLE TYPES: "error", "info", "success", "warning"
{
    msg: "Lorem ipsum dolor sit amet byron frown tumult minstrel wicked clouded bows columbine full"
});
</code></pre>
                </div>
            </fieldset>
            <!--Prompt-->
            <fieldset>
                <div class="bs-example">
                    <button id="popupPromptBasic" class="btn btn-primary">Prompt</button>
                </div>
                <div class="highlight">
<pre><code>Lobibox.prompt('text', //Any input type will be valid
{
    title: 'Please enter username',
    //Attributes of &lt;input&gt;
    attrs: { 
        placeholder: "Username"
    }
});
</code></pre>
                </div>
            </fieldset>
            <!--Progress-->
            <fieldset>
                <div class="bs-example">
                    <button id="popupProgressBasic" class="btn btn-primary">Progress</button>
                </div>
                <div class="highlight">
<pre><code>Lobibox.progress({
    title: 'Please wait',
    label: 'Uploading files...',
    onShow: function ($this) {
        var i = 0;
        var inter = setInterval(function () {
            window.console.log(i);
            if (i > 100) {
                inter = clearInterval(inter);
            }
            i = i + 0.1;
            $this.setProgress(i);
        }, 10);
    }
});        
</code></pre>
                </div>
                <div class="bs-example">
                    <button id="popupProgressBootstrap" class="btn btn-primary">Bootstrap progress</button>
                </div>
                <div class="highlight">
<pre><code>Lobibox.progress({
    title: 'Please wait',
    label: 'Uploading files...',
    progressTpl : '&ltdiv class="progress lobibox-progress-outer">\n\
                &lt;div class="progress-bar progress-bar-danger progress-bar-striped lobibox-progress-element" data-role="progress-text" role="progressbar">&lt;/div>\n\
                &lt;/div>',
    onShow: function ($this) {
        var i = 0;
        var inter = setInterval(function () {
            window.console.log(i);
            if (i > 100) {
                inter = clearInterval(inter);
            }
            i = i + 0.1;
            $this.setProgress(i);
        }, 10);
    }
});  
</code></pre>
                </div>
            </fieldset>
            <!--Window-->
            <fieldset>
                <div class="bs-example">
                    <button id="popupWindowBasic" class="btn btn-primary">Window</button>
                </div>
                <div class="highlight">
<pre><code>Lobibox.window({
    title: 'Window title',
    content: '...'
});        
</code></pre>
                </div>
            </fieldset>
        </div>
        <div class="bs-example">
            <h3>Custom buttons</h3>
            <button id="popupProgressErrorButtons" class="btn btn-danger">Error</button>
        </div>
        <!--Callbacks-->
        <fieldset>
            <div class="bs-example">
                <h3>Callbacks</h3>
                <div class="callout callout-info">
                    <p>All popup boxes have <code>callback</code> option</p>
                </div>
                <button id="popupYesNoCallback" class="btn btn-primary">Confirm</button>
            </div>
            <div class="highlight">
                <pre><code>Lobibox.confirm({
    msg: "Are you sure you want to delete this user?",
    callback: function ($this, type, ev) {
        //Your code goes here
    }
});        
</code></pre>
            </div>
        </fieldset>
        <form id="lobibox-popup-demo-form" action>
            <div class="row">
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="control-label">Popup type</label>
                        <select class="form-control" name="popupType">
                            <option value="confirm">Confirm</option>
                            <option value="alert">Alert</option>
                            <option value="prompt">Prompt</option>
                            <option value="progress">Progress</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a class="collapsed" data-toggle="collapse"  href="#common-fieldset-wrapper">
                            Common parameters
                        </a>
                    </h4>
                </div>
                <div id="common-fieldset-wrapper" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <fieldset>
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label class="control-label">title</label>
                                        <input type="text" name="title" class="form-control" value=""/>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <label class="control-label">Base class <small>(default)</small></label>
                                    <input type="text" name="baseClass" class="form-control" value="animated-super-fast"/>
                                </div>
                                <div class="col-sm-3">
                                    <label class="control-label">Show class</label>
                                    <input type="text" name="showClass" class="form-control" value="zoomIn"/>
                                </div>
                                <div class="col-sm-3">
                                    <label class="control-label">Hide class</label>
                                    <input type="text" name="hideClass" class="form-control" value="zoomOut"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <label class="control-label">Message</label>
                                    <textarea rows="4" class="form-control" name="msg"></textarea>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label class="control-label">Width</label>
                                        <div class="form-group">
                                            <input type="number" name="width" class="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label class="control-label">Height</label>
                                        <div class="form-group">
                                            <input type="text" name="height" value="auto" class="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label class="control-label"></label>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="closeButton" checked=""> Close button
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label class="control-label"></label>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="draggable"> Draggable
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label class="control-label"></label>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="modal" checked=""> Modal
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label class="control-label"></label>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="closeOnEsc"> Close on escape
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
            
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingOne">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#confirm-options" aria-expanded="true" aria-controls="collapseOne">
                                Confirm options
                            </a>
                        </h4>
                    </div>
                    <div id="confirm-options" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                        <div class="panel-body">
                            <fieldset class="confirm-fieldset">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label">Icon Class</label>
                                            <input type="text" class="form-control" name="iconClass" value="glyphicon glyphicon-question-sign"/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingTwo">
                        <h4 class="panel-title">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#alert-options" aria-expanded="false" aria-controls="collapseTwo">
                                Alert options
                            </a>
                        </h4>
                    </div>
                    <div id="alert-options" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                        <div class="panel-body">
                            <fieldset class="alert-fieldset" disabled="">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label">Alert type</label>
                                            <select class="form-control" name="type">
                                                <option value="success">Success</option>
                                                <option value="error">Error</option>
                                                <option value="info">Info</option>
                                                <option value="warning">Warning</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label">Icon Class</label>
                                            <input type="text" class="form-control" name="iconClass"/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingThree">
                        <h4 class="panel-title">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#prompt-options" aria-expanded="false" aria-controls="collapseThree">
                                Prompt options
                            </a>
                        </h4>
                    </div>
                    <div id="prompt-options" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                        <div class="panel-body">
                            <fieldset class="prompt-fieldset" disabled="">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label">Type</label>
                                            <input type="text" class="form-control" name="type" value="text"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label">Placeholder</label>
                                            <input type="text" class="form-control" name="placeholder" value=""/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label">Value</label>
                                            <input type="text" class="form-control" name="value" value=""/>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label">Label</label>
                                            <input type="text" class="form-control" name="label"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label"></label>
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="multiline"> Multiline
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label">Lines <small class="text-muted">(For multiline)</small></label>
                                            <input type="number" class="form-control" name="lines" value=""/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingThree">
                        <h4 class="panel-title">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#progress-options" aria-expanded="false" aria-controls="collapseThree">
                                Progress options
                            </a>
                        </h4>
                    </div>
                    <div id="progress-options" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                        <div class="panel-body">
                            <div class="callout callout-danger">
                                <p>Progress does not update itself.</p>
                                <p>But you can implement it easily when uploading or waiting something</p>
                            </div>
                            <fieldset class="progress-fieldset" disabled="">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="control-label">Label</label>
                                        <input type="text" class="form-control" name="label" value=""/>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label"></label>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="showProgressLabel" checked> Progress label
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary">Create popup</button>
        </form>
    </div>
    <div class="container">
        <!--<h2>LobiBox alert examples</h2>-->
        
<!--        <button id="default" class="btn btn-default">Show Default</button>
        <button id="prompt" class="btn btn-default">Prompt</button>
        <button id="promptNumber" class="btn btn-default">Prompt Number</button>
        <button id="promptColor" class="btn btn-default">Choose Color</button>
        <button id="multilinePrompt" class="btn btn-default">Multiline Prompt</button>
        <button id="window" class="btn btn-default">Window</button>
        <button id="progress" class="btn btn-default">Progress</button>-->

        <form role="form" id="windowContent" style="display: none">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Example block-level help text here.</p>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox"> Check me out
                </label>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Example block-level help text here.</p>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox"> Check me out
                </label>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Example block-level help text here.</p>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox"> Check me out
                </label>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Example block-level help text here.</p>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox"> Check me out
                </label>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Example block-level help text here.</p>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox"> Check me out
                </label>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Example block-level help text here.</p>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox"> Check me out
                </label>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>

    <div class="container">
        <h2>LobiBox notifications</h2>
        
        <fieldset>
            <legend>Basic notifications <small class="text-muted"><small>Can be closed by clicking on it</small></small></legend>
            <div>
                <button id="basicInfo" class="btn btn-info">Info</button>
                <button id="basicWarning" class="btn btn-warning">Warning</button>
                <button id="basicError" class="btn btn-danger">Error</button>
                <button id="basicSuccess" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes. Slight fallen one opportunity dyspepsia, puzzled quickening throbbing row worm numerous sagittis wreaths.'
});
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>With image</legend>
            <div>
                <button id="basicInfoImage" class="btn btn-info">Info</button>
                <button id="basicWarningImage" class="btn btn-warning">Warning</button>
                <button id="basicErrorImage" class="btn btn-danger">Error</button>
                <button id="basicSuccessImage" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
    <pre><code>Lobibox.notify(type, {
    ...
    img: '...', //path to image
});
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Disable sound</legend>
            <div>
                <button id="basicInfoNoSound" class="btn btn-info">Info</button>
                <button id="basicWarningNoSound" class="btn btn-warning">Warning</button>
                <button id="basicErrorNoSound" class="btn btn-danger">Error</button>
                <button id="basicSuccessNoSound" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    sound: false,
});        
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Custom title</legend>
            <div>
                <button id="basicInfoCustomTitle" class="btn btn-info">Info</button>
                <button id="basicWarningCustomTitle" class="btn btn-warning">Warning</button>
                <button id="basicErrorCustomTitle" class="btn btn-danger">Error</button>
                <button id="basicSuccessCustomTitle" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    title: 'Custom title',
});      
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Without icon and image</legend>
            <div>
                <button id="basicInfoNoIcon" class="btn btn-info">Info</button>
                <button id="basicWarningNoIcon" class="btn btn-warning">Warning</button>
                <button id="basicErrorNoIcon" class="btn btn-danger">Error</button>
                <button id="basicSuccessNoIcon" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    icon: false,
});      
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Increase delay time</legend>
            <div>
                <button id="basicInfoCustomDelay" class="btn btn-info">Info</button>
                <button id="basicWarningCustomDelay" class="btn btn-warning">Warning</button>
                <button id="basicErrorCustomDelay" class="btn btn-danger">Error</button>
                <button id="basicSuccessCustomDelay" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    delay: 15000,  //In milliseconds
});      
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Sticky (without delay)</legend>
            <div>
                <button id="basicInfoNoDelay" class="btn btn-info">Info</button>
                <button id="basicWarningNoDelay" class="btn btn-warning">Warning</button>
                <button id="basicErrorNoDelay" class="btn btn-danger">Error</button>
                <button id="basicSuccessNoDelay" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
    <pre><code>Lobibox.notify(type, {
    ...
    delay: false,
});      
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Alternative position</legend>
            <div>
                <button id="basicInfoPosition" class="btn btn-info">Info</button>
                <button id="basicWarningPosition" class="btn btn-warning">Warning</button>
                <button id="basicErrorPosition" class="btn btn-danger">Error</button>
                <button id="basicSuccessPosition" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    position: 'bottom right' //AVAILABLE OPTIONS: 'top left', 'top right', 'bottom left', 'bottom right'
});      
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Change width</legend>
            <div>
                <button id="basicInfoWidth" class="btn btn-info">Info</button>
                <button id="basicWarningWidth" class="btn btn-warning">Warning</button>
                <button id="basicErrorWidth" class="btn btn-danger">Error</button>
                <button id="basicSuccessWidth" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    width: 400 //Any Integer
});      
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Change Animation</legend>
            <p class="text-muted">For animation Lobibox is depended on animate.css. You can use any animate.css classes</p>
            <p>By default <code>.animated</code> class is added</p>
            <div>
                <button id="basicInfoAnimation" class="btn btn-info">Info</button>
                <button id="basicWarningAnimation" class="btn btn-warning">Warning</button>
                <button id="basicErrorAnimation" class="btn btn-danger">Error</button>
                <button id="basicSuccessAnimation" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    showClass: 'fadeInDown',
    hideClass: 'fadeUpDown',
    width: 400 //Any Integer
});      
</code></pre>
            </div>
        </fieldset>
    </div>
    <br><br><br><br><br><br><br>
    
    
    
    
    
    
    
    
    
    
    
    <div class="container">
        <h2>Large Notifications</h2>
        <fieldset>
            <p>Large notifications</p>
            <ul>
                <li>are sticky</li>
                <li>can be closed only by clicking close button</li>
                <li>does not have delay</li>
                <li>are larger in width</li>
            </ul>
            <div>
                <button id="largeInfoBasic" class="btn btn-info">Info</button>
                <button id="largeWarningBasic" class="btn btn-warning">Warning</button>
                <button id="largeErrorBasic" class="btn btn-danger">Error</button>
                <button id="largeSuccessBasic" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    size: 'large',
    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
});        
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <h3>With Image</h3>
            <div>
                <button id="largeInfoImage" class="btn btn-info">Info</button>
                <button id="largeWarningImage" class="btn btn-warning">Warning</button>
                <button id="largeErrorImage" class="btn btn-danger">Error</button>
                <button id="largeSuccessImage" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
                <pre><code>Lobibox.notify(type, {
    ...
    img: '...',
    size: 'large',
    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
});        
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Alternative position</legend>
            <div>
                <button id="largeInfoPosition" class="btn btn-info">Info</button>
                <button id="largeWarningPosition" class="btn btn-warning">Warning</button>
                <button id="largeErrorPosition" class="btn btn-danger">Error</button>
                <button id="largeSuccessPosition" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    size: 'large',
    position: 'bottom left',
    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
});        
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <legend>Change animation</legend>
            <div>
                <button id="largeInfoAnimation" class="btn btn-info">Info</button>
                <button id="largeWarningAnimation" class="btn btn-warning">Warning</button>
                <button id="largeErrorAnimation" class="btn btn-danger">Error</button>
                <button id="largeSuccessAnimation" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    size: 'large',
    showClass: 'fadeInDown',
    hideClass: 'fadeUpDown',
    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
});        
</code></pre>
            </div>
        </fieldset>
    </div>
    <br><br><br><br><br><br><br>
    
    
    
    
    
    <div class="container">
        <h2>Mini notifications</h2>
        <p>For mini notifications icon and image is shown on small size and title is disabled by default. Although you can enable it by giving <code>title</code> parameter when initializing.</p>
        <fieldset>
            <div>
                <button id="miniInfoAnimation" class="btn btn-info">Info</button>
                <button id="miniWarningAnimation" class="btn btn-warning">Warning</button>
                <button id="miniErrorAnimation" class="btn btn-danger">Error</button>
                <button id="miniSuccessAnimation" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    size: 'mini',
    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
});        
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <h3>With image</h3>
            <div>
                <button id="miniInfoImage" class="btn btn-info">Info</button>
                <button id="miniWarningImage" class="btn btn-warning">Warning</button>
                <button id="miniErrorImage" class="btn btn-danger">Error</button>
                <button id="miniSuccessImage" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    size: 'mini',
    img: '...',
    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
});        
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <h3>Without icon</h3>
            <div>
                <button id="miniInfoNoIcon" class="btn btn-info">Info</button>
                <button id="miniWarningNoIcon" class="btn btn-warning">Warning</button>
                <button id="miniErrorNoIcon" class="btn btn-danger">Error</button>
                <button id="miniSuccessNoIcon" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    size: 'mini',
    icon: false,
    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
});        
</code></pre>
            </div>
        </fieldset>
        <fieldset>
            <h3>With title</h3>
            <div>
                <button id="miniInfoTitle" class="btn btn-info">Info</button>
                <button id="miniWarningTitle" class="btn btn-warning">Warning</button>
                <button id="miniErrorTitle" class="btn btn-danger">Error</button>
                <button id="miniSuccessTitle" class="btn btn-success">Success</button>
            </div>
            <div class="highlight">
<pre><code>Lobibox.notify(type, {
    ...
    size: 'mini',
    title: 'Lorem ipsum',
    msg: 'Lorem ipsum dolor sit amet against apennine any created, spend loveliest, building stripes.'
});        
</code></pre>
            </div>
        </fieldset>
    </div>
</div>