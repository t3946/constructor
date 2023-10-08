import {Page} from '@js/src/Page';
import {DomPanel} from '@js/src/DomPanel';
import {ToolsPanel} from "@js/src/ToolsPanel";

class Main {
  public modules: {
    Page: Page,
    ElementsPanel: DomPanel,
    ToolsPanel: ToolsPanel,
  };

  constructor() {
    $(() => {
      this.modules = {
        Page: null,
        ElementsPanel: null,
        ToolsPanel: null,
      };

      this.initModule('.page', Page);
      this.initModule('.dom', DomPanel);
      this.initModule('.tools', ToolsPanel);
    });
  }

  private initModule(selector, constructor, moduleName = null) {
    const $elem = $(selector);

    if (!moduleName) {
      moduleName = constructor.name;
    }

    if ($elem.length) {
      this.modules[moduleName] = new constructor($elem);
    }
  }
}

const App = (function () {
  let instance: Main;

  return {
    getInstance: function (): Main {
      if (instance == null) {
        instance = new Main();

        // Hide the constructor so the returned object can't be new'd...
        instance.constructor = null;
      }

      return instance;
    }
  };
})();

export default App.getInstance();
