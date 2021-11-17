// REMOVE THE BELOW CODE BEFORE START THE EXERCISE

describe("Check login", function () {
   
  async function assertBgColor(menuElement, text) {
      const textBackground = await menuElement.getCSSProperty("background-color");
      const backColor = "rgba(255,0,0,1)";
      if (textBackground.value == backColor) {
        throw new Error(`Red backgroud was founded!!! ${text}`);
        //console.log('red background is in the '+ text)
      }
      console.log(textBackground.value);
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

    /* const title = await browser.getTitle();
        if (title !== 'Report portal') {
           throw new Error('You dont login into system!!!')
        }*/

    const menuElements = await $$("#first-nav-block>li");

    for (const menuElement of menuElements) {
      const text = await menuElement.getText();
      console.log({ text });
      await menuElement.moveTo();
      await browser.pause(1000);
      assertBgColor(menuElement, text);
      // вот так не выбрасывает, 
      // но если раскомментить код ниже, и закомментить вызов метода assertBgColor
      // тогда все ок
      
      /*
      const textBackground = await menuElement.getCSSProperty("background-color");
      const redbackgroudColor = "rgba(255,0,0,1)";
      if (textBackground.value == backColor) {
        throw new Error(`Red backgroud was founded!!! ${text}`);
      }
      */
    }
  });
});

