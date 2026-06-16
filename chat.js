export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = req.body;

        const response = await fetch(
            "https://inference.nebulablock.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.NEBULA_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "meta-llama/Llama-3.1-8B-Instruct",
                    messages: [
                        {
                            role: "system",
                            content: "Kamu adalah asisten AI yang ramah dan membantu."
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        res.status(200).json({
            reply: data.choices?.[0]?.message?.content ||
                   "AI tidak memberikan respons."
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
