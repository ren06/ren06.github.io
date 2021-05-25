(function () {

    let template = document.createElement("template");
    template.innerHTML = `				
        <button id="basicButton" style="width: 100%; height: 100%; overflow: visible; display: flex; align-items: flex-start;" type="button">
            Set Widget Value to FOO
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
                
                console.log("BasicWidget click event listener");
                this.onCustomWidgetAfterUpdate({value: "FOO"});
                var event = new Event("onClick");                               
                //console.log("dispatching event");
                this.dispatchEvent(event);
                //console.log("end event");
            });     

            this._props = {};
        }

        render(tooltip) {
            this.$button.title = "'" + tooltip +"'";
        }

        onCustomWidgetBeforeUpdate(changedProperties) {

            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {

            //console.log("onCustomWidgetAfterUpdate called ");

            if ("value" in changedProperties) {
                console.log("onCustomWidgetAfterUpdate: 'Value'=", changedProperties["value"]);
                this.$value = changedProperties["value"];
            }
            
            this.render(this.$value);
        }
    }

    customElements.define("com-synvance-basicwidget", BasicWidget);
})();