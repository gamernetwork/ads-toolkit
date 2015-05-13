/**
 * Cube Ad Format
 * @class CubeAd
 * @constructor
 * @param {Object} parentNode
 * @param {String}{Object} fallback
 * @param {String}{Object} face1
 * @param {String}{Object} face2
 * @param {String}{Object} face3
 * @param {String}{Object} face4
 * @param {Boolean} desktopSupport
 */
var CubeAd = function(targetNode, fallback, face1, face2, face3, face4, face5, face6, desktopSupport)
{
    this.init(targetNode, fallback, face1, face2, face3, face4, face5, face6, desktopSupport);
};

CubeAd.FPS = 30;

CubeAd.prototype.targetNode;
CubeAd.prototype.cubeFaces;
CubeAd.prototype.fallback;
CubeAd.prototype.toyboxElement;
CubeAd.prototype.cubeElement;
CubeAd.prototype.parentBody;
CubeAd.prototype.desktopSupported;
CubeAd.prototype.cubeTransform;

//heavy lifting variables
CubeAd.prototype.xDeg = 0;
CubeAd.prototype.yDeg = 0;
CubeAd.prototype.startX = 0;
CubeAd.prototype.startY = 0;
CubeAd.prototype.currentAngleX = 0;
CubeAd.prototype.currentAngleY = 0;
CubeAd.prototype.currentTouchX = 0;
CubeAd.prototype.currentTouchY = 0;
CubeAd.prototype.currentDeltaY = 0;
CubeAd.prototype.currentDeltaX = 0;
CubeAd.prototype.oldDeltaY = 0;
CubeAd.prototype.oldDeltaX = 0;
CubeAd.prototype.momentumX = 0;
CubeAd.prototype.momentumY = 0;
CubeAd.prototype.touchStart = false;
CubeAd.prototype.touchEnd = false;
CubeAd.prototype.touching = false;

/**
 * @method init
 * @param {Object} targetNode
 * @param {String}{Object} fallback
 * @param {String}{Object} face1
 * @param {String}{Object} face2
 * @param {String}{Object} face3
 * @param {String}{Object} face4
 * @param {Boolean} desktopSupport
 */
CubeAd.prototype.init = function(targetNode, fallback, face1, face2, face3, face4, face5, face6, desktopSupport)
{
    this.targetNode = targetNode;
    this.cubeFaces = [];
    this.desktopSupported = desktopSupport;
    this.parentBody = targetNode.ownerDocument.getElementsByTagName("body")[0];
    
    this.buildCubeDOM();
    if(this.checkTransformSupport())
    {
        this.fallback.style.display = "none";
        
        this.setFace(1, face1);
        this.setFace(2, face2);
        this.setFace(3, face3);
        this.setFace(4, face4);
        
        if(face5)
        {
            this.setFace(0, face5);
        }
        if(face6)
        {
            this.setFace(5, face6);
        }
        
        this.attachListeners();
        
        this.loop = this.loop.bind(this);
        this.loop();
    }
    else
    {
        this.setFallback(fallback);
    }
};

/**
 * Builds cube HTML and appends it to the target node
 *
 * @method buildCubeDOM
 */
CubeAd.prototype.buildCubeDOM = function()
{
    //create fallback first
    this.fallback = document.createElement('div');
    this.fallback.setAttribute("id", "toybox-fallback");
    this.fallback.setAttribute("style", "width: 300px; margin-left: auto; margin-right: auto;");
    
    //toybox wrapper
    var toybox = document.createElement('div');
    toybox.setAttribute("id", "toybox");
    toybox.setAttribute("style", "display: none;");
    
    var cube = document.createElement('div');
    cube.setAttribute("id", "cube");
    
    //face generation
    var faceNames = ["one", "two", "three", "four", "five", "six"];
    for(var i = 0;i < faceNames.length; i++)
    {
        var cubeFace = document.createElement('div');
        cubeFace.setAttribute("class", "face " + faceNames[i]);
        cube.appendChild(cubeFace);
        this.cubeFaces.push(cubeFace);
    }
    
    toybox.appendChild(cube);
    this.targetNode.appendChild(this.fallback);
    this.targetNode.appendChild(toybox);
    this.toyboxElement = toybox;
    this.cubeElement = cube;
};

/**
 * Public interface to set the face with either an image URL or DOM element
 * @method setFace
 * @param {int} face
 * @param {String}{Object} faceData
 */
CubeAd.prototype.setFace = function(face, faceData)
{
    cubeFace = this.cubeFaces[face];
    cubeFace.innerHTML = "";
    
    if(typeof faceData == "object" && "nodeType" in faceData && faceData.nodeType === 1 && faceData.cloneNode)
    {
        cubeFace.appendChild(faceData);
    }
    else if(typeof faceData == "string")
    {
        var cubeImg = document.createElement('img');
        cubeImg.src = faceData;
        cubeFace.appendChild(cubeImg);
    }
    else
    {
        throw new Error("Unexpected face data");
    }
};

/**
 * Public interface to set the fallback MPU with either an image URL or DOM element
 * @method setFallback
 * @param {int} face
 * @param {String}{Object} faceData
 */
CubeAd.prototype.setFallback = function(fallbackData)
{
    this.fallback.innerHTML = "";
    
    if(typeof fallbackData == "object" && "nodeType" in fallbackData && fallbackData.nodeType === 1 && fallbackData.cloneNode)
    {
        fallback.appendChild(fallbackData);
    }
    else if(typeof fallbackData == "string")
    {
        var fallbackImg = document.createElement('img');
        fallbackImg.src = fallbackData;
        this.fallback.appendChild(fallbackImg);
    }
    else
    {
        throw new Error("Unexpected fallback data");
    }
};

/**
 * getFaces returns all cube faces in an array
 * @method getFaces
 * @return {Array} cubeFaces
 */
CubeAd.prototype.getFaces = function()
{
    return this.cubeFaces;
};

/**
 * returns a specific cube face
 * @method getFace
 * @return {DOM} cubeFace
 */
CubeAd.prototype.getFace = function(face)
{
    return this.cubeFaces[face];
};

/**
 * Sets up all touch events for the cube based on the target nodes body
 * @method attachListeners
 */
CubeAd.prototype.attachListeners = function()
{
    this.onInteractStart = this.onInteractStart.bind(this);
    this.onInteractMove = this.onInteractMove.bind(this);
    this.onInteractEnd = this.onInteractEnd.bind(this);
    
    this.parentBody.addEventListener('touchstart', this.onInteractStart);
    this.parentBody.addEventListener('touchmove', this.onInteractMove);
    this.parentBody.addEventListener('touchend', this.onInteractEnd);
    
    if(this.desktopSupported)
    {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        {
            this.desktopSupported = false;
        }
        else
        {
            this.parentBody.addEventListener('click', this.onInteractStart);
            this.parentBody.addEventListener('mousemove', this.onInteractMove);
            this.parentBody.addEventListener('mouseup', this.onInteractEnd);
        }
    }
};

/**
 * Checks for support of the CSS transform feature and returns the prefix required, used to see if the fallback is needed instead
 * @method checkTransformSupport
 * @return {String}
 */
CubeAd.prototype.checkTransformSupport = function()
{
    this.cubeTransform = null;
    var styles = ["webkitTransform", "msTransform", "transform"];
    for(var i = 0;i < styles.length; i++)
    {
        if(styles[i] in this.cubeElement.style)
        {
            this.cubeTransform = styles[i];
            return this.cubeTransform;
        }
    }
    return this.cubeTransform;
};

/**
 *Called when cube is first interacted with
 *@method onInteractStart
 *@param {event}
 */
CubeAd.prototype.onInteractStart = function(e)
{
    if(!this.touching)
    {
        if(!this.touchEnd)
        {
            if(!this.getY(e)) { return };
            var toyboxBounds = this.toyboxElement.getBoundingClientRect();
            var bodyBounds = this.parentBody.getBoundingClientRect();

            if(this.checkBounds(this.getX(e), this.getY(e), toyboxBounds.left, (toyboxBounds.top + 80) - bodyBounds.top, toyboxBounds.right, (toyboxBounds.bottom - 50) - bodyBounds.top))
            {   
                this.startX = this.getX(e);
                this.startY = this.getY(e);
                this.currentTouchX = this.getX(e);
                this.currentTouchY = this.getY(e);
                this.currentDeltaX = 0;
                this.currentDeltaY = 0;
                this.oldDeltaX = 0;
                this.oldDeltaY = 0;
                this.touchStart = true;
            }
        }
    }
};

/**
 *Called when cube is moved
 *@method onInteractMove
 *@param {event}
 */
CubeAd.prototype.onInteractMove = function(e)
{
    if(this.touching)
    {
        if(!this.touchEnd)
        {
            if(!this.getY(e)) { return };
            this.currentTouchX = this.getX(e);
            this.currentTouchY = this.getY(e);
            var toyboxBounds = this.toyboxElement.getBoundingClientRect();
            var bodyBounds = this.parentBody.getBoundingClientRect();

            if(this.checkBounds(this.currentTouchX, this.currentTouchY, toyboxBounds.left, (toyboxBounds.top + 80) - bodyBounds.top, toyboxBounds.right, (toyboxBounds.bottom - 50) - bodyBounds.top))
            {
                e.preventDefault();
            }
            else
            {
                this.touchEnd = true;
            }
        }
    }
};

/**
 *Called when cube interaction stops
 *@method onInteractEnd
 *@param {event}
 */
CubeAd.prototype.onInteractEnd = function(e)
{
    if(this.touching)
    {
        this.touchEnd = true;
    }
};

/**
 *Updates the cube's logic
 *@method update
 */
CubeAd.prototype.update = function()
{
    if(this.touchEnd)
    {
        this.momentumX = (this.oldDeltaX - this.currentDeltaX) * 0.8;
        this.momentumY = 0;
        this.oldDeltaY = 0;
        this.yDeg = 0;
        this.touching = false;
        this.touchEnd = false;
    }
    if(this.touching)
    {
        this.calculateNewAngle();
    }

    if(this.touchStart)
    {
        this.currentAngleX = this.xDeg;
        this.currentAngleY = this.yDeg;
        this.momentumX = 0;
        this.momentumY = 0;
        this.touching = true;
        this.touchStart = false;
    }
    
    if(Math.round(this.momentumX) != 0)
    {
        this.xDeg -= this.momentumX;
        this.momentumX *= 0.9;
    }
    if(Math.round(this.momentumY) != 0)
    {
        this.yDeg += this.momentumY;
        this.momentumY *= 0.9;
    }

    if(this.yDeg > 10)
    {
        this.yDeg = 10;
    }
    if(this.yDeg < -10)
    {
        this.yDeg = -10;
    }
};

/**
 *Sets the cube CSS property for repainting
 *@method draw
 */
CubeAd.prototype.draw = function()
{
    this.cubeElement.style[this.cubeTransform] = "rotateX("+ this.yDeg +"deg) rotateY("+ this.xDeg +"deg)";
};

/**
 *Main update and redraw loop, uses requestAnimationFrame
 *@method loop
 */
CubeAd.prototype.loop = function() {
    var that = this;
    setTimeout(function() {
        requestAnimationFrame(that.loop);
        that.update();
        that.draw();
    }, 1000 / CubeAd.FPS);
};

/**
 *Finds distances between previous touches and updates the cube angle
 *@method calculateNewAngle
 */
CubeAd.prototype.calculateNewAngle = function()
{
    var newX = this.currentTouchX;
    var newY = this.currentTouchY;

    this.oldDeltaY = this.currentDeltaY;
    this.oldDeltaX = this.currentDeltaX;

    this.currentDeltaY = newY - this.startY;
    this.currentDeltaX = newX - this.startX;

    this.xDeg = this.currentAngleX + (this.currentDeltaX * 0.5);
    this.yDeg = this.currentAngleY + ((-this.currentDeltaY) * 0.4);
}

/**
 *Used to see if the touch is within the advert boundary
 *@method checkBounds
 */
CubeAd.prototype.checkBounds = function(x, y, left, top, right, bottom)
{
    if(x > left && y > top && y < bottom && x < right)
    {
        return true;
    }
    return false;
};

/**
 *Returns the X position of the current interaction
 *@method getX
 *@param {event}
 */
CubeAd.prototype.getX = function(e)
{
    if(this.desktopSupported)
    {
        return e.clientX + document.body.scrollLeft;
    }
    else
    {
        if(!e.changedTouches)
        {
            return null;
        }
        return e.changedTouches[0].pageX;
    }
};

/**
 *Returns the Y position of the current interaction
 *@method getY
 *@param {event}
 */
CubeAd.prototype.getY = function(e)
{
    if(this.desktopSupported)
    {
        return e.clientY + document.body.scrollTop;
    }
    else
    {
        if(!e.changedTouches)
        {
            return null;
        }
        return e.changedTouches[0].pageY;
    }
};