describe("Check login", function () {
   
  function assertBgColor(backgroudColor, text) {
      const redColor = "rgba(255,0,0,1)";
      if (backgroudColor == redColor) {
        throw new Error(`The menu ${text} has wrong background color`);
      }
      console.log(text);
    }

  it("Check login user", async function () {
  
    await browser.url("https://viktor-silakov.github.io/course-sut");
    await $$("#login")[0].setValue("walker@jw.com");
    await $$("#password")[0].setValue("password");
    await $$('button[onclick="login();"]')[0].click();

    await $$("#spinner")[0].waitForDisplayed({
      reverse: false,
      timeoutMsg: "Spinner does not hide",
      timeout: 5000,
    });
    await browser.pause(12000);

    const logElem = await $$('a[title="walker@jw.com"]')[0];
    const logName = await logElem.getText();
    const logElemIsDisplayed = await logElem.isDisplayed();

    if (!(logName == "John Walker" && logElemIsDisplayed)) {
      throw new Error("User named Jonh Walker did not login into system!!!");
    }
  });
    
  it("Check menu background color", async function () {
    
    const menuElements = await $$("#first-nav-block>li");

    for (const menuElement of menuElements) {
      const textElement = await menuElement.getText();
      await menuElement.moveTo();
      await browser.pause(1000);
      const elementBackgroundStyle = await menuElement.getCSSProperty("background-color");
      const elementBackgroundColor = elementBackgroundStyle.value;

      //const elementBackgroundColor = await menuElement.getCSSProperty("background-color").value;

      assertBgColor(elementBackgroundColor, textElement);          
    }
  });
});
