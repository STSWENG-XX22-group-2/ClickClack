'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS{
    Category=0,
    IMAGES=1,
    DESCRIPTION=2,
}

const RentModal = () =>{

    const router = useRouter();
    const rentModal = useRentModal();
    
    const [step, setStep] = useState(STEPS.Category);
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            category: '',
            imageSrc:'',
            title:'',
            description: '',
        }
    });
    const category = watch('category');
    const imageSrc = watch('imageSrc');



    const setCustomValue = (id: string, value: any) =>{
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () =>{
        setStep((value) => value - 1);
    };

    const onNext =() =>{
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if(step !== STEPS.DESCRIPTION){
            return onNext();
        }
        setIsLoading(true)
        axios.post('/api/listings', data)
        .then(()=>{
            toast.success("Added your post")
            router.refresh();
            reset();
            setStep(STEPS.Category);
            rentModal.onClose();
        })
        .catch(()=>{
            toast.error("Something went wrong");
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }
    const actionlabel = useMemo(()=>{
        if(step === STEPS.DESCRIPTION){
            return 'Post';
        }
        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.Category){
            return undefined;
        }
        return 'Back';
    }, [step]);


    let bodyContent =(
        <div className="flex flex-col gap-8">
            <Heading 
                title="Which of these are your component"
                subtitle="Pick a Category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item)=>(
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category)=>setCustomValue('category', category)}
                            selected={category===item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.IMAGES){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading 
                    title="upload your Image"
                    subtitle="upload png or jpeg format only"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Describe your build/part/component"
                    subtitle="feel free to make it short or very long"    
                />
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
            

        )
    }
    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionlabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.Category ? undefined : onBack}
            title ="Post your Component"
            body={bodyContent}
        />
    );
}

export default RentModal