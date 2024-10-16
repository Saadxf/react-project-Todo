import { useState } from "react"

export default function AddTodoForm() {
    const [input, setInput] = useState("")

    const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (!input.trim) {

        // }

    }


    return (
        <form className="flex" onSubmit={handleSumit}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="what need to be done?"
                className="rounded-s-md grow border border-gray-400 p-2"
            />
            <button
                type="submit"
                className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-800"

            >
                Add
            </button>
        </form>
    )
};
