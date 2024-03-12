"use client";
// import "./uppernavbar.css"

import React, { useRef, useState, useEffect } from 'react';
import { GoDotFill } from 'react-icons/go'
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BiSolidPhoneCall } from "react-icons/bi";


const UpperNavbar = () => {

    const govtNotification = [
        {
            heading: "Explore the World of Renewable Energy: Sustainable Solutions for Tomorrow",
            link: "https://www.example.com/renewable-energy"
        },
        {
            heading: "The Magic of Wildlife Photography: Capturing Nature's Beauty Through Lenses",
            link: "https://www.example.com/wildlife-photography"
        },
        {
            heading: "Mastering the Art of Baking: Delicious Recipes and Pro Tips for Beginners",
            link: "https://www.example.com/art-of-baking"
        },
        {
            heading: "Understanding Artificial Intelligence: Transforming Industries and Our Future",
            link: "https://www.example.com/artificial-intelligence"
        },
        {
            heading: "Effective Time Management: Balancing Productivity and Personal Life",
            link: "https://www.example.com/time-management-tips"
        },
        {
            heading: "The Beauty of Classical Music: Exploring Timeless Melodies and Composers",
            link: "https://www.example.com/classical-music"
        },
        {
            heading: "Healthy Living: Small Changes for a Healthier and Happier Lifestyle",
            link: "https://www.example.com/healthy-living-tips"
        },
        {
            heading: "Diving into World Literature: Discovering Stories from Different Cultures",
            link: "https://www.example.com/world-literature"
        },
        {
            heading: "The Evolution of Modern Art: Influential Movements and Revolutionary Artists",
            link: "https://www.example.com/modern-art-evolution"
        },
        {
            heading: "Navigating the Stock Market: Essential Strategies for New Investors",
            link: "https://www.example.com/stock-market-strategies"
        },
        {
            heading: "Travel Photography: Capturing Memories and Cultures Around the Globe",
            link: "https://www.example.com/travel-photography-tips"
        },
        {
            heading: "The Power of Positive Thinking: Transforming Mindset for Success and Happiness",
            link: "https://www.example.com/positive-thinking-power"
        },
        {
            heading: "Climate Change Awareness: Taking Action for a Sustainable Future",
            link: "https://www.example.com/climate-change-awareness"
        },
        {
            heading: "Unraveling the Universe: Fascinating Insights into Astrophysics and Cosmology",
            link: "https://www.example.com/universe-astrophysics"
        },
        {
            heading: "Embracing Diversity: Celebrating Differences and Building Inclusive Communities",
            link: "https://www.example.com/embrace-diversity"
        },
        {
            heading: "The World of Online Gaming: Strategies, Communities, and Game Reviews",
            link: "https://www.example.com/online-gaming-world"
        },
        {
            heading: "Digital Marketing Insights: Trends and Techniques for Online Success",
            link: "https://www.example.com/digital-marketing-insights"
        },
        {
            heading: "Exploring Ancient Philosophy: Wisdom from the Great Thinkers of History",
            link: "https://www.example.com/ancient-philosophy"
        },
        {
            heading: "Fitness for Everyone: Exercise Routines and Nutrition Tips for All Ages",
            link: "https://www.example.com/fitness-for-all"
        },
        {
            heading: "The Art of Storytelling: Crafting Compelling Narratives in Writing and Speech",
            link: "https://www.example.com/art-of-storytelling"
        }
        // Add more objects as needed
    ];

    const divRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [navbarState, setNavbarState] = useState(false);

    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            if (divRef.current && !isHovered) {
                if (divRef.current.scrollLeft + divRef.current.clientWidth >= divRef.current.scrollWidth) {
                    divRef.current.scrollLeft = 0;
                } else {
                    divRef.current.scrollLeft += 1;
                }
            }
        }, 10); // Adjust scroll speed here

        const changeBackground = () => {
            if (window.scrollY >= 200) {
                setNavbarState(true);
            } else {
                setNavbarState(false);
            }
        };

        changeBackground();

        window.addEventListener("scroll", changeBackground);

        return () => {
            clearInterval(autoScrollInterval);
            window.removeEventListener("scroll", changeBackground);
        };
    }, [isHovered]);

    return (
        <>
             <div
            className={`w-screen lg:px-12 py-2 bg-black text-white flex ${
                navbarState ? "fixed top-0 left-0 z-50" : "static"
            }`}
            style={{ zIndex: 50,height: "36px" }} // Ensure z-index is higher than Navbar
        >
            <div className='w-[20vw] border-r-2 px-4 mr-2 border-gray-400 flex justify-center items-center  min-w-max max-lg:hidden'>
                <p className='font-custom tracking-wide hover:text-green-400 hover:font-[500] hover:tracking-wider duration-300'>
                    Explore the World
                </p>
            </div>

            <div
                ref={divRef}
                className="overflow-hidden lg:min-w-[60vw] lg:max-w-[60vw] w-[98vw] 
                    flex items-center flex-row gap-x-8"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                    {
                        govtNotification && govtNotification?.length > 0 &&
                        govtNotification?.map((item, index) => (
                            <div key={index} className="w-full min-w-max flex justify-center items-center group">
                                <GoDotFill className='mr-1 inline group-hover:text-orange-300' />
                                <a className='text-xs md:text-sm font-[500] font-custom items-center inline  tracking-wide 
                                     duration-150 group-hover:text-orange-300' href={item.link} target="_blank" rel="noreferrer" >{item.heading}</a>
                            </div>
                        ))
                    }
                </div>

                <div className='w-[20vw] border-l-2 px-4 ml-2 border-gray-400 flex justify-center items-center  min-w-max max-lg:hidden'>
                <p className='font-custom tracking-wide hover:text-green-400 hover:font-[500] hover:tracking-wider duration-300'>
                    Download Brochure
                </p>
            </div>

            </div>

            <div className='fixed bottom-2 right-2 z-[999]'>
                <div className='flex gap-3 flex-col'>
                    <a href="https://www.facebook.com/weAvecUofficial" target={"_blank"} rel="noreferrer">
                    <div class="icon">
                        <FaFacebook className='text-blue-600 bg-white text-5xl md:text-4xl duration-200 bg-white rounded-full p-1' />
                        {/* <span class="text">Weavecu official</span> */}
                    </div>
                    </a>
                    <a href="https://www.instagram.com/weavecu_official" target={"_blank"} rel="noreferrer">
                        <div class="icon">
                        <AiFillInstagram className='text-[#cd486b] bg-white text-5xl md:text-4xl duration-200 rounded-full p-1' />
                        {/* <span class="text">Weavecu official</span> */}
                        </div>
                    </a>
                    <a href="https://wa.link/c306o4" target={"_blank"} rel="noreferrer">
                    <div class="icon">
                        <FaWhatsapp className='text-green-500 bg-white text-5xl md:text-4xl duration-200 rounded-full p-1' />
                        {/* <span class="text">09169179918</span> */}
                    </div>
                    </a>
                    <a href="tel:+919169179918" target={"_blank"} rel="noreferrer">
                    <div class="icon">
                        <BiSolidPhoneCall className='text-blue-500 bg-white text-5xl md:text-4xl duration-200 rounded-full p-1' />
                        {/* <span class="text">09169179918</span> */}
                    </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default UpperNavbar
