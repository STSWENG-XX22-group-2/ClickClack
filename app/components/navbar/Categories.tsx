'use client';

import Container from "../Container";
import {GoCpu} from "react-icons/go";
import {BsGpuCard, BsFillMotherboardFill} from "react-icons/bs";
import {FaMemory, FaFan} from "react-icons/fa";
import {CiHardDrive} from "react-icons/ci";
import {ImPowerCord} from "react-icons/im";
import {PiComputerTowerBold} from "react-icons/pi";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaRegKeyboard, FaMouse  } from "react-icons/fa";

export const categories = [
    {
        label: "CPU",
        icon: GoCpu,
        description: "Central Processing Unit (CPU) is the brain of your computer.",
    },
    {
        label: "GPU",
        icon: BsGpuCard,
        description: "Graphics Processing Unit (GPU) handles graphics rendering for gaming and visual applications.",
    },
    {
        label: "RAM",
        icon: FaMemory,
        description: "Random Access Memory (RAM) stores temporary data for the CPU to access quickly.",
    },
    {
        label: "Storage",
        icon: CiHardDrive,
        description: "Storage devices store data permanently on your computer, including SSDs and HDDs.",
    },
    {
        label: "Motherboard",
        icon: BsFillMotherboardFill,
        description: "The motherboard connects all components of your computer together.",
    },
    {
        label: "PSU",
        icon: ImPowerCord,
        description: "Power Supply Unit (PSU) supplies power to all components of your computer.",
    },
    {
        label: "Cooling",
        icon: FaFan,
        description: "Cooling solutions, such as fans and liquid cooling, keep your PC components from overheating.",
    },
    {
        label: "Case",
        icon: PiComputerTowerBold,
        description: "The case houses and protects all your PC components.",
    },
    {
        label: "Mouse",
        icon: FaMouse,
        description: "A mouse lets you press buttons or apps in your desktop",
    },
    {
        label: "Keyboard",
        icon: FaRegKeyboard,
        description: "A keyboard lets you type or command your pc",
    },
];


const Categories = () =>{
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if(!isMainPage){
        return null;
    }
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) =>(
                    <CategoryBox 
                        key={item.label} 
                        label={item.label} 
                        selected={category === item.label}
                        icon={item.icon} 
                        />
                ))}
            </div>
            
        </Container>
    )
}

export default Categories;