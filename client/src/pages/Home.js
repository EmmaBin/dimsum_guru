import { useState, useEffect } from 'react';
import backgroundImage from '../assets/HK.jpg';

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
        console.log("page loaded")
        console.log(loaded)
    }, []);

    return (


        <div className={`relative flex items-center justify-center h-screen transition-all duration-1000 ${loaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} text-black`}>
            <div className="absolute inset-0">
                <img className="w-full h-full object-cover filter blur-md opacity-60" src={backgroundImage} alt="background"/>
            </div>
            <div className="relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Dimsum Guru</h1>
                <p className="text-xl md:text-2xl lg:text-3xl">
                    The ultimate destination for your dim sum cravings! We are a boutique restaurant that takes pride in serving a diverse range of delectable dim sum dishes, carefully crafted by our team of seasoned chefs who are nothing short of dim sum maestros.
                </p>
                <br />
                <p className="text-xl md:text-2xl lg:text-3xl">
                    At Dimsum Guru, we don't just serve food; we offer an experience. An experience that takes you on a culinary journey to the heart of Canton, China, where this traditional delicacy was born. Each bite will transport you to the bustling street markets of Guangdong province, a place renowned for its rich food culture and the birthplace of the culinary tradition that is dim sum.
                </p>
            </div>
        </div>
    );
}




