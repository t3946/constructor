import {Cash} from "cash-dom";
import App from "@js/app";

export class DomPanel {
  private readonly $elementsPanel: Cash;
  public readonly $elementsList: Cash;

  constructor(elem) {
    this.$elementsPanel = $(elem);
    this.$elementsList = this.$elementsPanel.find('.elementsList');

    App.modules.Page.getRoot().on('domChange', () => this.updateView());

    this.updateView();

    this.$elementsPanel.on('click', '.tagName', (e) => {
      this.$elementsPanel.find('.tagName').removeClass('tagName_theme_selected')
      e.target.classList.add('tagName_theme_selected');

      const key = e.target.dataset.key;
      const event = new CustomEvent('selectItem', {detail: {key}});

      this.$elementsList[0].dispatchEvent(event);
    });
  }

  public buildTree($source, $dest, level = 0) {
    for (const elem of $source.children()) {
      const $newGroup = $(`<div class="tagGroup"></div>`)
      const $newItem = $(`<div class="tagName" style="padding-left: ${level * 8}px">${elem.tagName}</div>`);
      const $elem = $(elem);
      const key = $elem.data('key');

      $newItem.attr('data-key', key);
      $newItem.appendTo($newGroup);

      if ($elem.children()) {
        this.buildTree($elem, $newGroup, level + 1);
      }

      $dest.append($newGroup);
    }
  }

  updateView() {
    this.$elementsList.html('');

    const $pageDom: Cash = App.modules.Page.getRoot();

    this.buildTree($pageDom, this.$elementsList);
  }
}
