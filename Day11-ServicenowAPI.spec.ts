//import { en, faker } from '@faker-js/faker'

import test, { chromium, APIRequestContext, expect } from '@playwright/test'



// Endpoint

const endPointUrl = "https://dev216320.service-now.com/api/now/table/change_request"

// Headers-Auth

const auth = `Basic YWRtaW46VVkybU9VZV43cEBm`

// Body -Payload

// Response /validation
let sys_id: any
//let task_effective_number: any
test.describe.serial(`API Testng for servicenow`, async () => {
    test(`Learning with API requestContext`, async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()

        const apiRequest = context.request
        const response = await apiRequest.post(endPointUrl, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
            data: {
                "short description": "Add servicenow description"
            }
        })
        const resBody = await response.json()

        sys_id = resBody.result.sys_id;
        console.log(sys_id)
        console.log(`${response.status()}--${response.statusText()}`)
    })

    test(`Get with API requestContext`, async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()

        const apiRequest = context.request
        const resp = await apiRequest.get(`${endPointUrl}/${sys_id}`, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
        })
        const resBody = await resp.json()
        console.log(resBody)
        console.log(`${resp.status()}--${resp.statusText()}`)
    })

    test(`patch with API requestContext`, async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()

        const apiRequest = context.request
        const resp = await apiRequest.patch(`${endPointUrl}/${sys_id}`, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
            data: {
                "description": "Change request updated"
            },
        })
        const resBody = await resp.json()
        console.log(resBody)
      //  sys_id = resBody.result.sys_id
        console.log(sys_id)
        console.log(`${resp.status()}--${resp.statusText()}`)
    })


    test(`delete with API requestContext`, async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()

        const apiRequest = context.request
        const resp = await apiRequest.delete(`${endPointUrl}/${sys_id}`, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
                    })
       
        console.log(`${resp.status()}--${resp.statusText()}`)
    })




})