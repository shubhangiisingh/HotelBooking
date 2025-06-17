import User from "../models/User.js";
import {Webhook} from "svix";
const clerkWebHooks = async (req, res) => {
    try{
        const whook =  new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        
        };
        await whook.verify(JSON.stringify(req.body), headers)
        // Getting Data from the request body
        const {data, type} = req.body
        const userData = {
           _id: data.id,
           email: data.email_addresses[0].email_address,
           username: data.first_name + " " + data.last_name,
           image: data.image_url, 
        }
        //Switch cases for different Events
        switch(type){
            case "user.created":
                await User.create(userData)
                break;
            case "user.updated":
                await User.updateOne({email: data.email_addresses[0].email_address}, userData)
                break;
            case "user.deleted":
                await User.deleteOne({email: data.email_addresses[0].email_address})
                break;
            default:
                break
        }
        res.json({status: true, message: "Webhook Recieved"})
    } catch(error){
       console.log(error.message);
       res.json({status: false, message: error.message});
    }
}
export default clerkWebHooks