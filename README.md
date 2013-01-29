# Link preview plugin for Twitter Bootstrap

bootstrap-linkpreview.js is a JavaScript library offering a facebook-like preview for URLs. It is very simple to use and weighs just a few kilobytes.

[Demo](http://romainpiel.com/linkpreview/)

![](http://www.ekito.fr/people/wp-content/uploads/2013/01/Screen-Shot-2013-01-17-at-12.13.11-PM.png)

## One limitation: the same origin policy

You may want to try this library locally from a HTML file but you will face this issue:

``
XMLHttpRequest cannot load *…* Origin : * is not allowed by Access-Control-Allow-Origin.
``

This is due to the [Same origin policy](http://en.wikipedia.org/wiki/Same_origin_policy) concept. Ajax calls can only be achieved with a URL based on the same domain they are launched on. That’s why you usually want to process link previews on your server. But sometimes you don’t have any other way than doing it on the client’s side.

Anyway don’t panic, this library is working perfectly with some conditions.

## Demos

The best way to know how to use this library is to go through the examples in the folder `demos`. There you find two ways to get around the same origin policy.

### php-proxy

This example demonstrates how to use the library from a website. It simply filters every jQuery ajax calls and echoes it on the server. That way the ajax call get the results back. To run the code, simply upload the demo on your server or run a local Apache server.

Thanks to [this thread](http://stackoverflow.com/a/12683591/334209) for the php script.

### chrome-extension

The advantage with Google Chrome extensions is that it gives a way to bypass the same origin policy. To run it, follow [these steps](http://developer.chrome.com/extensions/getstarted.html#unpacked).


## How to use bootstrap-linkpreview?

Call the library via javascript:

```javascript
$('.element').linkpreview()
```

$('.element') can point to `<input>`, `<textarea>` or `<a>`. Without any parameters, this will load the URL(s) and generate the preview just after the element(s).

### Options

There are a few options available for this library, e.g:

```javascript
$('.element').linkpreview({
	previewContainer: "#preview-container",
	refreshButton: "#refresh-button",
	onSuccess: function(data) {
		console.log("Winner!");
	}
})
```

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <th>url</th>
    <td>URL</td>
    <td>$element.val() || $element.attr('href')</td>
    <td>URL to use instead of the element's content</td>
  </tr>
  <tr>
    <th>previewContainer</th>
    <td>Selector</td>
    <td>$element.after()</td>
    <td>Container block receiving the preview of the link</td>
  </tr>
  <tr>
    <th>previewContainerClass</th>
    <td>String</td>
    <td>row-fluid well</td>
    <td>Class of the previewContainer</td>
  </tr>
  <tr>
    <th>refreshButton</th>
    <td>Selector</td>
    <td></td>
    <td>Button refreshing the preview</td>
  </tr>
  <tr>
    <th>errorMessage</th>
    <td>String</td>
    <td>We are sorry we couldn't load the preview. The URL is invalid.</td>
    <td>Custom error message</td>
  </tr>
  <tr>
    <th>preProcess</th>
    <td>Function</td>
    <td></td>
    <td>Treatment to make before we load the link</td>
  </tr>
  <tr>
    <th>onSuccess</th>
    <td>Function</td>
    <td></td>
    <td>Callback when the data is loaded</td>
  </tr>
  <tr>
    <th>onError</th>
    <td>Function</td>
    <td></td>
    <td>Callback when an error occurred while processing the preview</td>
  </tr>
  <tr>
    <th>onComplete</th>
    <td>Function</td>
    <td></td>
    <td>Callback when a result has been received</td>
  </tr>
</table>

## Dependencies

All dependencies can be found under the folder `deps`:

- [jQuery 1.8.3](http://jquery.com/)
- [Twitter Bootstrap](http://twitter.github.com/bootstrap/)

## License

Copyright 2013 Ekito - http://www.ekito.fr/
 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
