import {Cash} from "cash-dom/dist/cash";
import App from "@js/app";

export class ElementsPanel {
  private readonly $elementsPanel: Cash;
  private readonly $elementsList: Cash;

  constructor(elem) {
    this.$elementsPanel = $(elem);
    this.$elementsList = this.$elementsPanel.find('.elementsList');

    this.updateView();
  }

  public buildTree($source, $dest, level = 0) {
    for (const elem of $source.children()) {
      const $newItem = $(`<div class="tagGroup"><div class="tagName" style="padding-left: ${level * 8}px">${elem.tagName}</div></div>`);
      const $elem = $(elem);

      if ($elem.children()) {
        this.buildTree($elem, $newItem, level + 1);
      }

      $dest.append($newItem);
    }
  }

  updateView() {
    this.$elementsList.html('');

    const $pageDom: Cash = App.modules.Page.getRoot();

    this.buildTree($pageDom, this.$elementsList);
  }
}
