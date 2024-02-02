export default function AddItemForm({ handleFormSubmit, formDetail, handleChange, isDisabled }) {
    return (

        <form onSubmit={handleFormSubmit}>
            <label htmlFor="inputName" >NAME: </label>
            <input type="text" className="border rounded-md" name="name" id="inputName" value={formDetail.name} onChange={handleChange} disabled={isDisabled}></input>
            <label htmlFor="price"> PRICE: </label>
            <input type="text" className="border rounded-md" name="price" id="price" value={formDetail.price} onChange={handleChange} disabled={isDisabled}></input>
            <label htmlFor="category"> CATEGORY: </label>
            <input type="text" className="border rounded-md" name="category" id="category" value={formDetail.category} onChange={handleChange} disabled={isDisabled}></input>
            <label htmlFor="image"> IMAGE: </label>
            <input
                id="image"
                type="file"
                name="image"
                onChange={handleChange}
                disabled={isDisabled}
            />
            <button type="submit" className="bg-indigo-100 hover:bg-indigo-200 text-gray font-bold py-2 px-4 rounded-full uppercase ml-4">Submit</button>
        </form>)

}