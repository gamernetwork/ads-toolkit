MPCubed
=======

Build
-----------
The build script is a python script that compiles the various versions of the cube, generally you should build all. The built and compressed files will live in release.

Development
-----------
While developing the cube you can preview the working version from the example folder as it uses files from src.

SRC
-----------
All source code is in src and is fully documented.

CubeAd has all basic functionality of the cube.

DFPCubeAd has some extra DFP methods to break itself out of an iframe and put itself on a page.

PortraitDFPCubeAd is a version with all DFP methods and extra multimedia options, it includes the gallery and video playback.

API
-----------
To create a toybox use:

var cubeAd = new DFPCubeAd(targetNode (DOMElement), 
{img: “Fallback img URL”, url: “Link”},
{img: “Face 1 img URL”, url: “Link”},
{img: “Face 2 img URL”, url: “Link”},
{img: “Face 3 img URL”, url: “Link”},
{img: “Face 4”, url: “Link”} )

A cube face can take various object parameters
{img: "", url: ""} or {img: ""}

{"dom": "String"} or {"dom": Object}

The portrait cube supports more face types, they are:
{video: {url: "Video MP4 URL", poster: "IMG URL"(optional)}}

{gallery: {galleryPoster: {}, img1: {}, img2: {}, img3: {}, img4: {}}}

desktopSupported(default=false) can also be passed into the constructor as an optional extra.

To change a face on the fly use cubeAd.setFace(1, faceObj);

For full details, go here:
-----------
https://docs.google.com/document/d/12SXnndGgRWI50nwu0My_OeNTyNODo85EK4cFWVYJbtw/edit
