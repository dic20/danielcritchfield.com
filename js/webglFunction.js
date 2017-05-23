var glContext;

function start() {
    var canvas = document.getElementById('glCanvas');

    // initializes context
    glContext = initWebGL(canvas);

    if(!glContext) {
        return;
    }

    // set clear color to black since the background is black
    glContext.clearColor(0.0, 0.0, 0.0, 1.0);

    // Enabling depth testing
    glContext.enable(glContext.DEPTH_TEST);

    // Make near objects obscure far away objects
    glContext.depthFunc(glContext.LEQUAL);

    // Clear color and depth buffer
    glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
    
}

function initWebGL(canvas) {
    glContext = null;

    // grabbing standard context or experimental if standard doesn't work
    glContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    // if context not initialized
    if(!glContext) {
        alert("Initalization falied. Browser may not support webgl.");
    }

    // return context
    return glContext;
}

function initShaders() {
    var fragmentShader = getShader(glContext, 'shader-fs');
    var vertexShader = getShader(glContext, 'shader-vs');

    // Create Shader Program

    shaderProgram = glContext.createProgram();
    glContext.attachShader(shaderProgram, vertexShader);
    glContext.attachShader(shaderProgram, fragmentShader);
    glContext.linkProgram(shaderProgram);

    // Check if creating program failed
    if (!glContext.getProgramParameter(shaderProgram, glContext.LINK_STATUS)) {
        alert('Unable to initialize the shader program');
    }

    // activate shader program

    glContext.useProgram(shaderProgram);

    vertexPositionAttribute = glContext.getAttribLocation(shaderProgram, 'aVertexPosition');
    glContext.enableVertexAttribArray(vertexPositionAttribute);
}

function getShader(glContext, id, type) {
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
        return null;
    }

    theSource = shaderScript.text;

    if (!type) {
        if (shaderScript.type == 'x-shader/x-fragment') {
            type = glContext.FRAGMENT_SHADER;
        } else if (shaderScript.type == 'x-shader/x-vertex') {
            type = glContext.VERTEX_SHADER;
        } else {
            // Unknown shader type
            return null;
        }
    }
    shader = glContext.createShader(type);

    glContext.shaderSource(shader, theSource);

    // Compile shader program
    glContext.compileShader(shader);

    // Check compilation
    if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        alert(glContext.getShaderInfoLogs(glContext.deleteShader(shader)));
        return null;
    }

    return shader;
}

var horizAspect = 480.0/640.0;
function initBuffers() {
    squareVerticesBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, squareVerticesBuffer);

    var vertices = [
        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0
    ];

    glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Arrray(vertices), glContext.STATIC_DRAW);
}