import { faker } from "@faker-js/faker";
import test, { expect }  from "@playwright/test"
import { createResource, getResource} from "./apiUtility";

let lname = faker.person.lastName();
let company = faker.company.buzzNoun();
let id:any
let searchName:any

test.describe.serial(`API Testng for servicenow`, async () => {
test(`E2E salesforce test`,async({request})=>{

id = await createResource(request,lname,company)
searchName = await getResource(request)
console.log(id);
console.log(searchName);


})

test(`search the lead`, async({page})=>{
    await page.goto("https://login.salesforce.com");
    // Loginto the Application
    await page.locator("#username").fill("nargis2k7974@agentforce.com");
    await page.locator("#password").fill("Banu1234");
    await page.locator("#Login").click();

    //Click on the App Launcher button
    await page.locator("//button[@title='App Launcher']").click();
    await page.locator("//*[@aria-label='View All Applications']").click();

    //Click on the Leads link

    await page.locator("//*[text()='Legal Entities']/preceding::a[1]").click();
    await page.waitForTimeout(3000)
    //click on the serach field and enter last name and search
    //await page.locator("//*[@aria-label='Search']").fill(searchName)
    await page.locator("//input[@placeholder='Search this list...']").fill(searchName)
    
   
}) 
})
