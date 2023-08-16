AFRAME.registerComponent("coins", {
  init: function () {
    for (var i = 1; i <= 10; i++) {
      const id = `coin${i}`;

      const posX = Math.random() * 30 + (-10);
      const posY = 15//Math.random() * 20 + (-1);       
      const posZ = Math.random() * 10 + (-4);

      const position = { x: posX, y: posY, z: posZ };
      this.createCoins(id, position);
    }
  },
  createCoins: function (id, position) {
    const treasureEntity = document.querySelector("#Tcoins");
    var coinEl = document.createElement("a-entity");

    coinEl.setAttribute("id", id);
    coinEl.setAttribute("position", position);
    coinEl.setAttribute("material", "color", "#ff9100");

    coinEl.setAttribute("gltf-model", "./assets/coins/roman_coin/scene.gltf");

    coinEl.setAttribute("animation", {
      property: "rotation",
      to: "150 0 0",
      loop: "true",
      dur: 1000,
    });

    //set the static body attribute of physics system
    coinEl.setAttribute("static-body", {
      shape: "sphere",
      sphereRadius: 2
    });

    //set the game play attribute
    coinEl.setAttribute("game-play", {
      elementId: `#${id}`,
    });


    treasureEntity.appendChild(coinEl);
  },
});