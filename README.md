#GetTip v1.0

jQuery Plugin to create user-friendly **tooltips**. GetTip is absolutely free of charge and you can use, copy, merge, publish and distribute the plugin without any limitations.

##Quick Start
First need to initialize plugin in document and indicate the default settings. Then you can specify unique settings the plugin for each element through tag.
###Example
```html
<link type="text/css" rel="stylesheet" href="gettip.css" />
<script src="jquery.min.js"></script>
<script src="jquery.gettip.min.js"></script>
<script>
  $("[data-tooltip]").getTip();
</script>

<a href="#" data-tooltip="{options}" title="Tooltip">Link</a>
```
##Plugin options
###Default options
```javascript
"offset" : 8, // Offset tooltip (in pixels)
"pos" : "top", // Position where the tooltip should appear ("left", "top", "right", "bottom")
"on" : "hover", // Event used to trigger tooltip ("hover", "click", "focus")
"delay" : 0, // Delay before showing a tooltip (in milliseconds)
"duration" : 200, // Duration of animation events (in milliseconds)
```