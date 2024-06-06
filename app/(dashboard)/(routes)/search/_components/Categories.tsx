'use client'

import { Category } from '@prisma/client'
import React from 'react'
import {FcEngineering, FcMusic, FcFilmReel, FcMultipleDevices, FcOldTimeCamera, FcSalesPerformance, FcSportsMode, FcAdvertising, FcMakeDecision, FcPrivacy, FcPieChart  } from 'react-icons/fc'
import { IconType } from 'react-icons/lib'
import CategoryItem from './CategoryItem'

interface CategoriesProps{
    items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
    "Music": FcMusic,
    "Photography & VideoGraphy": FcOldTimeCamera,
    "Health Science": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Engineering": FcEngineering,
    "Acting": FcFilmReel,
    "Cyber Security": FcMultipleDevices,
    "Marketing & Sales": FcAdvertising,
    "Data Anlytics": FcPieChart ,
    "Psycology": FcPrivacy,
    "Web Development": FcMakeDecision,
}

const Categories = ({items}: CategoriesProps) => {

  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
        {items.map((item) =>(
            <CategoryItem
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
            />
        ))}
    </div>
  )
}

export default Categories