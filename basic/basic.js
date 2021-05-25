(function () {

    let template = document.createElement("template");
    template.innerHTML = `
		<style>
		:host {
			display: block;
		} 
		</style>
		
        <button id="basicButton" style="width: 100%; height: 100%; overflow: visible; display: flex; align-items: flex-start;" type="button">
            Button
        </button>
	`;

    class BasicButton extends HTMLElement {

        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));

            this.$style = shadowRoot.querySelector('style');
            this.$button = shadowRoot.querySelector('#basicButton');
            
            this.addEventListener("click", e => {
                
                console.log("setting value inside click event listener")
                this.onCustomWidgetAfterUpdate({value: "FOO"});
                var event = new Event("onClick");                               
                console.log("dispatching event");
                this.dispatchEvent(event);
                console.log("end event");
            });     

            this._props = {};
        }

        render(tooltip) {
            this.$button.title = "'" + value +"'";
        }

        onCustomWidgetBeforeUpdate(changedProperties) {

            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {

            console.log("onCustomWidgetAfterUpdate called ");

            if ("value" in changedProperties) {
                console.log("'Value' changed to", changedProperties["value"]);
                this.$value = changedProperties["value"];
            }
            
            this.render(this.$value);
        }
    }

    customElements.define("com-synvance-buttoncloseerror", BasicButton);
})();