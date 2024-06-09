import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const {video} = new Mux(
    {tokenId:process.env.MUX_TOKEN_ID!, tokenSecret: process.env.MUX_TOKEN_SECRETE! }
);

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string }}
){
    try {
        const {userId} = auth();
        const {courseId} = params;
        const values = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorised User", {status: 401});
        }

        const course  = await db.course.update({
            where: { 
                id: courseId,
                userId
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(course);

    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("internal Error", {status: 500});
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {courseId: string}}
){
    try {
        const {userId} = auth();

        if (!userId || !isTeacher(userId))  {
            return new NextResponse("Unauthorised User", {status: 401});
        }

        // const ownCourse = await db.course.findUnique({
        //     where: {
        //         id: params.courseId,
        //         userId
        //     }
        // })

        // if (!ownCourse) {
        //     return new NextResponse("Unauthorised", {status: 401});
        // }

        const course  = await db.course.findUnique({
            where: { 
                id: params.courseId,
               userId: userId,
            },
            include: {
                chapters:{
                    include:{
                        muxData: true,
                    }
                }
            }
        });

        if (!course) {
            return new NextResponse("Not Found", {status: 404});
        }

        for( const chapter of course.chapters){
            if (chapter.muxData?.assetId) {
                await video.assets.delete(chapter.muxData.assetId);
            }
        }

        const deleteCourse = await db.course.delete({
            where: {
                id: params.courseId,
            }
        })

        return NextResponse.json(deleteCourse);

    } catch (error) {
        console.log("[COURSE_ID_DELETE]", error);
        return new NextResponse("internal Error", {status: 500});
    }
}