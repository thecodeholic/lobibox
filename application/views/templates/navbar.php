            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="<?php echo base_url() ?>">LobiBox</a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li<?php echo uri_string() === '' ? ' class="active"' : ''?>><a href="<?php echo base_url()?>">Home <span class="sr-only">(current)</span></a></li>
                            <li<?php echo uri_string() === 'main/examples' ? ' class="active"' : ''?>><a href="<?php echo base_url('main/examples')?>">Examples</a></li>
                            <li<?php echo uri_string() === 'main/doc' ? ' class="active"' : ''?>><a href="<?php echo base_url('main/doc')?>">Documentation</a></li>
                        </ul>

                        <ul class="nav navbar-nav navbar-right">
                            
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>