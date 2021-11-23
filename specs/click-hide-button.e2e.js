describe("Check hide button on web site", function () {
  before("open url and login with credentials walker@jw.com:password", async function () {
    await browser.url("https://viktor-silakov.github.io/course-sut");
    await $("#login").setValue("walker@jw.com");
    await $("#password").setValue("password");
    await $("button").click();
    const spinner = await $("#spinner");
    await spinner.waitForDisplayed({
      reverse: true,
      timeoutMsg: "Spinner does not hide",
      timeout: 15000,
    });
  });

  it("should click on hide button and accept alert three times", async function () {
    await browser.execute(
      'document.querySelector("header.sticky-top").remove()'
    );
    // The first method  click on alert button using WebdriverIO
    await $("//button[text()='alert']").click();
    await browser.pause(500);
    await browser.acceptAlert();

    // The second method click on alert button using JS browser context
    // with function & arguments
    await browser.execute(() => {
      document.querySelector(arguments[0]).click();
    }, "button.btn-danger");
    await browser.pause(500);
    await browser.acceptAlert();

    // The third method click on alert button using JS browser context
    // with script in argument
    await browser.execute(
      'document.querySelector("button.btn-danger").click()'
    );
    await browser.pause(500);
    await browser.acceptAlert();
  });
});
