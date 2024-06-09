import { isTeacher } from '@/lib/teacher';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const teacherLayout = ( {children} : {children: React.ReactNode;}) => {

    const {userId} = auth();

    if (!isTeacher(userId)) {
        return redirect("/");
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default teacherLayout