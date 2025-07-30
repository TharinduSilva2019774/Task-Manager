import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
try{
    const { userId } = await auth()
    console.log("In routing")
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const {title, description,date,completed,important} = await req.json()

    if (!title || !description || !date){
        return NextResponse.json({
            error:"Missing requied fields",
            status:400,
        });
    }

    if (title.length < 3){
        return NextResponse.json({
            error:"Title must be atleast 3 characters long",
            status:400,
        });
    }

    const task = await prisma.task.create({
        data: {
          title,
          description,
          date,
          isCompleted: completed,
          isImportant: important,
          userId,
        },
      });

      return NextResponse.json({task});

}catch(error){
        console.log("ERROR CREATING TASK: ",error)
        return NextResponse.json({error: "Error creating task", status:500})
    }
}

export async function GET(req: Request) {
    try{
        const { userId } = await auth();

        if (!userId) {
          return NextResponse.json({ error: "Unauthorized", status: 401 });
        }
    
        const tasks = await prisma.task.findMany({
          where: {
            userId,
          },
        });
        return NextResponse.json(tasks);
    }catch(error){
            console.log("ERROR GETTING TASK: ",error)
            return NextResponse.json({error: "Error getting task", status:500})
        }
    }

export async function PUT(req: Request) {
    try{
        const { userId } = await auth();
        const {isCompleted, id} = await req.json();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }
        const tasks = await prisma.task.update({
            where:{
                id
            },
            data: {
                isCompleted,
            }
          });
          return NextResponse.json(tasks);
    }catch(error){
            console.log("ERROR PUTTING TASK: ",error)
            return NextResponse.json({error: "Error putting task", status:500})
    }
}
