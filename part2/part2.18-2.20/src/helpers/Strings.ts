export class Strings {
    static capitalize(str: string) {
        return str.trim().toLowerCase().replace(/^\w/,c => c.toUpperCase())
    }

    static cleanString(str: string) {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }
}