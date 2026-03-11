import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../componets/sideBar";

const AIChat = () => {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");

    const sendMessage = async () => {
        const res = await axios.post("http://localhost:5000/api/ai/ask", { message });
        setReply(res.data.reply);
    };

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold mb-4">Max Robot AI 🤖</h2>
                    <textarea className="w-full p-4 border rounded"
                        placeholder="Enter symptoms..."
                        onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={sendMessage}
                        className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
                        Ask AI
                    </button>
                    <div className="mt-6 bg-gray-100 p-4 rounded">
                        {reply}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AIChat;