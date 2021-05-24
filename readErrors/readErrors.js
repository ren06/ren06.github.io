(function () {

    let template = document.createElement("template");
    template.innerHTML = `		
        <span id="readError" />
	`;

    let insertedNodes = [];

    class ReadError extends HTMLElement {

        checkErrorExists(){
            console.log("checkErrorExists called");
            console.log("this.$selector=", this.$selector);
            if(this.$selector !== "" && this.$selector !== "undefined" && this.$selector !== null){
                try{
                    const errorMessage = document.querySelector(this.$selector);
                    console.log("Current error message for " + this.$selector + ":", errorMessage);
                    if(errorMessage){
                        console.log("Setting this.$errorExists to true");
                        
                        onCustomWidgetAfterUpdate({errorExists: true});
                        
                    }
                } catch(e){
                    console.log("selector probably empty", e);
                }
            }
        }

        constructor() {
            super();
            console.log('Inside constructor ReadError');

            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));

            this.$span = shadowRoot.querySelector('#readError');

            // document.addEventListener("DOMNodeInserted", function(e) {
            //     if(e.target.toString().startsWith('<label id="sap-fpa-ui-splash-view-message-label" data-sap-ui="sap-fpa-ui-splash-view-message-label" style="direction:inherit;text-align:left" class="logon-message-label sapUiLbl sapUiLblNowrap">')){
            //         console.log("DOM Node inserted:", e.target);
            //         insertedNodes.push(e.target);    
            //     }
            // }, false);            


            this._props = {};
        }

        render() {
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {

            if ("selector" in changedProperties) {
                this.$selector = changedProperties["selector"];
                console.log("selector changed, new value:", changedProperties["selector"]);
                this.checkErrorExists();
            }

            if ("errorExists" in changedProperties) {
                console.log("errorExists changed, new value:", changedProperties["errorExists"]);
                this.$errorExists = changedProperties["errorExists"];
            }

            this.render();
        }
    }

    customElements.define("com-synvance-readerrors", ReadError);
})();