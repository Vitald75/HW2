// REMOVE THE BELOW CODE BEFORE START THE EXERCISE

describe("Check web site", function () {
  it("click on hide button three times", async function () {
    await browser.url("https://viktor-silakov.github.io/course-sut");
    await $$("#login")[0].setValue("walker@jw.com");
    await $$("#password")[0].setValue("password");
    await $$("button")[0].click();
    await browser.pause(10000);

    // deleting sticky header
    await browser.execute(
      'document.querySelector("header.sticky-top").remove()'
    );

    // The first click on alert button using WebdriverIO 
    await browser.pause(1000);
    await $$("//button[text()='alert']")[0].click();
    await browser.pause(1000);
    await browser.acceptAlert();
    await browser.pause(1000);

    // The second click on alert button using JS browser context 
    // with function & arguments 
    await browser.execute(() => { 
      document.querySelector(arguments[0]).click()
    } ,"button.btn-danger"
    );
    await browser.pause(1000);
    await browser.acceptAlert();
    await browser.pause(1000);
    
    // The third click on alert button using JS browser context 
    // with script in argument
    await browser.execute('document.querySelector("button.btn-danger").click()');
    await browser.pause(1000);
    await browser.acceptAlert();
    
    await browser.pause(1000);
  });
});
