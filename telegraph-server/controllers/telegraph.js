export const binaryToMorse = (data) => {
    // console.log(data);
    // const morseCode = {
    //     '.': 
    // }
    let result = '';
    let method = "update";
    for (let i=0; i<data.length; i++) {
        if (data[i] === '1') {
            let count = 0;
            while (data[i] === '1') {
                count++;
                i++;
            }
            result += count === 1 ? '.' : '-';
        }
        else if (data[i] === '0') {
            let count = 0;
            while (data[i] === '0') {
                count++;
                i++;
            }
            if (count >= 16) method = "create"
            else if (count >= 6) result += ' / ';
            else if (count >= 2) result += ' ';
            i--;
        }

        if (i >= data.length) break;
    }

    return { result, method };
};

export const decodeMorse = (data, userId, receiverId) => {
    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
        'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
        'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-',
        'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
        '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
        '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
        '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--',
        '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
        ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
        '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
    };

    data = binaryToMorse(data);
    let method = data.method;
    data = data.result;

    let result = '';
    data.split(' ').forEach((word) => {
        let letter = Object.keys(morseCode).find(key => morseCode[key] === word);
        if (letter) result += letter;
    });

    if (method == "create") {
        console.log("Here is " + result);
        updateMessages(result, userId, receiverId);
    }


    return { result, method };
};

const updateMessages = async (result, userId, receiverId) => {
    console.log("updating message");
    const data = {
        senderId: userId, // Assuming senderId is 1234
        receiverId: receiverId, // Assuming receiverId is 1233
        message: result,
    };

    try {
        const response = await fetch('http://localhost:3001/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log("Message updated successfully");
        } else {
            console.error("Failed to update message:", response.statusText);
        }
    } catch (error) {
        console.error("Error updating message:", error);
    }
};


let data = '.... . .-.. .-.. --- / .-- --- .-. .-.. -..';
let data2 = '10101010111001011101011100100000000101010'
console.log(decodeMorse(data2)); // HELLO WORLD
