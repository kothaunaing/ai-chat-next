import { create } from "zustand";

const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

const useAppStore = create((set, get) => ({
  title: "AI Chat",
  setTitle: (newTitle) => {
    set({ title: newTitle });
  },
  openSidebar: false,
  setOpenSidebar: (value) => {
    set({ openSidebar: value });
  },
  baseURL: "https://openrouter.ai/api/v1/chat/completions",

  models: [
    {
      id: 1,
      name: "DeepSeek V3",
      model: "deepseek/deepseek-chat:free",
      description: "DeepSeek's latest model",
    },
    {
      id: 2,
      name: "Mistral Small 3",
      model: "mistralai/mistral-small-24b-instruct-2501:free",
      description:
        "Low-latency AI model with local deployment support under Apache 2.0",
    },
    {
      id: 3,
      name: "Llama 3.3 70B Instruct",
      model: "meta-llama/llama-3.3-70b-instruct:free",
      description: "Meta's 70B LLM",
    },
  ],
  currentModel: {
    id: 1,
    name: "DeepSeek V3",
    model: "deepseek/deepseek-chat:free",
    description: "DeepSeek's latest model",
  },
  setCurrentModel: (model) => {
    set({ currentModel: model });
  },
  getModelById: (id) => {
    const { models } = get();
    let model;
    models.forEach((m) => {
      if (m.id === id) {
        model = m;
      }
    });
    return model;
  },
  messages: [],
  setMessages: (newMessages) => {
    set({ messages: newMessages });
  },
  loading: false,
  fetchAIResponse: async (prompt) => {
    set({ loading: true });
    const { currentModel } = get();
    const { messages } = get();

    const fetchResponse = async () => {
      let responseData = null;
      let maxRetries = 5; // Set a max retry limit
      let attempt = 0;

      while (attempt < maxRetries) {
        try {
          const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${APIKEY}`,
                "HTTP-Referer": "<YOUR_SITE_URL>",
                "X-Title": "<YOUR_SITE_NAME>",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: currentModel.model,
                messages: [...messages, { role: "user", content: prompt }],
              }),
            }
          );

          if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          // Assuming the API response contains the content inside `data.choices[0].message.content`
          if (
            data.choices &&
            data.choices.length > 0 &&
            data.choices[0].message.content.trim() !== ""
          ) {
            responseData = data;
            break; // Exit the loop if content is not empty
          }
        } catch (error) {
          console.error(`Attempt ${attempt + 1} failed:`, error);
        }

        attempt++;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
      }

      if (!responseData) {
        console.log("Failed to fetch valid data after multiple attempts.");
      }

      return responseData;
    };

    const data = await fetchResponse();

    if (!data) {
      set({ loading: false });
      return;
    }

    const message = data.choices[0].message;

    const newMessages = [
      ...messages,
      {
        ...message,
        model: currentModel.id,
        created: data.created,
        id: data.id,
      },
    ];

    set({ messages: newMessages });

    set({ loading: false });
    scrollToBottom();
  },
}));

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

export default useAppStore;
