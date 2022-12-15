export interface Activity {
    id: string;
    title: string;
    date: string; // Came in from json2ts as Date?
    description: string;
    category: string;
    city: string;
    venue: string;
}