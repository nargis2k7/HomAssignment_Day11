import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test"
import { createResource, deleteResource, getResource } from "./apiUtilitycase";

let stat = "New";
let org = "Web";
let statcd: any
let caseNumber: any

test.describe.serial(`API Testng for servicenow`, async () => {
    test(`E2E salesforce test`, async ({ request }) => {

        statcd = await createResource(request, stat, org)
        caseNumber = await getResource(request)
        console.log(statcd);
        console.log(caseNumber);
       
    })

    test(`search the Case`, async ({ page }) => {
        await page.goto("https://login.salesforce.com");
        // Loginto the Application
        await page.locator("#username").fill("nargis2k7974@agentforce.com");
        await page.locator("#password").fill("Banu1234");
        await page.locator("#Login").click();

        //Click on the App Launcher button
        await page.locator("//button[@title='App Launcher']").click();
        await page.locator("//*[@aria-label='View All Applications']").click();

        //Click on the Sales link

        await page.locator("//*[text()='Lightning Usage App']/preceding::a[1]").click();
        await page.locator("//span[text()='Show more navigation items']").click();
        await page.locator("//span[text()='Cases']").last().click();

        //click on the case number and update the fields and save

        // await page.locator("//a[@title='00001031']").click();
        await page.locator(`//a[@title='${caseNumber}']`).click();


        await page.locator("//*[text()='Edit Status']").click();

        await page.locator("//button[@aria-label='Status']").click();
        await page.locator("//*[@data-value='Working']").click();

        await page.locator("//button[@aria-label='Priority']").click();
        await page.locator("//*[@data-value='Low']").click();
        await page.locator("//button[@aria-label='Case Origin']").click();
        await page.locator("//*[@data-value='Phone']").click();
        await page.locator("//button[@aria-label='SLA Violation']").click();
        await page.locator("//*[@data-value='No']").click();
        //click save button
        await page.locator("//*[@name='SaveEdit']").click();

        const stat = await page.locator("(//*[text()='Working'])[2]").innerText();
        console.log(stat);
    })

    test(`Delete salesforce test`, async ({ request }) => {
      
        await deleteResource(request);


    })
})
