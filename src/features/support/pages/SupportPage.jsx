import { useMemo, useState } from "react";
import PageSection from "../../../components/common/PageSection";
import LoadingState from "../../../components/feedback/LoadingState";
import ErrorState from "../../../components/feedback/ErrorState";
import useAsyncData from "../../../hooks/useAsyncData";
import { createSupportThread, getSupportOverview, sendSupportMessage } from "../services/supportService";

function SupportPage() {
  const { data, loading, error, reload } = useAsyncData(getSupportOverview, []);
  const [draftMessage, setDraftMessage] = useState("");
  const [draftSubject, setDraftSubject] = useState("Order support");
  const activeThread = useMemo(() => data?.activeThread || data?.threads?.[0] || null, [data]);

  async function handleSend() {
    if (!draftMessage.trim()) return;

    if (activeThread) {
      await sendSupportMessage(activeThread.id, draftMessage.trim());
    } else {
      await createSupportThread(draftSubject, draftMessage.trim());
    }

    setDraftMessage("");
    await reload();
  }

  if (loading) {
    return <PageSection eyebrow="Support" title="Loading support center" subtitle="Preparing your live support threads."><LoadingState label="Loading support..." /></PageSection>;
  }

  if (error || !data) {
    return <PageSection eyebrow="Support" title="Support unavailable" subtitle="The support center could not be prepared."><ErrorState title="Support unavailable" description={error?.message || "Please try again."} onRetry={reload} /></PageSection>;
  }

  return (
    <PageSection eyebrow="Support" title="Live help, FAQ guidance, and ticket management" subtitle="A support center designed to build trust while helping users resolve order questions quickly.">
      <div className="support-hero">
        <div>
          <span className="badge badge-accent">Agents online</span>
          <h2>How can we help with your order, return, or account today?</h2>
        </div>
        <button className="button primary" type="button" onClick={handleSend}>Start live chat</button>
      </div>

      <div className="support-grid">
        {data.supportChannels.map((channel) => (
          <article key={channel.id} className="settings-card">
            <h3>{channel.title}</h3>
            <strong>{channel.body}</strong>
            <p>{channel.meta}</p>
          </article>
        ))}
      </div>

      <div className="info-panel-grid">
        <section className="summary-box">
          <h3>Frequently asked questions</h3>
          <div className="faq-list">
            {data.supportFaqs.map((faq) => (
              <details key={faq.id}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="summary-box">
          <h3>Live chat</h3>
          <div className="chat-list">
            {(activeThread?.messages || []).map((message) => (
              <div key={message.id} className={`chat-item ${message.sender}`}>
                <strong>{message.sender === "support" ? "Support" : "You"}</strong>
                <p>{message.body}</p>
                <small>{message.time}</small>
              </div>
            ))}
          </div>
          <label className="field">
            <span>Subject</span>
            <input type="text" value={draftSubject} onChange={(event) => setDraftSubject(event.target.value)} />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea rows="4" value={draftMessage} onChange={(event) => setDraftMessage(event.target.value)} />
          </label>
          <button className="button primary" type="button" onClick={handleSend}>Send message</button>
        </section>
      </div>

      <section className="summary-box">
        <h3>Support tickets</h3>
        <div className="list-stack">
          {data.threads.map((ticket) => (
            <div key={ticket.id} className="list-card compact-row">
              <span>{ticket.subject}</span>
              <strong>{ticket.status}</strong>
              <small>{ticket.updatedAt}</small>
            </div>
          ))}
        </div>
      </section>
    </PageSection>
  );
}

export default SupportPage;
