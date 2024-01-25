export default async function getAllFood () {
    try {
        const response = await fetch("http://localhost:5000/foods");
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        console.error(err.message)
    }
}