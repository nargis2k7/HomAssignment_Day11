import { APIRequestContext } from "@playwright/test"

const endPointUrl = "https://login.salesforce.com/services/oauth2/token"
let accessToken: any
let instanceUrl: any
let tokenType: any
let id: any
const grant_type = "password"
const client_id = "3MVG95mg0lk4bathv4oYb772GRC3bVxW1Es_Q3iIRRNR8SK5ApA.LJbPT96HpWJInRGniHTbF.cUq2.uJatoV"
const client_secret = "149569A62384820C94E7FCB265BEFEC659DE02AD4E4D4BAEE95A354329BCD654"
const username = "nargis2k7974@agentforce.com"
const password = "Banu1234"

export async function generateToken(request: APIRequestContext) {

    const response = await request.post(endPointUrl, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            "grant_type": grant_type,
            "client_id": client_id,
            "client_secret": client_secret,
            "username": username,
            "password": password
        }
    })
    const resBody = await response.json()
    accessToken = resBody.access_token
    instanceUrl = resBody.instance_url
    tokenType = resBody.token_type
    return {
        access: accessToken,
        url: instanceUrl,
        token: tokenType
    }

}

export async function updateContact(request: APIRequestContext, email: string, title: string,Phone:number,department: string,) {

    const response = await request.patch(
        `${((await generateToken(request)).url)}/services/data/v63.0/sobjects/contact/${id}`, {
        headers: {

            "Authorization": `${tokenType} ${accessToken}`,
            "context-Type": "application/json"
        },
        data: {
            "Phone": Phone,
            "email": email,
            "title": title,
            "department": department
        }
    })
   // const resBody = await response.json();
   // console.log(resBody)
    if (response.status() === 204) {
        console.log("Success! But no content returned.");
      } else {
        const resBody = await response.json();
        console.log(resBody);
      }
    //return status
}

export async function getContact(request: APIRequestContext) {

    const response = await request.get(
        `${((await generateToken(request)).url)}/services/data/v63.0/sobjects/contact`, {
        headers: {

            "Authorization": `${tokenType} ${accessToken}`,
            "context-Type": "application/json"
        }
    })
    const resBody = await response.json();

     id = resBody.recentItems[0].Id;

    console.log("Contact ID:", id);
  //  return id;
}

export async function deleteContact(request:APIRequestContext){
    console.log("Delete ID:", id);
    const response = await request.delete(
        `${((await generateToken(request)).url)}/services/data/v63.0/sobjects/contact/${id}`,{
            headers:{

                "Authorization":`${tokenType} ${accessToken}`,
                "context-Type":"application/json"
            }
        } )
        console.log(`${response.status()}`)
                
}