# Lobibox
Responsive jQuery notification plugin

### Small Description

##### Lobibox is devided into two parts

- Messageboxes
- Notifications

#### Messageboxes

*   Lobibox messagesboxes can be modal and not modal
*   You can show multiple messages at the same time
*   Use any available animation class for showing and hiding messageboxes
*   Every message can be draggable (On small screens dragging is disabled)
*   You can show
    *   **messagesboxes in different colors and icons**
    *   **confirm message**
    *   **one line prompt**
    *   **multiline prompt**
    *   **Any HTML5 input type can be used in prompt window. Such as: text, color, date, datetime, email, number, range etc.**
    *   **Progress messagebox**. Lobibox comes with default progress style but you can use bootstrap or any other style progress bar.
    *   **custom content window with ajax support with custom action buttons**
*   Every message is an instance of plugin. You can easily grab the instance and attach events or call methods directly by the instance.

#### Notifications

*   Different color support
*   Possibility to show in any corners of the screen
*   Delay
*   Show delay indicator
*   Show with image
*   Sound support
*   Size support. You can show notifications of different size

### Instalation and dependecies

Lobibox is only depended on jQuery.

1. **Include necessary css/js files**

```html
<!DOCTYPE html>
<html>
   <head>
      <!--Include this css file in the <head> tag -->
      <link rel="stylesheet" href="dist/css/Lobibox.min.css"/>
   </head>
   
   <body>
      ...
      <!--Include these script files in the <head> or <body> tag-->
      <script src="lib/jquery.1.11.min.js"></script>
      <script src="dist/js/Lobibox.min.js"></script>
   </body>
</html>
```

2. **Call plugin method to show messageboxes or notifications**
