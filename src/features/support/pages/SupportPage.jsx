import PageSection from "../../../components/common/PageSection";
import {
  supportChannels,
  supportFaqs,
  supportMessages,
  supportTickets,
} from "../../../data/mockStorefront";

function SupportPage() {
  return (
    <PageSection eyebrow="Support" title="Live help, FAQ guidance, and ticket management" subtitle="A support center designed to build trust while helping users resolve order questions quickly.">
      <div className="support-hero">
        <div>
          <span className="badge badge-accent">Agents online</span>
          <h2>How can we help with your order, return, or account today?</h2>
        </div>
        <button className="button primary" type="button">Start live chat</button>
      </div>

      <div className="support-grid">
        {supportChannels.map((channel) => (
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
            {supportFaqs.map((faq) => (
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
            {supportMessages.map((message) => (
              <div key={message.id} className={`chat-item ${message.sender}`}>
                <strong>{message.sender === "support" ? "Support" : "You"}</strong>
                <p>{message.body}</p>
                <small>{message.time}</small>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="summary-box">
        <h3>Support tickets</h3>
        <div className="list-stack">
          {supportTickets.map((ticket) => (
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
