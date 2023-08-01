export const setValueAndClickDone = async function (
  this: WebdriverIO.Element,
  value: string,
) {
  await this.setValue(value);
  if (driver.isIOS) {
    await (
      await $(`-ios predicate string:name=="Return" OR name=="Done"`)
    ).click();
  }
};
