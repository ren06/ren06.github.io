(function () {

    let template = document.createElement("template");
    template.innerHTML = `				
        <button id="basicButton" style="width: 100%; height: 100%; overflow: visible; display: flex; align-items: flex-start;" type="button">
            Set Widget Value=WIDGET
        </button>
	`;

    class BasicWidget extends HTMLElement {

        constructor() {
            console.log("Executing BasicWidget constructor");
            super();
            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));
           
            this.$button = shadowRoot.querySelector('#basicButton');
            
            this.addEventListener("click", (e) => {
                
                console.log("BasicWidget click event listener, setting Value=WIDGET");
                //this.onCustomWidgetAfterUpdate({value:"WIDGET"});
                
                console.log(Object.keys(this));
                console.dir(this);

                //this.$setValue("WIDGET");
                this.setValue("WIDGET"); 
                
                var event = new Event("onClick");                                               
                this.dispatchEvent(event);                
            });     

            this._props = {};
        }

        render(value) {
            //To easily check the current value inside the Widget from the frontend
            this.$button.title = "'Value=" + value +"'";
        }

        onCustomWidgetBeforeUpdate(changedProperties) {

            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {

            if ("value" in changedProperties) {
                console.log("onCustomWidgetAfterUpdate: Value=" + changedProperties["value"]);
                this.$value = changedProperties["value"];                
            }
            
            this.render(this.$value);
        }
    }

    customElements.define("com-synvance-basicwidget", BasicWidget);
})();