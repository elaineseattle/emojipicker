declare namespace WebdriverIO {
  export interface ContextDetails {
    id: string;
    title: string;
    url: string;
    bundleId: string;
  }

  interface Browser {
    getContexts: () => Promise<ContextDetails[] | string[]>;
  }

  interface Element {
    setValueAndClickDone: (value: string) => Promise<void>;
  }
}
