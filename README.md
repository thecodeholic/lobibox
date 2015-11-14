# Lobibox
Responsive jQuery notification plugin written from scratch.

[View Demo](http://lobianijs.com/site/lobibox-responsive-jquery-messagebox-and-notification-plugin-available-for-commercial-and-non-commercial-usages.html)

### Description

##### Lobibox is divided into two parts

- Messageboxes
- Notifications

#### Messageboxes

*   Lobibox messagesboxes can be modal and not modal
*   Possibility to show multiple messages
*   Use any available animation class for showing and hiding messageboxes
*   Every message can be draggable (On small screens dragging is disabled)
*   You can show
    *   **messagesboxes in different colors and icons**
    *   **confirm message**
    *   **one line prompt** (Any HTML5 input type can be used in prompt window. Such as: text, color, date, datetime, email, number, range etc)
    *   **multiline prompt**
    *   **Progress messagebox**. Lobibox comes with default progress style but you can use bootstrap or any other style progress bar.
    *   **custom content window with ajax support with custom action buttons**
*   Every message is an instance of plugin. You can easily grab the instance and attach events or call methods directly on the instance.

#### Notifications

*   Different color support
*   Possibility to show in any corners of the screen
*   Delay
*   Show delay indicator
*   Show with image
*   Sound support
*   Size support. You can show notifications of different size

### Installation and dependecies

Lobibox is only depended on jQuery. But for best visual result and icons it's highly recommended to include bootstrap.css 

#### 1. Include necessary css/js files

```html
<!DOCTYPE html>
<html>
   <head>
      <!--Include this css file in the <head> tag -->
      <link rel="stylesheet" href="bootstrap/dist/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="dist/css/Lobibox.min.css"/>
   </head>
   
   <body>
      ...
      <!--Include these script files in the <head> or <body> tag-->
      <script src="lib/jquery.1.11.min.js"></script>
      <script src="dist/js/Lobibox.min.js"></script>
      <!-- If you do not need both (messageboxes and notifications) you can inclue only one of them -->
      <!-- <script src="dist/js/messageboxes.min.js"></script> -->
      <!-- <script src="dist/js/notifications.min.js"></script> -->
   </body>
</html>
```

#### 2. Call plugin method to show messageboxes or notifications

...

### For documentation and examples visit the plugin's [home page](http://lobianijs.com/site/lobibox-responsive-jquery-messagebox-and-notification-plugin-available-for-commercial-and-non-commercial-usages.html)
