import Engine from "./Engine";
import matAl from "../matAl";

export default class Device extends Engine {
    constructor(canvas){
        super(canvas)
    }
    
    clear(){
        // clear canvas with default color
        this.workingContext.clearRect(0, 0, this.workingWidth, this.workingHeight);

        // get image data from back buffer
        // clear out back buffer with blank canvas
        this.backBuffer = this.workingContext.getImageData(0, 0, this.workingWidth, this.workingHeight);
    };
    
    render(camera, meshes){
        let rendered = {
            meshes: 0,
            grid: false
        }

        // this.displayGrid(camera);

        this.renderMeshes(camera, meshes, (mesh, transMatrix) => {
            this.renderFaces(mesh, transMatrix);
            this.displayMeshAxes(mesh, transMatrix);
            rendered.meshes++
            if(rendered.meshes === meshes.length){this.present();}
            
        });        
    }

    displayMeshAxes(mesh, transMatrix){
        let originVector = new matAl.Vector3(0, 0, 0);
        let originPixel = this.project(originVector, transMatrix);
        let axes = mesh.Axes;

        for(let axis in axes){
            let axisVector = new matAl.Vector3(axes[axis].x, axes[axis].y, axes[axis].z);
            let axisPixel = this.project(axisVector, transMatrix);
            let color4 = new matAl.Color4(1, 1, 1, 1);
            
            this.drawBline(originPixel, axisPixel, color4);
        }
    }

    displayGrid(camera){   
                 
        let grid = this.grid;
        let size = grid.Size;
        let increment = grid.Increment;
        
        // generate view matrix
        var viewMatrix = matAl.Matrix.lookAtLH(camera.Position, camera.Target, matAl.Vector3.up())
        // viewMatrix.View()
        let cameraRotationMatrix = matAl.Matrix.rotationYawPitchRoll(
            camera.Rotation.y, camera.Rotation.x, camera.Rotation.z
        )

        // apply camera rotation to the object
        viewMatrix = cameraRotationMatrix.Multiply(viewMatrix)

        // generate field of view projection matrix
        var fieldOfView = 3.14 / 4; //pi/4
        var aspectRatio = this.workingWidth / this.workingHeight; // width/height
        var clipNearDistance = 0.01; // largest as possible;
        var clipFarDistance = 1.0; // smallest as possible;
        
        var projectMatrix = matAl.Matrix.perspectiveFovLH(fieldOfView, aspectRatio, clipNearDistance, clipFarDistance)

        // generate world matrix 
        var worldMatrix = matAl.Matrix.rotationYawPitchRoll(
            grid.Rotation.y, grid.Rotation.x, grid.Rotation.z
        ).Multiply(matAl.Matrix.translation(
            grid.Position.x, grid.Position.y, grid.Position.z
        ));

        var transformMatrix = worldMatrix.Multiply(viewMatrix).Multiply(projectMatrix);

        for(let side in grid.Vertices){
            // for each side of the box, loop through each nested array and 
            // retrieve the xyz coordinates
            // create new vector and transform that vector
            // use two opposite points and draw a line between them
            for(let len = -size; len < size; len = len + increment){
                // create new 3D vector at edge of box
                let points = []
                for(let i = 0; i < grid.Vertices[side].length; i++){
                    let x, y, z;
                    // retreive xyz coordinates
                    grid.Vertices[side][i][0] !== 0 ? x = grid.Vertices[side][i][0] : x = len;
                    grid.Vertices[side][i][1] !== 0 ? y = grid.Vertices[side][i][1] : y = len;
                    grid.Vertices[side][i][2] !== 0 ? z = grid.Vertices[side][i][2] : z = len;
                    
        
                    y += size;
        
                    points.push(new matAl.Vector3(x, y, z));
                }

                // project pixel into screen coordinates
                let pointA = this.project(points[0], transformMatrix);
                let pointB = this.project(points[1], transformMatrix);
                let pointC = this.project(points[2], transformMatrix);
                let pointD = this.project(points[3], transformMatrix);
                
                
                this.drawBline(pointA, pointB, grid.Color4);
                this.drawBline(pointC, pointD, grid.Color4);
            }
        };
    }


    present(){
        // push data from back buffer into front buffer (canvas)
        this.workingContext.putImageData(this.backBuffer, 0, 0);
    }

    

}
