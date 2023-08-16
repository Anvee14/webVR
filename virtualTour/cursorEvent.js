AFRAME.registerComponent("cursor-listener", {
schema:{
    selectItemId:{default:"",type:"string"},
    
},
init:function(){
this.handleMouseEnterEvents()
this.handleMouseLeaveEvents()

},
handleMouseEnterEvents:function(){
this.el.addEventListener("mouseenter",()=>{
      this.handlePlacesListState();
    }
)},

handleMouseLeaveEvents:function(){
this.el.addEventListener("mouseleave",()=>{
    const {selectItemId}=this.data;
    if(selectItemId){
        const el = document.querySelector(`#${selectItemId}`)
        const id = el.getAttribute("id")
        if(id ==selectItemId){
            el.setAttribute("material",{
                color:"#0077cc",
                opacity:1
            })
        }
    }
}
)},
handlePlacesListState:function(){
    const id = this.el.getAttribute("id")
    const placeId = ["Taj-Mahal","Budapest","Eiffel-Tower","NYC"]
    if(placeId.includes(id)){
        const placeContainer = document.querySelector("#places-container")
        placeContainer.setAttribute("cursor-listener",{
            selectItemId:id
        });
        this.el.setAttribute("material",{
            color:"#d76b30",
            opacity:1
        })
    }
}
})
