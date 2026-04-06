import PageSection from "../../../components/common/PageSection";
import { settings } from "../../../data/mockStorefront";

function SettingsPage() {
  return (
    <PageSection eyebrow="Settings" title="Grouped settings for notifications, privacy, language, and devices" subtitle="A mobile-friendly settings interface with clear hierarchy and production-style controls.">
      <div className="settings-grid">
        <section className="settings-card">
          <h3>Notifications</h3>
          <SettingRow label="Push notifications" value={settings.pushNotifications} />
          <SettingRow label="Email updates" value={settings.emailUpdates} />
          <SettingRow label="SMS alerts" value={settings.smsAlerts} />
        </section>
        <section className="settings-card">
          <h3>Security</h3>
          <SettingRow label="Private profile" value={settings.privateProfile} />
          <SettingRow label="Biometric login" value={settings.biometricLogin} />
          <SettingRow label="Save payment information" value={settings.savePaymentInformation} />
        </section>
        <section className="settings-card">
          <h3>Regional preferences</h3>
          <div className="price-row"><span>Language</span><strong>{settings.appLanguage}</strong></div>
          <div className="price-row"><span>Translation</span><strong>{settings.productTranslation}</strong></div>
          <div className="price-row"><span>Currency</span><strong>{settings.currency}</strong></div>
          <div className="price-row"><span>Delivery preference</span><strong>{settings.deliveryPreference}</strong></div>
        </section>
        <section className="settings-card">
          <h3>History and legal</h3>
          <SettingRow label="Search history" value={settings.searchHistory} />
          <div className="list-stack compact">
            <div className="list-card compact-row"><span>Manage devices</span></div>
            <div className="list-card compact-row"><span>Privacy policy</span></div>
            <div className="list-card compact-row"><span>Terms and conditions</span></div>
            <div className="list-card compact-row"><span>Return policy</span></div>
          </div>
        </section>
      </div>
    </PageSection>
  );
}

function SettingRow({ label, value }) {
  return (
    <div className="toggle-row">
      <span>{label}</span>
      <button className={`toggle${value ? " active" : ""}`} type="button" aria-pressed={value}>
        <span />
      </button>
    </div>
  );
}

export default SettingsPage;
