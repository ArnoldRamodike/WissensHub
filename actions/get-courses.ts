import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client"
import { GetProgres } from "./get-progress";


type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: {id: string}[];
    progress: number | null;
};


type GetCourses ={
    userId: string;
    title?: string;
    categoryId?: string;
}

export const getCourses  = async ({ userId, title, categoryId } : GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const course = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    }
                },
                Purchases: {
                    where: { userId}
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

      const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
        course.map(async course => {
            if (course.Purchases.length === 0) {
                return {
                    ...course,
                    progress: null,
                }
            }

            const progressPerecentage = await GetProgres(userId, course.id);

            return {
                ...course,
                progress: progressPerecentage,
            };
        })
      );

      return coursesWithProgress;

    } catch (error) {
        console.log("GET_COURSES", error);
        return [];
    }
}