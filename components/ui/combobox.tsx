"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ComboBoxProps {
    options: { label: string; value: string }[];
    value?: string;
    onChange: (value: string) => void;
}

export const ComboBox = ({ options = [], value, onChange }: ComboBoxProps) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-white border border-gray-300 rounded-md shadow-sm"
                >
                    {value
                        ? options.find((option) => option.value === value)?.label
                        : "Select option..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-2">
                <div className="max-h-60 overflow-auto">
                    {options.length > 0 ? (
                        options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value === value ? "" : option.value)
                                    setOpen(false)
                                }}
                                className={`flex p-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                                    value === option.value ? "bg-sky-500" : ""
                                }`}
                            >
                              {value === option.value &&  <Check
                                    className={`mr-2 size-5  text-green-500 `}
                                />}
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">No options available</div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
