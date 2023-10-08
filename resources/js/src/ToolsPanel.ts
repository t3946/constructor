import {Cash} from "cash-dom";
import App from "@js/app";

export class ToolsPanel {
  private readonly $toolsPanel: Cash;

  constructor(elem) {
    this.$toolsPanel = $(elem);

    this.$toolsPanel.find('.item').on('click', (e) => {
      this.addNewElement(e.target.dataset.elem);
    });
  }

  private addNewElement(tagName: string) {
    App.modules.Page.addNewElement(tagName);
  }
}