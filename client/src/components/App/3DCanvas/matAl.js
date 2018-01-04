
const matAl = function () {
    
    this.Color4 = (function(){
        function Color4(initR, initG, initB, initA){
            this.r = initR;
            this.g = initG;
            this.b = initB;
            this.a = initA;
        };

        return Color4;
    })();

    this.Vector2 = (function(){
        function Vector2(initX, initY){
            this.x = initX;
            this.y = initY;
        }

        Vector2.prototype.Add = function(other){
            let x = this.x + other.x;
            let y = this.y + other.y;

            return new Vector2(x, y);
        }

        Vector2.prototype.Subtract = function(other){
            let x = this.x - other.x;
            let y = this.y - other.y;

            return new Vector2(x, y);
        };

        Vector2.prototype.Scale = function(scale){
            let x = this.x * scale;
            let y = this.y * scale;

            return new Vector2(x, y);
        }

        Vector2.prototype.Magnitude = function(){
            let mag = Math.sqrt((this.x * this.x) + (this.y * this.y));
            mag = Math.abs(mag);

            return mag;
        };

        return Vector2;
    })();

    this.Vector3 = (function(){
        function Vector3(initX, initY, initZ){
            this.x = initX;
            this.y = initY;
            this.z = initZ;
        }
        
        // create zero vectors
        Vector3.zeros = function(){
            return new Vector3(0, 0, 0);
        }

        //  vectors representing world up orientation
        Vector3.up = function(){
            return new Vector3(0, 1, 0);
        }

        // copy new vector with constructor in order to inherit all the prototype
        Vector3.copy = function(source){
            return new Vector3(source.x, source.y, source.z)
        }

        Vector3.normalize = function(vector){
            let copy = Vector3.copy(vector);
            return copy;
        }

        // dot product
        Vector3.dot = function(left, right){
            return (left.x * right.x + left.y * right.y + left.z * right.z);
        }

        // cross product
        Vector3.cross = function(left, right){
            let x = (left.y * right.z) - (left.z * right.y);
            let y = (left.z * right.x) - (left.x * right.z);
            let z = (left.x * right.y) - (left.y * right.x);
            return new Vector3(x, y, z);
        }   
        

        Vector3.transformCoordinates = function(vector, matrix){
            // multiple vector against transform matrix 

            var x = (vector.x * matrix.m[0][0]) + (vector.y * matrix.m[0][1]) + (vector.z * matrix.m[0][2]) + matrix.m[0][3];
            var y = (vector.x * matrix.m[1][0]) + (vector.y * matrix.m[1][1]) + (vector.z * matrix.m[1][2]) + matrix.m[1][3];
            var z = (vector.x * matrix.m[2][0]) + (vector.y * matrix.m[2][1]) + (vector.z * matrix.m[2][2]) + matrix.m[2][3];
            var w = (vector.x * matrix.m[3][0]) + (vector.y * matrix.m[3][1]) + (vector.z * matrix.m[3][2]) + matrix.m[3][3];
            return new Vector3(x / w, y / w, z / w);
        }

        Vector3.prototype.Magnitude = function(){
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z );
        }

        // Multiply vectors
        Vector3.prototype.Add = function(otherVector){
            return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
        }

        // Multiply vectors
        Vector3.prototype.Multiply = function(otherVector){
            return new Vector3(this.x * otherVector.x, this.y * otherVector.y, this.z * otherVector.z);
        }

        Vector3.prototype.Subtract = function(otherVector){
            return new Vector3(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z);
        }

        // normalize vector made with constructor
        Vector3.prototype.Normalize = function(){
             // Determine the Magnitude of vector
             var Magnitude = this.Magnitude();
             
             // if the length === 0, return
             if(Magnitude === 0){
                 return;
             }else{
                 // else determine the unit vector
                 let iMagnitude = 1.0 / Magnitude;
                 this.x *= iMagnitude;
                 this.y *= iMagnitude;
                 this.z *= iMagnitude;
             }
        }

        Vector3.prototype.Scale = function(scale){
            let x = this.x * scale;
            let y = this.y * scale;
            let z = this.z * scale;

            return new Vector3(x, y, z);
        }
    
        return Vector3;
    })();

    this.Matrix = (function(){
        function Matrix(){
            this.m = [];
        }

        Matrix.zeros = function(){
            return Matrix.fromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }

        Matrix.identity = function(){
            return Matrix.fromValues(1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0);
        }
        
        Matrix.fromValues = function(iM11, iM12, iM13, iM14, 
                                    iM21, iM22, iM23, iM24, 
                                    iM31, iM32, iM33, iM34, 
                                    iM41, iM42, iM43, iM44)
        {
            var result = new Matrix();

            result.m[0] = [iM11, iM21, iM31, iM41];
            result.m[1] = [iM12, iM22, iM32, iM42];
            result.m[2] = [iM13, iM23, iM33, iM43];
            result.m[3] = [iM14, iM24, iM34, iM44];

            return result;
        }
        

        // View Matrix Left Handed
        Matrix.lookAtLH = function(eye, target, up){
            // eye = camera's position
            // target = camera's target usually the world origin [0, 0, 0]
            // up = the world up position. usually [0, 1, 0]
            
            // All vector and normalized to make it easier to manipulate
            // world axes?
            // determine distance from Z axis
            console.log(this)
            var zAxis = target.Subtract(eye);
            zAxis.Normalize();
            var xAxis = matAl.Vector3.cross(up, zAxis)
            xAxis.Normalize();
            var yAxis = matAl.Vector3.cross(zAxis, xAxis);
            yAxis.Normalize();
            // console.log(yAxis)
            // console.log(eye, target, up)
            // console.log(zAxis, xAxis, yAxis)
            // Camera Space
            var xTransl = -this.Vector3.dot(xAxis, eye);
            var yTransl = -this.Vector3.dot(yAxis, eye);
            var zTransl = -this.Vector3.dot(zAxis, eye);

            return Matrix.fromValues(xAxis.x, xAxis.y, xAxis.z, 0,
                                    yAxis.x, yAxis.y, yAxis.z, 0,
                                    zAxis.x, zAxis.y, zAxis.z, 0,
                                    xTransl, yTransl, zTransl, 1 )
        }

        Matrix.perspectiveFovLH = function(fov, aspect, znear, zfar){
            var matrix = this.Matrix.zeros();
            // field of view in degree
            var tan = 1.0 / (Math.tan(fov * 0.5));

            // Need to figure out WTF is going on here
            matrix.m[0][0] = tan / aspect;
            matrix.m[1][0] = matrix.m[2][0] = matrix.m[3][0] = 0.0;
            matrix.m[1][1] = tan;
            matrix.m[0][1] = matrix.m[2][1] = matrix.m[3][1] = 0.0;
            matrix.m[0][2] = matrix.m[1][2] = 0.0;
            matrix.m[2][2] = -zfar / (znear - zfar);
            matrix.m[3][2] = 1.0;
            matrix.m[0][3] = matrix.m[1][3] = matrix.m[3][3] = 0.0;
            matrix.m[2][3] = (znear * zfar) / (znear - zfar);

            return matrix;

        }

        Matrix.rotationYawPitchRoll = function(yaw, pitch, roll) {
            let rotationMatrix = Matrix.rotationZ(roll)
                .Multiply(Matrix.rotationX(pitch))
                .Multiply(Matrix.rotationY(yaw));
                // console.log(roll, yaw, pitch)
                
                // rotationMatrix.View();
            return rotationMatrix;
        }

        Matrix.rotationX = function(angle){
            // create zero matrix
            var result = Matrix.zeros();
            // find sin and cosine value
            var s = Math.sin(angle);
            var c = Math.cos(angle);

            result.m[0][0] = 1.0;
            result.m[3][3] = 1.0;
            result.m[1][1] = c;
            result.m[2][2] = c;
            result.m[1][2] = -s;
            result.m[2][1] = s;
            // result.View()
            return result;
        }

        Matrix.rotationY = function(angle){
            // create zero matrix
            var result = Matrix.zeros();
            // convert angle from radian to degree;
            var s = Math.sin(angle);
            var c = Math.cos(angle);

            result.m[1][1] = 1.0;
            result.m[3][3] = 1.0;
            result.m[0][0] = c;
            result.m[2][0] = -s;
            result.m[0][2] = s;
            result.m[2][2] = c;
            // result.View()
            // console.log("y")
            return result;
        }

        Matrix.rotationZ = function(angle){
            // create zero matrix
            var result = Matrix.zeros();
            // convert angle from radian to degree;
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            
            result.m[2][2] = 1.0;
            result.m[3][3] = 1.0;
            result.m[0][0] = c;
            result.m[1][0] = s;
            result.m[0][1] = -s;
            result.m[1][1] = c;
            // result.View()
            
            return result;
        }

        Matrix.translation = function(x, y, z){
            var result = Matrix.identity();
            result.m[0][3] = x;
            result.m[1][3] = y;
            result.m[2][3] = z;
            
            // result.View()
            return result;
        }

        Matrix.prototype.View = function(){
            let transposed = this.Transpose();
            console.log(transposed);
        }

        Matrix.prototype.Transpose = function(){
            var matrix = new Matrix();
            // create new matrix
            for(let col = 0; col < this.m.length; col++){
                matrix.m.push([]);
            };

            for(let col = 0; col < this.m.length; col++){
                for(var row = 0; row <this.m.length; row++){
                    matrix.m[row].push(this.m[col][row]);
                }
            };

            return matrix;
        }

        Matrix.prototype.Multiply = function(otherMatrix){
            let matrix = Matrix.zeros();
            let len = otherMatrix.m.length;
        
            for(var col = 0; col < len; col++){
                for(var row = 0; row < len; row++){
                    for(var i = 0; i < len; i++){
                        matrix.m[col][row] += this.m[i][row] * otherMatrix.m[col][i];                     
                    };          
                };
            };
            return matrix;
        }

        return Matrix;
    })();
};

export default new matAl();




