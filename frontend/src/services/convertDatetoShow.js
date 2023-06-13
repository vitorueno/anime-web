
export default function convertDateToShow(dateString) {
    const date = new Date(dateString);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate
}

