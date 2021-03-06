describe("Check for login, explicit waiting, layout background", function () {
  function assertBgColor(backgroudColor, text) {
    const redColor = "rgba(255,0,0,1)";
    if (backgroudColor == redColor) {
      throw new Error(`The menu ${text} has wrong background color`);
    }
    console.log(text);
  }

  it("Check login user walker@jw.com:password, check menu elements background color", async function () {
    await browser.url("https://viktor-silakov.github.io/course-sut");
    await $("#login").setValue("walker@jw.com");
    await $("#password").setValue("password");
    await $('button[onclick="login();"]').click();
    const spinner = await $("#spinner");
    await spinner.waitForDisplayed({
       timeoutMsg: "Spinner does not appear"
    });
    await spinner.waitForDisplayed({
      reverse: true,
      timeoutMsg: "Spinner does not hide",
      timeout: 15000,
    });
    const logElem = await $('a[title="walker@jw.com"]');
    await logElem.waitForDisplayed();
    const logName = await logElem.getText();
    if (!(logName == "John Walker")) {
      throw new Error("User named Jonh Walker did not login into system!!!");
    }
    const menuElements = await $$("#first-nav-block>li");
    for (const menuElement of menuElements) {
      const textElement = await menuElement.getText();
      console.log({ textElement });
      await menuElement.moveTo();
      await browser.pause(500);
      const textBackground = await menuElement.getCSSProperty(
        "background-color"
      );
      const colorBackground = textBackground.value;
      assertBgColor(colorBackground, textElement);
    }
  });
});