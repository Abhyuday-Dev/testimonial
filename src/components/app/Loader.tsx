import React, { useEffect } from 'react';

const Loader: React.FC = () => {
    useEffect(() => {
        // Create a style element
        const style = document.createElement('style');
        style.textContent = `
            @keyframes loader3Bounce {
                0%, 80%, 100% {
                    transform: scale(0);
                }
                40% {
                    transform: scale(1.0);
                }
            }
        `;
        // Append the style element to the head of the document
        document.head.appendChild(style);

        // Cleanup the style tag when the component unmounts
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    maxWidth: '300px',
                }}
            >
               
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                    }}
                >
                    <div
                        style={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            backgroundColor: '#A020F0',
                            display: 'inline-block',
                            animation: 'loader3Bounce 1.4s infinite ease-in-out both',
                            animationDelay: '-0.32s',
                        }}
                    ></div>
                    <div
                        style={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            backgroundColor: '#b2b2eb',
                            display: 'inline-block',
                            animation: 'loader3Bounce 1.4s infinite ease-in-out both',
                            animationDelay: '-0.16s',
                        }}
                    ></div>
                    <div
                        style={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            backgroundColor: '#b2b2eb',
                            display: 'inline-block',
                            animation: 'loader3Bounce 1.4s infinite ease-in-out both',
                        }}
                    ></div>
                </div>
               
            </div>
        </div>
    );
};

export default Loader;
