import { FastifyReply, FastifyRequest } from "fastify";

export const authenticate=async(request:FastifyRequest,reply:FastifyReply)=>{
    try{
        await request.jwtVerify();
    }catch{
        reply.send({error:"Unauthorised"});
    }
}