import {Cash} from "cash-dom";
import App from "@js/app";
import Sortable from 'sortablejs';

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
      const $newGroup = $(`<div class="tagGroup nested-sortable"></div>`);
      const $newItem = $(`<div class="tagName">${elem.tagName}</div>`);
      const $elem = $(elem);
      const key = $elem.data('key');

      $newItem.attr('data-key', key);
      $newItem.appendTo($newGroup);

      if ($elem.children().length > 0) {
        this.buildTree($elem, $newItem, level + 1);
      } else {
        //empty group for insert data
        const $newGroup2 = $(`<div class="tagGroup nested-sortable"></div>`);
        // console.log($newGroup2);
        $newGroup2.appendTo($newItem);
      }

      $dest.append($newGroup);
    }
  }

  updateView() {
    this.$elementsList.html('');

    const $pageDom: Cash = App.modules.Page.getRoot();

    this.buildTree($pageDom, this.$elementsList);

    $('.nested-sortable').each((i, e) => {
      new Sortable(e, {
        group: 'nested',
        animation: 100,
        fallbackOnBody: true,
        swapThreshold: 0.5,
      });
    });
  }
}
