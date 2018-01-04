import Engine from "./Engine";
import matAl from "../matAl";

export default class Camera extends Engine {
    constructor(position, rotation, target){
        super()
       // create zero vector for camera position and target
       this.Position = new matAl.Vector3(position[0], position[1], position[2]);
       this.Rotation = new matAl.Vector3(rotation[0], rotation[1], rotation[2]);
       this.Target = new matAl.Vector3(target[0], target[1], target[2]);
       this.OffSet = new matAl.Vector3(position[0], position[1], position[2]);
   }

   move(direction, unit){
       this.Position[direction] += unit;

       let movement = matAl.Vector3.zeros();
       // movement.z = -1;

       if(direction === "lateral"){
           movement.x = Math.sin(-this.Rotation.y ) * unit;
           movement.z = Math.cos(this.Rotation.y ) * unit;
       }else if(direction === "horizontal"){
           movement.x = Math.cos(-this.Rotation.y ) * unit;
           movement.z = Math.sin(this.Rotation.y ) * unit;
       }

       this.Target = this.Target.Add(movement);

       console.log(this.Target)
   }

   moveVector(rotation, increment){   
       let movement = matAl.Vector3.zeros();
       movement.z = increment;        
       // movement.x = Math.cos(rotation.y) * increment;
       // movement.z = Math.sin(rotation.y) * increment;

       this.Position = this.Position.Add(movement);
   }

   rotate(direction, increment, controller){
       this.Rotation[direction] += increment;

       // let magnitude = controller.Position.Magnitude();
       // let x = -Math.sin(this.Rotation.y);
       // let z = Math.cos(this.Rotation.y);
       // console.log(x.toFixed(2),z.toFixed(2))
       // let forwardVector = new matAl.Vector3(x, 0, z);
       // forwardVector.Normalize();
       // let normalizedPosition = new matAl.Vector3(controller.Position.x, controller.Position.y, controller.Position.z);
       // normalizedPosition.Normalize();
       
       // let dotProduct = matAl.Vector3.dot(forwardVector, normalizedPosition); 
       // let angle = Math.acos(dotProduct);

       // let movement = matAl.Vector3.zeros();
       // movement.x = -Math.sin(angle + increment) * magnitude;
       // movement.y = this.Position.y;
       // movement.z = -Math.cos(angle + increment) * magnitude + this.OffSet.z;

       // this.Position = movement;
   }
   
   offset(direction, increment){
       this.OffSet[direction] += increment;
   }

   target(direction, increment){
       this.Target[direction] = increment;
   }
   
   focus(target){

       // let movement = matAl.Vector3.zeros();

       this.Target.x = target.Position.x;                
       this.Target.y = target.Position.y;                
       this.Target.z = target.Position.z;

       // this.Position.x = target.Position.x;
       // this.Position.z = target.Positon.z + this.OffSet.z;

       // this.Position = this.Position.Add(movement).Add(this.OffSet)
       // this.Position.x = target.Position.x - this.OffSet.x + movement.x;                
       // this.Position.y = target.Position.y + this.OffSet.y;                
       // this.Position.z = target.Position.z + this.OffSet.z + movement.z;
   };

   debugger(){
        
       let px = this.Position.x.toFixed(2);
       let py = this.Position.y.toFixed(2);
       let pz = this.Position.z.toFixed(2);
       
       let tx = this.Target.x.toFixed(2);
       let ty = this.Target.y.toFixed(2);
       let tz = this.Target.z.toFixed(2);

       let rx = this.Rotation.x.toFixed(2);
       let ry = this.Rotation.y.toFixed(2);
       let rz = this.Rotation.z.toFixed(2);

       let ox = this.OffSet.x.toFixed(2);
       let oy = this.OffSet.y.toFixed(2);
       let oz = this.OffSet.z.toFixed(2);
       

       let title = `Camera: `
       let position = `position x: ${px} y: ${py} z: ${pz}`;
       let target = `target x: ${tx} y: ${ty} z: ${tz}`;
       let rotation = `rotation x: ${rx} y: ${ry} z: ${rz}`;
       let offset =   `offset    x: ${ox} y: ${oy} z: ${oz}`;

       this.putText(title, 20, 60, "20px Arial", "red")
       this.putText(position, 30, 80, "15px Arial", "red")
       this.putText(target, 30, 100, "15px Arial", "red")        
       this.putText(rotation, 30, 120, "15px Arial", "red")
       this.putText(offset, 30, 140, "15px Arial", "red")        
   }

}