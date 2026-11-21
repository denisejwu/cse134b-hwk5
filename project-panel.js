// const projectsArray = [
//     {title: "MIVO", detail: "student organzation communication app"},
//     {title:"SuperBlast", detail:"Elementary styled math game working with 7 people"},
//     {title:"VenueHorn Redesign", detail: "Update a company website to fit the companys aspirations"}
//  ];
class ProjectPanel extends HTMLElement{
    static get observedAttributes(){
        return ["compact"];
    }
   
    constructor(){
        super();
        // this._index= 0;
    }
    connectedCallback(){
       this.render();
       this.attatchEventListener();
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue === newValue){
            return;
        }
        if(!this._detailEl){
            return;
        }
        this._detailEl.hidden = this.hasAttribute("compact");
    }

    render(){
        const heading = document.createElement("h2");
        // heading.textContent= "My Projects"
         heading.textContent= "Random Useless Fact"
        this.appendChild(heading);

        this._titleEl = document.createElement("p");
        this.appendChild(this._titleEl);

        this._detailEl = document.createElement("p");
        this.appendChild(this._detailEl);

        this._nextButton = document.createElement("button");
        this._nextButton.type = "button";
        // this._nextButton.textContent = "Next Project";
        this._nextButton.textContent = "Get a new fact";
        this.appendChild(this._nextButton);

        this._statusEl = document.createElement("p");
        this.appendChild(this._statusEl);
        this._statusEl.setAttribute("role", "status");

        // this.showProjects();
        this.loadFact();
        this._detailEl.hidden = this.hasAttribute("compact");
    
    }

    // showProjects(){
    //     this._titleEl.textContent = projectsArray[this._index].title;
    //     this._detailEl.textContent = projectsArray[this._index].detail;
    //     this._statusEl.textContent = "Project " + (this._index + 1)+ " of " + projectsArray.length;
    // }
    async loadFact(){
        this._statusEl.textContent = "Loading a new fact..."; 
        this._nextButton.disabled = true;
        try{
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");

        if(!response.ok){
          throw new Error(`HTTP status ${response.status}.`);
        }
        const data = await response.json();

        if(typeof data?.text !== "string" || typeof data?.source !=="string"){
          throw new Error("Expected text and source in the response.");
        }

        this._titleEl.textContent = data.text;
        this._detailEl.textContent = "Source: " + data.source;
        this._statusEl.textContent = "New Fact Loaded";
    
      } catch(error){
        console.error("Could not load a fact.", error);
        this._statusEl.textContent = "Couldn't load a fact. Check your connection and try again.";
      }finally{
        this._nextButton.disabled = false;
      }
    }

    attatchEventListener(){
        this._nextButton.addEventListener("click", () =>{
             this.loadFact();
            // this._index = this._index +1 ;
            // if(this._index === projectsArray.length){
            //     this._index = 0;
            // }
            // this.showProjects();
        });
       
    }
}
customElements.define("project-panel", ProjectPanel);

const compactButton = document.querySelector("#compact-toggle");
const panel = document.querySelector("project-panel");
compactButton.addEventListener("click", () => {
  panel.toggleAttribute("compact");
  if(panel.hasAttribute("compact")){
    compactButton.textContent = "Show details";
  }else{
    compactButton.textContent = "Hide details";
  }
});