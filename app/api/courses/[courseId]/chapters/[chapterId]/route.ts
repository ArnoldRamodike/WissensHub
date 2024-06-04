import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string, chapterId: string }}
){
    try {
        const {userId} = auth();
        const { isPublished, ...values} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorised User", {status: 401});
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        })

        if (!ownCourse) {
            return new NextResponse("Unauthorised", {status: 401});
        }

        const chapter  = await db.chapter.update({
            where: { 
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values,
            }
        });

        //TODO: Hanfle Vido Upload

        return NextResponse.json(chapter);

    } catch (error) {
        console.log("[CHAPTER_ID]", error);
        return new NextResponse("internal Error", {status: 500});
    }
}