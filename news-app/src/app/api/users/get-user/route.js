const {NextResponse, NextRequest} = require('next/server')
export const POST = async (req) =>{
    const input = await req.json()
    console.log(input)
    return NextResponse.json({message: input})

}