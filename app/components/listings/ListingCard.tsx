'use client'

import { SafeUser } from "@/app/types";
import { Listing, Rating } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {format} from 'date-fns';
import Image from "next/image"
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps{
    data: Listing
    rating?: Rating
    onAction?: (id: string) => void;
    disabled?: boolean
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    rating = 0,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) =>{
    const router = useRouter();



    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) =>{
            e.stopPropagation();
            if(disabled){
                return;
            }
            onAction?.(actionId);
    },[onAction, actionId, disabled]);



    return (
     <div 
        onClick={() => router.push(`/listing/${data.id}`)}
        className="col-span-1 cursor-pointer group">


        <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <Image 
                    fill
                    alt="Listing"
                    src={data.imageSrc}
                    className="object-cover h-full w-full group-hover:scale-100 transition"  
                />
                <div className="absolute top-3 right-3">
                    <HeartButton
                        listingId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className="font-light text-lg">
                {`${data.category} , `}
            </div>
            <div className="flex flex-col">
                <div className="text-lg">
                    {data.title}
                </div>
                <div className="font-light text-sm">
                    {data.description}
                </div>
            </div>
            {onAction && actionLabel && (
                <Button 
                    disabled={disabled}
                    small
                    label={actionLabel}
                    onClick={handleCancel}
                />
            )}
        </div>
     </div>
    );
}

export default ListingCard