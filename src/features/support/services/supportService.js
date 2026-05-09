import { apiRequest } from "../../../services/apiClient";

function formatTime(value) {
  return new Date(value).toLocaleString();
}

export function mapThread(thread) {
  return {
    id: thread.id,
    subject: thread.subject,
    status: thread.status,
    updatedAt: formatTime(thread.updatedAt),
    priority: thread.priority,
    messages: (thread.messages || []).map((message) => ({
      id: message.id,
      sender: message.senderType === "ADMIN" ? "support" : "user",
      body: message.message,
      time: formatTime(message.createdAt),
    })),
  };
}

export async function getSupportOverview() {
  const [threads, config] = await Promise.all([
    apiRequest("/support/threads"),
    apiRequest("/system/health"),
  ]);

  const mappedThreads = threads.map(mapThread);

  return {
    supportChannels: [
      { id: "sc1", title: "API support", body: "support@optizenqor.com", meta: `Backend status: ${config.status}` },
      { id: "sc2", title: "Order help", body: "Use your active support thread", meta: "Replies are stored in your account timeline" },
      { id: "sc3", title: "Live chat", body: "Admin support inbox", meta: "Send a new message from this page" },
    ],
    supportFaqs: [
      { id: "faq1", question: "How quickly do orders ship?", answer: "Most in-stock orders leave our warehouse within 24 hours." },
      { id: "faq2", question: "Can I change an address after checkout?", answer: "Use support before the order enters the shipping stage." },
      { id: "faq3", question: "How do returns work?", answer: "Support can guide you through return eligibility and status updates." },
    ],
    threads: mappedThreads,
    activeThread: mappedThreads[0] || null,
  };
}

export async function createSupportThread(subject, message) {
  return apiRequest("/support/threads", {
    method: "POST",
    body: JSON.stringify({ subject, message, priority: "MEDIUM" }),
  });
}

export async function sendSupportMessage(threadId, message) {
  return apiRequest(`/support/threads/${threadId}/messages`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}
