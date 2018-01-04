import matAl from "../matAl";

export default class GraphicEngine {
    constructor(canvas){
        // Grab canvas information
        if(canvas){
            this.workingCanvas = canvas;
            this.workingHeight = canvas.height;
            this.workingWidth = canvas.width;
            this.workingContext = canvas.getContext("2d");
        };
    }

    drawLine(pointA, pointB){
        // calulate distance between two points
        let distance =  pointA.Subtract(pointB).Magnitude();
        // console.log(distance)
        // if distance is less than 2, then exist out of loop
        if(distance < 2){
            return;
        }else{
            // find the middle point and draw it on the canvas
            let midPoint = pointA.Add(pointB.Subtract(pointA).Scale(0.005));
            // console.log(pointA, pointB, midPoint)
            this.drawPoint(midPoint)
            // console.log(midPoint)
            // recursively draw between pointA to midPoint and midPoint and pointB
            this.drawLine(pointA, midPoint);
            this.drawLine(midPoint, pointB);
        }
    }

    drawBline(point0, point1, color4) {
        var x0 = point0.x >> 0;
        var y0 = point0.y >> 0;
        var x1 = point1.x >> 0;
        var y1 = point1.y >> 0;
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;
        while(true) {
            this.drawPoint(new matAl.Vector2(x0, y0), color4);
            if((x0 === x1) && (y0 === y1)) break;
            var e2 = 2 * err;
            if(e2 > -dy) { err -= dy; x0 += sx; }
            if(e2 < dx) { err += dx; y0 += sy; }
        }
    };


    renderFaces(mesh, transformMatrix){
        for(var face = 0; face < mesh.Faces.length; face++){
            var cFace = mesh.Faces[face];
            var vertexA = mesh.Vertices[cFace.A];
            var vertexB = mesh.Vertices[cFace.B];
            var vertexC = mesh.Vertices[cFace.C];

            let pixelA = this.project(vertexA, transformMatrix);
            let pixelB = this.project(vertexB, transformMatrix);
            let pixelC = this.project(vertexC, transformMatrix);

            this.drawBline(pixelA, pixelB, mesh.Color4);
            this.drawBline(pixelB, pixelC, mesh.Color4);
            this.drawBline(pixelC, pixelA, mesh.Color4);
        };
    }

    renderMeshes(camera, meshes, cb){
        // main method for recomputing vertices

                // generate view matrix
                var viewMatrix = matAl.Matrix.lookAtLH(camera.Position, camera.Target, matAl.Vector3.up())
                // viewMatrix.View()
                let cameraRotationMatrix = matAl.Matrix.rotationYawPitchRoll(
                    camera.Rotation.y, camera.Rotation.x, camera.Rotation.z
                )
        
                // apply camera rotation to the object
                viewMatrix = cameraRotationMatrix.Multiply(viewMatrix)
        
                // generate field of view projection matrix
                var fieldOfView = 3.14/4; //pi/4
                var aspectRatio = this.workingWidth/this.workingHeight; // width/height
                var clipNearDistance = 0.01; // largest as possible;
                var clipFarDistance = 1.0; // smallest as possible;
                
                var projectMatrix = matAl.Matrix.perspectiveFovLH(fieldOfView, aspectRatio, clipNearDistance, clipFarDistance)
                // projectMatrix.View();
                // generate world matrix

                
                for(var index = 0; index < meshes.length; index++){
                    // if distance is less than 2, then exist out of loop
                    // current mesh
                    var cMesh = meshes[index];
                    // console.log(cMesh.Name)
                    // apply rotation before transaltion
                    var worldMatrix = matAl.Matrix.rotationYawPitchRoll(
                        cMesh.Rotation.y, cMesh.Rotation.x, cMesh.Rotation.z
                    ).Multiply(matAl.Matrix.translation(
                        cMesh.Position.x, cMesh.Position.y, cMesh.Position.z
                    ));
        
                    // generate transform matrix
                    var transformMatrix = worldMatrix.Multiply(viewMatrix).Multiply(projectMatrix);
                    
                    // write callback
                    cb ? cb(cMesh, transformMatrix) : null;
                };
    }

    project(coord, matrix){
        // return transformed 3D matrix from projection space
        var point = matAl.Vector3.transformCoordinates(coord, matrix);
        // console.log(point)
        // transformed matrix will based the coordinate system from the center of the screen
        // need to transformed again so that it will be at the top left
        var x = point.x * this.workingWidth + this.workingWidth / 2.0 >> 0;
        var y = -point.y * this.workingHeight + this.workingHeight / 2.0 >> 0;
        var z = point.z  * this.workingHeight >> 0;
    
        return new matAl.Vector3(x, y, z); 
    }

    drawPoint(point, color4){
        let r, g, b, a;

        // Clipping what is visible on screen
        // console.log(color4)
        if(point.x >= 0 && point.y >= 0 && point.x < this.workingWidth && point.y < this.workingHeight){
            if(color4){
                this.putPixel(point.x, point.y, new matAl.Color4(color4.r, color4.b, color4.g, color4.a));                    
            }else{
                this.putPixel(point.x, point.y, new matAl.Color4(.5 , 1, 0, 1));
            };
        };
    };

    putPixel(x, y, color){

        if(this.backBuffer.data){
            this.backBufferData = this.backBuffer.data;
        }else{
            this.backBufferData = [];
        }

        var index = ((x >> 0) + (y >> 0) * this.workingWidth) * 4;
        //RGBA color space in 2D coordinate
        this.backBufferData[index] = color.r * 255;
        this.backBufferData[index+1] = color.g * 255;
        this.backBufferData[index+2] = color.b * 255;
        this.backBufferData[index+3] = color.a * 255;
    }

    putText(text, x, y, font, color){
        // write text at xy coordinate of vertice
        // Set font size, style, and color
        this.workingContext.font = font || "12px Arial";            
        this.workingContext.fillStyle = color || "#FFFFFF";
        // write text into canvas
        this.workingContext.fillText(text, x, y);

    }
}