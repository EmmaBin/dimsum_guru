import { useState, useEffect } from 'react';
import backgroundImage from '../assets/HK.jpg';

export default function Home() {
    const [loaded, setLoaded] = useState(false);
    const [loadedParagraph1, setLoadedParagraph1] = useState(false);
    const [loadedParagraph2, setLoadedParagraph2] = useState(false);

    useEffect(() => {
        setLoaded(true);
        setTimeout(() => setLoadedParagraph1(true), 1000); // delay for paragraph1
        setTimeout(() => setLoadedParagraph2(true), 2000); // delay for paragraph2
    }, []);

    return (
        <div className="relative flex items-center justify-center h-screen text-white font-montserrat">
            <div className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ease-in-out ${loaded ? 'filter blur-sm opacity-90' : ''}`}>
                <img className="w-full h-full object-cover" src={backgroundImage} alt="background"/>
            </div>
            <div className={`relative z-10 text-center transition-all duration-1000 ease-in-out p-10 ${loaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                <h1 className="text-4xl mb-14 md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Dimsum Guru</h1>
                <div className="grid grid-cols-2 gap-4 h-full justify-items-center justify-content-center">
                    <div></div> {/* empty div to create a gap */}
                    <div className={`text-xl md:text-2xl lg:text-3xl transition-all duration-1000 ease-in-out ${loadedParagraph1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                        Your destination for extraordinary dim sum! Our seasoned chefs craft a range of exquisite dishes to delight your palate.
                    </div>
                    <div className={`text-xl md:text-2xl lg:text-3xl transition-all duration-1000 ease-in-out ${loadedParagraph2 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                        We're not just about food, we offer an experience. Journey to the heart of Canton, China, with every bite you take.
                    </div>
                    <div></div> {/* empty div to create a gap */}
                </div>
            </div>
        </div>
    );
}












