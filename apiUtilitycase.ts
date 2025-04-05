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

export async function generateToken(request:APIRequestContext){

    const response = await request.post(endPointUrl,{
        headers:{
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
    return{
        access:accessToken,
        url:instanceUrl,
        token:tokenType
    }

}

export async function createResource(request:APIRequestContext,status:string,origin:string){

    const response = await request.post(
        `${((await generateToken(request)).url)}/services/data/v63.0/sobjects/case`,{
            headers:{

                "Authorization":`${tokenType} ${accessToken}`,
                "context-Type":"application/json"
            },
            data:{
                "status": status,
                "origin": origin
            }
        } )
        const resBody = await response.json();
        console.log(resBody)
        id = resBody.id
        return status
}

export async function getResource(request:APIRequestContext){

    const response = await request.get(
        `${((await generateToken(request)).url)}/services/data/v63.0/sobjects/case/${id}`,{
            headers:{

                "Authorization":`${tokenType} ${accessToken}`,
                "context-Type":"application/json"
            }
        } )
        const resBody = await response.json();
        console.log(resBody)
        return resBody.CaseNumber;
}

export async function deleteResource(request:APIRequestContext){

    const response = await request.delete(
        `${((await generateToken(request)).url)}/services/data/v63.0/sobjects/case/${id}`,{
            headers:{

                "Authorization":`${tokenType} ${accessToken}`,
                "context-Type":"application/json"
            }
        } )
        console.log(`${response.status()}`)
                
}
