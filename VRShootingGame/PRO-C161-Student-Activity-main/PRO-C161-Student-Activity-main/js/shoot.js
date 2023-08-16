AFRAME.registerComponent("bullets", {
    init: function () {
        this.shootBullet()
    },
    shootBullet: function () {
        window.addEventListener("keydown", (e) => {
            if (e.key == "z") {
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: "0.1",
                })
                bullet.setAttribute("material", "color", "black")
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                bullet.setAttribute('dynamic-body', {
                    shape: "sphere",
                    mass: "0"
                })
                bullet.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z })
                bullet.setAttribute("velocity", { x: 0, y: 0, z: -1 })

                var camera = document.querySelector("#camera").object3D;
                //get the camera direction as Three.js Vector 
                var direction = new THREE.Vector3();

                //console.log(direction)
                camera.getWorldDirection(direction);

                //set the velocity and it's direction 
                bullet.setAttribute("velocity", direction.multiplyScalar(-10));

                //appending to scene
                var scene = document.querySelector("#scene");
                bullet.addEventListener("collide", this.removeBullet)
                scene.appendChild(bullet);


            }
        })
    },
    removeBullet: function (e) {
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var eltar = e.detail.target.el;
        var elhit = e.detail.body.el;
        if (elhit.id.includes("box")) {
            elhit.setAttribute("material", {
                opacity: 1,
                transparent: true
            })
        }
        eltar.removeEventListener("collide", this.shootBullet)
        //impulse and point vector 
        var impulse = new CANNON.Vec3(-1, 2, 1); 
        var worldPoint = new CANNON.Vec3().copy( elhit.getAttribute("position") ); 
        elhit.body.applyImpulse(impulse, worldPoint);
        var scene = document.querySelector("#scene");
        scene.removeChild(eltar)
    }
})
