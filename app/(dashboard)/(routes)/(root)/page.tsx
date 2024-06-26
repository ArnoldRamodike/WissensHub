import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/courses-list";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import InfoCard from "./_components/InfoCard";

export default async function Dashboard() {

 const {userId}  =  auth();

  if (!userId) {
    console.log("user not found");
     return redirect("/sign-in")
  }

  
  const {completedCourses, coursesInProgress} = await getDashboardCourses(userId);

  return userId &&(
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="In progress" numberOfItems={coursesInProgress.length} />
        <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} varient="success"/>
      </div>

      <CoursesList items={[...coursesInProgress, ...completedCourses]}/>
    </div>
  );
}
