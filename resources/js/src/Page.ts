import {Cash} from "cash-dom";

export class Page {
  private readonly $page: Cash;

  public addNewElement(tagName: string) {
    const $newElement = $(`<${tagName}>`);

    $newElement.text('New element');
    $newElement.appendTo(this.$page);

    const event = new CustomEvent('domChange');

    this.$page[0].dispatchEvent(event);
  }

  constructor(elem) {
    this.$page = $(elem);
  }

  public getRoot() {
    return this.$page;
  }
}
