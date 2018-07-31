jQuery Plugin to create nice blur backgrounds from an image. Want to see an example? Have a look here: https://blurr.k8.cleverthings.io/

**Support**

- IE 8/9 (partial)
- IE 9+ (full)
- Chrome (desktop/mobile)
- Firefox
- Opera
- Safari (desktop/mobile)

**Not supported, yet**
- Safari on Windows

**Not tested**
- iPad

**Required**

- jQuery (most versions will work)
- Blurr
- A web page
- Some `divs`

**Example inclusion**

    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="jquery.blurr.js"></script>

**How to install**

First, make sure jQuery is included on the page *above* the inclusion of jquery.blurr.js. Then, grab yourself an image. Any size will do (TM). 

Create a div, like so:

    <div class="blur-this" data-href="example-image.jpg"><div>Text content inside the blur</div></div>
    
Note, you'll need that `div` inside the Blurr div. This is used by the plugin to ensure the text you enter is visible above the blurred graphic.

Now, initialise the plugin:

            
    $(document).ready(function() {
        $('.blur-this').blurr({
            height: 300, // Height, in pixels of this blurred div.
            sharpness: 40, // Sharpness, as a number between 0-100. 100 is very sharp, 0 is extremely blurry
            offsetX: 0, // The x (left - right) offset of the image
            offsetY: 0, // The y (top - bottom) offset of the image
            callback: null // Callback to be called after the blur has been rendered. Recieves the following arguments (href, offsetX, offsetY, sharpness)
        });
    });
            
        
And sit back to watch the glory unfold.

Example
==
An example is available in the root of this repository in the `index.html` page.

