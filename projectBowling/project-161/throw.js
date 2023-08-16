AFRAME.registerComponent("bowling-balls", {
  init: function () {
    this.throwBall();
  },
  throwBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var ball = document.createElement("a-entity");

        ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf");
        ball.setAttribute("scale", { x: 3, y: 3, z: 3 });
        var cam = document.querySelector("#camera");
        ball.setAttribute('static-body', {

        })
        pos = cam.getAttribute("position");
        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y - 1.2,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");
        ball.addEventListener("collide", this.removeBullet)

        scene.appendChild(ball);
      }
    });
  },
  removeBullet: function (e) {
    console.log(e.detail.target.el)
    console.log(e.detail.body.el)
    var eltar = e.detail.target.el;
    var elhit = e.detail.body.el;
    if (elhit.id.includes("pin")) {
      elhit.setAttribute("material", {
        opacity: 1,
        transparent: true
      })
    }
    eltar.removeEventListener("collide", this.throwBall)
    //impulse and point vector 
    var impulse = new CANNON.Vec3(-0.1, 0.2, 0.1);
    var worldPoint = new CANNON.Vec3().copy(elhit.getAttribute("position"));
    elhit.body.applyImpulse(impulse, worldPoint);
    var scene = document.querySelector("#scene");
    scene.remove(eltar)
  }
})


