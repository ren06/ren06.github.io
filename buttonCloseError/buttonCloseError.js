(function () {

    const onClick = (e) => {
        console.log('event clicked')

    }

    let template = document.createElement("template");
    template.innerHTML = `
		<style>
		:host {
			display: block;
		} 

        .container {
            max-width: 400px;
            overflow: hidden;
        }

        img {
            width: 100%;
            object-fit: contain;
        }

		</style>
		
		<div class="container">
            <img alt="Button image" title="Button image" src="https://aydenowl.github.io/literate-enigma/image_button/bookmark.png" />
		</div>
	`;

    class Imagebutton extends HTMLElement {

        checkErrorExists(){
            console.log("checkErrorExists called");
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

            this.$style = shadowRoot.querySelector('style');
            this.$div = shadowRoot.querySelector('div');

            console.log(this.$selector, this.$errorExists);

            this.addEventListener("click", event => {
                var event = new Event("onClick");
                
                console.log("inside onClick");
                checkErrorExists();

                //hardcoded
                const message = document.querySelector("#__icon218");
                console.log("selector hardcoded", message);

                this.dispatchEvent(event);
            });

            this._props = {};
        }

        render(imageUrl, tooltip) {
            this.$style.innerHTML = ':host {display: block;} .container {max-width: 400px;overflow: hidden;} img {width: 100%;object-fit: contain;}';
            this.$div.innerHTML = '<img alt="Button image" title="' + tooltip + '" src="' + imageUrl + '" />';
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            if ("imageUrl" in changedProperties) {
                this.$imageUrl = changedProperties["imageUrl"];
            }

            if ("tooltip" in changedProperties) {
                this.$tooltip = changedProperties["tooltip"];
            }

            if ("selector" in changedProperties) {
                this.$selector = changedProperties["selector"];
                console.log("selector changed, new value:", changedProperties["selector"]);
                checkErrorExists();
            }

            if ("errorExists" in changedProperties) {
                console.log("errorExists changed, new value:", changedProperties["errorExists"]);
                this.$errorExists = changedProperties["errorExists"];
            }

            this.render(this.$imageUrl, this.$tooltip);
        }
    }

    customElements.define("com-synvance-imagebutton", Imagebutton);
})();