import {Cash} from "cash-dom";
import App from "@js/app";

export class Page {
  private readonly $page: Cash;
  private nextElementIdNumber = 1;

  constructor(elem) {
    this.$page = $(elem);

    this.addIds(this.$page);

    App.callAfterInit.push(() => {
      App.modules.DomPanel.$elementsList.on('selectItem', (e) => {
        const $currentElement = App.modules.Page.getElementByKey(e.detail.key);

        this.$page.find('[data-status=current]').attr('data-status', null);

        $currentElement.attr('data-status', 'current');
      });
    });
  }

  public getElementByKey(key: string): Cash {
    return this.$page.find(`[data-key=${key}]`);
  }

  public generateKey() {
    const key = 'element_' + this.nextElementIdNumber;

    this.nextElementIdNumber += 1;

    return key;
  }

  public addIds($source, level = 0) {
    for (const elem of $source.children()) {
      const $elem = $(elem);

      if (!$elem.attr('data-key')) {
        $elem.attr('data-key', this.generateKey());
      }

      if ($elem.children()) {
        this.addIds($elem, level + 1);
      }
    }
  }

  public addNewElement(tagName: string) {
    const $newElement = $(`<${tagName}>`);

    $newElement.text('New element');
    $newElement.appendTo(this.$page);

    this.addIds(this.$page);

    //notify app about change
    const event = new CustomEvent('domChange');

    this.$page[0].dispatchEvent(event);
  }

  public getRoot(): Cash {
    return this.$page;
  }
}
