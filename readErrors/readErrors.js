(function () {

    let template = document.createElement("template");
    template.innerHTML = `		
        <span id="readError" />
	`;

    class ReadError extends HTMLElement {

        checkErrorExists(){
            console.log("checkErrorExists called");
            console.log("this.$selector is", this.$selector);
            if(this.$selector !== "" && this.$selector !== "undefined" && this.$selector !== null){
                try{
                    const errorMessage = document.querySelector(this.$selector);
                    console.log(errorMessage);
                    if(errorMessage){
                        this.$errorExists = true;
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

            this.$span = shadowRoot.querySelector('#readError');

            console.log(this.$selector, this.$errorExists);

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