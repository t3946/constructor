import {Cash} from "cash-dom";
import App from "@js/app";

export class Properties {
  private readonly $properties: Cash;
  private $currentElement: Cash = null;
  private $inputClass;

  constructor(elem) {
    this.$properties = $(elem);
    this.$inputClass = this.$properties.find('input[name=classAttribute]');

    App.modules.DomPanel.$elementsList.on('selectItem', (e) => {
      this.$currentElement = App.modules.Page.getElementByKey(e.detail.key);

      this.$inputClass.val(this.$currentElement.attr('class'));

      this.updateView();
    });

    this.$inputClass.on('change keyup', (e) => {
      this.$currentElement.attr('class', this.$inputClass.val());
    })

    this.updateView();
  }

  private updateView() {
    this.$inputClass.prop('disabled', this.$currentElement === null);
  }
}
