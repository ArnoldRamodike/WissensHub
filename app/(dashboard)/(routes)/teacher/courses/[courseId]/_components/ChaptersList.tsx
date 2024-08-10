'use client'

import { Chapter } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { cn } from '@/lib/utils'
import { Grip, Pencil } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ChaptersListProps {
    items: Chapter[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
}

const ChaptersList = ({ items, onReorder, onEdit }: ChaptersListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const updatedChapters = Array.from(chapters);
        const [movedChapter] = updatedChapters.splice(result.source.index, 1);
        updatedChapters.splice(result.destination.index, 0, movedChapter);

        // Update state with reordered chapters
        setChapters(updatedChapters);

        // Prepare the data to send to the server
        const bulkUpdateData = updatedChapters.map((chapter, index) => ({
            id: chapter.id,
            position: index
        }));

        onReorder(bulkUpdateData);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='chapters'>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                {(provided) => (
                                    <div
                                        className={cn(
                                            "flex items-center gap-x-2 bg-slate-200 border-sky-200 border text-slate-700 rounded-md mb-4 text-sm",
                                            chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div className={cn(
                                            "px-2 py-3 border-r border-r-sky-200 hover:bg-slate-200 rounded-l-md transition",
                                            chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                        )}>
                                            <Grip className='h-5 w-5' />
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            {chapter.isFree && (
                                                <Badge>Free</Badge>
                                            )}
                                            <Badge className={cn("bg-slate-500", chapter.isPublished && "bg-sky-700")}>
                                                {chapter.isPublished ? "Published" : "Draft"}
                                            </Badge>
                                            <Pencil onClick={() => onEdit(chapter.id)} className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ChaptersList;
