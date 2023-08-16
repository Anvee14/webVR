AFRAME.registerComponent("player-movement", {
    init: function () {
        this.playerMovement()
    },
    playerMovement: function () {
        window.addEventListener("keydown", (e) => {
            if (
                e.key === "ArrowUp" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowDown"
            ) {
                var entity = document.querySelector("#sound2");
                entity.components.sound.playSound();
            }
        });
    },
});
