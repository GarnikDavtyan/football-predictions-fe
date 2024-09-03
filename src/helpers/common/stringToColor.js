export default function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

export function getLetterColor(letter) {
    switch (letter) {
        case 'L':
            return 'red';
        case 'D':
            return 'yellow';
        case 'W':
            return 'green';
        default:
            return 'black';
    }
};