(function () {

    let template = document.createElement("template");
    template.innerHTML = `
		<style>
		:host {
			display: block;
		} 
		</style>
		
        <button id="customCloseButton" style="width: 100%; height: 100%; overflow: visible; display: flex; align-items: flex-start;" type="button">
            Close
        </button>
	`;

    class CloseErrorButton extends HTMLElement {

        checkErrorExists(){
            console.log("checkErrorExists called");
            this.$selector = "#__message0";
            console.log("this.$selector=", this.$selector);
            if(this.$selector !== "" && this.$selector !== "undefined" && this.$selector !== null){
                try{                  
                    const errorMessageDiv = document.querySelector(this.$selector);
                                        
                    console.log("Current error message div for " + this.$selector + ":", errorMessageDiv);
                    if(errorMessageDiv){
                        const errorMessage = errorMessageDiv.innerText;
                        console.log("Setting this.$errorExists to true");
                        
                        this.onCustomWidgetAfterUpdate({errorExists: true});
                        this.onCustomWidgetAfterUpdate({errorMessage});
                        
                    }
                } catch(e){
                    console.log("selector probably empty", e);
                }
            }
        }

        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));

            this.$style = shadowRoot.querySelector('style');
            this.$button = shadowRoot.querySelector('#customCloseButton');
            
            this.addEventListener("click", event => {
                var event = new Event("onClick");               
                console.log("inside onClick");
                //this.checkErrorExists();
                this.dispatchEvent(event);
            });     

            this._props = {};
        }

        render(tooltip) {
            //this.$style.innerHTML = ':host {display: block;} .container {max-width: 400px;overflow: hidden;} img {width: 100%;object-fit: contain;}';
            //this.$div.innerHTML = '<img alt="Button image" title="' + tooltip + '" src="' + imageUrl + '" />';
            this.$button.title = "'" + tooltip +"'";
            //this.$button.title = tooltip;
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {

            console.log("onCustomWidgetAfterUpdate called ");
            console.log(`${this._props["widgetName"]}`);

            if ("tooltip" in changedProperties) {
                this.$tooltip = changedProperties["tooltip"];
            }

            if ("selector" in changedProperties) {
                this.checkErrorExists();
                this.$selector = changedProperties["selector"];
            }

            if ("errorExists" in changedProperties) {
                console.log("errorExists changed, new value:", changedProperties["errorExists"]);
                this.$errorExists = changedProperties["errorExists"];
            }

            this.render(this.$tooltip);
        }
    }

    customElements.define("com-synvance-buttoncloseerror", CloseErrorButton);
})();