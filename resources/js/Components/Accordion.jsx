import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index} className="border-b border-gray-200 py-6 last:border-0">
                        <button
                            className="w-full flex justify-between items-center text-left focus:outline-none"
                            onClick={() => toggleItem(index)}
                        >
                            <span className="text-lg font-medium text-gray-900">{item.question}</span>
                            <div className="ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-50">
                                <ChevronDown 
                                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                                    strokeWidth={1.5}
                                />
                            </div>
                        </button>
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                        >
                            <p className="text-gray-500 leading-relaxed pr-12">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
