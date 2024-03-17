import { useState, useEffect } from "react";

export default function ReceivedMessages({ userData, setUserData, setShow }: any) {
    console.log("From received messages")
    console.log(userData._id);
    const [id, setId] = useState(userData._id);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/messages/message/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
    }, [id])

    const textToMorseCode = (message: string) => {
        const morseCodeMap: { [key: string]: string } = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
            'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
            'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
            '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', '.': '.-.-.-', ',': '--..--',
            '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
            ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
            '$': '...-..-', '@': '.--.-.', ' ': '/'
        };

        const morseCode = message.toUpperCase().split('').map((char) => morseCodeMap[char]);
        console.log(morseCode)
        playMorseCode(morseCode, 0);
    };

    let delay = 0;

    const playMorseCode = (morseCode: any, index: number) => {
        if (index >= morseCode.length) {
            return;
        }
        const code = morseCode[index];
        const smallBeep = new Audio('smallBeep.wav');
        const longBeep = new Audio('bigBeep.wav');
        for (let i = 0; i < code.length; i++) {
            if (code[i] === '.') {
                setTimeout(() => {
                    smallBeep.play();
                }, delay);
                delay += 500;
            }
            else if (code[i] === '-') {
                setTimeout(() => {
                    longBeep.play();
                }, delay);
                delay += 1500;
            }
            else if (code[i] === '/') {
                delay += 2000;
            }

        }

        setTimeout(() => {
            playMorseCode(morseCode, index + 1);
        }, 2000);
    }

    if (data.length === 0) {
        return (
            <div className="bg-[#EAD196] min-h-screen w-7/12">
                <button>
                    <a onClick={() => { setShow() }} className="text-black text-center block mt-5">{"<-"}</a>
                </button>
                <div className="w-full justify-center">
                    <h1 className="text-center text-1xl font-bold text-black">No messages yet</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#EAD196] min-h-screen">
            <button>
                <a onClick={() => { setShow() }} className="text-black text-center block mt-5">{"<-"}</a>
            </button>
            {
                data.map((item: any, index: any) => (
                    <div id={index} className="flex flex-row border-dashed w-[52rem] text-black border-2 border-black px-5 py-3 my-5">
                        <div className="justify-center items-center">
                            <div
                                className="flex flex-row "
                            >
                                <div className="w-[7rem]">
                                    Message :
                                </div>
                                <div className="w-[35rem] ml-5 text-start ml-15">
                                    {item.message}
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-[6rem]">
                                    Sender :
                                </div>
                                <div className="w-[35rem] ml-8 text-start ml-15">
                                    {item.senderId}
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-[6rem]">
                                    Time :
                                </div>
                                <div className="w-[35rem] ml-8 text-start ml-15">
                                    {item.createdAt}
                                </div>
                            </div>
                        </div>
                        <div className="justify-center items-center flex">
                            <button onClick={() => { textToMorseCode(item.message) }} className="bg-red-700 w-10 h-10 rounded-full text-white align-center items-center flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" fill="#ffffff" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}