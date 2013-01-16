# Link preview plugin for Twitter Bootstrap

A simple link preview js library using Twitter Bootstrap styling components.

## What does it do?

bootstrap-linkpreview.js is a JavaScript library offering a facebook-like preview for URLs. It's very simple to use and it's just a few Ko.

Usually you would like to process that kind of things on a server but sometimes you can have no other way than doing it locally. The main issue with local ajax calls is that it will return the exception:

``
XMLHttpRequest cannot load *…* Origin : * is not allowed by Access-Control-Allow-Origin.
``

It is due to the [Same origin policy](http://en.wikipedia.org/wiki/Same_origin_policy) concept.

## Demos

The best way to know how to use this library is to go through the examples in the folder `demos`. You have here several ways to go through the same origin policy.

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