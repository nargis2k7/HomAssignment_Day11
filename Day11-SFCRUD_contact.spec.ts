import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test"
import { deleteContact,  getContact,  updateContact } from "./apiUtilitycase_contact";

let Phone =Number( faker.phone.number());
//let numericPhone = Number(Phone);
let email = faker.internet.email();
let title = faker.person.jobTitle();
let dept = faker.company.buzzNoun();
let firstName = faker.person.firstName();
let lastName = faker.person.lastName();
//let id: any;

test.describe.serial(`API Testng for servicenow`, async () => {
  

    test(`Create the contact`, async ({ page }) => {
        await page.goto("https://login.salesforce.com");
        // Loginto the Application
        await page.locator("#username").fill("nargis2k7974@agentforce.com");
        await page.locator("#password").fill("Banu1234");
        await page.locator("#Login").click();

        //Click on the App Launcher button
        // await page.locator("//a[@title='Contacts']/following::span[1]//lightning-primitive-icon").click();

        await page.locator("//*[contains(@class,'globalCreateTrigger ')]//lightning-primitive-icon").click();
        await page.locator("(//*[text()='New Contact'])[1]").click();


        //Click on the Sales link
        await page.locator("//*[@class='select']").click();
        await page.locator("//*[@title='Mr.']").click();
        await page.getByPlaceholder("First Name").fill(firstName)
        await page.getByPlaceholder("Last Name").fill(lastName)
        await page.locator("(//*[@class=' input'])[1]").fill("abc@gmail.com")
        await page.getByPlaceholder("Search Accounts...").click();
        await page.locator("//span[@title='New Account']").click();


        await page.locator("(//*[@type='text'][@class=' input'])[3]").fill("Credits")
        await page.locator("(//*[text()='Save'])[4]").click();

        await page.locator("(//*[text()='Save'])[3]").click();

        await page.reload();

        await page.locator("//*[text()='Contacts']").first().click();

        const Name = await page.locator(`//*[text()='${firstName} ${lastName}']`).innerText();
        console.log(Name);

    })
   
    test(`E2E salesforce test`, async ({ request }) => {


         await getContact(request)
      


    })
   

    test(`E2E updateContact test`, async ({ request }) => {


         await updateContact(request, email, title,Phone, dept)
    


    })


    test(`Delete Contact test`, async ({ request }) => {

        await deleteContact(request);


    })
})
