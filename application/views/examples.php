<div>
    <div class="container">
        <h2>LobiBox alert examples</h2>
        <button id="yesNo" class="btn btn-primary">Yes No</button>
        <button id="primary" class="btn btn-primary">Show primary</button>
        <button id="error" class="btn btn-danger">Show Error</button>
        <button id="success" class="btn btn-success">Show Success</button>
        <button id="info" class="btn btn-info">Show info</button>
        <button id="warning" class="btn btn-warning">Show Warning</button>
        <button id="default" class="btn btn-default">Show Default</button>
        <button id="prompt" class="btn btn-default">Prompt</button>
        <button id="promptNumber" class="btn btn-default">Prompt Number</button>
        <button id="promptColor" class="btn btn-default">Choose Color</button>
        <button id="multilinePrompt" class="btn btn-default">Multiline Prompt</button>
        <button id="window" class="btn btn-default">Window</button>
        <button id="progress" class="btn btn-default">Progress</button>

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