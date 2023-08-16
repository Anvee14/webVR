AFRAME.registerComponent("tour", {
    schema:{
        state:{type:"string",default:"places-list"},
        selectedCard:{type:"string",default:"#card1"}
    },
    init: function () {
        this.placesContainer = this.el
        this.createCards()
    },
    hide:function(elList){
        elList.map(el=>{
            el.setAttribute("visible",false)
        })
    },
    showView:function(){
        const{selectedCard}=this.data;
        const skyel = document.querySelector("#main-container");
        skyel.setAttribute("material",{
            src:``,
            color:"#ffffff"
        })
    },
    createBorder: function (position, id) {
        const entity = document.createElement("a-entity")
        entity.setAttribute("id", id)
        entity.setAttribute("visible", true)
        entity.setAttribute("geometry", { primitive: "ring",  radiusInner: 9.5, radiusOuter: 10 });
        entity.setAttribute("position", position)
        entity.setAttribute("material", { color: "#0077cc", opacity: 1, });
        entity.setAttribute("cursor-listener",{})
        return entity;
    },
    createThumbnail: function (item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", { primitive: "circle", radius: 9, });
        entityEl.setAttribute("material", { src: item.url });
        return entityEl;

    },
    createTitle: function (position, item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("text", {align: "center", width: 100, color: "white", value: item.title, });
        const elPosition = position;
        elPosition.y = -20;
        entityEl.setAttribute("position", elPosition);
        entityEl.setAttribute("visible", true);
        return entityEl;


    },
    createCards: function () {
        const thumbnailsRef = [
            {
                id: "Taj-Mahal",
                title: "Taj Mahal",
                url: "./assests/taj_mahal.png",

            },
            {
                id: "Budapest",
                title: "Budapest",
                url: "./assests/budapest.jpg",
            },
            {
                id: "Eiffel-Tower",
                title: "Eiffel Tower",
                url: "./assests/eiffel_tower.jpg",
            },
            {
                id: "NYC",
                title: "New York City",
                url: "./assests/new_york_city.png",
            },
        ];
        var previous_x_pos = -60
        for (var item of thumbnailsRef) {
            const posX = previous_x_pos + 25;
            const posY = 10
            const posZ = -40;
            const position = { x: posX, y: posY, z: posZ };
            previous_x_pos = posX
            const border = this.createBorder(position,item.id);
            const thumbnail = this.createThumbnail(item);
            border.appendChild(thumbnail)
            const title = this.createTitle(position,item);
            border.appendChild(title);
            this.placesContainer.appendChild(border)
        }
    }
})